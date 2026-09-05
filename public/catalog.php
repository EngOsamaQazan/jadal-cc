<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

$envPath = '/etc/jadal-cc/catalog.env';
if (!is_readable($envPath)) {
    http_response_code(503);
    echo '{"items":[]}';
    exit;
}

$env = parse_ini_file($envPath, false, INI_SCANNER_RAW);
if (!is_array($env) || empty($env['PGPASSWORD'])) {
    http_response_code(503);
    echo '{"items":[]}';
    exit;
}

$host = $env['PGHOST'] ?? '127.0.0.1';
$port = $env['PGPORT'] ?? '5433';
$user = $env['PGUSER'] ?? 'tayseer_app';
$db = $env['PGDATABASE'] ?? 'tayseer_v3';
$tenant = preg_replace('/[^0-9]/', '', (string) ($env['TENANT_ID'] ?? '1')) ?: '1';

$sql = <<<SQL
BEGIN;
SELECT set_config('app.tenant_id', '{$tenant}', true);
SELECT COALESCE(json_agg(row_to_json(t) ORDER BY t.qty DESC), '[]'::json)
FROM (
  SELECT i.id,
         i.item_name AS name,
         COALESCE(i.item_barcode, '') AS sku,
         COALESCE(SUM(q.quantity), 0)::int AS qty
  FROM inventory_items i
  LEFT JOIN inventory_item_quantities q ON q.item_id = i.id AND q.deleted_at IS NULL
  WHERE i.deleted_at IS NULL
    AND i.status = 'approved'
    AND i.is_abandoned IS NOT TRUE
  GROUP BY i.id, i.item_name, i.item_barcode
) t;
COMMIT;
SQL;

$cmd = [
    '/usr/bin/psql',
    '-h', $host,
    '-p', (string) $port,
    '-U', $user,
    '-d', $db,
    '-v', 'ON_ERROR_STOP=1',
    '-q',
    '-t',
    '-A',
];

$procEnv = [
    'PATH' => '/usr/bin:/bin',
    'PGPASSWORD' => $env['PGPASSWORD'],
    'PGCONNECT_TIMEOUT' => '5',
    'LANG' => 'C.UTF-8',
];

$proc = proc_open(
    $cmd,
    [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']],
    $pipes,
    null,
    $procEnv,
);
if (!is_resource($proc)) {
    http_response_code(503);
    echo '{"items":[]}';
    exit;
}

fwrite($pipes[0], $sql);
fclose($pipes[0]);
$out = stream_get_contents($pipes[1]);
fclose($pipes[1]);
fclose($pipes[2]);
$code = proc_close($proc);

if ($code !== 0) {
    http_response_code(503);
    echo '{"items":[]}';
    exit;
}

$json = '';
foreach (preg_split("/\\r\\n|\\n|\\r/", (string) $out) as $line) {
    $line = trim($line);
    if ($line === '' || $line === 'BEGIN' || $line === 'COMMIT' || str_starts_with($line, 'SET')) {
        continue;
    }
    $json = $line;
}

$decoded = json_decode($json, true);
if (!is_array($decoded)) {
    echo '{"items":[]}';
    exit;
}

foreach ($decoded as &$row) {
    if (!is_array($row)) {
        continue;
    }
    $qty = (int) ($row['qty'] ?? 0);
    if ($qty < 0) {
        $qty = 0;
    }
    if ($qty > 3) {
        $qty = 4;
    }
    $row['qty'] = $qty;
}
unset($row);

echo json_encode(['items' => $decoded], JSON_UNESCAPED_UNICODE);

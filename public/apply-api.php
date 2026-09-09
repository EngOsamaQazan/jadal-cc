<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

$envPath = '/etc/jadal-cc/catalog.env';
if (!is_readable($envPath)) {
    http_response_code(503);
    echo '{"ok":false}';
    exit;
}

$env = parse_ini_file($envPath, false, INI_SCANNER_RAW);
if (!is_array($env) || empty($env['PGPASSWORD'])) {
    http_response_code(503);
    echo '{"ok":false}';
    exit;
}

$host = $env['PGHOST'] ?? '127.0.0.1';
$port = $env['PGPORT'] ?? '5433';
$user = $env['PGUSER'] ?? 'tayseer_app';
$db = $env['PGDATABASE'] ?? 'tayseer_v3';
$tenant = preg_replace('/[^0-9]/', '', (string) ($env['TENANT_ID'] ?? '1')) ?: '1';

function jadal_psql(array $env, string $host, string $port, string $user, string $db, string $sql): string
{
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
    $proc = proc_open(
        $cmd,
        [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']],
        $pipes,
        null,
        [
            'PATH' => '/usr/bin:/bin',
            'PGPASSWORD' => $env['PGPASSWORD'],
            'PGCONNECT_TIMEOUT' => '5',
            'LANG' => 'C.UTF-8',
        ],
    );
    if (!is_resource($proc)) {
        return '';
    }
    fwrite($pipes[0], $sql);
    fclose($pipes[0]);
    $out = (string) stream_get_contents($pipes[1]);
    fclose($pipes[1]);
    fclose($pipes[2]);
    $code = proc_close($proc);
    return $code === 0 ? $out : '';
}

function jadal_sql_result(string $out): string
{
    $json = '';
    foreach (preg_split("/\\r\\n|\\n|\\r/", $out) as $line) {
        $line = trim($line);
        if ($line === '' || $line === 'BEGIN' || $line === 'COMMIT' || str_starts_with($line, 'SET')) {
            continue;
        }
        $json = $line;
    }
    return $json;
}

function jadal_lit(string $value): string
{
    return "'" . str_replace("'", "''", $value) . "'";
}

function jadal_rate_ok(): bool
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '0');
    $dir = '/tmp/jadal-apply-rl';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    $file = $dir . '/' . hash('sha256', $ip);
    $now = time();
    $hits = [];
    if (is_readable($file)) {
        $hits = array_filter(array_map('intval', explode("\n", (string) file_get_contents($file))));
    }
    $hits = array_values(array_filter($hits, static fn (int $t): bool => $t > $now - 3600));
    if (count($hits) >= 20) {
        return false;
    }
    $hits[] = $now;
    file_put_contents($file, implode("\n", $hits));
    return true;
}

function jadal_event_id(array $body): string
{
    $raw = preg_replace('/[^a-zA-Z0-9\-]/', '', (string) ($body['eventId'] ?? '')) ?? '';
    if (strlen($raw) >= 8 && strlen($raw) <= 80) {
        return $raw;
    }
    return bin2hex(random_bytes(16));
}

function jadal_hash_phone(string $phone): string
{
    $digits = preg_replace('/\D+/', '', $phone) ?? '';
    if (str_starts_with($digits, '00')) {
        $digits = substr($digits, 2);
    }
    if (str_starts_with($digits, '0') && strlen($digits) >= 9) {
        $digits = '962' . substr($digits, 1);
    } elseif (strlen($digits) === 9 && str_starts_with($digits, '7')) {
        $digits = '962' . $digits;
    }
    return hash('sha256', strtolower($digits));
}

function jadal_norm_name_part(string $part): string
{
    $part = mb_strtolower(trim($part), 'UTF-8');
    $part = preg_replace('/[^\p{L}\p{N}]+/u', '', $part) ?? '';
    return $part;
}

/** SHA256 لـ fn/ln حسب مواصفات ميتا — بدون رقم وطني أو راتب. */
function jadal_hash_name(string $name): array
{
    $tokens = preg_split('/\s+/u', trim($name), -1, PREG_SPLIT_NO_EMPTY) ?: [];
    $first = jadal_norm_name_part((string) ($tokens[0] ?? ''));
    $last = jadal_norm_name_part(implode(' ', array_slice($tokens, 1)));
    $out = [];
    if ($first !== '') {
        $out['fn'] = [hash('sha256', $first)];
    }
    if ($last !== '') {
        $out['ln'] = [hash('sha256', $last)];
    } elseif ($first !== '') {
        $out['ln'] = [hash('sha256', $first)];
    }
    return $out;
}

function jadal_click_id(array $body, string $key, string $cookie): string
{
    $raw = trim((string) ($body[$key] ?? ''));
    if ($raw === '' && !empty($_COOKIE[$cookie])) {
        $raw = (string) $_COOKIE[$cookie];
    }
    if (!preg_match('/^fb\.\d+\.\d+\.[A-Za-z0-9._-]+$/', $raw)) {
        return '';
    }
    return mb_substr($raw, 0, 200);
}

function jadal_capi(array $env, string $eventName, string $eventId, string $phone, string $name, array $body): void
{
    $pixel = preg_replace('/[^0-9]/', '', (string) ($env['META_PIXEL_ID'] ?? '1091061003303622')) ?: '1091061003303622';
    $token = trim((string) ($env['META_CAPI_ACCESS_TOKEN'] ?? ''));
    if ($token === '') {
        return;
    }
    $user = [
        'ph' => [jadal_hash_phone($phone)],
        'client_ip_address' => (string) ($_SERVER['REMOTE_ADDR'] ?? ''),
        'client_user_agent' => mb_substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 512),
    ];
    $user = array_merge($user, jadal_hash_name($name));
    $fbp = jadal_click_id($body, 'fbp', '_fbp');
    $fbc = jadal_click_id($body, 'fbc', '_fbc');
    if ($fbp !== '') {
        $user['fbp'] = $fbp;
    }
    if ($fbc !== '') {
        $user['fbc'] = $fbc;
    }
    $event = [
        'event_name' => $eventName,
        'event_time' => time(),
        'event_id' => $eventId,
        'action_source' => 'website',
        'event_source_url' => 'https://jadal.cc/',
        'user_data' => $user,
    ];
    $payload = ['data' => [$event]];
    $test = trim((string) ($env['META_TEST_EVENT_CODE'] ?? ''));
    if ($test !== '') {
        $payload['test_event_code'] = $test;
    }
    $json = json_encode($payload, JSON_UNESCAPED_UNICODE);
    if (!is_string($json)) {
        return;
    }
    $url = 'https://graph.facebook.com/v21.0/' . $pixel . '/events?access_token=' . rawurlencode($token);
    $ch = curl_init($url);
    if ($ch === false) {
        return;
    }
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => $json,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 4,
        CURLOPT_CONNECTTIMEOUT => 3,
    ]);
    curl_exec($ch);
    curl_close($ch);
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$id = preg_replace('/[^0-9]/', '', (string) ($_GET['id'] ?? ''));
$token = preg_replace('/[^a-f0-9]/', '', strtolower((string) ($_GET['token'] ?? '')));

if ($method === 'GET') {
    if ($id === '' || strlen($token) < 16) {
        http_response_code(400);
        echo '{"ok":false}';
        exit;
    }
    $hashSql = jadal_lit(hash('sha256', $token));
    $sql = <<<SQL
BEGIN;
SELECT set_config('app.tenant_id', '{$tenant}', true);
SELECT row_to_json(t)
FROM (
  SELECT id::text AS id,
         stage,
         display_name AS name,
         phone,
         device_name AS device,
         profile,
         created_at
  FROM website_financing_applications
  WHERE id = {$id}
    AND access_token_hash = {$hashSql}
    AND deleted_at IS NULL
  LIMIT 1
) t;
COMMIT;
SQL;
    $out = jadal_psql($env, $host, $port, $user, $db, $sql);
    $row = json_decode(jadal_sql_result($out), true);
    if (!is_array($row)) {
        http_response_code(404);
        echo '{"ok":false}';
        exit;
    }
    echo json_encode(['ok' => true, 'item' => $row], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($method !== 'POST') {
    http_response_code(405);
    echo '{"ok":false}';
    exit;
}

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body)) {
    http_response_code(400);
    echo '{"ok":false}';
    exit;
}

$action = (string) ($body['action'] ?? 'start');

if ($action === 'start') {
    if (!jadal_rate_ok()) {
        http_response_code(429);
        echo '{"ok":false}';
        exit;
    }
    $name = trim((string) ($body['name'] ?? ''));
    $phone = trim((string) ($body['phone'] ?? ''));
    $device = trim((string) ($body['device'] ?? ''));
    if (mb_strlen($name) < 2 || mb_strlen($phone) < 8 || mb_strlen($device) < 2) {
        http_response_code(400);
        echo '{"ok":false}';
        exit;
    }
    $name = mb_substr($name, 0, 250);
    $phone = mb_substr($phone, 0, 32);
    $device = mb_substr($device, 0, 250);
    $rawToken = bin2hex(random_bytes(16));
    $hashSql = jadal_lit(hash('sha256', $rawToken));
    $rawIp = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
    $ipSql = filter_var($rawIp, FILTER_VALIDATE_IP) ? jadal_lit($rawIp) . '::inet' : 'NULL';
    $ua = jadal_lit(mb_substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 400));
    $sql = <<<SQL
BEGIN;
SELECT set_config('app.tenant_id', '{$tenant}', true);
INSERT INTO website_financing_applications
  (tenant_id, access_token_hash, stage, display_name, phone, device_name, ip, user_agent)
VALUES
  ({$tenant}, {$hashSql}, 'inquiry', #{name}#, #{phone}#, #{device}#, {$ipSql}, {$ua})
RETURNING id::text AS id;
COMMIT;
SQL;
    $sql = str_replace(
        ['#{name}#', '#{phone}#', '#{device}#'],
        [jadal_lit($name), jadal_lit($phone), jadal_lit($device)],
        $sql,
    );
    $out = jadal_psql($env, $host, $port, $user, $db, $sql);
    $newId = trim(jadal_sql_result($out));
    if ($newId === '' || !ctype_digit($newId)) {
        http_response_code(503);
        echo '{"ok":false}';
        exit;
    }
    jadal_capi($env, 'Lead', jadal_event_id($body), $phone, $name, $body);
    echo json_encode(['ok' => true, 'id' => $newId, 'token' => $rawToken], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'profile') {
    $id = preg_replace('/[^0-9]/', '', (string) ($body['id'] ?? ''));
    $token = preg_replace('/[^a-f0-9]/', '', strtolower((string) ($body['token'] ?? '')));
    $profile = $body['profile'] ?? null;
    if ($id === '' || strlen($token) < 16 || !is_array($profile)) {
        http_response_code(400);
        echo '{"ok":false}';
        exit;
    }
    $allowed = [
        'fullName', 'idNumber', 'documentNumber', 'phone', 'gender', 'birthDate',
        'city', 'nationality', 'hearAboutUs', 'email', 'facebook', 'notes',
        'employerName', 'jobNumber', 'salary', 'isSocialSecurity', 'socialSecurityNumber',
        'hasPension', 'pensionSource', 'retirementStatus', 'retirementIncome',
        'bankName', 'bankBranch', 'accountNumber',
        'homeCity', 'homeNeighborhood', 'homeStreet', 'homeNotes',
        'guarantorName', 'guarantorPhone', 'guarantorRelation',
    ];
    $clean = [];
    foreach ($allowed as $key) {
        if (!array_key_exists($key, $profile)) {
            continue;
        }
        $val = $profile[$key];
        if (is_bool($val)) {
            $clean[$key] = $val;
            continue;
        }
        $clean[$key] = mb_substr(trim((string) $val), 0, 250);
    }
    $required = ['fullName', 'idNumber', 'phone', 'gender', 'birthDate', 'employerName', 'salary'];
    foreach ($required as $key) {
        if (!isset($clean[$key]) || $clean[$key] === '') {
            http_response_code(400);
            echo json_encode(['ok' => false, 'field' => $key], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
    $json = json_encode($clean, JSON_UNESCAPED_UNICODE);
    if (!is_string($json)) {
        http_response_code(400);
        echo '{"ok":false}';
        exit;
    }
    $hashSql = jadal_lit(hash('sha256', $token));
    $profileSql = jadal_lit($json) . '::jsonb';
    $nameSql = jadal_lit((string) $clean['fullName']);
    $phoneSql = jadal_lit((string) $clean['phone']);
    $sql = <<<SQL
BEGIN;
SELECT set_config('app.tenant_id', '{$tenant}', true);
UPDATE website_financing_applications
SET profile = {$profileSql},
    stage = 'profile',
    display_name = {$nameSql},
    phone = {$phoneSql},
    profile_completed_at = COALESCE(profile_completed_at, now()),
    updated_at = now()
WHERE id = {$id}
  AND access_token_hash = {$hashSql}
  AND deleted_at IS NULL
RETURNING id::text AS id;
COMMIT;
SQL;
    $out = jadal_psql($env, $host, $port, $user, $db, $sql);
    $saved = trim(jadal_sql_result($out));
    if ($saved === '') {
        http_response_code(404);
        echo '{"ok":false}';
        exit;
    }
    jadal_capi($env, 'CompleteRegistration', jadal_event_id($body), (string) $clean['phone'], (string) $clean['fullName'], $body);
    echo json_encode(['ok' => true, 'id' => $saved], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(400);
echo '{"ok":false}';

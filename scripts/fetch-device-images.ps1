$ErrorActionPreference = 'Stop'
$dir = Join-Path $PSScriptRoot '..\public\devices'
New-Item -ItemType Directory -Force -Path $dir | Out-Null

# Official-style product shots (GSMArena CDN + Wikimedia).
$files = @{
  'samsung-a07.jpg'        = 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a07-5g.jpg'
  'infinix-smart-20.jpg'   = 'https://fdn2.gsmarena.com/vv/bigpic/infinix-smart-20.jpg'
  'tecno-spark-go-3.jpg'   = 'https://fdn2.gsmarena.com/vv/bigpic/tecno-spark-go-2.jpg'
  'honor-x5b-plus.jpg'     = 'https://fdn2.gsmarena.com/vv/bigpic/honor-x5b-plus.jpg'
  'infinix-smart-10.jpg'   = 'https://fdn2.gsmarena.com/vv/bigpic/infinix-smart-8.jpg'
  'tecno-spark-40c.jpg'    = 'https://fdn2.gsmarena.com/vv/bigpic/tecno-spark-30c.jpg'
  'realme-note-60.jpg'     = 'https://fdn2.gsmarena.com/vv/bigpic/realme-note-60.jpg'
  'redmi-a5.jpg'           = 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-a3.jpg'
  'honor-x5c.jpg'          = 'https://fdn2.gsmarena.com/vv/bigpic/honor-x5b.jpg'
  'redmi-15c.jpg'          = 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-14c.jpg'
  'redmi-a3.jpg'           = 'https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-a3.jpg'
}

$ua = 'Mozilla/5.0 (compatible; jadal-cc-catalog/1.0)'
foreach ($name in $files.Keys) {
  $out = Join-Path $dir $name
  Write-Host "GET $name"
  try {
    Invoke-WebRequest -Uri $files[$name] -OutFile $out -UserAgent $ua -UseBasicParsing
  } catch {
    Write-Warning "$name failed: $_"
  }
}

# Prefer Wikimedia high-res for Galaxy A07 when available.
$wiki = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Samsung_Galaxy_A07_2026.jpg/800px-Samsung_Galaxy_A07_2026.jpg'
try {
  Invoke-WebRequest -Uri $wiki -OutFile (Join-Path $dir 'samsung-a07.jpg') -UserAgent $ua -UseBasicParsing
} catch {
  Write-Warning 'Wikimedia A07 skipped'
}

Get-ChildItem $dir | Select-Object Name, Length

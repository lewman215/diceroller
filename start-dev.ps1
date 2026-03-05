$ErrorActionPreference = 'Stop'

$version = 'v24.14.0'
$nodeDir = Join-Path (Join-Path $env:USERPROFILE 'node-portable') "node-$version-win-x64"

if (-not (Test-Path $nodeDir)) {
    Write-Error "Portable Node.js not found at: $nodeDir`nInstall it first, then rerun this script."
}

$env:Path = "$nodeDir;$env:Path"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "node is still not available on PATH after setup."
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "npm is still not available on PATH after setup."
}

if (-not (Test-Path (Join-Path $PSScriptRoot 'node_modules'))) {
    npm install
}

npm run dev

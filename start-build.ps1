$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'portable-node.ps1')

Push-Location $PSScriptRoot

try {
    $nodeDir = Initialize-PortableNode -ScriptRoot $PSScriptRoot
    Write-Host "Using portable Node.js from: $nodeDir"

    if (-not (Test-Path (Join-Path $PSScriptRoot 'node_modules'))) {
        npm install
    }

    npm run build
}
finally {
    Pop-Location
}
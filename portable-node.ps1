$ErrorActionPreference = 'Stop'

function Get-PortableNodeDir {
    param(
        [string]$ScriptRoot,
        [string]$PreferredVersion = 'v24.14.0'
    )

    $searchRoots = @(
        (Join-Path $ScriptRoot '.tools\node'),
        (Join-Path $env:USERPROFILE 'node-portable')
    )

    foreach ($root in $searchRoots) {
        if (-not (Test-Path $root)) {
            continue
        }

        $preferredDir = Join-Path $root "node-$PreferredVersion-win-x64"
        if (Test-Path (Join-Path $preferredDir 'node.exe')) {
            return $preferredDir
        }

        $fallbackDir = Get-ChildItem -Path $root -Directory -Filter 'node-v*-win-x64' |
            Sort-Object Name -Descending |
            Select-Object -First 1

        if ($fallbackDir -and (Test-Path (Join-Path $fallbackDir.FullName 'node.exe'))) {
            return $fallbackDir.FullName
        }
    }

    return $null
}

function Initialize-PortableNode {
    param(
        [string]$ScriptRoot,
        [string]$PreferredVersion = 'v24.14.0'
    )

    $nodeDir = Get-PortableNodeDir -ScriptRoot $ScriptRoot -PreferredVersion $PreferredVersion

    if (-not $nodeDir) {
        $instructions = @(
            'Portable Node.js was not found.',
            'Expected one of these locations:',
            "  - $ScriptRoot\.tools\node\node-v24.14.0-win-x64",
            "  - $env:USERPROFILE\node-portable\node-v24.14.0-win-x64",
            'Download the Windows x64 zip from https://nodejs.org/en/download and extract it to one of those folders.'
        ) -join [Environment]::NewLine

        Write-Error $instructions
    }

    $env:Path = "$nodeDir;$env:Path"

    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Error "node is not available on PATH after adding portable Node from $nodeDir"
    }

    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Error "npm is not available on PATH after adding portable Node from $nodeDir"
    }

    return $nodeDir
}
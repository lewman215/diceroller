# Dice Roller

This project is a React + Vite dice roller app with PowerShell launch scripts that support portable Node.js on Windows.

## Portable Node.js Setup

If you cannot install Node.js system-wide, use the official Windows x64 zip distribution from https://nodejs.org/en/download.

Extract it to either of these locations:

- `.tools/node/node-v24.14.0-win-x64` inside this repo
- `%USERPROFILE%\node-portable\node-v24.14.0-win-x64`

The scripts also accept any folder matching `node-v*-win-x64` in those locations and will use the newest match if the preferred version is not present.

## Scripts

- `./portable-node.ps1`: Shared helper that resolves and initializes the portable Node.js runtime.
- `./start-dev.ps1`: Adds portable Node.js to `PATH`, installs dependencies if needed, and starts Vite dev mode.
- `./start-build.ps1`: Adds portable Node.js to `PATH`, installs dependencies if needed, and runs the production build.

## Manual Commands

If you want to run commands manually in PowerShell:

```powershell
$nodeDir = Join-Path $env:USERPROFILE 'node-portable\node-v24.14.0-win-x64'
$env:Path = "$nodeDir;$env:Path"
npm run dev
npm run build
```

#!/usr/bin/env pwsh
Write-Host "Running setup (PowerShell)"
if (!(Test-Path package.json)) {
  Write-Error "package.json not found. Aborting."
  exit 1
}
Write-Host "Installing npm dependencies..."
npm install
if ($LASTEXITCODE -ne 0) { Write-Error "npm install failed"; exit $LASTEXITCODE }
Write-Host "Running tests..."
npm test
exit $LASTEXITCODE

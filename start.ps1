# ╔══════════════════════════════════════════════════════════════╗
# ║          DETECTRA — Start Everything (PowerShell)           ║
# ╚══════════════════════════════════════════════════════════════╝
#
# Usage (from this folder):
#   .\start.ps1
#
# What it does:
#   1. Sets environment variables for the FastAPI process
#   2. Starts the FastAPI backend  (port 8000) in a new window
#   3. Starts the Next.js frontend (port 3000) in a new window
#
# Prerequisites (run once before first launch):
#   pip install -r requirements.txt
#   cd frontend && npm install && cd ..

param (
    [string]$SarvamApiKey = $env:SARVAM_API_KEY  # pass via env or -SarvamApiKey flag
)

$Root = $PSScriptRoot  # folder containing this script = Detectra-fraud-detection/

# ── 1. FastAPI backend ────────────────────────────────────────────────────────
$backendCmd = @"
Set-Location '$Root'
`$env:SARVAM_API_KEY  = '$SarvamApiKey'
`$env:FRONTEND_URL    = 'http://localhost:3000'
Write-Host '🚀 Starting DETECTRA FastAPI on http://localhost:8000 ...' -ForegroundColor Cyan
uvicorn detectra_api:app --reload --port 8000
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd `
    -WindowStyle Normal

Write-Host "⏳ Waiting 4 s for FastAPI to load model..." -ForegroundColor Yellow
Start-Sleep -Seconds 4

# ── 2. Next.js frontend ───────────────────────────────────────────────────────
$frontendCmd = @"
Set-Location '$Root\frontend'
Write-Host '🚀 Starting DETECTRA Next.js on http://localhost:3000 ...' -ForegroundColor Green
npm run dev
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd `
    -WindowStyle Normal

Write-Host ""
Write-Host "✅ Both servers starting:" -ForegroundColor Green
Write-Host "   FastAPI  → http://localhost:8000      (API docs: http://localhost:8000/docs)" -ForegroundColor Cyan
Write-Host "   Next.js  → http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Tip: set `$env:SARVAM_API_KEY before running, or pass -SarvamApiKey 'sk-...' " -ForegroundColor Yellow

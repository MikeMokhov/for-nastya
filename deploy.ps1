# Deploy to GitHub Pages
# Run: powershell -ExecutionPolicy Bypass -File deploy.ps1

$ErrorActionPreference = "Stop"
$RepoName = "for-nastya"

Write-Host "=== Deploying site to GitHub Pages ===" -ForegroundColor Magenta

$authOk = $false
try {
    gh auth status 2>&1 | Out-Null
    $authOk = ($LASTEXITCODE -eq 0)
} catch {
    $authOk = $false
}

if (-not $authOk) {
    Write-Host ""
    Write-Host "GitHub login required. Follow the prompts:" -ForegroundColor Yellow
    gh auth login --hostname github.com --git-protocol https --web
}

$remotes = @(git remote 2>$null)
$hasOrigin = $remotes -contains 'origin'

if (-not $hasOrigin) {
    Write-Host ""
    Write-Host "Creating repository $RepoName..." -ForegroundColor Cyan
    gh repo create $RepoName --public --source=. --remote=origin --push --description "Romantic date invitation"
} else {
    Write-Host ""
    Write-Host "Pushing changes..." -ForegroundColor Cyan
    git push -u origin main
}

$owner = gh api user -q .login
Write-Host ""
Write-Host "Enabling GitHub Pages..." -ForegroundColor Cyan

gh api "repos/$owner/$RepoName/pages" -X POST `
    -f build_type=legacy `
    -f "source[branch]=main" `
    -f "source[path]=/" 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Pages already enabled or will be configured automatically." -ForegroundColor Yellow
}

$siteUrl = "https://$owner.github.io/$RepoName/"
Write-Host ""
Write-Host "Done! Site will be live in 1-2 minutes:" -ForegroundColor Green
Write-Host $siteUrl -ForegroundColor White
Write-Host ""
Write-Host "Update SURPRISE in script.js before sharing the link." -ForegroundColor Yellow

# Скрипт публикации на GitHub Pages
# Запуск: powershell -ExecutionPolicy Bypass -File deploy.ps1

$ErrorActionPreference = "Stop"
$RepoName = "for-nastya"

Write-Host "=== Деплой романтичного сайта на GitHub Pages ===" -ForegroundColor Magenta

# Проверка авторизации
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "`nНужна авторизация в GitHub. Следуйте инструкциям:" -ForegroundColor Yellow
    gh auth login --hostname github.com --git-protocol https --web
}

# Создание репозитория и push
$remoteExists = git remote get-url origin 2>$null
if (-not $remoteExists) {
    Write-Host "`nСоздаю репозиторий $RepoName..." -ForegroundColor Cyan
    gh repo create $RepoName --public --source=. --remote=origin --push --description "Romantic date invitation"
} else {
    Write-Host "`nОтправляю изменения..." -ForegroundColor Cyan
    git push -u origin main
}

# Включение GitHub Pages
$owner = gh api user -q .login
Write-Host "`nВключаю GitHub Pages..." -ForegroundColor Cyan

gh api "repos/$owner/$RepoName/pages" -X POST `
    -f build_type=legacy `
    -f "source[branch]=main" `
    -f "source[path]=/" 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Pages уже включены или настраиваются автоматически." -ForegroundColor Yellow
}

$siteUrl = "https://$owner.github.io/$RepoName/"
Write-Host "`nГотово! Сайт будет доступен через 1-2 минуты:" -ForegroundColor Green
Write-Host $siteUrl -ForegroundColor White
Write-Host "`nНе забудьте обновить SURPRISE в script.js перед отправкой ссылки!" -ForegroundColor Yellow

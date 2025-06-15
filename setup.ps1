# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

Write-Host "Setting up Git hooks..." -ForegroundColor Green
npm run prepare

Write-Host "Starting development server..." -ForegroundColor Green
npm run develop 
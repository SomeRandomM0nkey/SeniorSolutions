@echo off
echo Setting up CareConnect Senior Care Platform...

echo.
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed!

echo.
echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Setup complete!
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo The application will be available at http://localhost:5000
pause
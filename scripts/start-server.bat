@echo off
REM 01v96 Remote - Auto-start Script for Windows
REM This script starts the 01v96 Remote server automatically

REM Configuration
set APP_DIR=C:\01v96-remote
set LOG_DIR=%APP_DIR%\logs
set CONNECTION_TYPE=midi

REM Change this to match your installation directory
REM set APP_DIR=C:\Users\YourName\Documents\01v96-remote

REM Create log directory if it doesn't exist
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

REM Generate log filename with date
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c%%a%%b)
set LOG_FILE=%LOG_DIR%\server-%mydate%.log

echo ========================================= >> "%LOG_FILE%"
echo 01v96 Remote Auto-Start Script >> "%LOG_FILE%"
echo Started at %date% %time% >> "%LOG_FILE%"
echo ========================================= >> "%LOG_FILE%"

REM Change to application directory
cd /d "%APP_DIR%"
if errorlevel 1 (
    echo ERROR: Cannot change to directory %APP_DIR% >> "%LOG_FILE%"
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed! >> "%LOG_FILE%"
    echo Please install Node.js from https://nodejs.org/ >> "%LOG_FILE%"
    exit /b 1
)

REM Check if server.js exists
if not exist "server.js" (
    echo ERROR: server.js not found in %APP_DIR% >> "%LOG_FILE%"
    exit /b 1
)

REM Kill any existing server processes
echo Checking for existing server processes... >> "%LOG_FILE%"
tasklist /FI "IMAGENAME eq node.exe" /FI "WINDOWTITLE eq 01v96*" 2>nul | find /I "node.exe" >nul
if not errorlevel 1 (
    echo Stopping existing server... >> "%LOG_FILE%"
    taskkill /F /FI "IMAGENAME eq node.exe" /FI "WINDOWTITLE eq 01v96*" >nul 2>nul
    timeout /t 2 /nobreak >nul
)

REM Start the server
echo Starting 01v96 Remote server... >> "%LOG_FILE%"
echo Connection type: %CONNECTION_TYPE% >> "%LOG_FILE%"
echo Application directory: %APP_DIR% >> "%LOG_FILE%"

REM Start server in a new window (minimized)
start "01v96 Remote Server" /MIN node server.js %CONNECTION_TYPE%

REM Wait a moment for server to start
timeout /t 3 /nobreak >nul

REM Check if server is running
tasklist /FI "IMAGENAME eq node.exe" 2>nul | find /I "node.exe" >nul
if errorlevel 1 (
    echo ERROR: Server failed to start! >> "%LOG_FILE%"
    exit /b 1
) else (
    echo Server started successfully! >> "%LOG_FILE%"
    echo Web interface: http://localhost:1337 >> "%LOG_FILE%"
    echo WebSocket: ws://localhost:1338 >> "%LOG_FILE%"
    echo ========================================= >> "%LOG_FILE%"
)

exit /b 0

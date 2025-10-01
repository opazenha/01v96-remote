@echo off
REM 01v96 Remote Electron Application Launcher for Windows
REM Usage: electron-start.bat [connection_type]
REM connection_type: midi (default), serialport, or dummy

SET CONNECTION_TYPE=%1
IF "%CONNECTION_TYPE%"=="" SET CONNECTION_TYPE=midi

echo Starting 01v96 Remote Electron App with connection type: %CONNECTION_TYPE%
npm start %CONNECTION_TYPE%

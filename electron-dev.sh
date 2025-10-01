#!/bin/bash

# 01v96 Remote Electron Development Launcher
# Usage: ./electron-dev.sh [connection_type]
# connection_type: midi (default), serialport, or dummy

CONNECTION_TYPE=${1:-midi}

echo "Starting 01v96 Remote Electron App with connection type: $CONNECTION_TYPE"
npm start $CONNECTION_TYPE

#!/bin/bash

# 01v96 Remote - Auto-start Script for Linux/Mac
# This script starts the 01v96 Remote server automatically

# Configuration
APP_DIR="/home/zenha/Documents/Projects/js/01v96-remote"
LOG_DIR="$APP_DIR/logs"
LOG_FILE="$LOG_DIR/server-$(date +%Y%m%d).log"
PID_FILE="$APP_DIR/server.pid"
CONNECTION_TYPE="midi"  # Change to: midi, serialport, or dummy

# Create log directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to check if server is already running
is_running() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p "$PID" > /dev/null 2>&1; then
            return 0
        fi
    fi
    return 1
}

# Function to stop existing server
stop_server() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p "$PID" > /dev/null 2>&1; then
            log "Stopping existing server (PID: $PID)..."
            kill "$PID"
            sleep 2
            
            # Force kill if still running
            if ps -p "$PID" > /dev/null 2>&1; then
                log "Force stopping server..."
                kill -9 "$PID"
            fi
        fi
        rm -f "$PID_FILE"
    fi
}

# Function to start server
start_server() {
    log "Starting 01v96 Remote server..."
    log "Connection type: $CONNECTION_TYPE"
    log "Application directory: $APP_DIR"
    
    # Change to application directory
    cd "$APP_DIR" || {
        log "ERROR: Cannot change to directory $APP_DIR"
        exit 1
    }
    
    # Check if node is installed
    if ! command -v node &> /dev/null; then
        log "ERROR: Node.js is not installed!"
        exit 1
    fi
    
    # Check if server.js exists
    if [ ! -f "server.js" ]; then
        log "ERROR: server.js not found in $APP_DIR"
        exit 1
    fi
    
    # Start the server in background
    nohup node server.js "$CONNECTION_TYPE" >> "$LOG_FILE" 2>&1 &
    SERVER_PID=$!
    
    # Save PID
    echo "$SERVER_PID" > "$PID_FILE"
    
    log "Server started with PID: $SERVER_PID"
    
    # Wait a moment and check if server is still running
    sleep 3
    if ps -p "$SERVER_PID" > /dev/null 2>&1; then
        log "Server is running successfully!"
        log "Web interface: http://localhost:1337"
        log "WebSocket: ws://localhost:1338"
        return 0
    else
        log "ERROR: Server failed to start. Check log file: $LOG_FILE"
        rm -f "$PID_FILE"
        return 1
    fi
}

# Main execution
log "========================================="
log "01v96 Remote Auto-Start Script"
log "========================================="

# Check if already running
if is_running; then
    log "Server is already running. Restarting..."
    stop_server
fi

# Start the server
if start_server; then
    log "Server startup complete!"
    exit 0
else
    log "Server startup failed!"
    exit 1
fi

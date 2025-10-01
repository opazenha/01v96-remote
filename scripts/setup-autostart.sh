#!/bin/bash

# 01v96 Remote - Quick Auto-Start Setup Script
# This script helps you set up auto-start for your system

echo "========================================="
echo "01v96 Remote - Auto-Start Setup"
echo "========================================="
echo ""

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="mac"
else
    echo "This script is for Linux and macOS only."
    echo "For Windows, please follow the manual setup in AUTO-START-SETUP.md"
    exit 1
fi

echo "Detected OS: $OS"
echo ""

# Get current directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APP_DIR="$(dirname "$SCRIPT_DIR")"

echo "Application directory: $APP_DIR"
echo ""

# Create logs directory
mkdir -p "$APP_DIR/logs"
echo "✓ Created logs directory"

if [ "$OS" == "linux" ]; then
    echo ""
    echo "Setting up systemd service..."
    echo ""
    
    # Get current user
    CURRENT_USER=$(whoami)
    
    # Create temporary service file with correct paths
    SERVICE_FILE="/tmp/01v96-remote.service"
    cat > "$SERVICE_FILE" << EOF
[Unit]
Description=01v96 Remote MIDI Bridge Server
After=network.target sound.target
Wants=network.target

[Service]
Type=simple
User=$CURRENT_USER
Group=$CURRENT_USER
WorkingDirectory=$APP_DIR
Environment="NODE_ENV=production"
ExecStart=$(which node) $APP_DIR/server.js midi
Restart=always
RestartSec=10
StandardOutput=append:$APP_DIR/logs/server.log
StandardError=append:$APP_DIR/logs/server-error.log

NoNewPrivileges=true
PrivateTmp=true
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
EOF
    
    echo "Service file created with your paths:"
    echo "  User: $CURRENT_USER"
    echo "  WorkingDirectory: $APP_DIR"
    echo "  Node: $(which node)"
    echo ""
    
    # Install service
    echo "Installing service (requires sudo)..."
    sudo cp "$SERVICE_FILE" /etc/systemd/system/01v96-remote.service
    
    if [ $? -eq 0 ]; then
        echo "✓ Service file installed"
        
        # Reload systemd
        sudo systemctl daemon-reload
        echo "✓ Systemd reloaded"
        
        # Enable service
        sudo systemctl enable 01v96-remote.service
        echo "✓ Service enabled (will start on boot)"
        
        # Ask if user wants to start now
        read -p "Start the service now? (y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            sudo systemctl start 01v96-remote.service
            sleep 2
            sudo systemctl status 01v96-remote.service --no-pager
        fi
        
        echo ""
        echo "========================================="
        echo "Setup Complete!"
        echo "========================================="
        echo ""
        echo "Service commands:"
        echo "  Start:   sudo systemctl start 01v96-remote"
        echo "  Stop:    sudo systemctl stop 01v96-remote"
        echo "  Restart: sudo systemctl restart 01v96-remote"
        echo "  Status:  sudo systemctl status 01v96-remote"
        echo "  Logs:    sudo journalctl -u 01v96-remote -f"
        echo ""
        echo "Web interface: http://localhost:1337"
        echo ""
    else
        echo "✗ Failed to install service"
        exit 1
    fi
    
elif [ "$OS" == "mac" ]; then
    echo ""
    echo "Setting up LaunchAgent..."
    echo ""
    
    # Get current user
    CURRENT_USER=$(whoami)
    HOME_DIR="$HOME"
    
    # Create plist file with correct paths
    PLIST_FILE="$HOME_DIR/Library/LaunchAgents/com.01v96remote.plist"
    
    cat > "$PLIST_FILE" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.01v96remote.server</string>
    
    <key>ProgramArguments</key>
    <array>
        <string>$(which node)</string>
        <string>$APP_DIR/server.js</string>
        <string>midi</string>
    </array>
    
    <key>WorkingDirectory</key>
    <string>$APP_DIR</string>
    
    <key>RunAtLoad</key>
    <true/>
    
    <key>KeepAlive</key>
    <true/>
    
    <key>StandardOutPath</key>
    <string>$APP_DIR/logs/server.log</string>
    
    <key>StandardErrorPath</key>
    <string>$APP_DIR/logs/server-error.log</string>
    
    <key>EnvironmentVariables</key>
    <dict>
        <key>NODE_ENV</key>
        <string>production</string>
    </dict>
</dict>
</plist>
EOF
    
    echo "LaunchAgent created with your paths:"
    echo "  User: $CURRENT_USER"
    echo "  WorkingDirectory: $APP_DIR"
    echo "  Node: $(which node)"
    echo ""
    
    # Load the agent
    launchctl load "$PLIST_FILE"
    
    if [ $? -eq 0 ]; then
        echo "✓ LaunchAgent loaded"
        
        # Start the service
        launchctl start com.01v96remote.server
        echo "✓ Service started"
        
        sleep 2
        
        echo ""
        echo "========================================="
        echo "Setup Complete!"
        echo "========================================="
        echo ""
        echo "Service commands:"
        echo "  Start:   launchctl start com.01v96remote.server"
        echo "  Stop:    launchctl stop com.01v96remote.server"
        echo "  Restart: launchctl stop com.01v96remote.server && launchctl start com.01v96remote.server"
        echo "  Unload:  launchctl unload ~/Library/LaunchAgents/com.01v96remote.plist"
        echo "  Logs:    tail -f $APP_DIR/logs/server.log"
        echo ""
        echo "Web interface: http://localhost:1337"
        echo ""
    else
        echo "✗ Failed to load LaunchAgent"
        exit 1
    fi
fi

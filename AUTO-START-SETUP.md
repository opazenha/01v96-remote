# Auto-Start Setup Guide

## Overview

This guide will help you configure the 01v96 Remote server to start automatically when your church computer boots up. Different methods are provided for Windows, Linux, and macOS.

---

## 🪟 Windows Setup

### Method 1: Task Scheduler (Recommended)

This is the most reliable method for Windows.

#### Step 1: Prepare the Script

1. **Edit the batch file** to match your installation:
   ```
   Open: scripts/start-server.bat
   Change: set APP_DIR=C:\01v96-remote
   To: Your actual installation path
   ```

2. **Test the script manually:**
   ```cmd
   cd C:\01v96-remote\scripts
   start-server.bat
   ```

#### Step 2: Create Scheduled Task

1. **Open Task Scheduler:**
   - Press `Win + R`
   - Type `taskschd.msc`
   - Press Enter

2. **Create Basic Task:**
   - Click "Create Basic Task" in the right panel
   - Name: `01v96 Remote Server`
   - Description: `Starts the 01v96 Remote MIDI bridge on boot`
   - Click "Next"

3. **Trigger:**
   - Select "When the computer starts"
   - Click "Next"

4. **Action:**
   - Select "Start a program"
   - Click "Next"

5. **Program/Script:**
   - Browse to: `C:\01v96-remote\scripts\start-server.bat`
   - Start in: `C:\01v96-remote`
   - Click "Next"

6. **Finish:**
   - Check "Open the Properties dialog"
   - Click "Finish"

7. **Configure Properties:**
   - **General Tab:**
     - ✅ Check "Run whether user is logged on or not"
     - ✅ Check "Run with highest privileges"
   
   - **Conditions Tab:**
     - ✅ Uncheck "Start the task only if the computer is on AC power"
   
   - **Settings Tab:**
     - ✅ Check "Allow task to be run on demand"
     - ✅ Check "Run task as soon as possible after a scheduled start is missed"
     - ✅ Check "If the task fails, restart every: 1 minute"
   
   - Click "OK"

8. **Test:**
   - Right-click the task
   - Select "Run"
   - Check if server starts at http://localhost:1337

### Method 2: Startup Folder (Simple)

For a simpler setup that runs when you log in:

1. **Create shortcut:**
   - Right-click `scripts/start-server.bat`
   - Select "Create shortcut"

2. **Move to Startup folder:**
   - Press `Win + R`
   - Type `shell:startup`
   - Press Enter
   - Move the shortcut here

3. **Test:**
   - Restart your computer
   - Server should start automatically

---

## 🐧 Linux Setup

### Method 1: Systemd Service (Recommended)

This is the standard way to run services on modern Linux.

#### Step 1: Prepare the Service File

1. **Edit the service file:**
   ```bash
   nano scripts/01v96-remote.service
   ```

2. **Update paths:**
   ```ini
   User=YOUR_USERNAME
   Group=YOUR_USERNAME
   WorkingDirectory=/path/to/01v96-remote
   ExecStart=/usr/bin/node /path/to/01v96-remote/server.js midi
   StandardOutput=append:/path/to/01v96-remote/logs/server.log
   StandardError=append:/path/to/01v96-remote/logs/server-error.log
   ```

#### Step 2: Install the Service

1. **Create logs directory:**
   ```bash
   mkdir -p ~/Documents/Projects/js/01v96-remote/logs
   ```

2. **Copy service file:**
   ```bash
   sudo cp scripts/01v96-remote.service /etc/systemd/system/
   ```

3. **Reload systemd:**
   ```bash
   sudo systemctl daemon-reload
   ```

4. **Enable the service:**
   ```bash
   sudo systemctl enable 01v96-remote.service
   ```

5. **Start the service:**
   ```bash
   sudo systemctl start 01v96-remote.service
   ```

6. **Check status:**
   ```bash
   sudo systemctl status 01v96-remote.service
   ```

#### Managing the Service

```bash
# Start
sudo systemctl start 01v96-remote

# Stop
sudo systemctl stop 01v96-remote

# Restart
sudo systemctl restart 01v96-remote

# View logs
sudo journalctl -u 01v96-remote -f

# Disable auto-start
sudo systemctl disable 01v96-remote
```

### Method 2: Cron Job (Alternative)

1. **Make script executable:**
   ```bash
   chmod +x scripts/start-server.sh
   ```

2. **Edit crontab:**
   ```bash
   crontab -e
   ```

3. **Add this line:**
   ```
   @reboot /path/to/01v96-remote/scripts/start-server.sh
   ```

4. **Save and exit**

---

## 🍎 macOS Setup

### Using LaunchAgent

#### Step 1: Prepare the plist File

1. **Edit the plist file:**
   ```bash
   nano scripts/com.01v96remote.plist
   ```

2. **Update paths:**
   - Replace `YourUsername` with your actual username
   - Update Node.js path if different
   - Update application path

#### Step 2: Install LaunchAgent

1. **Create logs directory:**
   ```bash
   mkdir -p ~/01v96-remote/logs
   ```

2. **Copy plist file:**
   ```bash
   cp scripts/com.01v96remote.plist ~/Library/LaunchAgents/
   ```

3. **Load the agent:**
   ```bash
   launchctl load ~/Library/LaunchAgents/com.01v96remote.plist
   ```

4. **Start immediately:**
   ```bash
   launchctl start com.01v96remote.server
   ```

#### Managing the Service

```bash
# Stop
launchctl stop com.01v96remote.server

# Unload (disable auto-start)
launchctl unload ~/Library/LaunchAgents/com.01v96remote.plist

# Reload (after changes)
launchctl unload ~/Library/LaunchAgents/com.01v96remote.plist
launchctl load ~/Library/LaunchAgents/com.01v96remote.plist

# View logs
tail -f ~/01v96-remote/logs/server.log
```

---

## 🔧 Configuration

### Connection Type

Edit the script to change the connection type:

**Windows (`start-server.bat`):**
```batch
set CONNECTION_TYPE=midi
```

**Linux/Mac (`start-server.sh` or service file):**
```bash
CONNECTION_TYPE="midi"
```

**Options:**
- `midi` - USB or MIDI port connection (default)
- `serialport` - Raspberry Pi serial port
- `dummy` - Testing mode without hardware

### Application Path

Make sure to update the application path in your script:

**Windows:**
```batch
set APP_DIR=C:\01v96-remote
```

**Linux:**
```bash
APP_DIR="/home/username/01v96-remote"
```

**macOS:**
```xml
<string>/Users/username/01v96-remote</string>
```

---

## 📋 Verification Checklist

After setup, verify everything works:

- [ ] Script runs manually without errors
- [ ] Server starts and is accessible at http://localhost:1337
- [ ] WebSocket connects at ws://localhost:1338
- [ ] Logs are being created in `logs/` directory
- [ ] Server restarts automatically after reboot
- [ ] MIDI/mixer connection works
- [ ] Web interface loads correctly

---

## 🔍 Troubleshooting

### Server Won't Start

**Check Node.js installation:**
```bash
node --version
npm --version
```

**Check if port is already in use:**
```bash
# Linux/Mac
lsof -i :1337
lsof -i :1338

# Windows
netstat -ano | findstr :1337
netstat -ano | findstr :1338
```

**Check logs:**
```bash
# Linux/Mac
tail -f logs/server.log

# Windows
type logs\server-*.log
```

### Permission Errors (Linux/Mac)

```bash
# Make script executable
chmod +x scripts/start-server.sh

# Check file ownership
ls -la scripts/

# Fix ownership if needed
chown $USER:$USER scripts/*
```

### MIDI Device Not Found

1. **Check device connection:**
   - Ensure mixer is powered on
   - Check USB/MIDI cable
   - Verify driver installation (Windows)

2. **Test MIDI connection:**
   ```bash
   # Linux
   aconnect -l
   
   # macOS
   ls /dev/cu.*
   ```

3. **Try dummy mode first:**
   - Change connection type to `dummy`
   - Verify server starts correctly
   - Then switch back to `midi`

### Service Won't Start on Boot

**Windows:**
- Check Task Scheduler logs
- Verify "Run whether user is logged on or not" is checked
- Ensure path is correct

**Linux:**
```bash
# Check service status
sudo systemctl status 01v96-remote

# View detailed logs
sudo journalctl -u 01v96-remote -n 50

# Check for errors
sudo systemctl --failed
```

**macOS:**
```bash
# Check if loaded
launchctl list | grep 01v96

# View system logs
log show --predicate 'process == "node"' --last 1h
```

---

## 📊 Monitoring

### View Logs in Real-Time

**Linux/Mac:**
```bash
tail -f logs/server.log
```

**Windows:**
```cmd
powershell Get-Content logs\server-*.log -Wait
```

### Check if Server is Running

**Linux/Mac:**
```bash
ps aux | grep "node server.js"
```

**Windows:**
```cmd
tasklist | findstr node.exe
```

### Test Web Interface

Open browser and navigate to:
- http://localhost:1337

You should see the channel selection page.

---

## 🔒 Security Considerations

### Firewall Rules

If accessing from other devices on the network:

**Windows:**
```cmd
netsh advfirewall firewall add rule name="01v96 Remote HTTP" dir=in action=allow protocol=TCP localport=1337
netsh advfirewall firewall add rule name="01v96 Remote WebSocket" dir=in action=allow protocol=TCP localport=1338
```

**Linux (ufw):**
```bash
sudo ufw allow 1337/tcp
sudo ufw allow 1338/tcp
```

**macOS:**
- System Preferences → Security & Privacy → Firewall
- Add Node.js to allowed applications

### Network Access

By default, the server listens on all interfaces. To restrict to localhost only, modify `server/controllers/static.js` and `server/controllers/socket.js`.

---

## 📝 Maintenance

### Update the Application

1. **Stop the service:**
   ```bash
   # Linux
   sudo systemctl stop 01v96-remote
   
   # macOS
   launchctl stop com.01v96remote.server
   
   # Windows
   # Stop via Task Scheduler or kill process
   ```

2. **Update files:**
   ```bash
   git pull
   npm install
   ```

3. **Restart the service:**
   ```bash
   # Linux
   sudo systemctl start 01v96-remote
   
   # macOS
   launchctl start com.01v96remote.server
   
   # Windows
   # Start via Task Scheduler or run script
   ```

### Log Rotation

Logs can grow large over time. Consider setting up log rotation:

**Linux (`/etc/logrotate.d/01v96-remote`):**
```
/home/username/01v96-remote/logs/*.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
}
```

---

## ✅ Success!

Once configured, your 01v96 Remote server will:
- ✅ Start automatically when computer boots
- ✅ Restart automatically if it crashes
- ✅ Log all activity for troubleshooting
- ✅ Be accessible at http://localhost:1337
- ✅ Connect to your mixer automatically

Your worship team can now rely on the system being ready whenever they need it! 🎵✨

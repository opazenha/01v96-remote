# Quick Start Guide for Church Setup

## 🎯 Goal
Set up the 01v96 Remote server to start automatically when the church computer boots up.

---

## 🪟 Windows (Most Common)

### Quick Setup (5 minutes)

1. **Edit the script:**
   - Open `scripts/start-server.bat` in Notepad
   - Change this line to match where you installed the app:
     ```
     set APP_DIR=C:\01v96-remote
     ```
   - Save and close

2. **Test the script:**
   - Double-click `scripts/start-server.bat`
   - A window should open showing the server starting
   - Open browser to http://localhost:1337
   - You should see the mixer interface

3. **Set up auto-start:**
   - Press `Win + R`
   - Type `taskschd.msc` and press Enter
   - Click "Create Basic Task"
   - Name: `01v96 Remote Server`
   - Trigger: "When the computer starts"
   - Action: "Start a program"
   - Browse to: `C:\01v96-remote\scripts\start-server.bat`
   - Finish!

4. **Test:**
   - Restart computer
   - Server should start automatically
   - Open http://localhost:1337

**Done!** ✅

---

## 🐧 Linux

### Quick Setup (2 minutes)

1. **Run the setup script:**
   ```bash
   cd /path/to/01v96-remote
   ./scripts/setup-autostart.sh
   ```

2. **Follow the prompts:**
   - Script will detect your system
   - Enter your password when asked (sudo)
   - Choose "y" to start the service now

3. **Test:**
   - Open browser to http://localhost:1337
   - Restart computer to verify auto-start

**Done!** ✅

---

## 🍎 macOS

### Quick Setup (2 minutes)

1. **Run the setup script:**
   ```bash
   cd /path/to/01v96-remote
   ./scripts/setup-autostart.sh
   ```

2. **Follow the prompts:**
   - Script will create LaunchAgent
   - Service starts automatically

3. **Test:**
   - Open browser to http://localhost:1337
   - Restart computer to verify auto-start

**Done!** ✅

---

## 📱 Accessing from Phones/Tablets

Once the server is running on the church computer:

1. **Find the computer's IP address:**
   - Windows: Open Command Prompt, type `ipconfig`
   - Linux/Mac: Open Terminal, type `ifconfig` or `ip addr`
   - Look for something like `192.168.1.100`

2. **On your phone/tablet:**
   - Open browser
   - Go to: `http://192.168.1.100:1337`
   - (Replace with your actual IP address)

3. **Bookmark it!**
   - Save the link for easy access during services

---

## 🔧 Common Issues

### "Cannot connect to server"

**Check if server is running:**
- Windows: Look for "01v96 Remote Server" window
- Linux: `sudo systemctl status 01v96-remote`
- Mac: `launchctl list | grep 01v96`

**Restart the server:**
- Windows: Run `scripts/start-server.bat` again
- Linux: `sudo systemctl restart 01v96-remote`
- Mac: `launchctl stop com.01v96remote.server && launchctl start com.01v96remote.server`

### "MIDI device not found"

1. Make sure the Yamaha mixer is:
   - ✅ Powered on
   - ✅ Connected via USB or MIDI cable
   - ✅ Configured correctly (see main README.md)

2. Try dummy mode first:
   - Edit the script
   - Change `midi` to `dummy`
   - Test that the interface works
   - Then switch back to `midi`

### "Port already in use"

Another program is using port 1337 or 1338.

**Windows:**
```cmd
netstat -ano | findstr :1337
taskkill /F /PID [PID_NUMBER]
```

**Linux/Mac:**
```bash
lsof -ti:1337 | xargs kill -9
```

---

## 📋 Pre-Service Checklist

Before each service, verify:

- [ ] Church computer is on
- [ ] Mixer is powered on and connected
- [ ] Open http://localhost:1337 on the computer
- [ ] Interface loads correctly
- [ ] Test one fader to verify connection
- [ ] Share the link with worship team members
- [ ] Everyone can access from their phones

---

## 🎵 Using During Service

### For Worship Team Members

1. **Open the app on your phone:**
   - Go to the bookmarked link
   - Select your channel (e.g., "AUX 1")

2. **Adjust your monitor mix:**
   - Swipe left/right to see different channels
   - Use +/- buttons to adjust levels
   - Watch for yellow (⚠) and red (!) warnings

3. **Warning colors:**
   - 🟢 Blue = Good
   - 🟡 Yellow = Getting loud, be careful
   - 🔴 Red = Too loud! Turn down immediately

### For Sound Engineer

1. **Monitor all channels:**
   - Use the main computer or tablet
   - Switch between channel groups (CH 1-16, CH 17-32, etc.)
   - Watch for warning indicators

2. **Help team members:**
   - If someone's mix sounds bad, check their levels
   - Make sure no channels are in the red zone
   - Adjust master levels if needed

---

## 💾 Backup & Recovery

### Save Your Configuration

The app saves channel names and groups in:
- `config/` folder

**Backup this folder regularly!**

### If Something Goes Wrong

1. **Restart the server:**
   - See "Common Issues" section above

2. **Check the logs:**
   - Windows: `logs\server-*.log`
   - Linux/Mac: `logs/server.log`

3. **Reinstall if needed:**
   - Keep your `config/` folder
   - Download fresh copy
   - Replace `config/` folder
   - Run setup again

---

## 📞 Getting Help

### Check Documentation

- `README.md` - Main documentation
- `AUTO-START-SETUP.md` - Detailed setup guide
- `QUICK-GUIDE-WARNINGS.md` - Warning system guide
- `MOBILE-SCROLLING.md` - Mobile usage tips

### Test in Dummy Mode

If you're having issues, test without the mixer:

1. Edit your startup script
2. Change `midi` to `dummy`
3. Restart the server
4. Test the interface
5. This helps identify if it's a mixer issue or app issue

---

## ✅ Success Checklist

Your setup is complete when:

- [ ] Server starts automatically when computer boots
- [ ] Web interface loads at http://localhost:1337
- [ ] Mixer connection works (faders move, levels update)
- [ ] Team members can access from their phones
- [ ] Warning system shows yellow/red alerts
- [ ] +/- buttons work correctly
- [ ] Horizontal scrolling works on mobile
- [ ] Configuration is saved between restarts

---

## 🎉 You're Ready!

Your church now has a professional, mobile-friendly mixer control system that:
- ✅ Starts automatically
- ✅ Works on any device
- ✅ Prevents audio distortion
- ✅ Empowers your worship team
- ✅ Makes mixing easier for everyone

**Enjoy better sound at your services!** 🎵✨

---

## Quick Reference

### Server URLs
- **Local:** http://localhost:1337
- **Network:** http://[COMPUTER-IP]:1337

### Ports Used
- **HTTP:** 1337
- **WebSocket:** 1338

### Connection Types
- **midi** - Normal operation (USB/MIDI)
- **serialport** - Raspberry Pi GPIO
- **dummy** - Testing without mixer

### Important Folders
- **scripts/** - Startup scripts
- **logs/** - Server logs
- **config/** - Saved settings (backup this!)

### Need Help?
- Check logs in `logs/` folder
- Test in dummy mode
- Read full documentation
- Restart the server

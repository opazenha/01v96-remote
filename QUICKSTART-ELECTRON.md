# Quick Start Guide - Electron Version

## 1. Install Dependencies

```bash
npm install
```

This will install both the application dependencies and Electron.

## 2. Run the Application

### Option A: Using npm (Recommended)

```bash
# Run with MIDI connection (default)
npm start

# Run with dummy mode (for testing without hardware)
npm start dummy

# Run with serial port (Raspberry Pi)
npm start serialport
```

### Option B: Using the launcher script (Linux/Mac)

```bash
# Make the script executable (first time only)
chmod +x electron-dev.sh

# Run with default MIDI connection
./electron-dev.sh

# Run with dummy mode
./electron-dev.sh dummy
```

## 3. First Time Setup

### Configure your 01v96 Mixer

1. Press **DIO/SETUP** button → **MIDI/HOST** tab
2. Set *Rx PORT* and *Tx PORT* to **1**
3. Set port type to **USB** or **MIDI**
4. Press **MIDI** button → **SETUP** tab
5. Set *Tx* and *Rx CHANNEL* to **1**
6. Set *PARAMETER CHANGE* to **ON** (both Tx and Rx)
7. Set *Fader Resolution* to **LOW**

### Connect your Mixer

- **USB**: Connect via USB cable (driver required on Windows)
- **MIDI**: Connect via MIDI interface
- **Serial Port**: For Raspberry Pi GPIO connection

## 4. Using the Application

Once the app starts:

1. The server will automatically start in the background
2. The application window will open after ~2 seconds
3. You'll see the mixer interface
4. Click the gear icon (⚙️) to configure channel names and groups

### Keyboard Shortcuts

- **Ctrl/Cmd + R**: Reload
- **Ctrl/Cmd + Shift + I**: Developer Tools
- **Ctrl/Cmd + Q**: Quit
- **Ctrl/Cmd + Plus/Minus**: Zoom In/Out
- **Ctrl/Cmd + 0**: Reset Zoom

## 5. Testing Without Hardware

To test the application without a physical mixer:

```bash
npm start dummy
```

This will simulate a mixer with moving faders and changing levels.

## 6. Building for Distribution

### Build for your current platform

```bash
npm run build
```

### Build for specific platforms

```bash
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

Built applications will be in the `dist/` folder.

## Troubleshooting

### "Cannot find module 'electron'"

Run `npm install` to install dependencies.

### "MIDI device not found"

- Ensure the mixer is powered on and connected
- Check that no other application is using the MIDI device
- Try running in dummy mode first: `npm start dummy`

### Application window is blank

- Check the console for errors
- Try reloading with Ctrl/Cmd + R
- The server may need more time to start (it auto-retries)

### Permission errors (Linux)

You may need to add your user to the audio group:

```bash
sudo usermod -a -G audio $USER
```

Then log out and log back in.

## Need More Help?

See the full documentation in [ELECTRON.md](ELECTRON.md)

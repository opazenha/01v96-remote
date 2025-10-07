# 01v96 Remote - Electron Desktop Application

This is the Electron desktop application version of 01v96 Remote.

## Installation

First, install the dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

To run the application in development mode:

```bash
npm start
```

By default, this will use the **midi** connection type. To use a different connection type, you can pass it as an argument:

```bash
# For serial port connection (Raspberry Pi)
npm start serialport

# For dummy/testing mode
npm start dummy
```

### Connection Types

- **midi** (default) - Uses the standard MIDI protocol for MIDI ports and USB connections
- **serialport** - Connects through the serial port on `/dev/ttyAMA0` (for Raspberry Pi)
- **dummy** - Test mode without a real mixer, simulates changing fader levels

## Building the Application

### Build for All Platforms

```bash
npm run build
```

### Build for Specific Platforms

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

The built applications will be in the `dist` folder.

## Features

The Electron app includes:

- **Native Desktop Application** - Runs as a standalone desktop app
- **Built-in Server** - No need to run a separate server process
- **Application Menu** - Standard menu with File, View, and Help options
- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + R` - Reload the application
  - `Ctrl/Cmd + Shift + I` - Toggle Developer Tools
  - `Ctrl/Cmd + Q` - Quit the application
  - `Ctrl/Cmd + Plus/Minus/0` - Zoom In/Out/Reset
- **Auto-reconnect** - Automatically attempts to reconnect if the server isn't ready

## Requirements

### MIDI Connection (USB or MIDI Port)

- **Windows**: Install the Yamaha USB-MIDI driver from [Yamaha Pro Audio Downloads](http://www.yamahaproaudio.com/global/en/downloads/firmware_software/)
- **Linux**: Ensure `libasound2-dev` package is installed for ALSA support
- **macOS**: Should work out of the box with USB-MIDI

### Serial Port Connection (Raspberry Pi)

For Raspberry Pi GPIO serial port connections, see the documentation in `raspberry/documentation.md`.

## 01v96 MIDI Configuration

Before using the application, configure your 01v96 mixer:

1. Press the **DIO/SETUP** button and go to the **MIDI/HOST** tab
2. In the *GENERAL* area set both *Rx PORT* and *Tx PORT* to *1*
3. Set the port type to *USB* or *MIDI* depending on your connection
4. Press the **MIDI** button and go to the **SETUP** tab
5. Set both the *Tx* and *Rx CHANNEL* to *1*
6. Set *Tx* and *Rx* in the *PARAMETER CHANGE* row to *ON*, all other options to *OFF*
7. Set *Fader Resolution* to *LOW*

## Troubleshooting

### Application won't start

- Make sure your 01v96 mixer is connected and powered on
- Check that the MIDI configuration on the mixer is correct
- Try running in dummy mode first: `npm start dummy`

### Connection issues

- Check the console output for error messages
- Verify that no other application is using the MIDI device
- On Linux, ensure you have proper permissions for the MIDI device

### Building issues

- Make sure you have all native dependencies installed
- On Windows, you may need Python 2.x and Visual Studio Build Tools
- On Linux, ensure you have build-essential and libasound2-dev installed

## Development

To run the original Node.js server without Electron:

```bash
npm run start-server
```

Then access the web interface at `http://localhost:1337`

## License

MIT License - See LICENSE file for details

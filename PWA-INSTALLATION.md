# 01v96 Remote - PWA Installation Guide

## What is a PWA?

A Progressive Web App (PWA) is a web application that can be installed on your mobile device just like a native app. This means your worship team can have quick access to the 01v96 Remote mixer control right from their home screen.

## Installation Instructions

### On Android Devices

1. Open Chrome or Samsung Internet browser
2. Navigate to your 01v96 Remote server URL (e.g., http://your-server-ip:1337)
3. Tap the menu button (three dots) in the top-right corner
4. Select "Add to Home screen" or "Install app"
5. Confirm by tapping "Add" or "Install"
6. The app will now appear on your home screen

### On iOS Devices (iPhone/iPad)

1. Open Safari browser
2. Navigate to your 01v96 Remote server URL (e.g., http://your-server-ip:1337)
3. Tap the Share button (square with arrow) at the bottom of the screen
4. Scroll down and tap "Add to Home Screen"
5. Edit the name if desired (default is "01v96 Remote")
6. Tap "Add" in the top-right corner
7. The app will now appear on your home screen

## Benefits of Installing as a PWA

- Faster access from your home screen
- Works offline (basic functionality)
- No browser UI elements for a more app-like experience
- Automatic updates when connected to the server

## Troubleshooting

### "Add to Home Screen" option not appearing

- Make sure you're using a supported browser (Chrome/Samsung Internet on Android, Safari on iOS)
- Ensure you've connected to the server at least once with an internet connection
- Try refreshing the page and waiting a few seconds
- Check that your server is accessible and not showing connection errors

### App not working offline

- The first time you install, make sure you have a stable internet connection
- Try opening the app once while connected to cache all necessary files
- Note: WebSocket connections require network connectivity, so full mixer control won't work offline

### Icon not displaying correctly

- The app may need a moment to load the icon after installation
- Try restarting your device if the issue persists

## Server Requirements

- Ensure your server is running on port 1337 (default)
- The device installing the PWA must be able to connect to your server
- For best results, use a secure connection (HTTPS) if available

## For Administrators

To enable the best PWA experience:

1. Ensure your server is accessible from your network
2. Consider setting up a static IP or DNS name for easier access
3. Test the installation process yourself before rolling out to your team
4. Provide this guide to your worship team members

## Technical Details

- The PWA manifest is located at `/manifest.json`
- Service worker is located at `/sw.js`
- Cached files include all necessary UI elements
- WebSocket connections are not cached and require network connectivity

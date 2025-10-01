const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { fork } = require('child_process');

let mainWindow;
let serverProcess;

console.log('\n\n=== 01v96 Remote Electron App by Michael Strobel ===\n\n');

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, 'client/img/favicon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false
        },
        title: '01v96 Remote',
        backgroundColor: '#1a1a1a'
    });

    // Create application menu
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => {
                        mainWindow.reload();
                    }
                },
                {
                    label: 'Toggle DevTools',
                    accelerator: 'CmdOrCtrl+Shift+I',
                    click: () => {
                        mainWindow.webContents.toggleDevTools();
                    }
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Zoom In',
                    accelerator: 'CmdOrCtrl+Plus',
                    click: () => {
                        const currentZoom = mainWindow.webContents.getZoomLevel();
                        mainWindow.webContents.setZoomLevel(currentZoom + 1);
                    }
                },
                {
                    label: 'Zoom Out',
                    accelerator: 'CmdOrCtrl+-',
                    click: () => {
                        const currentZoom = mainWindow.webContents.getZoomLevel();
                        mainWindow.webContents.setZoomLevel(currentZoom - 1);
                    }
                },
                {
                    label: 'Reset Zoom',
                    accelerator: 'CmdOrCtrl+0',
                    click: () => {
                        mainWindow.webContents.setZoomLevel(0);
                    }
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: () => {
                        const aboutWindow = new BrowserWindow({
                            width: 400,
                            height: 300,
                            parent: mainWindow,
                            modal: true,
                            show: false,
                            webPreferences: {
                                nodeIntegration: true,
                                contextIsolation: false
                            }
                        });
                        aboutWindow.loadURL(`data:text/html;charset=utf-8,
                            <html>
                                <head>
                                    <style>
                                        body {
                                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                                            padding: 20px;
                                            text-align: center;
                                            background: #1a1a1a;
                                            color: #fff;
                                        }
                                        h1 { margin-top: 20px; }
                                        p { margin: 10px 0; }
                                    </style>
                                </head>
                                <body>
                                    <h1>01v96 Remote</h1>
                                    <p>Version 1.1.0</p>
                                    <p>by Michael Strobel</p>
                                    <p>WebSocket-MIDI bridge for Yamaha 01v96 Edit</p>
                                    <p style="margin-top: 30px; font-size: 12px;">MIT License</p>
                                </body>
                            </html>
                        `);
                        aboutWindow.once('ready-to-show', () => {
                            aboutWindow.show();
                        });
                        aboutWindow.setMenu(null);
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // Wait a bit for the server to start before loading the page
    setTimeout(() => {
        mainWindow.loadURL('http://localhost:1337');
    }, 2000);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Handle page load errors
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error('Failed to load:', errorDescription);
        if (errorCode === -102) { // Connection refused
            setTimeout(() => {
                mainWindow.loadURL('http://localhost:1337');
            }, 1000);
        }
    });
}

function startServer() {
    // Get connection type from command line args or default to 'midi'
    const args = process.argv.slice(2);
    const connectionType = args[0] || 'midi';

    console.log(`Starting server with connection type: ${connectionType}`);

    // Fork the server process
    serverProcess = fork(path.join(__dirname, 'server.js'), [connectionType], {
        stdio: 'inherit',
        cwd: __dirname
    });

    serverProcess.on('error', (err) => {
        console.error('Failed to start server:', err);
    });

    serverProcess.on('exit', (code, signal) => {
        console.log(`Server process exited with code ${code} and signal ${signal}`);
        serverProcess = null;
    });
}

function stopServer() {
    if (serverProcess) {
        console.log('Stopping server...');
        serverProcess.kill();
        serverProcess = null;
    }
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
    startServer();
    createWindow();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        stopServer();
        app.quit();
    }
});

app.on('before-quit', () => {
    stopServer();
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});

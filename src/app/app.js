const {app, BrowserWindow, Menu, Tray} = require('electron');
const path = require('path');
const url = require('url');

const icon = path.join(__dirname, 'img', 'android-chrome-512x512.png');

let win;

function createWindow() {
  win = new BrowserWindow({
    autoHideMenuBar: true,
    height: 600,
    icon: icon,
    minHeight: 450,
    minWidth: 600,
    title: process.env.npm_package_meta_name,
    width: 800
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

let tray = null;

app.on('ready', () => {
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {label: 'Exit', click: () => app.quit()}
  ]);

  tray.setToolTip('Great and Powerful Og');
  tray.setContextMenu(contextMenu);
});

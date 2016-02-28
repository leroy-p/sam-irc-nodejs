'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});


app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 450, height: 450, frame: false});
  mainWindow.loadURL('http://localhost:8080/');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

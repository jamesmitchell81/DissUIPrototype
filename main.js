var app = require('app');
var BrowserWindow = require('browser-window');
var fs = require('fs');
var path = require('path');
var ipc = require('ipc');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

ipc.on('change-page', function(event, args) {
  if ( !mainWindow ) return;
  var page = path.join("/src", "html", args);
  mainWindow.loadUrl('file://' + __dirname + page);

});

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  var page;

  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    'title-bar-style': 'hidden-inset'
  });
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  var page = mainWindow.webContents;

  page.on('dom-ready', function() {
    page.insertCSS(fs.readFileSync(path.join(__dirname, '_css', 'main.css'), 'utf-8'));
    mainWindow.show();
  });

  mainWindow.on('closed', function() {
    // Clean up
    mainWindow = null;
  });
});
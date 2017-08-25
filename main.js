'use strict';

// *Getting the needed modules:
const path = require('path');
const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;


/**
 * The main window frame
 * @type {BrowserWindow}
 */
let win = null;



/**
 * Window configurations
 * @type {Object}
 */
const settings = {
   display: {
      width: 768,
      height: 810
   },
   address: 'file://' + path.join(__dirname, './index.html')
};



// *When a second instance of this app is started:
const is_second_instance = app.makeSingleInstance((argv, wd) => {
   // *Checking if the main window is set:
   if(win){
      // *If it is:
      // *Restoring it if it's minimized:
      if(win.isMinimized())
         win.restore();
      // *Focusing the main window:
      win.focus();
   }
});

// *Quitting the application if this is the second instance:
if(is_second_instance)
  app.quit();



// *Creating the window frame when electron gets ready:
app.on('ready', () => createWindow(settings));



// *When all windows get closed:
app.on('window-all-closed', () => {
   // *Quitting the application if the OS isn't a Macintosh:
   if(process.platform !== 'darwin')
      app.quit();
});



// *When user re-focus the application:
app.on('activate', () => {
   // *Checking if windows reference is lost:
   if(win === null){
      // *If it is:
      // *Creates the window again:
      createWindow(settings);
   }
});



/**
 * Creates a new window frame
 */
function createWindow(settings){

   // *Setting up the window frame:
   win = new BrowserWindow({
      width: settings.display.width,
      height: settings.display.height,
      backgroundColor: settings.display.color,
      show: false
   });

   // *Removing the window reference when it gets closed:
   win.once('closed', () => win = null);

   // *Displaying the window frame when it gets ready to be shown:
   win.once('ready-to-show', () => win.show());

   // *Removing the default toolbar:
   //win.setMenu(null);

   // *Loading the html file:
   win.loadURL(settings.address);
}

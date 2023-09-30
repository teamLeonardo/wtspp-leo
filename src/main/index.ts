

import os from "os"
import path, { join } from 'path'

import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import log from "electron-log"
import Store from 'electron-store';

import puppeteer from 'puppeteer-core'
import pie from 'puppeteer-in-electron'

import icon from '../../resources/icon.png?asset'
import { connectToWhatsApp } from "./webWtspp"


app.commandLine.appendSwitch('remote-debugging-port', '8315')

const store = new Store({ watch: true });

let mainWindow;
let unsubscribe;
function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 960,
    height: 770,
    resizable: false,
    show: false,
    center: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });
  mainWindow.setMaxListeners(20);
  log.info('La aplicacion se ha iniciado.');
  log.transports.file.level = 'debug'; // Establece el nivel de registro (puedes ajustarlo según tus necesidades)
  log.transports.file.resolvePath = () => {
    return path.join(os.homedir(), 'Documents', "userData", "my-app.log")
  }
  // mainWindow.webContents.openDevTools();

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.on('closed', function () {
    mainWindow = null
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  });

  // IPC listener
  ipcMain.on('electron-store-get', async (event, val) => {
    event.returnValue = store.get(val);
  });

  ipcMain.on('electron-store-set', async (_, key, val) => {
    store.set(key, val);
  });

  unsubscribe = store.onDidChange("listTemplate", (newValue) => {
    mainWindow?.webContents.send('listTemplate', newValue);
  });

  mainWindow.webContents.on("did-finish-load", async () => {

    try {
      const pieBrowser = await pie.connect(app, (puppeteer as any))
      connectToWhatsApp(pieBrowser, mainWindow, store)
    } catch (error) {
      console.log(error);
      log.info('Pi .', error);
      process.exit()
    }

  });
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
      unsubscribe()
      app.quit();
      process.exit();
    }
  });
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})






// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

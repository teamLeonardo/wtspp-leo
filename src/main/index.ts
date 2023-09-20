

import puppeteer from 'puppeteer-core'
import pie from 'puppeteer-in-electron'

import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import os from "os"
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import qrcode from "qrcode"
import { MongoStore } from 'wwebjs-mongo'
import mongoose from 'mongoose'
import { Client, RemoteAuth } from "whatsapp-web-electron.js";
import log from "electron-log"
let mainWindow;
const uri = "mongodb+srv://leonardosm314:NpZIX75F6FVDBvi9@cluster0.n4km1of.mongodb.net/?retryWrites=true&w=majority";


async function connectToWhatsApp(store: any, pieBrowser) {
  log.info('OPEN function!');
  try {


    const client = new Client(pieBrowser, mainWindow, {
      authStrategy: new RemoteAuth({
        store: store,
        dataPath: path.join(os.homedir(), 'Documents', "authcacheLeoWtspp"),
        backupSyncIntervalMs: 300000
      }),
      puppeteer: {
        headless: true
      },
      webVersionCache: {
        path: path.join(os.homedir(), 'Documents', "cacheLeoWtspp"),
        type: "local"
      }
    });

    client.on("qr", (qr) => {
      log.info('qr qr qr');
      if (typeof qr === "string") {
        qrcode.toDataURL(qr, (_, url) => {
          mainWindow.webContents.send('qr', { qr: url });
        });
      }
    });
    client.on("authenticated", () => {
      log.info('authenticated');
      console.log("AUTH!");
    });

    client.on("auth_failure", () => {
      console.log("AUTH Failed !");
      log.info('AUTH Failed !');
      process.exit();
    });

    client.on("ready", () => {
      console.log("ready");
      log.info('ready');
      mainWindow.webContents.send('ready', true);
    });

    client.on("disconnected", () => {
      log.info('disconnected');
      console.log("disconnected");
    });
    ipcMain.handle("getWtspp", async (_, ...args) => {
      return await client[args[0]](args[1])
    })

    client.initialize();
  } catch (error) {
    console.log(error);

    log.info('errorCatch', error);
  }

}

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
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
  })
  log.transports.file.level = 'debug'; // Establece el nivel de registro (puedes ajustarlo según tus necesidades)
  log.transports.file.resolvePath = () => {
    return path.join(os.homedir(), 'Documents', "userData", "my-app.log")
  }
  // mainWindow.webContents.openDevTools();

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

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
  log.info('La aplicacion se ha iniciado.');
  mongoose.connect(uri).then(() => {
    const store = new MongoStore({ mongoose });
    app.commandLine.appendSwitch('remote-debugging-port', '9222')
    log.info('ok mongo.');
    pie.connect(app, (puppeteer as any)).then((pieBrowser) => {
      log.info('ok pie.');
      connectToWhatsApp(store, pieBrowser)
    }).catch(()=>{
      log.info('Error pie.');
    });
  }).catch(()=>{
    log.info('Error mongo.');
  });
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits

// ipcMain.on('init-wtspp', async (e, opt) => {
//   // const data = await TodoService.handleTodoFormSubmit(opt);
//   // mainWindow.webContents.send('task:added', { task: data });
// });
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})




// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

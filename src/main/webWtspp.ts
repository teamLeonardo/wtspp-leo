import { Client, RemoteAuth } from "whatsapp-web-electron.js";
import qrcode from "qrcode"
import { BrowserWindow, ipcMain } from "electron";
import log from "electron-log"
// import path from "path";
// import os from "os"

export async function connectToWhatsApp(store: any, pieBrowser, mainWindow: BrowserWindow) {
    log.info('OPEN function!');
    try {
        let wtsppWindow: any = new BrowserWindow({ show: false });

        const client = new Client(pieBrowser, wtsppWindow, {
            authStrategy: new RemoteAuth({
                store: store,
                backupSyncIntervalMs: 300000
            }),
            puppeteer: {
                headless: true
            },
            // webVersionCache: {
            //     path: path.join(os.homedir(), 'Documents', "cacheLeoWtspp"),
            //     type: "local"
            // }
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

        mainWindow.on('closed', function () {
            wtsppWindow.close()
            wtsppWindow = null
        });
    } catch (error) {
        console.log(error);
        log.info('errorCatch', error);
    }

}
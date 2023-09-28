import { Client, LocalAuth } from "whatsapp-web-electron.js";
import qrcode from "qrcode"
import { BrowserWindow, ipcMain } from "electron";
import log from "electron-log"
// import path from "path";
// import os from "os"

export async function connectToWhatsApp(pieBrowser, mainWindow: BrowserWindow | null) {
    try {
        let wtsppWindow: any = new BrowserWindow({ show: false });

        const client = new Client(pieBrowser, wtsppWindow, {
            authStrategy: new LocalAuth(),
            puppeteer: {
                headless: true
            },
        });

        client.on("qr", (qr) => {
            if (typeof qr === "string") {
                qrcode.toDataURL(qr, (_, url) => {
                    mainWindow?.webContents.send('qr', { qr: url });
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
            mainWindow?.webContents.send('ready', true);
        });

        client.on("disconnected", () => {
            log.info('disconnected');
            console.log("disconnected");
            wtsppWindow.destroy();
            mainWindow?.close()
            mainWindow = null
        });
        ipcMain.handle("getWtspp", async (_, ...args) => {
            try {
                const [nameFunction, ...restoParametros] = args
                return await client[nameFunction](...restoParametros)
            } catch (error) {
                console.log(error);
                
                return error
            }
        })

        client.initialize();

        mainWindow?.on('closed', function () {
            wtsppWindow.close()
            wtsppWindow.destroy();
            wtsppWindow = null
        });
    } catch (error) {
        console.log(error);
        log.info('errorCatch', error);
    }

}
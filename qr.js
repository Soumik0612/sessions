const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
function removeFile(FilePath) {
        if (!fs.existsSync(FilePath)) return false;
        fs.rmSync(FilePath, {
                recursive: true,
                force: true
        })
};
const {
        readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
        const id = makeid();
        async function JUNEX_QR_CODE() {
                try {
                        const {
                                default: Junex,
                                useMultiFileAuthState,
                                Browsers,
                                delay,
                        } = await import('@whiskeysockets/baileys');
                const {
                        state,
                        saveCreds
                } = await useMultiFileAuthState('./temp/' + id)
                        let JunexSocket = Junex({
                                auth: state,
                                printQRInTerminal: false,
                                logger: pino({
                                        level: "silent"
                                }),
                                browser: Browsers.macOS("Desktop"),
                        });

                        JunexSocket.ev.on('creds.update', saveCreds)
                        JunexSocket.ev.on("connection.update", async (s) => {
                                const {
                                        connection,
                                        lastDisconnect,
                                        qr
                                } = s;
                                if (qr) await res.end(await QRCode.toBuffer(qr));
                                if (connection == "open") {
                                        await delay(5000);
                                        let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                                        await delay(800);
                                   let b64data = Buffer.from(data).toString('base64');
                                   let session = await JunexSocket.sendMessage(JunexSocket.user.id, { text: 'June-X:-' + b64data });

                                   let JUNEX_SESSION_TEXT = `
╔════════════════════◇
║『 SESSION CONNECTED』
╚════════════════════╝


---

╔════════════════════◇
║『 YOU'VE CHOSEN Dave session』
║ -Set the session ID in Heroku:
║ - SESSION_ID: 
╚════════════════════╝
𒂀 Enjoy VolTah MD


---

Don't Forget To Give Star⭐ To My Repo
______________________________`;
         await JunexSocket.sendMessage(JunexSocket.user.id,{text:JUNEX_SESSION_TEXT},{quoted:session})



                                        await delay(100);
                                        await JunexSocket.ws.close();
                                        return await removeFile("temp/" + id);
                                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                                        await delay(10000);
                                        JUNEX_QR_CODE();
                                }
                        });
                } catch (err) {
                        if (!res.headersSent) {
                                await res.json({
                                        code: "Service is Currently Unavailable"
                                });
                        }
                        console.log(err);
                        await removeFile("temp/" + id);
                }
        }
        return await JUNEX_QR_CODE()
});
module.exports = router

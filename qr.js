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
        async function ARCEUS_QR_CODE() {
                try {
                        const {
                                default: Arceus,
                                useMultiFileAuthState,
                                Browsers,
                                delay,
                        } = await import('@whiskeysockets/baileys');
                const {
                        state,
                        saveCreds
                } = await useMultiFileAuthState('./temp/' + id)
                        let ArceusSocket = Arceus({
                                auth: state,
                                printQRInTerminal: false,
                                logger: pino({
                                        level: "silent"
                                }),
                                browser: Browsers.macOS("Desktop"),
                        });

                        ArceusSocket.ev.on('creds.update', saveCreds)
                        ArceusSocket.ev.on("connection.update", async (s) => {
                                const {
                                        connection,
                                        lastDisconnect,
                                        qr
                                } = s;
                                if (qr && !res.headersSent) {
                                        res.type('png').set('Cache-Control', 'no-store, private').send(await QRCode.toBuffer(qr));
                                }
                                if (connection == "open") {
                                        await delay(5000);
                                        let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                                        await delay(800);
                                   let b64data = Buffer.from(data).toString('base64');
                                   let session = await JunexSocket.sendMessage(ArceusSocket.user.id, { text: 'Arceus-XD:-' + b64data });

                                   let ARCEUS_SESSION_TEXT = `
╔════════════════════◇
║『 SESSION CONNECTED』
╚════════════════════╝


---

╔════════════════════◇
║『 YOU'VE CHOSEN Arceus session』
║ -Set the session ID in Heroku:
║ - SESSION_ID: 
╚════════════════════╝
𒂀 Enjoy ARCEUS XD


---

Don't Forget To Give Star⭐ To My Repo
______________________________`;
         await ArceusSocket.sendMessage(ArceusSocket.user.id,{text:ARCEUS_SESSION_TEXT},{quoted:session})



                                        await delay(100);
                                        await ArceusSocket.ws.close();
                                        return await removeFile("temp/" + id);
                                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                                        await delay(10000);
                                        ARCEUS_QR_CODE();
                                }
                        });
                } catch (err) {
                        if (!res.headersSent) {
                                res.status(503).json({
                                        code: "Service is Currently Unavailable"
                                });
                        }
                        console.log(err);
                        await removeFile("temp/" + id);
                }
        }
        return await ARCEUS_QR_CODE()
});
module.exports = router

const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function ARCEUS_PAIR_CODE() {
        try {
            const {
                default: Arceus,
                useMultiFileAuthState,
                delay,
                makeCacheableSignalKeyStore,
                Browsers
            } = await import('@whiskeysockets/baileys');
            const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
            let ArceusSocket = Arceus({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),            
                browser: Browsers.macOS('Chrome')
            });

            if (!ArceusSocket.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await ArceusSocket.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            ArceusSocket.ev.on('creds.update', saveCreds);
            ArceusSocket.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === 'open') {
                     await delay(6000);

                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(8000);
                    let b64data = Buffer.from(data).toString('base64');

                    let session = await ArceusSocket.sendMessage(
                        ArceusSocket.user.id,
                        { text: 'ARCEUS-XD:-' + b64data }
                    );

                    let ARCEUS_SESSION_TEXT = `✅session paired siccesfully\n⚙️Type: Base64\nstatus: 🟢online`;
                    
                    await ArceusSocket.newsletterFollow("120363400224487887@newsletter");

                    await ArceusSocket.sendMessage(ArceusSocket.user.id, { text: ARCEUS_SESSION_TEXT }, { quoted: session });

                    await delay(100);
                    await ArceusSocket.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    ARCEUS_PAIR_CODE();
                }
            });
        } catch (err) {
            console.error('Arceus pairing-code generation failed:', err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                res.status(503).json({ code: 'Service Currently Unavailable' });
            }
        }
    }

    return await ARCEUS_PAIR_CODE();
});

module.exports = router;

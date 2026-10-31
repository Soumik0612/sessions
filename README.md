<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f2027,50:203a43,100:2c5364&height=200&section=header&text=JuneX%20Session&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=WhatsApp%20Session%20ID%20Generator%20for%20JuneX%20Ultra&descAlignY=58&descSize=16" width="100%" />

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Baileys](https://img.shields.io/badge/Baileys-WhiskeySockets-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Stars](https://img.shields.io/github/stars/Vinpink2/sessions?style=for-the-badge&color=2c5364)
![Forks](https://img.shields.io/github/forks/Vinpink2/sessions?style=for-the-badge&color=203a43)

**Pair your WhatsApp number and get a session ID in seconds, ready to plug into [JuneX Ultra](https://github.com/Vinpink2/June-Ultra).**

</div>

---

## ✨ Features

- 🔗 **Pairing code login**: no QR scanning, just enter your number and link
- ⚡ **Fast session generation**: the session ID is sent straight to your WhatsApp chat
- 🧩 **Made for JuneX Ultra**: the generated session works directly with the bot
- 🪶 **Lightweight**: minimal dependencies, runs on free-tier hosts
- 🔒 **Private delivery**: your session is sent to you, not displayed publicly
- 🚀 **One-click deploy** on Heroku, Render, and Koyeb

---

## 📖 How It Works

1. Open the session page (your deployed URL).
2. Enter your WhatsApp number with country code, e.g. `2547XXXXXXXX`, with no `+` or spaces.
3. A **pairing code** appears on the page.
4. On your phone, open **WhatsApp → Settings → Linked Devices → Link a Device → Link with phone number instead**.
5. Enter the pairing code.
6. Your **session ID** is sent to your own WhatsApp chat.
7. Copy it and set it as `SESSION_ID` in your JuneX Ultra deployment.

> ⚠️ **Never share your session ID.** Anyone who has it can control your WhatsApp account.

---

## 🚀 Deploy

Deploy your own session server in one click:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Vinpink2/sessions)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Vinpink2/sessions)

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?type=git&repository=github.com/Vinpink2/sessions&branch=main&name=sessions&builder=buildpack&run_command=npm%20start&ports=8000;http;/)

---

## 💻 Run Locally

**Requirements**

- [Node.js](https://nodejs.org) 18 or newer
- [Git](https://git-scm.com)
- A WhatsApp account on your phone

**Setup**

```bash
git clone https://github.com/Vinpink2/sessions.git
cd sessions
npm install
npm start
```

Then open `http://localhost:8000` in your browser.

---

## 🖥️ Run on a VPS (PM2)

```bash
git clone https://github.com/Vinpink2/sessions.git
cd sessions
npm install
npm install -g pm2
pm2 start npm --name "junex-session" -- start
pm2 save
pm2 startup
```

Put it behind Nginx with HTTPS if you want to use your own domain.

---

## ⚙️ Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port the server listens on | `8000` |

Most hosts set `PORT` automatically. If your host uses a different port, set it there.

---

## 🔌 Using the Session ID with JuneX Ultra

1. Deploy or open your [JuneX Ultra](https://github.com/Vinpink2/June-Ultra) bot.
2. Set the session ID as an environment variable:

   ```env
   SESSION_ID=your_session_id_here
   ```

3. Start the bot. It will connect using your session, with no QR or pairing needed.

---

## ❓ Troubleshooting

| Problem | Fix |
|---------|-----|
| Pairing code doesn't work | Use the number format with country code and no `+`. Generate a fresh code and enter it quickly. |
| Session ID not received | Check your WhatsApp chat with yourself ("Message yourself"), and make sure the device is still linked. |
| Bot logs out after linking | Don't link the same session on two servers at once. Generate a new one. |
| `npm install` fails | Update Node.js to 18+, then run `npm install` again. |
| Free host sleeps | Use an uptime pinger, or a VPS for always-on hosting. |

---

## 🛡️ Security Notes

- Treat your session ID like a password.
- Logging out of the linked device in WhatsApp invalidates the session.
- Only use session servers you trust. For full control, deploy your own.

---

## 🤝 Contributing

Pull requests and issues are welcome.

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-change`
3. Commit: `git commit -m "Add my change"`
4. Push and open a Pull Request

---

## 🌐 Related Projects

- 🤖 [JuneX Ultra](https://github.com/Vinpink2/June-Ultra): the WhatsApp bot
- 🌍 [JuneHosting](https://host.junex.space): deploy and manage your bots

---

## ⚠️ Disclaimer

This project is not affiliated with, authorized, or endorsed by WhatsApp or Meta. Use it responsibly and at your own risk. Automating WhatsApp accounts may violate WhatsApp's Terms of Service.

---

<div align="center">

Made with ❤️ by **Supreme** 🇰🇪

⭐ *Star this repo if it helped you!* ⭐

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2c5364,50:203a43,100:0f2027&height=100&section=footer" width="100%" />

</div>

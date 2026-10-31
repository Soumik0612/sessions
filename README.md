# Junex WhatsApp Session Generator

A small Node.js and Express app for creating a WhatsApp Web session from a single-page dashboard. Choose either a QR code or a phone-number pairing code.

The app imports Baileys through the existing `@whiskeysockets/baileys` name, mapped in `package.json` to `npm:junexbaileys@1.0.5`. Generated session messages use the `June-X:-` prefix.

## Features

- One dashboard with tabs for QR-code and pairing-code login.
- QR codes are returned as uncached PNG images for the dashboard to display.
- Pairing-code requests use a phone number with its international country calling code.
- After a device is linked, the generated session payload is sent to that WhatsApp account's own chat.

## Requirements

- Node.js 20 or newer.
- npm 9.7.2 or newer.
- Network access to WhatsApp Web for QR and pairing-code generation.

## Run locally

```bash
git clone https://github.com/Vinpink2/sessions.git
cd sessions
npm ci
npm start
```

Open [http://localhost:8000](http://localhost:8000). The server uses the `PORT` environment variable when it is set; otherwise it listens on port `8000`.

## Use the dashboard

### Pairing code

Select **Pairing code**, enter 11–15 digits including the country calling code (for example, `254712345678`), and choose **Get pairing code**. Enter the returned code in WhatsApp's **Linked devices** flow for linking with a phone number.

### QR code

Select **QR code**, choose **Generate QR**, then scan it in WhatsApp under **Linked devices → Link a device**. If the image does not load, choose **Try again** to request a fresh code.

After linking, look in the connected WhatsApp account's own chat for the session payload. Keep the `June-X:-` prefix when copying or storing that value.

## Deployment

The repository includes a Render Blueprint in `render.yaml`. It builds with `npm ci`, starts with `npm start`, and uses `/` as its health-check path. The app respects the host-provided `PORT` value.

## Security

A session payload is an authentication credential. Do not post it publicly, commit it to source control, or share it with anyone you do not trust. Anyone who can reach an unprotected running dashboard may request a QR code or pairing code, so add appropriate access controls before exposing a deployment to the public internet. Use HTTPS for any non-local deployment.

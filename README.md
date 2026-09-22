# Colby Ave Pizza Contest

A React + Vite site for the apartment pizza contest at 1515 Colby Ave, PH4, with a
VIP waiting-list sign-up form (photo, Venmo payment proof, and the all-important
pineapple question).

## Project structure

- `src/` — the React frontend (Vite).
- `server/` — a small Express + Nodemailer backend that emails every form
  submission (with the photo and payment-proof attachments) to
  `kevin.mannix20@gmail.com` and `tommasocastelli1102@gmail.com`.

## Running locally

You need both the frontend and the backend running.

### 1. Backend (email sender)

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` and fill in a real sender account:

```
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your-16-character-app-password
```

`SMTP_PASS` must be a Gmail **App Password**, not your normal password (Gmail
blocks plain-password SMTP logins). Create one at
[myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
(requires 2-Step Verification to be enabled on the account).

Then start it:

```bash
npm run dev
```

It listens on `http://localhost:5001`.

### 2. Frontend

```bash
npm install
npm run dev
```

Opens on `http://localhost:3000`. In dev, requests to `/api/apply` are proxied
to the backend on port 5001 (see `vite.config.js`), so no extra CORS setup is
needed locally.

## Deploying (Render)

This repo includes a `render.yaml` Blueprint that deploys both pieces at once:

- `pizza-colby-api` — the Node backend (`server/`).
- `pizza-colby-web` — the static frontend build, automatically pointed at the
  API's public URL via a `VITE_API_URL` build-time env var.

To deploy:

1. On [Render](https://dashboard.render.com/blueprint/new), pick **New →
   Blueprint** and select this GitHub repo.
2. Render finds `render.yaml` and shows both services — click through to
   create them.
3. Once created, open the `pizza-colby-api` service → **Environment** and
   fill in the two secrets it needs (left blank in the blueprint on purpose):
   - `SMTP_USER` — your Gmail address
   - `SMTP_PASS` — a Gmail [App Password](https://myaccount.google.com/apppasswords)
4. Redeploy `pizza-colby-api` after adding those (Render prompts for this).

Both services auto-deploy on every push to `main` from then on.

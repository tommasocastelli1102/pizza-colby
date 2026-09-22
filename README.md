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

## Deploying

This is two separate deployables:

- The frontend is a static Vite build (`npm run build` → `dist/`) — deploy it
  anywhere that serves static files (Netlify, Vercel, GitHub Pages, etc.).
- The backend needs an actual Node process running (it's not static) — deploy
  it somewhere that can run a long-lived Node server (Render, Railway, Fly.io,
  a small VPS, etc.) and set `SMTP_USER`/`SMTP_PASS` as environment variables
  there. Then point the frontend at that backend's URL instead of the `/api`
  proxy (e.g. via a `VITE_API_URL` env var) if they're not served from the
  same origin.

# Colby Ave Pizza Contest

A React + Vite site for the apartment pizza contest at 1515 Colby Ave, PH4, with a
VIP waiting-list sign-up form (photo, Venmo payment proof, and the all-important
pineapple question).

## Project structure

- `src/` — the React frontend (Vite).
- `server/` — an Express backend that saves every form submission (photo,
  payment-proof, pineapple answer) to a Postgres database. **The database is
  the source of truth** — Render's free plan blocks outbound SMTP entirely,
  so the backend itself never tries to send email.
- `.github/workflows/notify-new-submissions.yml` — polls that database every
  5 minutes from GitHub Actions (whose network isn't blocked) and emails
  `kevin.mannix20@gmail.com` and `tommasocastelli1102@gmail.com` about any
  submission it hasn't already notified about.
- `.github/workflows/keep-alive.yml` — pings the backend every 10 minutes so
  it doesn't spin down between visits (see "Avoiding cold starts" below).

## Running locally

You need both the frontend and the backend running.

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

It listens on `http://localhost:5001`. Without a `DATABASE_URL` in `.env`,
submissions just aren't persisted (useful for quick UI testing) — everything
else still works.

### 2. Frontend

```bash
npm install
npm run dev
```

Opens on `http://localhost:3000`. In dev, requests to `/api/apply` are proxied
to the backend on port 5001 (see `vite.config.js`), so no extra CORS setup is
needed locally.

## Viewing submissions (`/admin`)

`https://pizza-colby-api.onrender.com/admin?key=YOUR_ADMIN_KEY` lists every
submission with both uploaded images inline, newest first. Render
auto-generates the key on first deploy — find it under the `pizza-colby-api`
service → **Environment** tab → `ADMIN_KEY`.

## Deploying (Render)

This repo includes a `render.yaml` Blueprint that deploys three things at
once:

- `pizza-colby-db` — a free Postgres database storing every submission.
- `pizza-colby-api` — the Node backend (`server/`), wired to that database.
- `pizza-colby-web` — the static frontend build, automatically pointed at the
  API's public URL via a `VITE_API_URL` build-time env var.

To deploy:

1. On [Render](https://dashboard.render.com/blueprint/new), pick **New →
   Blueprint** and select this GitHub repo.
2. Render finds `render.yaml` and shows all three resources — click through
   to create them. (If you're adding these to an *existing* blueprint
   instance, new resources like the database need a manual sync: **Blueprints**
   in the sidebar → find this blueprint → **Manual Sync**.)

Every service auto-deploys on every push to `main` from then on.

**Note:** Render's free Postgres plan is deleted automatically after 30 days.
For a contest that runs longer than that, either export submissions before
then or upgrade the database to a paid plan.

### Avoiding cold starts

Render's free web-service plan spins the backend down after ~15 minutes of no
traffic; the next request then has to wait 30–90+ seconds for it to wake back
up. `.github/workflows/keep-alive.yml` pings the backend's health check every
10 minutes via GitHub Actions to keep it warm, so real submissions don't hit a
cold start. For a guarantee (not just "very likely warm"), upgrade
`pizza-colby-api` to a paid Render plan instead — those don't spin down.

### Email notifications

`.github/workflows/notify-new-submissions.yml` runs every 5 minutes, checks
the database for submissions it hasn't emailed about yet, sends one email per
new submission (with a link to `/admin`), and marks them as notified. It
needs these repository secrets (**Settings → Secrets and variables →
Actions** on GitHub):

- `DATABASE_URL` — the Postgres connection string. Use the **External**
  connection string from `pizza-colby-db` → **Info** (not the internal one
  `pizza-colby-api` uses — GitHub's runners aren't on Render's private
  network).
- `SMTP_USER` / `SMTP_PASS` — the same Gmail address + [App
  Password](https://myaccount.google.com/apppasswords) used elsewhere.
- `ADMIN_KEY` — same value as the `pizza-colby-api` service's `ADMIN_KEY`
  (used to build the link in the email).

You can trigger it manually from the **Actions** tab (Notify new submissions
→ Run workflow) to test it without waiting for the schedule.

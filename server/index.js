import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import nodemailer from 'nodemailer'
import pg from 'pg'

const { Pool } = pg

const PORT = process.env.PORT || 5001
const RECIPIENTS = ['kevin.mannix20@gmail.com', 'tommasocastelli1102@gmail.com']
const ADMIN_KEY = process.env.ADMIN_KEY

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
})

const smtpPort = Number(process.env.SMTP_PORT) || 587

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
})

// Local dev without DATABASE_URL just skips persistence rather than failing.
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : null

async function ensureSchema() {
  if (!pool) return
  await pool.query(`
    CREATE TABLE IF NOT EXISTS submissions (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      pineapple TEXT NOT NULL,
      photo BYTEA NOT NULL,
      photo_type TEXT NOT NULL,
      payment BYTEA NOT NULL,
      payment_type TEXT NOT NULL
    )
  `)
}

await ensureSchema().catch((err) => {
  console.error('Failed to set up database schema:', err)
})

function requireAdminKey(req, res, next) {
  if (!ADMIN_KEY || req.query.key !== ADMIN_KEY) {
    return res.status(401).send('Unauthorized')
  }
  next()
}

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.json({ ok: true })
})

app.post(
  '/api/apply',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'payment', maxCount: 1 },
  ]),
  async (req, res) => {
    const pineapple = req.body?.pineapple
    const photo = req.files?.photo?.[0]
    const payment = req.files?.payment?.[0]

    if (!photo || !payment || (pineapple !== 'yes' && pineapple !== 'no')) {
      return res.status(400).json({ error: 'Missing required fields.' })
    }

    if (pool) {
      try {
        await pool.query(
          `INSERT INTO submissions (pineapple, photo, photo_type, payment, payment_type)
           VALUES ($1, $2, $3, $4, $5)`,
          [pineapple, photo.buffer, photo.mimetype, payment.buffer, payment.mimetype]
        )
      } catch (err) {
        console.error('Failed to save submission to database:', err)
        return res.status(500).json({ error: 'Failed to save submission.' })
      }
    }

    // Best-effort: a submission is already saved above, so an email hiccup
    // (e.g. SMTP being blocked by the host) shouldn't fail the request.
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: RECIPIENTS,
        subject: 'New VIP waiting list application — Pizza Contest',
        text: [
          'A new application came in for the Colby Ave pizza contest.',
          '',
          `Likes pineapple on pizza: ${pineapple === 'yes' ? 'Yes' : 'No'}`,
          `Submitted: ${new Date().toLocaleString()}`,
          '',
          'Photo and payment proof are attached.',
        ].join('\n'),
        attachments: [
          { filename: photo.originalname || 'photo.jpg', content: photo.buffer },
          { filename: payment.originalname || 'payment-proof.jpg', content: payment.buffer },
        ],
      })
    } catch (err) {
      console.error('Email notification failed (submission was still saved):', err)
    }

    res.json({ ok: true })
  }
)

app.get('/admin', requireAdminKey, async (req, res) => {
  if (!pool) return res.status(503).send('Database not configured.')

  const { rows } = await pool.query(
    `SELECT id, created_at, pineapple FROM submissions ORDER BY created_at DESC`
  )
  const key = encodeURIComponent(req.query.key)

  const rowsHtml = rows
    .map(
      (r) => `
        <div class="row">
          <img src="/admin/photo/${r.id}/photo?key=${key}" alt="Applicant photo" />
          <img src="/admin/photo/${r.id}/payment?key=${key}" alt="Payment proof" />
          <div>
            <strong>#${r.id}</strong> — ${new Date(r.created_at).toLocaleString()}<br />
            Likes pineapple: ${r.pineapple === 'yes' ? 'Yes' : 'No'}
          </div>
        </div>`
    )
    .join('')

  res.send(`<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Pizza Contest Submissions</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 720px; margin: 40px auto; color: #2c2620; }
          .row { display: flex; gap: 16px; align-items: center; padding: 14px 0; border-bottom: 1px solid #e3d7bd; }
          .row img { width: 84px; height: 84px; object-fit: cover; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h1>Submissions (${rows.length})</h1>
        ${rowsHtml || '<p>No submissions yet.</p>'}
      </body>
    </html>`)
})

app.get('/admin/photo/:id/:field', requireAdminKey, async (req, res) => {
  if (!pool) return res.status(503).send('Database not configured.')

  const { id, field } = req.params
  if (field !== 'photo' && field !== 'payment') return res.status(400).send('Invalid field.')
  const typeColumn = field === 'photo' ? 'photo_type' : 'payment_type'

  const { rows } = await pool.query(
    `SELECT ${field} AS data, ${typeColumn} AS type FROM submissions WHERE id = $1`,
    [id]
  )
  if (!rows[0]) return res.status(404).send('Not found.')

  res.set('Content-Type', rows[0].type || 'application/octet-stream')
  res.send(rows[0].data)
})

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  console.error('Request error:', err)
  res.status(400).json({ error: 'Invalid request.' })
})

app.listen(PORT, () => {
  console.log(`Pizza contest API listening on http://localhost:${PORT}`)
})

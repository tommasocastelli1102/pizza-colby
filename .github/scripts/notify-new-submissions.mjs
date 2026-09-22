import pg from 'pg'
import nodemailer from 'nodemailer'

const { Pool } = pg

const RECIPIENTS = ['kevin.mannix20@gmail.com', 'tommasocastelli1102@gmail.com']
const API_URL = process.env.API_URL || 'https://pizza-colby-api.onrender.com'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
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
})

const { rows } = await pool.query(
  `SELECT id, created_at, pineapple FROM submissions WHERE notified_at IS NULL ORDER BY created_at ASC`
)

if (rows.length === 0) {
  console.log('No new submissions.')
  await pool.end()
  process.exit(0)
}

const adminLink = `${API_URL}/admin?key=${encodeURIComponent(process.env.ADMIN_KEY)}`

for (const row of rows) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: RECIPIENTS,
    subject: `New VIP waiting list application #${row.id} — Pizza Contest`,
    text: [
      'A new application came in for the Colby Ave pizza contest.',
      '',
      `Likes pineapple on pizza: ${row.pineapple === 'yes' ? 'Yes' : 'No'}`,
      `Submitted: ${new Date(row.created_at).toLocaleString()}`,
      '',
      `View the photo and payment proof: ${adminLink}`,
    ].join('\n'),
  })

  await pool.query(`UPDATE submissions SET notified_at = now() WHERE id = $1`, [row.id])
  console.log(`Notified for submission #${row.id}`)
}

await pool.end()

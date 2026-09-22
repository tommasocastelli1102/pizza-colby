import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import nodemailer from 'nodemailer'

const PORT = process.env.PORT || 5001
const RECIPIENTS = ['kevin.mannix20@gmail.com', 'tommasocastelli1102@gmail.com']

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

      res.json({ ok: true })
    } catch (err) {
      console.error('Failed to send application email:', err)
      res.status(500).json({ error: 'Failed to send email.' })
    }
  }
)

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  console.error('Request error:', err)
  res.status(400).json({ error: 'Invalid request.' })
})

app.listen(PORT, () => {
  console.log(`Pizza contest API listening on http://localhost:${PORT}`)
})

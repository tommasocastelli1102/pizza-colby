import { useState } from 'react'
import './App.css'
import {
  TomatoSprig,
  BasilSprig,
  StarRating,
  CalendarIcon,
  PinIcon,
  PizzaIcon,
  TrophyIcon,
  CameraIcon,
  ItalyFlag,
  USAFlag,
  MichelinStar,
  MichelinRating,
} from './components/Decor'
import chefTommy from './assets/chefs/chef-marco.webp'
import chefKevin from './assets/chefs/chef-luca.webp'
import sherlockHarry from './assets/sherlock-harry.webp'
import { normalizeImage, ImageDecodeError } from './utils/normalizeImage'

const API_BASE = import.meta.env.VITE_API_URL ?? ''
const UNREADABLE_IMAGE_MESSAGE =
  "This browser couldn't open that image. Try a different photo, or a screenshot of it instead."

const chefs = [
  {
    id: 1,
    name: 'Tomato',
    apartment: 'PH4',
    img: chefTommy,
    quote: 'Born in Italy, raised on wood-fired dough. There is no other way.',
    specialty: 'Neapolitan Margherita & wood-fired classics, wears fake Gucci glasses',
    rating: 5,
    reviews: 32,
    tags: ['Italian', 'Wood-fired', "Nonna's recipe", 'Fake Gucci glasses'],
  },
  {
    id: 2,
    name: 'Kevin for you',
    apartment: 'PH4',
    img: chefKevin,
    quote: 'Widely regarded as a loser. Still showing up to compete anyway.',
    specialty: 'Gourmet white pizzas with seasonal toppings',
    rating: 3,
    reviews: 21,
    tags: ['Graduated', 'Canadian business school', 'Maximum grade'],
  },
]

const showdown = [
  {
    category: 'Land area',
    italy: '~500 billion square Parmesan blocks',
    italyNote: 'about the size of a mall parking lot, give or take',
    usa: '3,796,742 sq mi',
    usaNote: 'roughly 1,700 Italys',
  },
  {
    category: 'Flag',
    italy: 'Often gets confused with Mexico and Iran',
    italyNote: 'same green-white-red, different logo. An honest mistake, made constantly.',
    usa: 'Has a cool flag',
    usaNote: 'unmistakable, everywhere, immediately recognizable',
    flag: true,
  },
  {
    category: 'GDP',
    italy: '~4.6 trillion meatballs',
    italyNote: '$2.3 trillion, converted to the only unit that felt appropriate (at $0.50/meatball)',
    usa: '$27+ trillion',
    usaNote: 'measured in an actual currency, because it is an actual economy',
  },
  {
    category: 'Biggest company',
    italyCompanies: ["Domino's Pizza"],
    italyNote: "honestly not sure they even have computers over there",
    usaCompanies: [
      'Apple',
      'Microsoft',
      'Nvidia',
      'Alphabet',
      'Amazon',
      'Meta',
      'Broadcom',
      'Tesla',
      'Oracle',
      'Berkshire Hathaway',
      'SpaceX',
      'OpenAI',
      'Anthropic',
    ],
    usaNote: 'a combined $20+ trillion, and — not to be dramatic — basically responsible for all progress in the modern world',
  },
  {
    category: 'World wars won',
    italy: '-1',
    italyNote: 'switched sides mid-war. Twice. Was really, really on the wrong side for most of it.',
    usa: '2',
    usaNote: 'back to back, no switching sides required',
  },
  {
    category: 'Made the 2026 World Cup',
    italy: 'No',
    italyNote: 'didn’t qualify, meanwhile Curaçao and Cabo Verde made their World Cup debut',
    usa: 'Yes',
    usaNote: "pretty sure we won? Didn't really watch it",
  },
  {
    category: 'Super Bowl wins',
    italy: '0',
    italyNote: 'has never even been invited',
    usa: 'Every single one',
    usaNote: 'obviously — nobody else plays',
  },
  {
    category: 'Contributions to the world',
    italy: 'The Godfather',
    italyNote: "that's the whole list. Wait... that's an American movie.",
    usa: 'The airplane, the internet, the moon landing, the personal computer, sharks, probably pizza',
  },
]

const michelin = [
  {
    chef: 'Kevin',
    img: chefKevin,
    stars: 5,
    distinction: 'Exceptional cuisine, worth a special journey. And a second mortgage.',
    note: 'The first restaurant in history awarded more than three stars. The Guide had to print a new edition.',
  },
  {
    chef: 'Tomato',
    img: chefTommy,
    stars: 2,
    distinction: 'Excellent cooking, worth a detour. A short one.',
    note: 'Inspectors docked three stars for the fake Gucci glasses. Rules are rules.',
  },
]

const testimonials = [
  {
    title: 'I used to be poor. Now I drive a Lamborghini.',
    body: 'Before I joined the VIP waiting list I was sleeping in a bathtub and eating crackers I found in a parking garage. Three weeks after my first slice I was driving a lime-green Lamborghini Huracán, and my wife — a former Miss Universe runner-up — says she married me for my palate. She is lying. It was the Lamborghini. And the Lamborghini was the pizza.',
    date: 'March 3, 2026',
    location: 'Monaco (formerly: a bathtub)',
  },
  {
    title: 'Cured my scurvy. Doctors are baffled.',
    body: 'I spent 22 years at sea with a crew of fellow pirates, surviving on hardtack and grog. My gums were in open revolt. One bite of Kevin’s white pizza and the scurvy simply left. My physician called it “medically impossible” and then asked if I could get him on the waiting list.',
    date: 'April 17, 2026',
    location: 'The high seas',
  },
  {
    title: 'I used this website to have sex.',
    body: 'I will not go into detail. I will only say that I uploaded my photo to the VIP waiting list, and within the hour I was no longer lonely. I don’t fully understand how it happened and I don’t need to. Five stars. Would use this website to have sex again.',
    date: 'May 9, 2026',
    location: 'Unit PH4 (briefly)',
  },
  {
    title: 'My father finally said he was proud of me.',
    body: 'Forty-one years of silence. Then I showed him a screenshot of my $2,000 Venmo payment to Kevin. He wept. He hugged me. He said, “Son, that is the smartest thing you have ever done.” We now eat pizza together every Sunday. Tomato’s pizza makes him cry for different reasons.',
    date: 'June 22, 2026',
    location: 'Los Angeles, CA',
  },
  {
    title: 'My credit score went from 412 to 850.',
    body: 'I did nothing else differently. I didn’t pay off any debt. I just joined the waiting list and the credit bureaus called me personally to apologize. My bank now sends me a fruit basket every Christmas.',
    date: 'July 30, 2026',
    location: 'Beverly Hills, CA',
  },
  {
    title: 'I can speak Italian now. I never took a lesson.',
    body: 'Woke up the morning after my first slice fluent in Italian. Unfortunately I then read the Italy vs. USA section of this website and I have chosen to forget it all out of respect for my country.',
    date: 'August 14, 2026',
    location: 'Florence (briefly), then back to LA',
  },
]

// Sensitivity analysis assumptions
const STAR_PRICE_MULTIPLIER = 1.8 // each extra Michelin star ≈ 1.8x the tasting menu price
const AVOIDED_COSTS = 1340 // flight to Paris, 3-month reservation wait, valet, coat check
const PLACEBO_MULTIPLIER = 1.5 // food you paid more for tastes 1.5x better (science)
const benchmarks = [
  { label: 'Cheap 3★', price: 300 },
  { label: 'Typical 3★', price: 500 },
  { label: 'Paris 3★', price: 800 },
]
const paymentLevels = [100, 250, 500, 1000, 1500, 2000]

function kevinMealValue(benchmarkPrice) {
  // Kevin has 5 stars; extrapolate from a 3-star tasting menu
  return benchmarkPrice * STAR_PRICE_MULTIPLIER ** 2
}

function profitFor(payment, benchmarkPrice) {
  return kevinMealValue(benchmarkPrice) + AVOIDED_COSTS + payment * PLACEBO_MULTIPLIER - payment
}

const usd = (n) => `$${Math.round(n).toLocaleString('en-US')}`

const initialForm = {
  photo: null,
  payment: null,
  pineapple: '',
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [paymentPreview, setPaymentPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [evalPhoto, setEvalPhoto] = useState(null)
  const [evalPreview, setEvalPreview] = useState(null)
  const [evaluating, setEvaluating] = useState(false)
  const [evalDone, setEvalDone] = useState(false)
  const [evalError, setEvalError] = useState('')

  const [calcPayment, setCalcPayment] = useState(500)
  const [receipt, setReceipt] = useState(null)
  const [receiptPreview, setReceiptPreview] = useState(null)
  const [receiptStatus, setReceiptStatus] = useState('idle') // idle | sending | sent | error
  const [receiptError, setReceiptError] = useState('')

  async function handlePhotoChange(e) {
    const rawFile = e.target.files?.[0] ?? null
    if (photoPreview) URL.revokeObjectURL(photoPreview)
    if (!rawFile) {
      setForm((prev) => ({ ...prev, photo: null }))
      setPhotoPreview(null)
      return
    }
    try {
      const file = await normalizeImage(rawFile)
      setForm((prev) => ({ ...prev, photo: file }))
      setPhotoPreview(URL.createObjectURL(file))
      setErrors((prev) => ({ ...prev, photo: undefined }))
    } catch (err) {
      setForm((prev) => ({ ...prev, photo: null }))
      setPhotoPreview(null)
      setErrors((prev) => ({
        ...prev,
        photo: err instanceof ImageDecodeError ? UNREADABLE_IMAGE_MESSAGE : 'Please try a different photo.',
      }))
    } finally {
      e.target.value = ''
    }
  }

  async function handlePaymentChange(e) {
    const rawFile = e.target.files?.[0] ?? null
    if (paymentPreview) URL.revokeObjectURL(paymentPreview)
    if (!rawFile) {
      setForm((prev) => ({ ...prev, payment: null }))
      setPaymentPreview(null)
      return
    }
    try {
      const file = await normalizeImage(rawFile)
      setForm((prev) => ({ ...prev, payment: file }))
      setPaymentPreview(URL.createObjectURL(file))
      setErrors((prev) => ({ ...prev, payment: undefined }))
    } catch (err) {
      setForm((prev) => ({ ...prev, payment: null }))
      setPaymentPreview(null)
      setErrors((prev) => ({
        ...prev,
        payment: err instanceof ImageDecodeError ? UNREADABLE_IMAGE_MESSAGE : 'Please try a different photo.',
      }))
    } finally {
      e.target.value = ''
    }
  }

  function handlePineappleChange(value) {
    setForm((prev) => ({ ...prev, pineapple: value }))
  }

  function validate(values) {
    const next = {}
    if (!values.photo) next.photo = 'Please add a photo of yourself.'
    if (!values.payment) next.payment = 'Please attach proof of your $100+ Venmo payment.'
    if (!values.pineapple) next.pineapple = 'Please answer the question.'
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    setSubmitError('')
    try {
      const body = new FormData()
      body.append('photo', form.photo)
      body.append('payment', form.payment)
      body.append('pineapple', form.pineapple)

      const res = await fetch(`${API_BASE}/api/apply`, { method: 'POST', body })
      if (!res.ok) throw new Error('Request failed')

      setSubmitted(true)
    } catch {
      setSubmitError("Something went wrong sending your application. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleEvalPhotoChange(e) {
    const rawFile = e.target.files?.[0] ?? null
    if (evalPreview) URL.revokeObjectURL(evalPreview)
    if (!rawFile) {
      setEvalPhoto(null)
      setEvalPreview(null)
      setEvalDone(false)
      return
    }
    try {
      const file = await normalizeImage(rawFile)
      setEvalPhoto(file)
      setEvalPreview(URL.createObjectURL(file))
      setEvalDone(false)
      setEvalError('')
    } catch (err) {
      setEvalPhoto(null)
      setEvalPreview(null)
      setEvalError(err instanceof ImageDecodeError ? UNREADABLE_IMAGE_MESSAGE : 'Please try a different photo.')
    } finally {
      e.target.value = ''
    }
  }

  function handleEvaluate() {
    if (!evalPhoto) return
    setEvaluating(true)
    setTimeout(() => {
      setEvaluating(false)
      setEvalDone(true)
    }, 1400)
  }

  function handleEvalReset() {
    if (evalPreview) URL.revokeObjectURL(evalPreview)
    setEvalPhoto(null)
    setEvalPreview(null)
    setEvaluating(false)
    setEvalDone(false)
    setEvalError('')
  }

  async function handleReceiptChange(e) {
    const rawFile = e.target.files?.[0] ?? null
    if (receiptPreview) URL.revokeObjectURL(receiptPreview)
    setReceiptStatus('idle')
    setReceiptError('')
    if (!rawFile) {
      setReceipt(null)
      setReceiptPreview(null)
      return
    }
    try {
      const file = await normalizeImage(rawFile)
      setReceipt(file)
      setReceiptPreview(URL.createObjectURL(file))
    } catch (err) {
      setReceipt(null)
      setReceiptPreview(null)
      setReceiptError(err instanceof ImageDecodeError ? UNREADABLE_IMAGE_MESSAGE : 'Please try a different photo.')
    } finally {
      e.target.value = ''
    }
  }

  async function handleReceiptSubmit() {
    if (!receipt) return
    setReceiptStatus('sending')
    setReceiptError('')
    try {
      const body = new FormData()
      body.append('payment', receipt)
      const res = await fetch(`${API_BASE}/api/receipt`, { method: 'POST', body })
      if (!res.ok) throw new Error('Request failed')
      setReceiptStatus('sent')
    } catch {
      setReceiptStatus('idle')
      setReceiptError("Couldn't send your receipt. Please try again.")
    }
  }

  function handleReset() {
    if (photoPreview) URL.revokeObjectURL(photoPreview)
    if (paymentPreview) URL.revokeObjectURL(paymentPreview)
    setForm(initialForm)
    setPhotoPreview(null)
    setPaymentPreview(null)
    setErrors({})
    setSubmitError('')
    setSubmitted(false)
  }

  return (
    <>
      <header className="hero">
        <div className="hero-bg" aria-hidden="true">
          <TomatoSprig className="decor decor-hero-1" size={64} />
          <TomatoSprig className="decor decor-hero-3" size={44} />
          <TomatoSprig className="decor decor-hero-4" size={52} />
          <TomatoSprig className="decor decor-hero-5" size={38} />
          <BasilSprig className="decor decor-hero-2" size={72} />
          <BasilSprig className="decor decor-hero-6" size={56} />
        </div>
        <p className="eyebrow">
          <span className="rule" /> Building Pizza Night <span className="rule" />
        </p>
        <h1>
          The Great Apartment
          <br />
          <em>OBJECTIVE Pizza Contest</em>
        </h1>
        <a className="cta" href="#join">
          Join the VIP waiting list
        </a>
      </header>

      <section className="michelin">
        <div className="michelin-brand">
          <MichelinStar size={34} />
          <div className="michelin-wordmark">
            <span className="michelin-name">MICHELIN</span>
            <span className="michelin-guide">Guide &middot; Colby Ave 2026</span>
          </div>
        </div>
        <h2>The stars are in</h2>
        <p className="section-subtitle michelin-subtitle">
          Our anonymous inspectors ate at PH4 on multiple Sundays. Their findings are final.
        </p>
        <div className="michelin-cards">
          {michelin.map((entry) => (
            <div className="michelin-card" key={entry.chef}>
              <img src={entry.img} alt={entry.chef} className="michelin-photo" />
              <h3>Chef {entry.chef}</h3>
              <MichelinRating stars={entry.stars} />
              <p className="michelin-score">
                {entry.stars} / 5 Michelin stars
              </p>
              <p className="michelin-distinction">{entry.distinction}</p>
              <p className="michelin-note">{entry.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="details">
        <h2>How it works</h2>
        <div className="cards">
          <div className="card">
            <CalendarIcon className="card-icon" />
            <h3>When</h3>
            <p>Always next Sunday, 6:00 PM</p>
          </div>
          <div className="card">
            <PinIcon className="card-icon" />
            <h3>Where</h3>
            <p>1515 Colby Ave, PH4 &middot; Los Angeles, CA</p>
          </div>
          <div className="card">
            <PizzaIcon className="card-icon" />
            <h3>What to bring</h3>
            <p>A plant, an horse or a dwarf</p>
          </div>
          <div className="card">
            <TrophyIcon className="card-icon" />
            <h3>Prizes</h3>
            <p>The two chefs are the prize!</p>
          </div>
        </div>
      </section>

      <section className="chefs">
        <h2>Meet the competing chefs</h2>
        <p className="section-subtitle">
          Your neighbors are already sharpening their knives. Here&apos;s who you&apos;re up against.
        </p>
        <div className="chef-cards">
          {chefs.map((chef) => (
            <div className="chef-card" key={chef.id}>
              <div className="chef-photo-wrap">
                <img src={chef.img} alt={chef.name} className="chef-photo" />
              </div>
              <h3>{chef.name}</h3>
              <p className="chef-apartment">{chef.apartment} &middot; 1515 Colby Ave</p>
              <StarRating rating={chef.rating} />
              <p className="chef-reviews">{chef.reviews} building reviews</p>
              <p className="chef-quote">&ldquo;{chef.quote}&rdquo;</p>
              <p className="chef-specialty">{chef.specialty}</p>
              <div className="chef-tags">
                {chef.tags.map((tag) => (
                  <span className="chef-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="showdown">
        <h2>Italy vs. USA: the real contest</h2>
        <p className="section-subtitle">
          Before anyone votes on dough, let&apos;s settle the bigger rivalry. Numbers don&apos;t lie.
        </p>

        <div className="showdown-scoreboard">
          <div className="showdown-score showdown-score-usa">
            <span className="showdown-score-value">{showdown.length}</span>
            <span className="showdown-score-label">USA</span>
          </div>
          <span className="showdown-score-divider">&mdash;</span>
          <div className="showdown-score showdown-score-italy">
            <span className="showdown-score-value">0</span>
            <span className="showdown-score-label">Italy</span>
          </div>
        </div>

        <div className="showdown-table">
          <div className="showdown-header">
            <span />
            <span className="showdown-header-usa">USA</span>
            <span>Italy</span>
          </div>
          {showdown.map((row) => (
            <div className="showdown-row" key={row.category}>
              <h3 className="showdown-category">{row.category}</h3>
              <div className="showdown-col showdown-col-usa">
                {row.flag && <USAFlag className="showdown-flag" />}
                {row.usaCompanies ? (
                  <div className="showdown-chips">
                    {row.usaCompanies.map((company) => (
                      <span className="showdown-chip" key={company}>
                        {company}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="showdown-value">{row.usa}</p>
                )}
                <span className="showdown-winner-badge">
                  <TrophyIcon size={12} />
                  Wins
                </span>
                {row.usaNote && <p className="showdown-note">{row.usaNote}</p>}
              </div>
              <div className="showdown-col showdown-col-italy">
                {row.flag && <ItalyFlag className="showdown-flag" />}
                {row.italyCompanies ? (
                  <div className="showdown-chips">
                    {row.italyCompanies.map((company) => (
                      <span className="showdown-chip" key={company}>
                        {company}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="showdown-value">{row.italy}</p>
                )}
                <p className="showdown-note">{row.italyNote}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="showdown-conclusion">
          Italy gave the world flavor and a Coppola movie. America gave the world
          everything else, won the wars that mattered, and then perfected the
          flavor too.
        </p>
      </section>

      <section className="reviews">
        <h2>What our diners are saying</h2>
        <div className="reviews-summary">
          <StarRating rating={5} />
          <p>
            <strong>5.0</strong> out of 5 &middot; {testimonials.length} verified reviews
          </p>
        </div>
        <div className="review-cards">
          {testimonials.map((review) => (
            <article className="review-card" key={review.title}>
              <div className="review-header">
                <img src={sherlockHarry} alt="" className="review-avatar" />
                <div>
                  <p className="review-author">Sherlock Harry</p>
                  <p className="review-location">{review.location}</p>
                </div>
              </div>
              <div className="review-meta">
                <StarRating rating={5} />
                <span className="review-verified">&#10003; Verified diner</span>
              </div>
              <h3 className="review-title">{review.title}</h3>
              <p className="review-body">{review.body}</p>
              <p className="review-date">Reviewed {review.date}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="detective">
        <div className="detective-card">
          <img src={sherlockHarry} alt="Sherlock Harry" className="detective-photo" />
          <div className="detective-body">
            <h2>Think you have what it takes?</h2>
            <p className="section-subtitle detective-subtitle">
              Do you want to participate as a chef? Upload your picture here and our
              own Sherlock Harry will evaluate it and see if it&apos;s good enough.
            </p>

            {evalDone ? (
              <div className="verdict">
                <p className="verdict-text">
                  &ldquo;It&apos;s not good enough, Watson. You&apos;ll never make it in this town.&rdquo;
                </p>
                <button type="button" className="secondary" onClick={handleEvalReset}>
                  Try again
                </button>
              </div>
            ) : (
              <>
                <div className="upload">
                  {evalPreview ? (
                    <img src={evalPreview} alt="Your preview" className="upload-preview" />
                  ) : (
                    <div className="upload-placeholder" aria-hidden="true">
                      <CameraIcon size={22} />
                    </div>
                  )}
                  <div className="upload-body">
                    <label htmlFor="evalPhoto" className="upload-button">
                      {evalPhoto ? 'Change photo' : 'Choose photo'}
                    </label>
                    <span className="upload-filename">{evalPhoto?.name ?? 'No file selected'}</span>
                  </div>
                  <input
                    id="evalPhoto"
                    name="evalPhoto"
                    type="file"
                    accept="image/*"
                    onChange={handleEvalPhotoChange}
                    className="upload-input"
                  />
                </div>
                {evalError && <span className="error">{evalError}</span>}
                <button
                  type="button"
                  className="primary"
                  onClick={handleEvaluate}
                  disabled={!evalPhoto || evaluating}
                >
                  {evaluating ? 'Sherlock Harry is deducing…' : 'Submit for evaluation'}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="join" className="join">
        <h2>Join the VIP waiting list</h2>
        <p className="section-subtitle">
          Fill the form to join the waiting list of VIP. Spots are limited to building
          residents only.
        </p>

        {submitted ? (
          <div className="success" role="status">
            <h3>You&apos;re on the list! 🎉</h3>
            <p>
              We&apos;ve received your photo and payment proof
              {form.pineapple === 'yes'
                ? " — and honestly, we're relieved you like pineapple."
                : form.pineapple === 'no'
                  ? ' — a purist, as expected.'
                  : ''}{' '}
              We&apos;ll follow up soon with your VIP confirmation.
            </p>
            <button type="button" className="secondary" onClick={handleReset}>
              Submit another application
            </button>
          </div>
        ) : (
          <form className="join-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="photo">Your photo</label>
              <div className="upload">
                {photoPreview ? (
                  <img src={photoPreview} alt="Your preview" className="upload-preview" />
                ) : (
                  <div className="upload-placeholder" aria-hidden="true">
                    <CameraIcon size={22} />
                  </div>
                )}
                <div className="upload-body">
                  <label htmlFor="photo" className="upload-button">
                    {form.photo ? 'Change photo' : 'Choose photo'}
                  </label>
                  <span className="upload-filename">{form.photo?.name ?? 'No file selected'}</span>
                </div>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  aria-invalid={Boolean(errors.photo)}
                  className="upload-input"
                />
              </div>
              {errors.photo && <span className="error">{errors.photo}</span>}
            </div>

            <div className="field">
              <label htmlFor="payment">Proof of Venmo payment ($100 minimum)</label>
              <p className="field-hint">
                Send $100+ to{' '}
                <a href="https://venmo.com/u/Tommaso-Castelli" target="_blank" rel="noopener noreferrer">
                  @Tommaso-Castelli
                </a>{' '}
                on Venmo, then upload a screenshot of the payment below.
              </p>
              <div className="upload">
                {paymentPreview ? (
                  <img src={paymentPreview} alt="Payment proof preview" className="upload-preview" />
                ) : (
                  <div className="upload-placeholder" aria-hidden="true">$</div>
                )}
                <div className="upload-body">
                  <label htmlFor="payment" className="upload-button">
                    {form.payment ? 'Change screenshot' : 'Upload screenshot'}
                  </label>
                  <span className="upload-filename">{form.payment?.name ?? 'No file selected'}</span>
                </div>
                <input
                  id="payment"
                  name="payment"
                  type="file"
                  accept="image/*"
                  onChange={handlePaymentChange}
                  aria-invalid={Boolean(errors.payment)}
                  className="upload-input"
                />
              </div>
              {errors.payment && <span className="error">{errors.payment}</span>}
            </div>

            <fieldset className="field pineapple-field">
              <legend>Do you like pineapple on pizza?</legend>
              <div className="pineapple-options">
                <button
                  type="button"
                  className={form.pineapple === 'yes' ? 'toggle active' : 'toggle'}
                  onClick={() => handlePineappleChange('yes')}
                  aria-pressed={form.pineapple === 'yes'}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={form.pineapple === 'no' ? 'toggle active' : 'toggle'}
                  onClick={() => handlePineappleChange('no')}
                  aria-pressed={form.pineapple === 'no'}
                >
                  No
                </button>
              </div>
              {errors.pineapple && <span className="error">{errors.pineapple}</span>}
            </fieldset>

            {submitError && <span className="error">{submitError}</span>}

            <button type="submit" className="primary" disabled={submitting}>
              {submitting ? 'Sending…' : 'Join the waiting list'}
            </button>
          </form>
        )}
      </section>

      <section className="faq">
        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>$100 seems like a lot?</summary>
            <div className="faq-answer">
              <p>
                Have you ever eaten at a Michelin-starred restaurant? A three-star tasting
                menu runs you $300&ndash;$800 a head before wine. Kevin has <em>five</em>{' '}
                stars. At $100 you aren&apos;t paying for pizza &mdash; you&apos;re
                basically getting paid to eat it. We ran the numbers.
              </p>

              <ul className="faq-assumptions">
                <li>
                  Each additional Michelin star &asymp; {STAR_PRICE_MULTIPLIER}&times; the price.
                  Kevin&apos;s 5 stars &rArr; {Math.round((STAR_PRICE_MULTIPLIER ** 2 - 1) * 100)}% above a 3★ menu.
                </li>
                <li>
                  Avoided costs: flight to Paris, 3-month reservation wait, valet, coat
                  check &mdash; {usd(AVOIDED_COSTS)}.
                </li>
                <li>
                  Placebo premium: food you paid more for tastes {PLACEBO_MULTIPLIER}&times;
                  better. This is science.
                </li>
              </ul>

              <div className="calc">
                <label htmlFor="calcPayment" className="calc-label">
                  If you pay <strong>{usd(calcPayment)}</strong>
                </label>
                <input
                  id="calcPayment"
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={calcPayment}
                  onChange={(e) => setCalcPayment(Number(e.target.value))}
                />
                <p className="calc-result">
                  you profit <strong>{usd(profitFor(calcPayment, 500))}</strong>
                  <span className="calc-roi">
                    {Math.round((profitFor(calcPayment, 500) / calcPayment) * 100).toLocaleString('en-US')}% ROI
                  </span>
                </p>
              </div>

              <p className="faq-table-caption">
                Sensitivity analysis: your profit by amount paid and 3★ tasting-menu benchmark
              </p>
              <div className="faq-table-wrap">
                <table className="faq-table">
                  <thead>
                    <tr>
                      <th scope="col">You pay</th>
                      {benchmarks.map((b) => (
                        <th scope="col" key={b.label}>
                          {b.label}
                          <span>{usd(b.price)}/head</span>
                        </th>
                      ))}
                      <th scope="col">ROI (typical)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentLevels.map((pay) => (
                      <tr key={pay}>
                        <th scope="row">{usd(pay)}</th>
                        {benchmarks.map((b) => (
                          <td key={b.label}>+{usd(profitFor(pay, b.price))}</td>
                        ))}
                        <td>{Math.round((profitFor(pay, 500) / pay) * 100).toLocaleString('en-US')}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="faq-punchline">
                Note that profit goes <em>up</em> the more you pay. That&apos;s not a typo.
                That&apos;s economics. Please consult no financial advisor.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary>Shouldn&apos;t I try the pizza before I pay?</summary>
            <div className="faq-answer">
              <p>
                Oh, absolutely. Just like every restaurant you go to, where you eat the whole
                meal, think about it for a few days, and then decide whether you feel like
                paying. Totally how that works. The waiters love it.
              </p>
              <p>
                Anyway, since you&apos;re clearly ready now, you can upload your receipt
                right here. Again.
              </p>

              {receiptStatus === 'sent' ? (
                <p className="faq-receipt-success" role="status">
                  Receipt received. Sherlock Harry has deduced that you made the right choice.
                </p>
              ) : (
                <div className="faq-receipt">
                  <div className="upload">
                    {receiptPreview ? (
                      <img src={receiptPreview} alt="Receipt preview" className="upload-preview" />
                    ) : (
                      <div className="upload-placeholder" aria-hidden="true">$</div>
                    )}
                    <div className="upload-body">
                      <label htmlFor="receipt" className="upload-button">
                        {receipt ? 'Change receipt' : 'Upload Venmo receipt'}
                      </label>
                      <span className="upload-filename">{receipt?.name ?? 'No file selected'}</span>
                    </div>
                    <input
                      id="receipt"
                      name="receipt"
                      type="file"
                      accept="image/*"
                      onChange={handleReceiptChange}
                      className="upload-input"
                    />
                  </div>
                  {receiptError && <span className="error">{receiptError}</span>}
                  <button
                    type="button"
                    className="primary"
                    onClick={handleReceiptSubmit}
                    disabled={!receipt || receiptStatus === 'sending'}
                  >
                    {receiptStatus === 'sending' ? 'Sending…' : 'Send receipt'}
                  </button>
                </div>
              )}
            </div>
          </details>
        </div>
      </section>

      <footer className="footer">
        <p>1515 Colby Ave, PH4 &middot; Los Angeles, CA — May the best pizza win.</p>
      </footer>
    </>
  )
}

export default App

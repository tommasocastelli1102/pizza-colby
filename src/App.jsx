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
} from './components/Decor'
import chefTommy from './assets/chefs/chef-marco.webp'
import chefKevin from './assets/chefs/chef-luca.webp'
import sherlockHarry from './assets/sherlock-harry.webp'

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
    name: 'Kevin',
    apartment: 'PH4',
    img: chefKevin,
    quote: 'Widely regarded as a loser. Still showing up to compete anyway.',
    specialty: 'Gourmet white pizzas with seasonal toppings',
    rating: 3,
    reviews: 21,
    tags: ['White pizza', 'Seasonal', 'Certified loser'],
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
    usa: '60',
    usaNote: 'every single one, obviously — nobody else plays',
  },
  {
    category: 'Contributions to the world',
    italy: 'The Godfather',
    italyNote: "that's the whole list. Wait... that's an American movie.",
    usa: 'The airplane, the internet, the moon landing, the personal computer — and pizza',
    usaNote: 'just faster, bigger, and delivered in 30 minutes or less',
  },
]

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

  function handlePhotoChange(e) {
    const file = e.target.files?.[0] ?? null
    if (photoPreview) URL.revokeObjectURL(photoPreview)
    setForm((prev) => ({ ...prev, photo: file }))
    setPhotoPreview(file ? URL.createObjectURL(file) : null)
  }

  function handlePaymentChange(e) {
    const file = e.target.files?.[0] ?? null
    if (paymentPreview) URL.revokeObjectURL(paymentPreview)
    setForm((prev) => ({ ...prev, payment: file }))
    setPaymentPreview(file ? URL.createObjectURL(file) : null)
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

      const res = await fetch('/api/apply', { method: 'POST', body })
      if (!res.ok) throw new Error('Request failed')

      setSubmitted(true)
    } catch {
      setSubmitError("Something went wrong sending your application. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  function handleEvalPhotoChange(e) {
    const file = e.target.files?.[0] ?? null
    if (evalPreview) URL.revokeObjectURL(evalPreview)
    setEvalPhoto(file)
    setEvalPreview(file ? URL.createObjectURL(file) : null)
    setEvalDone(false)
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
          <em>Pizza Contest</em>
        </h1>
        <a className="cta" href="#join">
          Join the VIP waiting list
        </a>
      </header>

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
                <p className="showdown-note">{row.usaNote}</p>
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
                  &ldquo;It&apos;s not good enough, Watson. You should eat some cereals instead.&rdquo;
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

      <footer className="footer">
        <p>1515 Colby Ave, PH4 &middot; Los Angeles, CA — May the best pizza win.</p>
      </footer>
    </>
  )
}

export default App

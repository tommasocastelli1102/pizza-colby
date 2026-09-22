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
} from './components/Decor'
import chefTommy from './assets/chefs/chef-marco.webp'
import chefKevin from './assets/chefs/chef-luca.webp'

const chefs = [
  {
    id: 1,
    name: 'Tommy',
    apartment: 'PH4',
    img: chefTommy,
    quote: 'Born in Italy, raised on wood-fired dough. There is no other way.',
    specialty: 'Neapolitan Margherita & wood-fired classics',
    rating: 5,
    reviews: 32,
    tags: ['Italian', 'Wood-fired', "Nonna's recipe"],
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
        <TomatoSprig className="decor decor-hero-1" size={64} />
        <BasilSprig className="decor decor-hero-2" size={72} />
        <p className="eyebrow">
          <span className="rule" /> Building Pizza Night <span className="rule" />
        </p>
        <h1>
          The Great Apartment
          <br />
          <em>Pizza Contest</em>
        </h1>
        <p className="tagline">
          One building, one night, endless toppings. Bring your best homemade pizza,
          compete for bragging rights, and help us crown this year&apos;s Pizza Champion
          of the building.
        </p>
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
            <p>Saturday, October 18th, starting at 6:00 PM</p>
          </div>
          <div className="card">
            <PinIcon className="card-icon" />
            <h3>Where</h3>
            <p>1515 Colby Ave, PH4 &middot; Los Angeles, CA</p>
          </div>
          <div className="card">
            <PizzaIcon className="card-icon" />
            <h3>What to bring</h3>
            <p>One homemade pizza, ready to slice and share with the building</p>
          </div>
          <div className="card">
            <TrophyIcon className="card-icon" />
            <h3>Prizes</h3>
            <p>Neighbors vote by tasting — top three pizzas win bragging rights and prizes</p>
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

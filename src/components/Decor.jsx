import { useId } from 'react'

export function TomatoSprig({ className, size = 56 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.15}
      viewBox="0 0 60 70"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="30" cy="42" r="19" stroke="var(--terracotta)" strokeWidth="1.4" />
      <path
        d="M18 34c5-4 19-4 24 0M15 42h30M18 50c5 4 19 4 24 0"
        stroke="var(--terracotta)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M30 23V9"
        stroke="var(--olive-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M30 12c-4-5-11-6-16-3 2 6 9 10 15 9"
        stroke="var(--olive)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M30 15c4-4 10-4 14-1-2 5-8 8-13 7"
        stroke="var(--olive-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function BasilSprig({ className, size = 56 }) {
  return (
    <svg
      className={className}
      width={size * 0.8}
      height={size}
      viewBox="0 0 44 70"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22 66V10"
        stroke="var(--olive-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {[14, 28, 42].map((y) => (
        <g key={y}>
          <path
            d={`M22 ${y}C15 ${y - 6} 6 ${y - 6} 3 ${y}c4 6 13 8 19 3Z`}
            stroke="var(--olive)"
            strokeWidth="1.2"
            fill="var(--olive-bg)"
          />
          <path
            d={`M22 ${y}C29 ${y - 6} 38 ${y - 6} 41 ${y}c-4 6-13 8-19 3Z`}
            stroke="var(--olive-deep)"
            strokeWidth="1.2"
            fill="var(--olive-bg)"
          />
        </g>
      ))}
    </svg>
  )
}

export function CalendarIcon({ className, size = 26 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="14" r="1.1" fill="currentColor" />
      <circle cx="12" cy="14" r="1.1" fill="currentColor" />
      <circle cx="16" cy="14" r="1.1" fill="currentColor" />
    </svg>
  )
}

export function PinIcon({ className, size = 26 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-7.1 7-12.4A7 7 0 0 0 5 8.6C5 13.9 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="8.6" r="2.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function PizzaIcon({ className, size = 26 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 3.5v17M12 3.5 5 8M12 3.5l7 4.5M12 20.5 5 16M12 20.5l7-4.5M3.5 12h17"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      <circle cx="12" cy="8" r="0.9" fill="currentColor" />
      <circle cx="15.3" cy="13.8" r="0.9" fill="currentColor" />
      <circle cx="8.7" cy="13.8" r="0.9" fill="currentColor" />
    </svg>
  )
}

export function TrophyIcon({ className, size = 26 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 4h10v6a5 5 0 0 1-10 0Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7 5H4a3 3 0 0 0 3 5M17 5h3a3 3 0 0 1-3 5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 15v3M9 21h6M9.5 18h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function CameraIcon({ className, size = 26 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12.5" r="3.3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function ItalyFlag({ className, size = 48 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.67}
      viewBox="0 0 45 30"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="15" height="30" fill="#009246" />
      <rect x="15" y="0" width="15" height="30" fill="#f1f2f1" />
      <rect x="30" y="0" width="15" height="30" fill="#ce2b37" />
      <rect x="0.75" y="0.75" width="43.5" height="28.5" fill="none" stroke="var(--line)" strokeWidth="1" />
    </svg>
  )
}

export function USAFlag({ className, size = 48 }) {
  const stripeHeight = 30 / 13
  const stripes = Array.from({ length: 13 }, (_, i) => (
    <rect
      key={i}
      x="0"
      y={i * stripeHeight}
      width="45"
      height={stripeHeight}
      fill={i % 2 === 0 ? '#b22234' : '#f1f2f1'}
    />
  ))
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.67}
      viewBox="0 0 45 30"
      aria-hidden="true"
    >
      {stripes}
      <rect x="0" y="0" width="18" height="16.15" fill="#3c3b6e" />
      {[3, 6.5, 10, 13.5].map((cy) =>
        [3, 7, 11, 15].map((cx) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.7" fill="#f1f2f1" />
        )),
      )}
      <rect x="0.75" y="0.75" width="43.5" height="28.5" fill="none" stroke="var(--line)" strokeWidth="1" />
    </svg>
  )
}

function Star({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.6 14.6 9l6 .9-4.3 4.1 1 5.9-5.3-2.8L6.7 20l1-5.9-4.3-4.1 6-.9Z"
        fill={filled ? 'var(--gold)' : 'none'}
        stroke="var(--gold)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function StarRating({ rating, max = 5 }) {
  const stars = Array.from({ length: max }, (_, i) => i < Math.round(rating))
  return (
    <div className="star-rating" aria-label={`${rating} out of ${max} stars`}>
      {stars.map((filled, i) => (
        <Star key={i} filled={filled} />
      ))}
    </div>
  )
}

export function MichelinStar({ className, size = 40, filled = true }) {
  const id = useId()
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <mask id={id}>
        <rect width="48" height="48" fill="#fff" />
        <path
          d="M24 18.5 25.6 21.3 28.8 21.3 27.2 24 28.8 26.7 25.6 26.7 24 29.5 22.4 26.7 19.2 26.7 20.8 24 19.2 21.3 22.4 21.3Z"
          fill="#000"
        />
      </mask>
      <g mask={`url(#${id})`} fill={filled ? 'var(--michelin)' : 'var(--line)'}>
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse key={angle} cx="24" cy="13" rx="7.5" ry="10.5" transform={`rotate(${angle} 24 24)`} />
        ))}
        <circle cx="24" cy="24" r="9" />
      </g>
    </svg>
  )
}

export function MichelinRating({ stars, max = 5, size = 40 }) {
  return (
    <div className="michelin-rating" aria-label={`${stars} out of ${max} Michelin stars`}>
      {Array.from({ length: Math.max(stars, max) }, (_, i) => (
        <MichelinStar key={i} size={size} filled={i < stars} />
      ))}
    </div>
  )
}

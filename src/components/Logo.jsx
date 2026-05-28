import { Link } from 'react-router-dom'

const LOGO_SRC = '/vibeZ-white-nobackground-01.png'
const LOGO_FOOTER_SRC = '/vibeZ-ngangwhite-background-01.png'
const LOGO_MISSION_SRC = '/vibeZ-ngang-01.png'

const LOGO_BY_VARIANT = {
  header: LOGO_SRC,
  footer: LOGO_FOOTER_SRC,
  horizontal: LOGO_MISSION_SRC,
  brand: LOGO_SRC,
  stacked: LOGO_SRC,
}

export default function Logo({ variant = 'header', className = '', linked = true }) {
  const heights = {
    header: 'h-14 sm:h-16',
    footer: 'h-14 sm:h-[72px]',
    horizontal: 'h-16 sm:h-20 md:h-24',
    brand: 'h-24 sm:h-28',
    stacked: 'h-20 sm:h-24',
  }

  const src = LOGO_BY_VARIANT[variant] ?? LOGO_SRC
  const heightClass = heights[variant] ?? heights.header

  const img = (
    <img
      src={src}
      alt="VibeZ Marketing Solution"
      className={`${heightClass} w-auto max-w-full object-contain object-left`}
      fetchPriority={variant === 'header' ? 'high' : undefined}
    />
  )

  if (!linked) {
    return <span className={`inline-block shrink-0 ${className}`}>{img}</span>
  }

  return (
    <Link to="/" className={`inline-block shrink-0 ${className}`} aria-label="VibeZ - Trang chủ">
      {img}
    </Link>
  )
}

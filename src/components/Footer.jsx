import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/services', label: 'Our Service' },
  { to: '/contact', label: 'Contact us' },
]

function SocialIcon({ children, label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded text-white/90 transition hover:text-white"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const { pathname } = useLocation()

  return (
    <footer className="bg-vibez-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="text-2xl font-extrabold">
            <span className="text-vibez-orange">Vibe</span>
            <span className="text-white">Z</span>
          </Link>
          <nav className="flex flex-wrap gap-6 text-sm font-medium">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={
                  pathname === to
                    ? 'text-vibez-orange'
                    : 'text-white hover:text-vibez-orange'
                }
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <SocialIcon label="YouTube">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.5V8.5l6.3 3.5-6.3 3.5z" />
            </svg>
          </SocialIcon>
          <SocialIcon label="Facebook">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.1c0-6.6-5.4-12-12-12S0 5.5 0 12.1c0 6 4.4 11 10.1 11.9v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.4l-.5 3.5h-2.9v8.4C19.6 23.1 24 18.1 24 12.1z" />
            </svg>
          </SocialIcon>
          <SocialIcon label="Twitter">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.9 2.3h3.5l-7.6 8.7 9 11.8h-7l-5.5-7.2-6.3 7.2H2.2l8.1-9.3L1.6 2.3h7.2l5 6.6 5.7-6.6zm-1.2 17.5h1.9L7.1 4.2H5.1l12.6 15.6z" />
            </svg>
          </SocialIcon>
          <SocialIcon label="Instagram">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.4.4 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.4.2-1.1.4-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.4-.4-1.1-.4-2.3-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .4-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 2.2c-3.1 0-3.5 0-4.7.1-1 .0-1.6.2-2 .3-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.4-.3 1-.3 2-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1 .2 1.6.3 2 .2.5.4.8.7 1.1.3.3.6.5 1.1.7.4.1 1 .3 2 .3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1 0 1.6-.2 2-.3.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.4.3-1 .3-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1-.2-1.6-.3-2-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.4-.1-1-.3-2-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
            </svg>
          </SocialIcon>
          <SocialIcon label="LinkedIn">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.4 2.4H3.6C2.5 2.4 1.6 3.3 1.6 4.4v16.8c0 1.1.9 2 2 2h16.8c1.1 0 2-.9 2-2V4.4c0-1.1-.9-2-2-2zM7.9 18.6H4.7V9.8h3.2v8.8zM6.3 8.5c-1 0-1.9-.8-1.9-1.9s.8-1.9 1.9-1.9 1.9.8 1.9 1.9-.8 1.9-1.9 1.9zm12.3 10.1h-3.2v-4.3c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v4.4H9.2V9.8h3.1v1.2h.04c.4-.8 1.5-1.6 3.1-1.6 3.3 0 3.9 2.2 3.9 5v4.2z" />
            </svg>
          </SocialIcon>
        </div>
        <p className="mt-8 text-center text-xs text-white/70">
          VibeZ @ 2024. All rights reserved
        </p>
      </div>
    </footer>
  )
}

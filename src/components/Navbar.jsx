import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/services', label: 'Our Service' },
  { to: '/contact', label: 'Contact us' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-vibez-orange">Vibe</span>
          <span className="text-gray-900">Z</span>
        </Link>
        <nav className="flex items-center gap-8 text-sm font-medium">
          {links.map(({ to, label }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={
                  active
                    ? 'text-vibez-orange'
                    : 'text-gray-800 hover:text-vibez-orange'
                }
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

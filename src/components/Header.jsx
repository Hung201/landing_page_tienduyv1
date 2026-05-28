import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data/navigation.js'
import Logo from './Logo.jsx'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-vibez-dark shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 sm:py-2.5">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map(({ to, label }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`nav-glow text-sm font-medium transition-colors duration-300 ${
                  active ? 'nav-glow-active text-vibez-orange' : 'text-white'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
        <nav className="flex flex-wrap justify-end gap-3 lg:hidden">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-glow text-xs font-medium ${pathname === to ? 'text-vibez-orange' : 'text-white'}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

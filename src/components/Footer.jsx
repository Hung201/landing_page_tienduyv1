import { Link } from 'react-router-dom'
import { FOOTER_MENU_LINKS, FOOTER_SERVICES } from '../data/navigation.js'
import { MESSENGER_URL } from '../config/contact.js'
import Logo from './Logo.jsx'

const HOTLINE = '123456789'

function PinIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
      />
      <circle cx="12" cy="10" r="2.5" strokeWidth={2} />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16v12H4V6Zm0 0 8 7 8-7"
      />
    </svg>
  )
}

function FooterCta({ href, line1, line2, external }) {
  const className =
    'block w-full max-w-[280px] rounded-2xl bg-gradient-to-b from-[#7ecdf5] to-[#5eb5ea] px-5 py-3.5 text-center text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition hover:brightness-105'

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <span className="block text-xs font-normal leading-snug">{line1}</span>
        <span className="mt-0.5 block text-sm font-bold leading-snug">{line2}</span>
      </a>
    )
  }

  return (
    <a href={href} className={className}>
      <span className="block text-xs font-normal leading-snug">{line1}</span>
      <span className="mt-0.5 block text-sm font-bold leading-snug">{line2}</span>
    </a>
  )
}

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: MESSENGER_URL,
    icon: (
      <path
        fill="currentColor"
        d="M14 8h2.5V5h-2c-2.2 0-3.5 1.3-3.5 3.5V11H8v3h3v8h3v-8h2.6l.4-3H14V8.6c0-.8.2-1.1 1.1-1.1Z"
      />
    ),
  },
  {
    label: 'Twitter',
    href: '#',
    icon: (
      <path
        fill="currentColor"
        d="M18.9 7.5h2.1l-6.5 7.4 7.6 9.6h-5.9l-4.6-6-5.3 6H4.4l7-8L4.5 7.5h6l4.2 5.5 4.8-5.5Z"
      />
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <path
        fill="currentColor"
        d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 4.8c2.5 0 2.8 0 3.8.1 1 .05 1.5.2 1.9.4.5.2.8.4 1.2.8.4.4.6.7.8 1.2.2.4.35.9.4 1.9.06 1 .1 1.3.1 3.8s0 2.8-.1 3.8c-.05 1-.2 1.5-.4 1.9a3.1 3.1 0 0 1-.8 1.2 3.1 3.1 0 0 1-1.2.8c-.4.2-.9.35-1.9.4-1 .06-1.3.1-3.8.1s-2.8 0-3.8-.1c-1-.05-1.5-.2-1.9-.4a3.1 3.1 0 0 1-1.2-.8 3.1 3.1 0 0 1-.8-1.2c-.2-.4-.35-.9-.4-1.9-.06-1-.1-1.3-.1-3.8s0-2.8.1-3.8c.05-1 .2-1.5.4-1.9.2-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.4-.2.9-.35 1.9-.4 1-.06 1.3-.1 3.8-.1Z"
      />
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <path
        fill="currentColor"
        d="M8 10v8H5v-8h3Zm1.5-3a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0ZM19 18v-4.2c0-2.2-1.2-3.2-2.8-3.2-1.3 0-1.9.7-2.2 1.2v-1h-3c0 .3 0 6 0 6h3v-4.4c0-.5 0-1.2 1-1.2s1 .7 1 1.3V18h3Z"
      />
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <path
        fill="currentColor"
        d="M21.6 8.2a2.5 2.5 0 0 0-1.8-1.8C17.8 6 12 6 12 6s-5.8 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 10.2 2 12 2 12s0 1.8.4 3.8a2.5 2.5 0 0 0 1.8 1.8C6.2 18 12 18 12 18s5.8 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-2 .4-3.8.4-3.8s0-1.8-.4-3.8ZM10 15V9l5 3-5 3Z"
      />
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a1118] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_120%_at_50%_38%,rgba(239,123,21,0.62)_0%,rgba(21,40,55,0.75)_42%,#0a1118_72%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4 xl:gap-14">
          <div>
            <Logo variant="footer" />
            <p className="mt-6 max-w-[300px] text-sm leading-relaxed text-white">
              Bạn có thể liên hệ với chúng tôi bằng bất cứ Kênh nào mà bạn có thể trao đổi
            </p>
            <ul className="mt-5 space-y-3.5 text-sm text-white">
              <li className="flex gap-2.5">
                <PinIcon />
                <span>Hòa Lạc, Hà Nội, Việt Nam</span>
              </li>
              <li className="flex gap-2.5">
                <MailIcon />
                <a href="mailto:admin@fpt.vn" className="hover:text-vibez-orange">
                  admin@fpt.vn
                </a>
              </li>
            </ul>
            <div className="mt-7 flex flex-col gap-3.5">
              <FooterCta
                href={MESSENGER_URL}
                line1="Liên hệ qua"
                line2="Facebook Official"
                external
              />
              <FooterCta href={`tel:${HOTLINE}`} line1="Gọi ngay Hotline" line2={HOTLINE} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold">Menu</h3>
            <ul className="mt-6 space-y-3.5 text-sm text-white">
              {FOOTER_MENU_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="nav-glow transition hover:text-vibez-orange">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">Dịch vụ của VibeZ</h3>
            <ul className="mt-6 space-y-3.5 text-sm text-white">
              {FOOTER_SERVICES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">Follow on Social Media</h3>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square min-h-[88px] rounded-[18px] bg-white sm:min-h-[100px]" />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/50 pt-7 sm:flex-row">
          <p className="text-xs text-white sm:text-sm">
            Copyright © 2026 VibeZ | All Rights Reserved
          </p>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-vibez-navy transition hover:opacity-90"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" aria-hidden>
                  {icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

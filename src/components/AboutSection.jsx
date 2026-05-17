import { Link } from 'react-router-dom'

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

export default function AboutSection({ variant = 'home' }) {
  if (variant === 'home') {
    return (
      <section className="bg-vibez-cream px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-block rounded-full bg-vibez-blue/30 px-8 py-2">
            <span className="text-lg font-semibold text-vibez-orange">About Us</span>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-gray-600 md:text-base">{LOREM}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-vibez-cream px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-vibez-blue/50" />
          <div className="rounded-full bg-vibez-blue/30 px-10 py-2">
            <span className="text-lg font-semibold text-vibez-orange">About Us</span>
          </div>
          <div className="h-px flex-1 bg-vibez-blue/50" />
        </div>
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="aspect-square w-full max-w-xs rounded-2xl bg-vibez-blue/40" />
            <div className="aspect-square w-full max-w-xs rounded-2xl bg-vibez-blue/40" />
          </div>
          <div>
            <p className="mb-4 text-sm leading-relaxed text-gray-700">{LOREM}</p>
            <p className="mb-4 text-sm leading-relaxed text-gray-700">{LOREM}</p>
            <p className="mb-8 text-sm leading-relaxed text-gray-700">{LOREM}</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-vibez-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Contact us
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

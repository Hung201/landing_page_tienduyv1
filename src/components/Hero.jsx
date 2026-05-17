import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="bg-vibez-cream px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">
          <div>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
              Transform Your Brand Into a{' '}
              <span className="text-vibez-orange">Digital Success Story</span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-gray-500 md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-vibez-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-vibez-blue-dark"
            >
              Get started
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="aspect-[4/3] w-full rounded-2xl bg-vibez-blue/40" aria-hidden />
        </div>
      </div>
    </section>
  )
}

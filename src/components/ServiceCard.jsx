import { Link } from 'react-router-dom'

const DESC =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

export default function ServiceCard({ title, align = 'left', showCta = false }) {
  return (
    <article
      className={`max-w-md rounded-2xl bg-vibez-card p-6 shadow-sm ${
        align === 'right' ? 'ml-auto' : align === 'left' ? 'mr-auto' : ''
      }`}
    >
      <div className="mb-4 h-10 w-10 rounded-lg bg-vibez-blue/60" aria-hidden />
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{DESC}</p>
      {showCta && (
        <>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{DESC}</p>
          <div className="mt-6 flex justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-vibez-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Get started
              <span aria-hidden>→</span>
            </Link>
          </div>
        </>
      )}
    </article>
  )
}

import { Link } from 'react-router-dom'
import SectionImage from './SectionImage.jsx'

export default function SplitSection({
  title,
  children,
  imagePosition = 'left',
  imageClassName = 'aspect-[4/3] w-full',
  button,
}) {
  const image = <SectionImage className={imageClassName} />
  const text = (
    <div className="flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">{children}</div>
      {button && (
        <div className="mt-6">
          {button.href ? (
            <Link
              to={button.href}
              className="inline-block rounded-full bg-vibez-orange px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {button.label}
            </Link>
          ) : (
            <button
              type="button"
              className="rounded-full bg-vibez-orange px-8 py-3 text-sm font-semibold text-white"
            >
              {button.label}
            </button>
          )}
        </div>
      )}
    </div>
  )

  return (
    <section className="px-6 py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
        {imagePosition === 'left' ? (
          <>
            {image}
            {text}
          </>
        ) : (
          <>
            {text}
            {image}
          </>
        )}
      </div>
    </section>
  )
}

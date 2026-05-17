import ServiceCard from './ServiceCard.jsx'

const SERVICES = [
  'Brand Strategy',
  'Digital Marketing',
  'Social media management',
  'Creative Design',
]

export default function ServicesSection({ variant = 'grid' }) {
  if (variant === 'staggered') {
    const aligns = ['left', 'right', 'left', 'right']
    return (
      <section className="bg-vibez-cream px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-4xl font-bold text-vibez-blue md:text-5xl">
            Our Service
          </h2>
          <div className="mt-14 flex flex-col gap-10">
            {SERVICES.map((title, i) => (
              <ServiceCard key={title} title={title} align={aligns[i]} showCta />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-vibez-cream px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold text-vibez-blue md:text-5xl">
          Our Service
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((title) => (
            <ServiceCard key={title} title={title} />
          ))}
        </div>
      </div>
    </section>
  )
}

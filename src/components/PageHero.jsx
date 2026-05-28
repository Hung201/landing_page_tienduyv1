export default function PageHero({ title, subtitle, variant = 'gradient' }) {
  const bg =
    variant === 'orange'
      ? 'bg-gradient-to-r from-vibez-orange to-[#d96a10]'
      : 'bg-gradient-to-b from-vibez-navy via-vibez-navy to-vibez-orange/70'

  return (
    <section className={`${bg} px-6 py-16 text-white md:py-20`}>
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-white/90">{subtitle}</p>}
      </div>
    </section>
  )
}

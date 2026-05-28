import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { SERVICES } from '../data/services.js'

function ServiceCard({ title, desc, price }) {
  return (
    <article className="text-left">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-vibez-card">
        <span className="absolute bottom-4 right-5 text-base font-bold text-gray-900 md:text-lg">
          {price}
        </span>
      </div>
      <h2 className="mt-5 text-sm font-extrabold uppercase leading-snug tracking-tight text-gray-900 md:text-[15px]">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-500">{desc}</p>
    </article>
  )
}

export default function ServicesPage() {
  const topRow = SERVICES.slice(0, 3)
  const bottomRow = SERVICES.slice(3)

  return (
    <Layout>
      <section className="bg-vibez-warm px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-base font-bold text-gray-900">Dịch vụ</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Giải pháp cho doanh nghiệp
          </h1>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
            {topRow.map((s) => (
              <ServiceCard key={s.id} title={s.title} desc={s.desc} price={s.price} />
            ))}
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-10 md:grid-cols-2 md:gap-8 lg:mt-12 lg:gap-12">
            {bottomRow.map((s) => (
              <ServiceCard key={s.id} title={s.title} desc={s.desc} price={s.price} />
            ))}
          </div>

          <Link
            to="/lien-he"
            className="mt-14 inline-block min-w-[280px] rounded-xl bg-[#9e9e9e] px-16 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-[#757575] md:mt-16"
          >
            Liên hệ
          </Link>
        </div>
      </section>
    </Layout>
  )
}

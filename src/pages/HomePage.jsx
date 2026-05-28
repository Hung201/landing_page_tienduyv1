import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { fetchNews, fetchServices } from '../lib/content.js'

function ImagePlaceholder({ className, label = 'THÊM ẢNH', dark = false }) {
  return (
    <div
      className={`flex items-center justify-center bg-vibez-card ${dark ? 'bg-vibez-card-dark' : ''} ${className}`}
      role="img"
      aria-label={label}
    >
      {label ? (
        <span className="rounded bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-600">
          {label}
        </span>
      ) : null}
    </div>
  )
}

function AboutCard({ label, className = '' }) {
  return (
    <div
      className={`w-[140px] shrink-0 overflow-hidden rounded-lg shadow-[0_8px_24px_rgba(21,40,55,0.12)] sm:w-[170px] md:w-[200px] ${className}`}
    >
      <div className="h-[200px] bg-vibez-sky-deep sm:h-[240px] md:h-[280px]" />
      <div className="bg-white px-4 py-6 text-center sm:px-5 sm:py-8">
        <p className="text-lg font-bold text-vibez-navy sm:text-xl md:text-2xl">{label}</p>
      </div>
    </div>
  )
}

function ServiceCard({ title, desc }) {
  return (
    <article className="group pb-4">
      <ImagePlaceholder className="aspect-[4/3] w-full rounded-md" label="" />
      <div className="relative z-10 mx-4 -mt-[4.5rem] rounded-md bg-[#e8e8e8] px-5 pb-5 pt-6 shadow-[0_4px_20px_rgba(0,0,0,0.1)] sm:-mt-20">
        <h3 className="text-sm font-extrabold uppercase leading-snug tracking-tight text-vibez-navy">
          {title}
        </h3>
        <p className="mt-3 text-xs leading-relaxed text-gray-600">{desc}</p>
        <Link
          to="/dich-vu"
          className="mt-5 block w-full rounded-md bg-[#a3a3a3] py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition hover:bg-vibez-navy"
        >
          Shop now
        </Link>
      </div>
    </article>
  )
}

export default function HomePage() {
  const [slide, setSlide] = useState(0)
  const [thumb, setThumb] = useState(0)
  const [services, setServices] = useState([])
  const [newsItems, setNewsItems] = useState([])

  useEffect(() => {
    Promise.all([fetchServices(), fetchNews()]).then(([s, n]) => {
      setServices(s)
      setNewsItems(n)
    })
  }, [])

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-vibez-beige px-4 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="lg:pt-4">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
                • Bạn đang tìm kiếm
              </p>
              <h1 className="mt-3 text-2xl font-extrabold uppercase leading-tight text-vibez-navy sm:text-3xl md:text-4xl">
                Giải pháp truyền thông
                <br />
                cho kinh doanh?
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-gray-700">
                VibeZ cam kết thấu hiểu và đồng hành cùng doanh nghiệp của bạn — từ chiến lược truyền
                thông đến triển khai thực tế, giúp thương hiệu phát triển bền vững trên nền tảng số.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/gioi-thieu"
                  className="rounded-md bg-vibez-navy px-6 py-3 text-xs font-bold uppercase tracking-wide text-white hover:opacity-90"
                >
                  Về chúng tôi
                </Link>
                <Link
                  to="/dich-vu"
                  className="rounded-md border-2 border-vibez-navy bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-vibez-navy hover:bg-white/80"
                >
                  Xem dịch vụ
                </Link>
              </div>
            </div>
            <ImagePlaceholder className="aspect-[4/3] w-full min-h-[220px] lg:aspect-square" label="" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setThumb(i)}
                className={`transition ${i === thumb ? 'ring-2 ring-vibez-navy/30' : ''}`}
              >
                <ImagePlaceholder
                  className="aspect-[3/4] w-full"
                  dark={i === thumb}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Slider */}
      <section className="bg-vibez-beige px-4 pb-12 sm:px-6">
        <div className="relative mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl bg-vibez-sky aspect-[21/7] min-h-[140px] sm:min-h-[180px]">
            <button
              type="button"
              onClick={() => setSlide((s) => (s === 0 ? 2 : s - 1))}
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-lg text-vibez-navy shadow"
              aria-label="Trước"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setSlide((s) => (s + 1) % 3)}
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-lg text-vibez-navy shadow"
              aria-label="Sau"
            >
              ›
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${i === slide ? 'bg-white shadow ring-2 ring-vibez-sky-deep/50' : 'bg-white/60'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-vibez-orange md:text-4xl">
            Về chúng tôi:
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-full max-w-4xl rounded-full bg-vibez-sky-deep" />
          <p className="mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-gray-800 md:text-base">
            Với những giải pháp chuyên sâu và tối ưu trong lĩnh vực Digital Marketing, cùng kinh nghiệm thực chiến và sự tận tâm trong từng dự án, VibeZ sẽ đáp ứng hiệu quả những yêu cầu khắt khe từ khách hàng và trở thành đối tác chiến lược của nhiều doanh nghiệp.
          </p>
          <div className="mt-16 flex items-start justify-center gap-6 sm:gap-12 md:gap-16">
            <AboutCard label="Xu hướng" className="mt-0" />
            <AboutCard label="Marketing" className="mt-14 sm:mt-20 md:mt-24" />
            <AboutCard label="Gen Z" className="mt-0" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-vibez-warm px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-lg font-bold text-vibez-orange md:text-xl">Dịch vụ của VibeZ</p>
          <h2 className="mt-3 text-3xl font-extrabold text-vibez-navy md:text-5xl">
            Giải Pháp Cho Doanh Nghiệp
          </h2>
          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {services.slice(0, 3).map((s) => (
              <ServiceCard key={s.id} title={s.title} desc={s.desc ?? s.description} />
            ))}
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:mx-auto lg:max-w-4xl lg:gap-10">
            {services.slice(3).map((s) => (
              <ServiceCard key={s.id} title={s.title} desc={s.desc ?? s.description} />
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="border-t border-gray-200 bg-white px-4 py-14 sm:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 inline-block bg-[#4a4a4a] px-6 py-3">
            <h2 className="text-sm font-bold uppercase tracking-wide text-white md:text-base">
              Bài viết liên quan
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {newsItems.slice(0, 4).map((n) => (
              <Link key={n.id} to={`/tin-tuc/${n.slug}`} className="group block">
                <ImagePlaceholder className="aspect-square w-full" label="" />
                <h3 className="mt-4 text-sm font-bold leading-snug text-vibez-navy group-hover:text-vibez-orange">
                  {n.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-4">{n.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

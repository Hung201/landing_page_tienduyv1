import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import PageLoader from '../components/PageLoader.jsx'
import { NewsCoverImage, NewsBodyHtml } from '../components/NewsCoverImage.jsx'
import { fetchNews } from '../lib/content.js'

const CAROUSEL_DOTS = 5
const VISIBLE_CARDS = 3

function NewsImage({ url, className = '', alt }) {
  return (
    <NewsCoverImage
      url={url}
      alt={alt}
      className={`rounded-2xl ${className}`}
    />
  )
}

function SectionDivider({ label }) {
  return (
    <div className="relative my-14 md:my-16">
      <div className="h-[3px] w-full bg-vibez-sky-deep" />
      <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-vibez-warm px-4 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
        {label}
      </h2>
    </div>
  )
}

function ReadMoreButton({ to }) {
  return (
    <Link
      to={to}
      className="mx-auto mt-6 inline-block border-2 border-gray-900 bg-white px-10 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-gray-900 hover:text-white"
    >
      Đọc tiếp
    </Link>
  )
}

export default function NewsPage() {
  const [slide, setSlide] = useState(0)
  const [page, setPage] = useState(1)
  const [news, setNews] = useState(null)

  useEffect(() => {
    fetchNews().then(setNews)
  }, [])

  if (!news) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    )
  }

  const featuredCarousel = news.length >= 3 ? news : news
  const [featuredArticle, ...listArticles] = news

  const visibleCards = Array.from({ length: Math.min(VISIBLE_CARDS, featuredCarousel.length) }, (_, i) => {
    const idx = (slide + i) % featuredCarousel.length
    return featuredCarousel[idx]
  })

  const prevSlide = () => setSlide((s) => (s === 0 ? CAROUSEL_DOTS - 1 : s - 1))
  const nextSlide = () => setSlide((s) => (s + 1) % CAROUSEL_DOTS)

  return (
    <Layout>
      <section className="bg-gradient-to-r from-vibez-dark via-vibez-navy to-vibez-orange px-6 py-14 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Tin tức</h1>
          <p className="mt-3 text-lg text-white/90">Xem những tin tức mới nhất từ chúng tôi</p>
        </div>
      </section>

      <section className="bg-vibez-warm px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-bold text-vibez-navy md:text-4xl">
            Tin Nổi Bật
          </h2>

          <div className="relative mt-10 md:mt-12">
            <button
              type="button"
              onClick={prevSlide}
              className="absolute -left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-xl text-gray-600 shadow-sm sm:left-0 md:-left-4"
              aria-label="Tin trước"
            >
              ‹
            </button>

            <div className="grid gap-6 px-8 sm:grid-cols-2 lg:grid-cols-3 lg:px-12">
              {visibleCards.map((item, i) => (
                <article
                  key={`${item.id}-${i}`}
                  className="overflow-hidden rounded-2xl bg-white p-4 shadow-md"
                >
                  <NewsImage url={item.featured_image_url} className="aspect-[4/3] w-full" alt={item.title} />
                  <h3 className="mt-4 text-left text-sm font-bold text-vibez-navy md:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-left text-xs leading-relaxed text-gray-600">
                    {item.excerpt}
                  </p>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute -right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-900 text-xl text-white shadow-sm sm:right-0 md:-right-4"
              aria-label="Tin sau"
            >
              ›
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: CAROUSEL_DOTS }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === slide ? 'bg-gray-700' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-vibez-warm px-4 pb-16 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-3xl">
          <SectionDivider label="Tin Khác" />

          {featuredArticle && (
            <article className="mb-14">
              <NewsImage
                url={featuredArticle.featured_image_url}
                className="aspect-[21/9] w-full min-h-[200px]"
                alt={featuredArticle.title}
              />
              <h3 className="mt-6 font-serif text-xl font-bold text-vibez-navy md:text-2xl">
                {featuredArticle.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                {featuredArticle.body ?? featuredArticle.excerpt}
              </p>
              <div className="text-center">
                <ReadMoreButton to={`/tin-tuc/${featuredArticle.slug}`} />
              </div>
            </article>
          )}

          <div className="space-y-14">
            {listArticles.map((item) => (
              <article key={item.id}>
                <NewsImage
                  url={item.featured_image_url}
                  className="aspect-[16/10] w-full min-h-[180px]"
                  alt={item.title}
                />
                <h3 className="mt-6 text-left text-lg font-bold text-vibez-navy">{item.title}</h3>
                <p className="mt-3 text-left text-sm leading-relaxed text-gray-700">
                  {item.body ?? item.excerpt}
                </p>
                <div className="text-center">
                  <ReadMoreButton to={`/tin-tuc/${item.slug}`} />
                </div>
              </article>
            ))}
          </div>

          <nav className="mt-14 flex items-center justify-center gap-1.5 sm:gap-2" aria-label="Phân trang">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-400"
              aria-label="Trang trước"
            >
              ‹
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                  page === p ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {p}
              </button>
            ))}
            <span className="px-1 text-gray-500">...</span>
            {[6, 7, 8].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                  page === p ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white"
              aria-label="Trang sau"
            >
              ›
            </button>
          </nav>
        </div>
      </section>
    </Layout>
  )
}

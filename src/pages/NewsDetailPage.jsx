import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionImage from '../components/SectionImage.jsx'
import { NEWS_ITEMS } from '../data/news.js'

export default function NewsDetailPage() {
  const { slug } = useParams()
  const article = NEWS_ITEMS.find((n) => n.slug === slug) ?? NEWS_ITEMS[0]

  return (
    <Layout>
      <PageHero title={article.title} />
      <p className="bg-gradient-to-b from-vibez-dark/90 to-vibez-orange/70 px-6 pb-6 text-right text-sm text-white/80">
        {article.date}
      </p>

      <article className="bg-vibez-cream px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <SectionImage className="my-10 aspect-video w-full" />
          {['LOREM IPSUM', 'LOREM IPSUM'].map((heading) => (
            <section key={heading} className="mb-10">
              <h2 className="text-xl font-bold uppercase text-gray-900">{heading}</h2>
              <SectionImage className="my-6 aspect-[21/9] w-full" />
              <p className="text-sm leading-relaxed text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>
          ))}
        </div>
      </article>

      <section className="bg-vibez-cream px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-gray-900">TIẾP TỤC ĐỌC</h2>
            <Link to="/tin-tuc" className="text-sm font-semibold text-vibez-orange hover:underline">
              Tất cả Tin →
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {NEWS_ITEMS.map((n) => (
              <Link key={n.id} to={`/tin-tuc/${n.slug}`} className="block">
                <SectionImage className="aspect-[4/3] w-full" />
                <h3 className="mt-4 font-bold text-gray-900">{n.title}</h3>
                <p className="mt-2 text-xs text-gray-500 line-clamp-2">{n.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import PageLoader from '../components/PageLoader.jsx'
import { NewsCoverImage, NewsBodyHtml } from '../components/NewsCoverImage.jsx'
import { fetchNewsBySlug } from '../lib/content.js'

export default function NewsDetailPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(undefined)

  useEffect(() => {
    setArticle(undefined)
    fetchNewsBySlug(slug).then(setArticle)
  }, [slug])

  if (article === undefined) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    )
  }

  if (!article) {
    return (
      <Layout>
        <div className="px-6 py-20 text-center">
          <p className="text-gray-600">Không tìm thấy bài viết.</p>
          <Link to="/tin-tuc" className="mt-4 inline-block text-vibez-orange">
            Quay lại tin tức
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="bg-gradient-to-r from-vibez-dark via-vibez-navy to-vibez-orange px-6 py-14 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-white md:text-4xl">{article.title}</h1>
          {article.date && (
            <p className="mt-3 text-sm text-white/80">{article.date}</p>
          )}
        </div>
      </section>

      <article className="bg-vibez-warm px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <NewsCoverImage
            url={article.featured_image_url}
            className="mb-8 aspect-video w-full rounded-2xl"
            alt={article.title}
          />
          <NewsBodyHtml html={article.body || article.excerpt} />
          <Link
            to="/tin-tuc"
            className="mt-10 inline-block text-sm font-semibold text-vibez-orange hover:underline"
          >
            ← Quay lại tin tức
          </Link>
        </div>
      </article>
    </Layout>
  )
}

import { useEffect, useState } from 'react'
import Layout from '../components/Layout.jsx'
import PageLoader from '../components/PageLoader.jsx'
import { fetchSupportContent } from '../lib/content.js'

function ChevronDown({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function FaqExpandItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-gray-800"
      >
        <span>{question}</span>
        <span className="shrink-0 text-2xl font-light leading-none text-gray-400">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-500">
          {answer}
        </p>
      )}
    </div>
  )
}

export default function SupportPage() {
  const [tab, setTab] = useState(0)
  const [content, setContent] = useState(null)

  useEffect(() => {
    fetchSupportContent().then(setContent)
  }, [])

  if (!content) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    )
  }

  const { faqTopIntro, faqTopItems, faqTabs, faqGroups } = content

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-r from-vibez-dark via-vibez-navy to-vibez-orange px-6 py-14 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Hỗ trợ khách hàng</h1>
          <p className="mt-3 text-lg text-white/90">Giải thích câu hỏi thường gặp</p>
        </div>
      </section>

      {/* Câu hỏi thường gặp — 2 cột */}
      <section className="bg-vibez-warm px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Lorem ipsum dolor
            </p>
            <h2 className="mt-2 text-2xl font-bold uppercase text-gray-900 md:text-3xl">
              Câu hỏi thường gặp
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{faqTopIntro}</p>
            <div className="mt-6 space-y-2">
              {faqTopItems.map((item) => (
                <details
                  key={item.id}
                  className="group rounded-lg border border-gray-200 bg-white"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-sm font-medium text-gray-900 [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition group-open:rotate-180" />
                  </summary>
                  <p className="border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
          <div
            className="aspect-square w-full min-h-[280px] rounded-2xl bg-vibez-card"
            role="img"
            aria-label="Ảnh minh họa"
          />
        </div>
      </section>

      {/* FAQ theo danh mục */}
      <section className="bg-vibez-warm px-4 pb-16 sm:px-6 md:pb-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:gap-12">
          <aside className="lg:w-56 lg:shrink-0">
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <ul className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-2">
                {faqTabs.map((t, i) => (
                  <li key={t.id} className="lg:w-full">
                    <button
                      type="button"
                      onClick={() => setTab(i)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-xs font-bold uppercase leading-snug transition sm:text-sm ${
                        tab === i
                          ? 'bg-vibez-orange text-white shadow-md'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">Questions</h2>
            <p className="mt-2 text-sm text-gray-500">{faqTabs[tab]?.label}</p>

            {faqGroups.map((group) => (
              <div key={group.id ?? group.title} className="mt-10">
                <h3 className="text-xl font-bold text-gray-900">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.question}>
                      <FaqExpandItem question={item.question} answer={item.answer} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

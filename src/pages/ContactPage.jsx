import { useState } from 'react'
import Layout from '../components/Layout.jsx'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-r from-vibez-dark via-vibez-navy to-vibez-orange px-6 py-14 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">Liên hệ</h1>
          <p className="mt-3 text-lg text-white/90">Hãy để lại thông tin, chúng tôi sẽ phản hồi sớm</p>
        </div>
      </section>

      {/* Form + ảnh */}
      <section className="bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div
            className="flex aspect-square w-full items-center justify-center rounded-2xl bg-vibez-card lg:sticky lg:top-28"
            role="img"
            aria-label="Ảnh liên hệ"
          >
            <span className="text-sm font-medium text-gray-500">Ảnh liên hệ</span>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Gửi tin nhắn</h2>

            <div className="mt-6">
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-800">
                Họ tên
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-vibez-orange focus:ring-1 focus:ring-vibez-orange"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-vibez-orange focus:ring-1 focus:ring-vibez-orange"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-800">
                Nội dung
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-vibez-orange focus:ring-1 focus:ring-vibez-orange"
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-xl bg-vibez-orange py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90 sm:w-auto sm:px-12"
            >
              Gửi liên hệ
            </button>
          </form>
        </div>
      </section>
    </Layout>
  )
}

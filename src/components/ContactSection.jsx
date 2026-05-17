import { useState } from 'react'

function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-vibez-blue/80 text-gray-900">
        {icon}
      </div>
      <div>
        <p className="font-bold text-gray-900">{label}</p>
        <p className="text-sm text-gray-800">{value}</p>
      </div>
    </div>
  )
}

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Cảm ơn bạn! Tin nhắn đã được gửi (demo).')
    setForm({ name: '', email: '', company: '', message: '' })
  }

  return (
    <section className="bg-vibez-orange px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
          Lets Work Together
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <ContactItem
              label="Email"
              value="hello@gmail.com"
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
            />
            <ContactItem
              label="Phone"
              value="012345678"
              icon={
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
            />
            <div className="rounded-2xl bg-vibez-blue p-6 text-white">
              <h3 className="text-lg font-bold">Why Choose Us?</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
                <li>Reason 1</li>
                <li>Reason 2</li>
                <li>Reason 3</li>
                <li>Reason 4</li>
              </ul>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-8 shadow-lg"
          >
            {[
              { name: 'name', label: 'Your Name', type: 'text' },
              { name: 'email', label: 'Email Address', type: 'email' },
              { name: 'company', label: 'Company Name', type: 'text' },
            ].map(({ name, label, type }) => (
              <div key={name} className="mb-5">
                <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  required
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-vibez-blue focus:ring-1 focus:ring-vibez-blue"
                />
              </div>
            ))}
            <div className="mb-6">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-vibez-blue focus:ring-1 focus:ring-vibez-blue"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-vibez-blue-dark py-3 text-sm font-semibold text-white transition hover:bg-vibez-blue"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

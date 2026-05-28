export function AdminPageTitle({ title, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {children}
    </div>
  )
}

export function AdminCard({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  )
}

export const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-vibez-orange'

export function BtnPrimary({ children, ...props }) {
  return (
    <button
      type="button"
      className="rounded-lg bg-vibez-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  )
}

export function BtnDanger({ children, ...props }) {
  return (
    <button
      type="button"
      className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
      {...props}
    >
      {children}
    </button>
  )
}

export default function SectionImage({ className = '', label = 'Ảnh minh họa' }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-vibez-navy/10 to-vibez-navy/20 ${className}`}
      role="img"
      aria-label={label}
    >
      <span className="text-sm font-medium text-vibez-navy/40">{label}</span>
    </div>
  )
}

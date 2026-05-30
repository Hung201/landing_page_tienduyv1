export function NewsCoverImage({ url, className = '', alt = 'Ảnh tin tức' }) {
  if (url) {
    return (
      <img
        src={url}
        alt={alt}
        className={`object-cover ${className}`}
        loading="lazy"
      />
    )
  }

  return (
    <div
      className={`bg-[#cde7ff] ${className}`}
      role="img"
      aria-label={alt}
    />
  )
}

export function NewsBodyHtml({ html, className = '' }) {
  if (!html) return null

  const isHtml = /<[a-z][\s\S]*>/i.test(html)

  if (!isHtml) {
    return (
      <p className={`whitespace-pre-wrap text-sm leading-relaxed text-gray-700 md:text-base ${className}`}>
        {html}
      </p>
    )
  }

  return (
    <div
      className={`news-body prose prose-sm max-w-none text-gray-700 md:prose-base ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

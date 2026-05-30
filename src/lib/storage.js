import { supabase } from './supabase.js'

const BUCKET = 'news-images'

function formatStorageError(error) {
  const msg = error?.message ?? ''
  if (msg.includes('Bucket not found') || error?.error === 'Bucket not found') {
    return (
      'Chưa có bucket "news-images" trên Supabase. Vào SQL Editor và chạy file supabase/migrations/add_news_featured_image.sql'
    )
  }
  return msg || 'Upload ảnh thất bại'
}

export async function uploadNewsImage(file, slug) {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const safeSlug = (slug || 'post').replace(/[^a-z0-9-]/gi, '-').slice(0, 60)
  const path = `${safeSlug}/${Date.now()}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    throw new Error(formatStorageError(error))
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

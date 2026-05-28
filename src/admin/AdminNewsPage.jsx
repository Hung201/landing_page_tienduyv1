import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { slugify } from './slugify.js'
import { AdminCard, AdminPageTitle, BtnDanger, BtnPrimary, Field, inputClass } from './ui.jsx'

const empty = {
  slug: '',
  title: '',
  excerpt: '',
  body: '',
  date_display: '',
  published: true,
  featured: false,
  sort_order: 0,
}

export default function AdminNewsPage() {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('news_posts')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) setMsg(error.message)
    else setRows(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const startNew = () => {
    setEditingId(null)
    setForm({ ...empty, sort_order: rows.length })
    setMsg('')
  }

  const startEdit = (row) => {
    setEditingId(row.id)
    setForm({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt ?? '',
      body: row.body ?? '',
      date_display: row.date_display ?? '',
      published: row.published,
      featured: row.featured,
      sort_order: row.sort_order ?? 0,
    })
    setMsg('')
  }

  const save = async (e) => {
    e.preventDefault()
    setMsg('')
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      updated_at: new Date().toISOString(),
    }

    const { error } = editingId
      ? await supabase.from('news_posts').update(payload).eq('id', editingId)
      : await supabase.from('news_posts').insert(payload)

    if (error) {
      setMsg(error.message)
      return
    }
    setMsg('Đã lưu.')
    startNew()
    load()
  }

  const remove = async (id) => {
    if (!confirm('Xóa bài viết này?')) return
    const { error } = await supabase.from('news_posts').delete().eq('id', id)
    if (error) setMsg(error.message)
    else load()
  }

  return (
    <div>
      <AdminPageTitle title="Tin tức">
        <BtnPrimary onClick={startNew}>+ Bài mới</BtnPrimary>
      </AdminPageTitle>
      {msg && <p className="mb-4 text-sm text-vibez-orange">{msg}</p>}

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard>
          <h2 className="mb-4 font-bold">{editingId ? 'Sửa bài' : 'Thêm bài'}</h2>
          <form onSubmit={save}>
            <Field label="Tiêu đề">
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
            </Field>
            <Field label="Slug (URL)">
              <input
                className={inputClass}
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder={slugify(form.title)}
              />
            </Field>
            <Field label="Mô tả ngắn">
              <textarea
                className={inputClass}
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              />
            </Field>
            <Field label="Nội dung">
              <textarea
                className={inputClass}
                rows={5}
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              />
            </Field>
            <Field label="Ngày hiển thị">
              <input
                className={inputClass}
                value={form.date_display}
                onChange={(e) => setForm((f) => ({ ...f, date_display: e.target.value }))}
                placeholder="May 22, 2026"
              />
            </Field>
            <div className="mb-4 flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                />
                Đã xuất bản
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                />
                Nổi bật
              </label>
            </div>
            <Field label="Thứ tự">
              <input
                type="number"
                className={inputClass}
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
              />
            </Field>
            <BtnPrimary type="submit">Lưu</BtnPrimary>
          </form>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-4 font-bold">Danh sách ({rows.length})</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Đang tải...</p>
          ) : (
            <ul className="max-h-[600px] space-y-2 overflow-y-auto">
              {rows.map((row) => (
                <li
                  key={row.id}
                  className="flex items-start justify-between gap-2 rounded-lg border border-gray-100 p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900">{row.title}</p>
                    <p className="text-xs text-gray-500">/{row.slug}</p>
                    {!row.published && (
                      <span className="text-xs text-red-600">Ẩn</span>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <BtnPrimary onClick={() => startEdit(row)}>Sửa</BtnPrimary>
                    <BtnDanger onClick={() => remove(row.id)}>Xóa</BtnDanger>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>
      </div>
    </div>
  )
}

import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { AdminCard, AdminPageTitle, BtnDanger, BtnPrimary, Field, inputClass } from './ui.jsx'

const empty = { title: '', price: '$2.000', description: '', sort_order: 0 }

export default function AdminServicesPage() {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.from('services').select('*').order('sort_order')
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
  }

  const startEdit = (row) => {
    setEditingId(row.id)
    setForm({
      title: row.title,
      price: row.price,
      description: row.description ?? '',
      sort_order: row.sort_order ?? 0,
    })
  }

  const save = async (e) => {
    e.preventDefault()
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error } = editingId
      ? await supabase.from('services').update(payload).eq('id', editingId)
      : await supabase.from('services').insert(payload)
    if (error) setMsg(error.message)
    else {
      setMsg('Đã lưu.')
      startNew()
      load()
    }
  }

  const remove = async (id) => {
    if (!confirm('Xóa dịch vụ này?')) return
    await supabase.from('services').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <AdminPageTitle title="Dịch vụ">
        <BtnPrimary onClick={startNew}>+ Dịch vụ mới</BtnPrimary>
      </AdminPageTitle>
      {msg && <p className="mb-4 text-sm text-vibez-orange">{msg}</p>}

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard>
          <form onSubmit={save}>
            <Field label="Tên dịch vụ">
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
            </Field>
            <Field label="Giá">
              <input
                className={inputClass}
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              />
            </Field>
            <Field label="Mô tả">
              <textarea
                className={inputClass}
                rows={4}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </Field>
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
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <ul className="space-y-2">
              {rows.map((row) => (
                <li
                  key={row.id}
                  className="flex justify-between gap-2 rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{row.title}</p>
                    <p className="text-xs text-gray-500">{row.price}</p>
                  </div>
                  <div className="flex gap-2">
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

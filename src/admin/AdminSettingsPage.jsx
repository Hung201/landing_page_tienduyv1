import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { AdminCard, AdminPageTitle, BtnPrimary, Field, inputClass } from './ui.jsx'

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    mission_text: '',
    faq_top_intro: '',
    contact_address: '',
    contact_email: '',
    hotline: '',
  })
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setForm(data)
      })
  }, [])

  const save = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('site_settings')
      .upsert({ id: 1, ...form, updated_at: new Date().toISOString() })
    setMsg(error ? error.message : 'Đã lưu cài đặt.')
  }

  return (
    <div>
      <AdminPageTitle title="Cài đặt site" />
      {msg && <p className="mb-4 text-sm text-vibez-orange">{msg}</p>}
      <AdminCard className="max-w-2xl">
        <form onSubmit={save}>
          <Field label="Sứ mệnh (trang Giới thiệu)">
            <textarea
              className={inputClass}
              rows={4}
              value={form.mission_text ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, mission_text: e.target.value }))}
            />
          </Field>
          <Field label="Intro FAQ đầu trang Hỗ trợ">
            <textarea
              className={inputClass}
              rows={3}
              value={form.faq_top_intro ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, faq_top_intro: e.target.value }))}
            />
          </Field>
          <Field label="Địa chỉ (footer)">
            <input
              className={inputClass}
              value={form.contact_address ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, contact_address: e.target.value }))}
            />
          </Field>
          <Field label="Email">
            <input
              className={inputClass}
              value={form.contact_email ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, contact_email: e.target.value }))}
            />
          </Field>
          <Field label="Hotline">
            <input
              className={inputClass}
              value={form.hotline ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, hotline: e.target.value }))}
            />
          </Field>
          <BtnPrimary type="submit">Lưu cài đặt</BtnPrimary>
        </form>
      </AdminCard>
    </div>
  )
}

import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { AdminCard, AdminPageTitle } from './ui.jsx'

export default function AdminContactsPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    setRows(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div>
      <AdminPageTitle title="Tin nhắn liên hệ" />
      <AdminCard>
        {loading ? (
          <p>Đang tải...</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-gray-500">Chưa có tin nhắn.</p>
        ) : (
          <ul className="space-y-4">
            {rows.map((row) => (
              <li key={row.id} className="rounded-lg border border-gray-100 p-4">
                <p className="font-bold text-gray-900">{row.name}</p>
                <p className="text-sm text-vibez-orange">{row.email}</p>
                <p className="mt-2 text-sm text-gray-700">{row.message}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {new Date(row.created_at).toLocaleString('vi-VN')}
                </p>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </div>
  )
}

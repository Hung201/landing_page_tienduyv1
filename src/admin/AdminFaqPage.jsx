import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { AdminCard, AdminPageTitle, BtnDanger, BtnPrimary, Field, inputClass } from './ui.jsx'

export default function AdminFaqPage() {
  const [tabs, setTabs] = useState([])
  const [groups, setGroups] = useState([])
  const [items, setItems] = useState([])
  const [topItems, setTopItems] = useState([])
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    const [t, g, i, top] = await Promise.all([
      supabase.from('faq_tabs').select('*').order('sort_order'),
      supabase.from('faq_groups').select('*').order('sort_order'),
      supabase.from('faq_items').select('*').order('sort_order'),
      supabase.from('faq_top_items').select('*').order('sort_order'),
    ])
    if (t.error) setMsg(t.error.message)
    else {
      setTabs(t.data ?? [])
      setGroups(g.data ?? [])
      setItems(i.data ?? [])
      setTopItems(top.data ?? [])
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const addTab = async () => {
    const label = prompt('Tên tab FAQ:')
    if (!label) return
    await supabase.from('faq_tabs').insert({ label, sort_order: tabs.length })
    load()
  }

  const addGroup = async () => {
    const title = prompt('Tên nhóm FAQ:')
    if (!title) return
    await supabase.from('faq_groups').insert({ title, sort_order: groups.length })
    load()
  }

  const addItem = async (groupId) => {
    const question = prompt('Câu hỏi:')
    if (!question) return
    const answer = prompt('Trả lời:') ?? ''
    await supabase.from('faq_items').insert({ group_id: groupId, question, answer, sort_order: 0 })
    load()
  }

  const addTopItem = async () => {
    const question = prompt('Câu hỏi (accordion đầu trang):')
    if (!question) return
    const answer = prompt('Trả lời:') ?? ''
    await supabase.from('faq_top_items').insert({ question, answer, sort_order: topItems.length })
    load()
  }

  const del = async (table, id) => {
    if (!confirm('Xóa?')) return
    await supabase.from(table).delete().eq('id', id)
    load()
  }

  return (
    <div>
      <AdminPageTitle title="FAQ / Hỗ trợ" />
      {msg && <p className="mb-4 text-sm text-red-600">{msg}</p>}

      <AdminCard className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold">Accordion đầu trang (Câu hỏi thường gặp)</h2>
          <BtnPrimary onClick={addTopItem}>+ Câu hỏi</BtnPrimary>
        </div>
        <ul className="space-y-2">
          {topItems.map((row) => (
            <li key={row.id} className="flex justify-between rounded border p-2 text-sm">
              <span>{row.question}</span>
              <BtnDanger onClick={() => del('faq_top_items', row.id)}>Xóa</BtnDanger>
            </li>
          ))}
        </ul>
      </AdminCard>

      <AdminCard className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold">Tab sidebar</h2>
          <BtnPrimary onClick={addTab}>+ Tab</BtnPrimary>
        </div>
        <ul className="space-y-2">
          {tabs.map((row) => (
            <li key={row.id} className="flex justify-between rounded border p-2 text-sm">
              <span>{row.label}</span>
              <BtnDanger onClick={() => del('faq_tabs', row.id)}>Xóa</BtnDanger>
            </li>
          ))}
        </ul>
      </AdminCard>

      <AdminCard>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold">Nhóm & câu hỏi</h2>
          <BtnPrimary onClick={addGroup}>+ Nhóm</BtnPrimary>
        </div>
        {groups.map((group) => (
          <div key={group.id} className="mb-6 rounded-lg border border-gray-100 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">{group.title}</h3>
              <div className="flex gap-2">
                <BtnPrimary onClick={() => addItem(group.id)}>+ Câu hỏi</BtnPrimary>
                <BtnDanger onClick={() => del('faq_groups', group.id)}>Xóa nhóm</BtnDanger>
              </div>
            </div>
            <ul className="space-y-2 pl-2">
              {items
                .filter((i) => i.group_id === group.id)
                .map((item) => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <span className="mr-2">{item.question}</span>
                    <BtnDanger onClick={() => del('faq_items', item.id)}>Xóa</BtnDanger>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </AdminCard>
    </div>
  )
}

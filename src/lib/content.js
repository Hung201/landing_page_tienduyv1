import { supabase, isSupabaseConfigured } from './supabase.js'
import { NEWS_ITEMS } from '../data/news.js'
import { SERVICES } from '../data/services.js'
import {
  FAQ_GROUPS,
  FAQ_TABS,
  FAQ_TOP_INTRO,
  FAQ_TOP_ITEMS,
} from '../data/support.js'

const DEFAULT_SETTINGS = {
  mission_text:
    'Đội ngũ sáng lập của VibeZ là sự kết hợp của năm thành viên với chuyên môn bổ trợ lẫn nhau, tạo thành một bộ máy quản trị toàn diện từ chiến lược, vận hành, sản phẩm đến tài chính và truyền thông.',
  faq_top_intro: FAQ_TOP_INTRO,
  contact_address: 'Hòa Lạc, Hà Nội, Việt Nam',
  contact_email: 'admin@fpt.vn',
  hotline: '123456789',
}

function mapNewsRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? '',
    body: row.body ?? '',
    date: row.date_display ?? '',
    featured_image_url: row.featured_image_url ?? '',
    published: row.published,
    featured: row.featured,
    sort_order: row.sort_order,
  }
}

function mapServiceRow(row) {
  return {
    id: row.id,
    title: row.title,
    price: row.price,
    desc: row.description ?? '',
    description: row.description ?? '',
    sort_order: row.sort_order,
  }
}

export async function fetchNews({ includeUnpublished = false } = {}) {
  if (!isSupabaseConfigured) {
    return NEWS_ITEMS.map((n, i) => ({
      ...n,
      id: n.id ?? i,
      published: true,
      featured: i < 3,
      sort_order: i,
    }))
  }

  let query = supabase.from('news_posts').select('*').order('sort_order', { ascending: true })
  if (!includeUnpublished) {
    query = query.eq('published', true)
  }

  const { data, error } = await query
  if (error) throw error
  return (data ?? []).map(mapNewsRow)
}

export async function fetchNewsBySlug(slug) {
  const all = await fetchNews({ includeUnpublished: true })
  return all.find((n) => n.slug === slug) ?? null
}

export async function fetchServices() {
  if (!isSupabaseConfigured) {
    return SERVICES.map((s, i) => ({ ...s, id: s.id ?? i, sort_order: i }))
  }

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapServiceRow)
}

export async function fetchSiteSettings() {
  if (!isSupabaseConfigured) return { ...DEFAULT_SETTINGS }

  const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle()
  if (error) throw error
  return { ...DEFAULT_SETTINGS, ...data }
}

export async function fetchSupportContent() {
  if (!isSupabaseConfigured) {
    return {
      faqTopIntro: FAQ_TOP_INTRO,
      faqTopItems: FAQ_TOP_ITEMS,
      faqTabs: FAQ_TABS.map((label, i) => ({ id: String(i), label, sort_order: i })),
      faqGroups: FAQ_GROUPS,
    }
  }

  const [topItemsRes, tabsRes, groupsRes, itemsRes, settingsRes] = await Promise.all([
    supabase.from('faq_top_items').select('*').order('sort_order'),
    supabase.from('faq_tabs').select('*').order('sort_order'),
    supabase.from('faq_groups').select('*').order('sort_order'),
    supabase.from('faq_items').select('*').order('sort_order'),
    fetchSiteSettings(),
  ])

  if (topItemsRes.error) throw topItemsRes.error
  if (tabsRes.error) throw tabsRes.error
  if (groupsRes.error) throw groupsRes.error
  if (itemsRes.error) throw itemsRes.error

  const itemsByGroup = (itemsRes.data ?? []).reduce((acc, item) => {
    const list = acc[item.group_id] ?? []
    list.push({ question: item.question, answer: item.answer })
    acc[item.group_id] = list
    return acc
  }, {})

  const faqGroups = (groupsRes.data ?? []).map((g) => ({
    id: g.id,
    title: g.title,
    items: itemsByGroup[g.id] ?? [],
  }))

  return {
    faqTopIntro: settingsRes.faq_top_intro ?? FAQ_TOP_INTRO,
    faqTopItems: (topItemsRes.data ?? []).map((r) => ({
      id: r.id,
      question: r.question,
      answer: r.answer,
    })),
    faqTabs: (tabsRes.data ?? []).map((t) => ({
      id: t.id,
      label: t.label,
      sort_order: t.sort_order,
    })),
    faqGroups,
  }
}

export async function submitContactForm({ name, email, message }) {
  if (!isSupabaseConfigured) return { ok: true }

  const { error } = await supabase.from('contact_submissions').insert({ name, email, message })
  if (error) throw error
  return { ok: true }
}

export async function checkIsAdmin() {
  if (!isSupabaseConfigured || !supabase) return false

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (error) return false
  return data?.role === 'admin'
}

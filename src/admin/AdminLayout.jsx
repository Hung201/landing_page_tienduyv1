import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const links = [
  { to: '/admin', end: true, label: 'Tổng quan' },
  { to: '/admin/news', label: 'Tin tức' },
  { to: '/admin/services', label: 'Dịch vụ' },
  { to: '/admin/faq', label: 'FAQ / Hỗ trợ' },
  { to: '/admin/settings', label: 'Cài đặt site' },
  { to: '/admin/contacts', label: 'Liên hệ (form)' },
]

export default function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="flex w-56 shrink-0 flex-col bg-vibez-dark text-white">
        <div className="border-b border-white/10 px-4 py-5">
          <p className="text-lg font-bold text-vibez-orange">VibeZ</p>
          <p className="text-xs text-white/70">Quản trị nội dung</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {links.map(({ to, end, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-vibez-orange text-white' : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mb-2 block rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Xem website ↗
          </a>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/80 hover:bg-white/10"
          >
            Đăng xuất
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}

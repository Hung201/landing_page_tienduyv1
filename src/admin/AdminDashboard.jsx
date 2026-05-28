import { Link } from 'react-router-dom'
import { AdminCard, AdminPageTitle } from './ui.jsx'

const items = [
  { to: '/admin/news', title: 'Tin tức', desc: 'Thêm, sửa, ẩn bài viết tin tức' },
  { to: '/admin/services', title: 'Dịch vụ', desc: 'Quản lý gói dịch vụ và giá' },
  { to: '/admin/faq', title: 'FAQ', desc: 'Câu hỏi thường gặp trang Hỗ trợ' },
  { to: '/admin/settings', title: 'Cài đặt', desc: 'Liên hệ, sứ mệnh, intro FAQ' },
  { to: '/admin/contacts', title: 'Form liên hệ', desc: 'Xem tin nhắn khách gửi' },
]

export default function AdminDashboard() {
  return (
    <div>
      <AdminPageTitle title="Tổng quan" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.to} to={item.to}>
            <AdminCard className="transition hover:border-vibez-orange hover:shadow-md">
              <h2 className="font-bold text-vibez-navy">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
            </AdminCard>
          </Link>
        ))}
      </div>
    </div>
  )
}

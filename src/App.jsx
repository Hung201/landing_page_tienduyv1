import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import SupportPage from './pages/SupportPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import NewsDetailPage from './pages/NewsDetailPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { AdminGuestRoute, AdminProtectedRoute } from './admin/AdminRoute.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import AdminLoginPage from './admin/AdminLoginPage.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import AdminNewsPage from './admin/AdminNewsPage.jsx'
import AdminServicesPage from './admin/AdminServicesPage.jsx'
import AdminFaqPage from './admin/AdminFaqPage.jsx'
import AdminSettingsPage from './admin/AdminSettingsPage.jsx'
import AdminContactsPage from './admin/AdminContactsPage.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<AboutPage />} />
        <Route path="/dich-vu" element={<ServicesPage />} />
        <Route path="/ho-tro" element={<SupportPage />} />
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route path="/tin-tuc/:slug" element={<NewsDetailPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/about" element={<Navigate to="/gioi-thieu" replace />} />
        <Route path="/services" element={<Navigate to="/dich-vu" replace />} />
        <Route path="/contact" element={<Navigate to="/lien-he" replace />} />

        <Route path="/admin/login" element={<AdminGuestRoute />}>
          <Route index element={<AdminLoginPage />} />
        </Route>
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="news" element={<AdminNewsPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="faq" element={<AdminFaqPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="contacts" element={<AdminContactsPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

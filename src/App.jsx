import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import SupportPage from './pages/SupportPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import NewsDetailPage from './pages/NewsDetailPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

export default function App() {
  return (
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
    </Routes>
  )
}

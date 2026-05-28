import Header from './Header.jsx'
import Footer from './Footer.jsx'
import FloatingContact from './FloatingContact.jsx'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-vibez-cream">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
    </div>
  )
}

import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import FloatingContact from './FloatingContact.jsx'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
    </div>
  )
}

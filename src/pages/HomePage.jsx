import Layout from '../components/Layout.jsx'
import Hero from '../components/Hero.jsx'
import AboutSection from '../components/AboutSection.jsx'
import ServicesSection from '../components/ServicesSection.jsx'
import ContactSection from '../components/ContactSection.jsx'

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <AboutSection variant="home" />
      <ServicesSection variant="grid" />
      <ContactSection />
    </Layout>
  )
}

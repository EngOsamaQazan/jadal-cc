import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TrustStrip, WhyJadal } from './components/Why'
import { HowItWorks, Plans } from './components/HowPlans'
import { Contact, Footer } from './components/Contact'

export default function App() {
  return (
    <div className="min-h-svh bg-ink text-fg">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <WhyJadal />
        <HowItWorks />
        <Plans />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

import FloatingParticles from './components/FloatingParticles'
import AudioPlayer from './components/AudioPlayer'
import HeroSection from './components/HeroSection'
import WishesSection from './components/WishesSection'
import PhotoGallery from './components/PhotoGallery'
import MiniGame from './components/MiniGame'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  return (
    <div className="app-wrapper">
      <FloatingParticles />
      <AudioPlayer />
      <main>
        <HeroSection />
        <WishesSection />
        <PhotoGallery />
        <MiniGame />
        <Footer />
      </main>
    </div>
  )
}

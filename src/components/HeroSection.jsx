import { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'
import './HeroSection.css'

const CONFETTI_COLORS = ['#8b5cf6','#22d3ee','#f59e0b','#ec4899','#10b981','#a78bfa','#67e8f9']

function useCountUp(target, duration = 2000, delay = 600) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const steps = 60
      const increment = target / steps
      let current = 0
      let step = 0
      const timer = setInterval(() => {
        step++
        current = Math.min(Math.round(increment * step), target)
        setCount(current)
        if (current >= target) clearInterval(timer)
      }, duration / steps)
      return () => clearInterval(timer)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, duration, delay])
  return count
}

export default function HeroSection() {
  const [confetti, setConfetti] = useState(false)
  const [win, setWin]           = useState({ w: 0, h: 0 })
  const [phase, setPhase]       = useState(0) // 0=hidden, 1=subtitle, 2=name, 3=age, 4=tagline
  const age = useCountUp(16, 1400, 1200)

  useEffect(() => {
    const handleResize = () => setWin({ w: window.innerWidth, h: window.innerHeight })
    handleResize()
    window.addEventListener('resize', handleResize)

    // Staggered reveal
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1100),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => { setConfetti(true); setTimeout(() => setConfetti(false), 6000) }, 2800),
    ]
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const scrollDown = () => {
    const next = document.querySelector('#wishes')
    if (next) next.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      {confetti && (
        <Confetti
          width={win.w} height={win.h}
          colors={CONFETTI_COLORS}
          numberOfPieces={250}
          gravity={0.25}
          recycle={false}
          style={{ position: 'fixed', zIndex: 100 }}
        />
      )}

      {/* Background ring decorations */}
      <div className="hero-ring hero-ring-1" aria-hidden="true" />
      <div className="hero-ring hero-ring-2" aria-hidden="true" />
      <div className="hero-ring hero-ring-3" aria-hidden="true" />

      <div className="hero-content">
        <div className={`hero-greeting ${phase >= 1 ? 'visible' : ''}`}>
          <span className="greeting-line" />
          <span className="greeting-text">✨ Selamat Ulang Tahun ✨</span>
          <span className="greeting-line" />
        </div>

        <div className={`hero-name-block ${phase >= 2 ? 'visible' : ''}`}>
          <h1 className="hero-name">
            <span className="name-first">Rifqi</span>
            <span className="name-last">Aizul Akbar</span>
          </h1>
        </div>

        <div className={`hero-age-block ${phase >= 3 ? 'visible' : ''}`}>
          <div className="age-badge">
            <span className="age-num">{age}</span>
            <div className="age-label">
              <span className="age-years">Tahun</span>
              <span className="age-sub">Penuh Keajaiban</span>
            </div>
          </div>
        </div>

        <p className={`hero-tagline ${phase >= 4 ? 'visible' : ''}`}>
          Semoga setiap langkahmu diiringi cahaya, <br />
          dan hatimu selalu dipenuhi cinta 💜
        </p>

        <div className={`hero-cta ${phase >= 4 ? 'visible' : ''}`}>
          <button className="cta-btn" onClick={scrollDown}>
            <span>Lihat Pesanku</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 10l5 5 5-5"/>
            </svg>
          </button>
        </div>

        <div className={`scroll-hint ${phase >= 4 ? 'visible' : ''}`} onClick={scrollDown}>
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  )
}

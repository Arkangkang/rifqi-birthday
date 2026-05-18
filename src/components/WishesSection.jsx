import { useEffect, useRef } from 'react'
import { wishes } from '../data/wishes'
import './WishesSection.css'

function useScrollReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function WishCard({ wish, index }) {
  const ref = useScrollReveal()
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`wish-card ${isLeft ? 'reveal-left' : 'reveal-right'}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="wish-card-inner">
        <div className="wish-accent-bar" />
        <div className="wish-top">
          <span className="wish-icon">{wish.icon}</span>
          <span className="wish-tag">{wish.tag}</span>
        </div>
        <h3 className="wish-title">{wish.title}</h3>
        <p className="wish-message">{wish.message}</p>
        <div className="wish-deco" aria-hidden="true">💜</div>
      </div>
    </div>
  )
}

export default function WishesSection() {
  const headerRef = useScrollReveal()

  return (
    <section id="wishes" className="wishes-section">
      <div className="section wishes-inner">
        <div ref={headerRef} className="reveal wishes-header">
          <p className="section-label">Dari Mama dengan Cinta</p>
          <h2 className="section-title">
            Pesan <span className="gradient-text">Mama</span><br/>
            Untukmu 💌
          </h2>
          <p className="wishes-intro">
            Ribuan kata tak cukup untuk mengungkapkan betapa besarnya cinta ini,
            tapi Mama akan terus mencoba…
          </p>
        </div>

        <div className="wishes-grid">
          {wishes.map((wish, i) => (
            <WishCard key={wish.id} wish={wish} index={i} />
          ))}
        </div>

        <div className="wishes-footer reveal">
          <div className="signature">
            <span>— Dengan segenap cinta,</span>
            <span className="signature-name">Mama 💜</span>
          </div>
        </div>
      </div>
    </section>
  )
}

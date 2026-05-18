import { useEffect, useRef } from 'react'
import './Footer.css'

export default function Footer() {
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) ref.current?.classList.add('visible') },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <footer className="footer">
      <div className="footer-deco" aria-hidden="true">
        <div className="footer-line" />
        <span className="footer-ornament">💜</span>
        <div className="footer-line" />
      </div>

      <div ref={ref} className="footer-content reveal">
        <div className="footer-emoji-row" aria-hidden="true">
          {['🎂','🎉','🎈','⭐','🎁','✨','🎊','💫','🌟'].map((e, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
          ))}
        </div>

        <h2 className="footer-title">
          Selamat Ulang Tahun<br />
          <span className="footer-name">Rifqi Aizul Akbar</span>
        </h2>

        <p className="footer-age">16 Tahun yang Penuh Berkah 🌙</p>

        <p className="footer-message">
          Semoga Allah SWT senantiasa menjaga dan membimbingmu,<br />
          memberikan kebahagiaan yang tiada henti, dan menjadikanmu<br />
          pemuda yang sholeh, sukses, dan selalu bermanfaat bagi sesama.
        </p>

        <div className="footer-signature">
          <span className="sig-from">Dengan sepenuh jiwa dan cinta yang tak terhingga,</span>
          <span className="sig-name">Mama 💜</span>
        </div>

        <div className="footer-bottom">
          <span>Made with 💜 for Rifqi · {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}

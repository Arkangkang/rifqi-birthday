import { useState, useEffect, useRef } from 'react'
import { photos } from '../data/photos'
import './PhotoGallery.css'

/* Placeholder SVG when image not found */
function PlaceholderCard({ index, caption, onClick }) {
  return (
    <button className="photo-card placeholder-card" onClick={onClick} aria-label={`Tambah foto ${index + 1}`}>
      <div className="placeholder-inner">
        <div className="placeholder-icon">📸</div>
        <p className="placeholder-text">Tambahkan Foto {index + 1}</p>
        <p className="placeholder-hint">Lihat instruksi di src/data/photos.js</p>
      </div>
      <div className="photo-caption">{caption}</div>
    </button>
  )
}

function PhotoCard({ photo, index, onClick }) {
  const [loaded, setLoaded]   = useState(false)
  const [error, setError]     = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(ref.current) } },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  if (error) {
    return <PlaceholderCard index={index} caption={photo.caption} onClick={() => {}} />
  }

  return (
    <button
      ref={ref}
      className={`photo-card ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
      onClick={() => onClick(photo)}
      aria-label={`Lihat foto: ${photo.caption}`}
    >
      <div className="photo-img-wrap">
        {!loaded && <div className="photo-skeleton" />}
        <img
          src={photo.src}
          alt={photo.caption}
          className={`photo-img ${loaded ? 'loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          loading="lazy"
        />
        <div className="photo-overlay">
          <span className="photo-zoom-icon">🔍</span>
        </div>
      </div>
      <div className="photo-caption">{photo.caption}</div>
    </button>
  )
}

function Lightbox({ photo, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
        <button className="lb-close" onClick={onClose} aria-label="Tutup">✕</button>
        <button className="lb-prev"  onClick={onPrev}  aria-label="Foto sebelumnya">‹</button>
        <button className="lb-next"  onClick={onNext}  aria-label="Foto berikutnya">›</button>
        <img src={photo.src} alt={photo.caption} className="lb-image" />
        <p className="lb-caption">{photo.caption}</p>
      </div>
    </div>
  )
}

export default function PhotoGallery() {
  const [active, setActive]   = useState(null)
  const [visible, setVisible] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  const openPhoto   = (p) => setActive(p)
  const closePhoto  = ()  => setActive(null)
  const activeIndex = active ? photos.findIndex(p => p.id === active.id) : -1
  const prevPhoto   = ()  => setActive(photos[(activeIndex - 1 + photos.length) % photos.length])
  const nextPhoto   = ()  => setActive(photos[(activeIndex + 1) % photos.length])

  return (
    <section id="gallery" className="gallery-section">
      <div className="section gallery-inner">
        <div
          ref={headerRef}
          className={`gallery-header reveal ${visible ? 'visible' : ''}`}
        >
          <p className="section-label">Koleksi Momen</p>
          <h2 className="section-title">
            Kenangan <span className="gradient-text">Kita</span> 📸
          </h2>
          <p className="gallery-subtitle">
            Setiap foto menyimpan cerita yang selalu Mama rindukan
          </p>
        </div>

        <div className="photo-grid">
          {photos.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} onClick={openPhoto} />
          ))}
        </div>
      </div>

      {active && (
        <Lightbox
          photo={active}
          onClose={closePhoto}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  )
}

import { useState, useEffect, useRef, useCallback } from 'react'
import './MiniGame.css'

const CARD_EMOJIS = ['🎂', '🎁', '🎉', '🎈', '⭐', '🌙', '🎵', '🦋']

function createDeck() {
  return [...CARD_EMOJIS, ...CARD_EMOJIS]
    .map((emoji, i) => ({ id: i, emoji, matched: false }))
    .sort(() => Math.random() - 0.5)
}

function MemCard({ card, isFlipped, onClick, disabled }) {
  return (
    <button
      className={`mem-card ${isFlipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
      onClick={onClick}
      disabled={disabled || isFlipped || card.matched}
      aria-label={isFlipped || card.matched ? card.emoji : 'Kartu tersembunyi'}
    >
      <div className="card-inner">
        <div className="card-back">✦</div>
        <div className="card-front">{card.emoji}</div>
      </div>
    </button>
  )
}

export default function MiniGame() {
  const [cards, setCards]           = useState(createDeck)
  const [flippedIds, setFlippedIds] = useState([])
  const [locked, setLocked]         = useState(false)
  const [moves, setMoves]           = useState(0)
  const [time, setTime]             = useState(0)
  const [running, setRunning]       = useState(false)
  const [won, setWon]               = useState(false)
  const [burst, setBurst]           = useState(false)
  const [visible, setVisible]       = useState(false)
  const sectionRef = useRef(null)
  const timerRef   = useRef(null)

  /* scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  /* timer */
  useEffect(() => {
    if (running && !won) {
      timerRef.current = setInterval(() => setTime(t => t + 1), 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [running, won])

  /* win check */
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setRunning(false)
      setTimeout(() => { setWon(true); setBurst(true) }, 300)
      setTimeout(() => setBurst(false), 3500)
    }
  }, [cards])

  const handleClick = useCallback((card) => {
    if (locked || card.matched) return
    if (!running) setRunning(true)

    setFlippedIds(prev => {
      if (prev.includes(card.id)) return prev
      const next = [...prev, card.id]

      if (next.length === 2) {
        setMoves(m => m + 1)
        setLocked(true)
        const [idA, idB] = next
        const cardA = cards.find(c => c.id === idA)
        const cardB = cards.find(c => c.id === idB)

        if (cardA && cardB && cardA.emoji === cardB.emoji) {
          setCards(cs => cs.map(c =>
            c.id === idA || c.id === idB ? { ...c, matched: true } : c
          ))
          setLocked(false)
          return []
        } else {
          setTimeout(() => {
            setFlippedIds([])
            setLocked(false)
          }, 900)
          return next
        }
      }
      return next
    })
  }, [locked, running, cards])

  const reset = () => {
    clearInterval(timerRef.current)
    setCards(createDeck())
    setFlippedIds([])
    setLocked(false)
    setMoves(0)
    setTime(0)
    setRunning(false)
    setWon(false)
    setBurst(false)
  }

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`
  const pairs = cards.filter(c => c.matched).length / 2

  return (
    <section id="game" ref={sectionRef} className="game-section">
      {burst && (
        <div className="burst-overlay" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="burst-dot" style={{
              '--bx': `${Math.random() * 300 - 150}px`,
              '--by': `${Math.random() * 300 - 150}px`,
              '--bc': ['#8b5cf6','#22d3ee','#f59e0b','#ec4899','#10b981'][i % 5],
              animationDelay: `${Math.random() * 0.4}s`,
            }} />
          ))}
        </div>
      )}

      <div className={`section game-inner reveal ${visible ? 'visible' : ''}`}>
        <div className="game-header">
          <p className="section-label">Mini Game</p>
          <h2 className="section-title">
            Memory <span className="gradient-text">Challenge</span> 🧠
          </h2>
          <p className="game-desc">
            Temukan semua {CARD_EMOJIS.length} pasang kartu yang cocok!
          </p>
        </div>

        <div className="game-stats">
          <div className="stat">
            <span className="stat-val">{moves}</span>
            <span className="stat-label">Langkah</span>
          </div>
          <div className="stat">
            <span className="stat-val">{fmt(time)}</span>
            <span className="stat-label">Waktu</span>
          </div>
          <div className="stat">
            <span className="stat-val">{pairs}/{CARD_EMOJIS.length}</span>
            <span className="stat-label">Pasang</span>
          </div>
        </div>

        {won && (
          <div className="win-banner">
            <div className="win-emoji">🏆</div>
            <h3 className="win-title">Selamat, Kamu Menang!</h3>
            <p className="win-text">
              Selesai dalam <strong>{moves}</strong> langkah &amp; <strong>{fmt(time)}</strong> 🎉
            </p>
            <p className="win-sub">Seperti hidupmu — kamu selalu bisa menemukan yang tepat 💜</p>
          </div>
        )}

        <div className="card-grid">
          {cards.map(card => (
            <MemCard
              key={card.id}
              card={card}
              isFlipped={flippedIds.includes(card.id)}
              disabled={locked}
              onClick={() => handleClick(card)}
            />
          ))}
        </div>

        <div className="game-controls">
          <button className="game-btn" onClick={reset}>
            {won ? '🎮 Main Lagi' : '🔄 Reset'}
          </button>
        </div>
      </div>
    </section>
  )
}

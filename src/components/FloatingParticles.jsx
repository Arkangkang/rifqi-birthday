import { useMemo } from 'react'
import './FloatingParticles.css'

const EMOJIS = ['✨', '⭐', '💫', '🌟', '✦', '·', '•', '◦']

export default function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      emoji: i < 10 ? EMOJIS[i % 5] : null,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      delay: Math.random() * 25,
      duration: Math.random() * 18 + 12,
      opacity: Math.random() * 0.6 + 0.1,
    }))
  }, [])

  return (
    <div className="particles-bg" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            fontSize: p.emoji ? `${p.size * 5}px` : `${p.size}px`,
            opacity: p.opacity,
          }}
        >
          {p.emoji || (
            <div
              className="particle-dot"
              style={{
                width: p.size,
                height: p.size,
                background: ['#8b5cf6', '#22d3ee', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)]
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

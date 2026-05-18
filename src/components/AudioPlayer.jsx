import { useState, useRef, useEffect } from 'react'
import './AudioPlayer.css'

export default function AudioPlayer() {
  const [playing, setPlaying]   = useState(false)
  const [loaded, setLoaded]     = useState(false)
  const [volume, setVolume]     = useState(0.4)
  const [showVol, setShowVol]   = useState(false)
  const audioRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.loop   = true

    const onLoad = () => setLoaded(true)
    audio.addEventListener('canplaythrough', onLoad)
    return () => audio.removeEventListener('canplaythrough', onLoad)
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  const hideVolume = () => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setShowVol(false), 2000)
  }

  return (
    <div className="audio-player">
      {/* 
        ═══════════════════════════════════════════
        CARA MENAMBAHKAN MUSIK:
        1. Simpan file musik kamu sebagai: birthday-music.mp3
        2. Letakkan di folder: public/audio/birthday-music.mp3
        3. Selesai! Tombol musik akan langsung berfungsi.

        Format yang didukung: .mp3, .ogg, .wav
        Rekomendasi: cari lagu instrumental di YouTube Audio Library
        ═══════════════════════════════════════════
      */}
      <audio ref={audioRef} src="/audio/birthday-music.mp3" preload="auto" />

      <div className={`audio-wrapper ${showVol ? 'show-vol' : ''}`}>
        {showVol && (
          <div className="volume-slider-wrap">
            <input
              type="range" min="0" max="1" step="0.05"
              value={volume}
              onChange={e => { setVolume(Number(e.target.value)); hideVolume() }}
              className="volume-slider"
              aria-label="Volume"
            />
          </div>
        )}

        <button
          className={`audio-btn ${playing ? 'playing' : ''}`}
          onClick={toggle}
          onContextMenu={e => { e.preventDefault(); setShowVol(v => !v); hideVolume() }}
          title={playing ? 'Pause musik (klik kanan untuk volume)' : 'Putar musik (klik kanan untuk volume)'}
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          <span className="audio-icon">
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </span>
          {playing && (
            <span className="audio-bars">
              <span/><span/><span/><span/>
            </span>
          )}
        </button>
      </div>

      <div className="audio-hint">
        {playing ? '♪ Nikmati musiknya' : 'Tap untuk musik 🎵'}
      </div>
    </div>
  )
}

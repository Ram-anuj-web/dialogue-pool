import { useState } from 'react'

export default function Spotlight({ dialogues, onLike, onPlay }) {
  const [idx, setIdx] = useState(0)
  const d = dialogues[idx % dialogues.length]
  if (!d) return null

  return (
    <div style={{
      background: 'var(--bg2)', border: '0.5px solid var(--border)',
      borderRadius: 14, padding: '32px 36px', marginBottom: 32,
      position: 'relative', overflow: 'hidden', animation: 'fadeIn 0.4s ease'
    }}>
      <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg,transparent,var(--gold),var(--gold2),transparent)', opacity: 0.5 }} />
      <div style={{ fontFamily: 'DM Mono,monospace', fontSize: 10, letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        Now showing
        <span style={{ flex: 1, height: '0.5px', background: 'var(--gold-border)', display: 'block' }} />
      </div>
      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, lineHeight: 1.6, color: 'var(--text)', fontStyle: 'italic', marginBottom: 16, maxWidth: 780 }}>
        "{d.dialogue}"
      </div>
      <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16 }}>
        <strong style={{ color: 'var(--text2)', fontWeight: 500 }}>{d.speaker}</strong> — {d.movie} ({d.year})
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        {d.video_url && (
          <button onClick={() => onPlay(d)} style={btnSm()}>
            <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Watch clip
          </button>
        )}
        <button onClick={() => onLike(d.id, d.liked)} style={btnSm(d.liked)}>
          <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill={d.liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          {d.liked ? 'Liked' : 'Like'}
        </button>
        <button onClick={() => setIdx(i => i + 1)} style={btnSm()}>
          <svg style={{ width: 12, height: 12 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Next
        </button>
      </div>
    </div>
  )
}

const btnSm = (active) => ({
  display: 'flex', alignItems: 'center', gap: 6,
  fontSize: 11, padding: '6px 14px', borderRadius: 7, cursor: 'pointer',
  border: `0.5px solid ${active ? 'var(--gold-border)' : 'var(--border2)'}`,
  background: active ? 'var(--gold-dim)' : 'var(--bg3)',
  color: active ? 'var(--gold)' : 'var(--text2)',
  fontFamily: 'DM Sans,sans-serif'
})
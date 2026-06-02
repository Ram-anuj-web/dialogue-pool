export default function VideoPlayer({ d, onClose }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 'min(860px,88vw)', width: '100%', padding: '48px 0 24px' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 0, background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 8, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 12, fontFamily: 'DM Mono,monospace', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          Close
        </button>
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 13, color: 'var(--gold)', marginBottom: 14, fontStyle: 'italic', alignSelf: 'flex-start' }}>
          {d.movie} ({d.year}) — {d.speaker}
        </div>
        <video src={d.video_url} controls autoPlay style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', borderRadius: 10, background: '#000', display: 'block' }} />
      </div>
    </div>
  )
}
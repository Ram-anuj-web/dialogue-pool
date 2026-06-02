export default function Navbar({ activeTab, setActiveTab, search, setSearch, onShuffle, onAdd }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', height: 62,
      background: 'rgba(8,8,16,0.92)', backdropFilter: 'blur(16px)',
      borderBottom: '0.5px solid var(--border)', gap: 16
    }}>
      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 19, fontWeight: 600, letterSpacing: '0.02em' }}>
        Dialogue <em style={{ color: 'var(--gold)' }}>Pool</em>
      </div>

      <div style={{ flex: 1, maxWidth: 460, position: 'relative' }}>
        <svg style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: 'var(--text3)', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search dialogues, movies, characters…"
          style={{
            width: '100%', background: 'rgba(255,255,255,0.06)', border: '0.5px solid var(--border2)',
            borderRadius: 'var(--radius)', padding: '9px 14px 9px 38px',
            color: 'var(--text)', fontSize: 13, fontFamily: 'DM Sans,sans-serif', outline: 'none'
          }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', background: 'var(--bg3)', borderRadius: 8, padding: 3, border: '0.5px solid var(--border)' }}>
          {['browse', 'liked'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              fontSize: 12, padding: '5px 16px', borderRadius: 6, cursor: 'pointer', border: 'none',
              fontFamily: 'DM Sans,sans-serif', letterSpacing: '0.03em', transition: 'all 0.18s',
              background: activeTab === t ? 'var(--gold-dim)' : 'transparent',
              color: activeTab === t ? 'var(--gold)' : 'var(--text3)',
              ...(activeTab === t ? { border: '0.5px solid var(--gold-border)' } : {})
            }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>

        <button onClick={onShuffle} style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'var(--bg2)', border: '0.5px solid var(--border2)',
          color: 'var(--text2)', borderRadius: 'var(--radius)', padding: '10px 16px',
          fontSize: 12, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', whiteSpace: 'nowrap'
        }}>
          <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
          Shuffle
        </button>

        <button onClick={onAdd} style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'var(--gold)', color: '#0a0a0f', border: 'none',
          borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 500,
          cursor: 'pointer', fontFamily: 'DM Sans,sans-serif'
        }}>
          <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Add dialogue
        </button>
      </div>
    </header>
  )
}
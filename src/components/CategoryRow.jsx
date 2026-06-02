export default function CategoryRow({ cats, active, setActive }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
      {cats.map(c => (
        <button key={c} onClick={() => setActive(c)} style={{
          fontSize: 11, padding: '4px 14px', borderRadius: 20, cursor: 'pointer',
          border: `0.5px solid ${c === active ? 'var(--gold-border)' : 'var(--border)'}`,
          color: c === active ? 'var(--gold)' : 'var(--text3)',
          background: c === active ? 'var(--gold-dim)' : 'transparent',
          fontFamily: 'DM Mono,monospace', letterSpacing: '0.04em'
        }}>{c}</button>
      ))}
    </div>
  )
}
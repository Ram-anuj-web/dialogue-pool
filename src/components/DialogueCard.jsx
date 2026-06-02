export default function DialogueCard({ d, onLike, onDelete, onEdit, onPlay }) {
  return (
    <div style={{ background: 'var(--bg)', padding: '24px 24px 18px', position: 'relative', overflow: 'hidden', animation: 'fadeIn 0.3s ease', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <span style={{ fontFamily: 'DM Mono,monospace', fontSize: 10, letterSpacing: '0.06em', color: 'var(--gold)', textTransform: 'uppercase' }}>{d.movie}</span>
        <span style={{ fontSize: 11, color: 'var(--text3)' }}>{d.year}</span>
      </div>
      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 14, lineHeight: 1.7, color: 'rgba(232,224,208,0.8)', fontStyle: 'italic', marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        "{d.dialogue}"
      </div>
      <div style={{ fontFamily: 'DM Mono,monospace', fontSize: 10, color: 'var(--text3)', letterSpacing: '0.04em', marginBottom: 14 }}>— {d.speaker}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {(d.tags || []).map(t => (
            <span key={t} style={{ fontSize: 9, padding: '2px 8px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', color: 'var(--text3)', border: '0.5px solid var(--border)', fontFamily: 'DM Mono,monospace', letterSpacing: '0.04em' }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {d.video_url && <IconBtn title="Watch clip" onClick={onPlay}><PlayIcon /></IconBtn>}
          <IconBtn title="Edit" onClick={onEdit}><EditIcon /></IconBtn>
          <IconBtn title="Like" onClick={onLike} active={d.liked}><HeartIcon filled={d.liked} /></IconBtn>
          <IconBtn title="Delete" onClick={onDelete} danger><TrashIcon /></IconBtn>
        </div>
      </div>
    </div>
  )
}

const IconBtn = ({ children, onClick, active, danger, title }) => (
  <button title={title} onClick={onClick} style={{ background: 'none', border: 'none', color: active ? 'var(--gold)' : 'var(--text3)', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
    onMouseEnter={e => e.currentTarget.style.color = danger ? 'var(--red)' : active ? 'var(--gold)' : 'var(--text)'}
    onMouseLeave={e => e.currentTarget.style.color = active ? 'var(--gold)' : 'var(--text3)'}
  >{children}</button>
)

const PlayIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
const EditIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
const HeartIcon = ({ filled }) => <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
const TrashIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
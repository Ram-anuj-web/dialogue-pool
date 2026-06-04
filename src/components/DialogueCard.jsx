// DialogueCard.jsx — tag-based theming, default matches existing dark gold theme

const TAG_THEMES = {
  // Default (no tag match) — your existing theme
  default: {
    bg: '#080810',
    bg2: '#0e0e1a',
    accent: '#c9a96e',
    accentDim: 'rgba(201,169,110,0.15)',
    accentBorder: 'rgba(201,169,110,0.25)',
    text: '#e8e0d0',
    text2: 'rgba(232,224,208,0.55)',
    text3: 'rgba(232,224,208,0.28)',
    border: 'rgba(255,255,255,0.07)',
    dialogueFont: "'Playfair Display', serif",
    monoFont: "'DM Mono', monospace",
  },
  action: {
  bg: '#08090d', bg2: '#0f1018',
  accent: '#e05a5a',
  accentDim: 'rgba(224,90,90,0.13)',
  accentBorder: 'rgba(224,90,90,0.26)',
  text: '#f0e6e6', text2: 'rgba(240,230,230,0.5)', text3: 'rgba(240,230,230,0.26)',
  border: 'rgba(224,90,90,0.09)',
  dialogueFont: "'Playfair Display', serif",
  monoFont: "'DM Mono', monospace",
},

  thriller: {
    bg: '#0d0608',
    bg2: '#150a0d',
    accent: '#c0392b',
    accentDim: 'rgba(192,57,43,0.15)',
    accentBorder: 'rgba(192,57,43,0.3)',
    text: '#f0e6e6',
    text2: 'rgba(240,230,230,0.55)',
    text3: 'rgba(240,230,230,0.28)',
    border: 'rgba(255,80,80,0.08)',
    dialogueFont: "'Playfair Display', serif",
    monoFont: "'DM Mono', monospace",
  },

  crime: {
    bg: '#08090d',
    bg2: '#0f1018',
    accent: '#7b8cde',
    accentDim: 'rgba(123,140,222,0.15)',
    accentBorder: 'rgba(123,140,222,0.25)',
    text: '#dde3f5',
    text2: 'rgba(221,227,245,0.55)',
    text3: 'rgba(221,227,245,0.28)',
    border: 'rgba(123,140,222,0.1)',
    dialogueFont: "'Playfair Display', serif",
    monoFont: "'DM Mono', monospace",
  },

  comedy: {
    bg: '#0d0b05',
    bg2: '#171208',
    accent: '#e8a825',
    accentDim: 'rgba(232,168,37,0.15)',
    accentBorder: 'rgba(232,168,37,0.28)',
    text: '#f5eedb',
    text2: 'rgba(245,238,219,0.55)',
    text3: 'rgba(245,238,219,0.28)',
    border: 'rgba(232,168,37,0.09)',
    dialogueFont: "'Playfair Display', serif",
    monoFont: "'DM Mono', monospace",
  },

  romance: {
    bg: '#0d0509',
    bg2: '#160a10',
    accent: '#d4608a',
    accentDim: 'rgba(212,96,138,0.15)',
    accentBorder: 'rgba(212,96,138,0.28)',
    text: '#f5dfe8',
    text2: 'rgba(245,223,232,0.55)',
    text3: 'rgba(245,223,232,0.28)',
    border: 'rgba(212,96,138,0.09)',
    dialogueFont: "'Playfair Display', serif",
    monoFont: "'DM Mono', monospace",
  },

  drama: {
    bg: '#090909',
    bg2: '#111111',
    accent: '#a0a0a0',
    accentDim: 'rgba(160,160,160,0.12)',
    accentBorder: 'rgba(160,160,160,0.22)',
    text: '#e8e8e8',
    text2: 'rgba(232,232,232,0.5)',
    text3: 'rgba(232,232,232,0.26)',
    border: 'rgba(255,255,255,0.07)',
    dialogueFont: "'Playfair Display', serif",
    monoFont: "'DM Mono', monospace",
  },

  scifi: {
    bg: '#050d10',
    bg2: '#091318',
    accent: '#00d4c8',
    accentDim: 'rgba(0,212,200,0.12)',
    accentBorder: 'rgba(0,212,200,0.25)',
    text: '#d0f0ee',
    text2: 'rgba(208,240,238,0.5)',
    text3: 'rgba(208,240,238,0.26)',
    border: 'rgba(0,212,200,0.09)',
    dialogueFont: "'DM Mono', monospace",
    monoFont: "'DM Mono', monospace",
  },

  horror: {
    bg: '#060304',
    bg2: '#0d0608',
    accent: '#8b0000',
    accentDim: 'rgba(139,0,0,0.18)',
    accentBorder: 'rgba(139,0,0,0.32)',
    text: '#e0d5d5',
    text2: 'rgba(224,213,213,0.5)',
    text3: 'rgba(224,213,213,0.25)',
    border: 'rgba(139,0,0,0.1)',
    dialogueFont: "'Playfair Display', serif",
    monoFont: "'DM Mono', monospace",
  },

  adventure: {
    bg: '#060c08',
    bg2: '#0a1510',
    accent: '#4caf7d',
    accentDim: 'rgba(76,175,125,0.13)',
    accentBorder: 'rgba(76,175,125,0.26)',
    text: '#d8f0e0',
    text2: 'rgba(216,240,224,0.5)',
    text3: 'rgba(216,240,224,0.26)',
    border: 'rgba(76,175,125,0.09)',
    dialogueFont: "'Playfair Display', serif",
    monoFont: "'DM Mono', monospace",
  },

  philosophy: {
    bg: '#080a0d',
    bg2: '#0e1118',
    accent: '#9b8fc4',
    accentDim: 'rgba(155,143,196,0.13)',
    accentBorder: 'rgba(155,143,196,0.26)',
    text: '#e2dff0',
    text2: 'rgba(226,223,240,0.5)',
    text3: 'rgba(226,223,240,0.26)',
    border: 'rgba(155,143,196,0.09)',
    dialogueFont: "'Playfair Display', serif",
    monoFont: "'DM Mono', monospace",
  },

  war: {
    bg: '#090800',
    bg2: '#120f00',
    accent: '#b8960c',
    accentDim: 'rgba(184,150,12,0.13)',
    accentBorder: 'rgba(184,150,12,0.26)',
    text: '#f0ead0',
    text2: 'rgba(240,234,208,0.5)',
    text3: 'rgba(240,234,208,0.26)',
    border: 'rgba(184,150,12,0.09)',
    dialogueFont: "'Playfair Display', serif",
    monoFont: "'DM Mono', monospace",
  },
  noir: {
  bg: '#080808',
  bg2: '#0f0f0f',
  accent: '#a0a0a0',
  accentDim: 'rgba(160,160,160,0.12)',
  accentBorder: 'rgba(160,160,160,0.22)',
  text: '#d8d8d8',
  text2: 'rgba(216,216,216,0.5)',
  text3: 'rgba(216,216,216,0.26)',
  border: 'rgba(160,160,160,0.08)',
  dialogueFont: "'Playfair Display', serif",
  monoFont: "'DM Mono', monospace",
},

western: {
  bg: '#0d0900',
  bg2: '#160e00',
  accent: '#c8860a',
  accentDim: 'rgba(200,134,10,0.14)',
  accentBorder: 'rgba(200,134,10,0.28)',
  text: '#f0e8d0',
  text2: 'rgba(240,232,208,0.52)',
  text3: 'rgba(240,232,208,0.27)',
  border: 'rgba(200,134,10,0.09)',
  dialogueFont: "'Playfair Display', serif",
  monoFont: "'DM Mono', monospace",
},

fantasy: {
  bg: '#08060d',
  bg2: '#100c18',
  accent: '#9b6bcc',
  accentDim: 'rgba(155,107,204,0.14)',
  accentBorder: 'rgba(155,107,204,0.27)',
  text: '#e8dff5',
  text2: 'rgba(232,223,245,0.52)',
  text3: 'rgba(232,223,245,0.27)',
  border: 'rgba(155,107,204,0.09)',
  dialogueFont: "'Playfair Display', serif",
  monoFont: "'DM Mono', monospace",
},

mystery: {
  bg: '#050d0d',
  bg2: '#091414',
  accent: '#1fb8b8',
  accentDim: 'rgba(31,184,184,0.13)',
  accentBorder: 'rgba(31,184,184,0.26)',
  text: '#d0ecec',
  text2: 'rgba(208,236,236,0.5)',
  text3: 'rgba(208,236,236,0.26)',
  border: 'rgba(31,184,184,0.09)',
  dialogueFont: "'Playfair Display', serif",
  monoFont: "'DM Mono', monospace",
},
  
}

function getTheme(tags) {
  if (!tags || tags.length === 0) return TAG_THEMES.default
  for (const tag of tags) {
    const parts = tag.toLowerCase().replace('-', '').split('/')
    for (const part of parts) {
      if (TAG_THEMES[part]) return TAG_THEMES[part]
    }
  }
  return TAG_THEMES.default
}

export default function DialogueCard({ d, onLike, onDelete, onEdit, onPlay, currentUser, themed }) {
  const canDelete = d.added_by === currentUser
  const t = themed ? getTheme(d.tags) : TAG_THEMES.default

  const cardStyle = {
    background: t.bg,
    padding: '24px 24px 18px',
    position: 'relative',
    overflow: 'hidden',
    animation: 'fadeIn 0.3s ease',
    transition: 'background 0.2s',
    borderLeft: `2px solid ${t.accentBorder}`,
  }

  return (
    <div
      style={cardStyle}
      onMouseEnter={e => e.currentTarget.style.background = t.bg2}
      onMouseLeave={e => e.currentTarget.style.background = t.bg}
    >
      {/* subtle top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, ${t.accent}40, transparent)`,
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <span style={{
          fontFamily: t.monoFont, fontSize: 10, letterSpacing: '0.06em',
          color: t.accent, textTransform: 'uppercase',
        }}>
          {d.movie}
        </span>
        <span style={{ fontSize: 11, color: t.text3 }}>{d.year}</span>
      </div>

      <div style={{
        fontFamily: t.dialogueFont, fontSize: 14, lineHeight: 1.7,
        color: t.text2, fontStyle: 'italic', marginBottom: 10,
        display: '-webkit-box', WebkitLineClamp: 5,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        "{d.dialogue}"
      </div>

      <div style={{
        fontFamily: t.monoFont, fontSize: 10,
        color: t.text3, letterSpacing: '0.04em', marginBottom: 14,
      }}>
        — {d.speaker}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {(d.tags || []).map(tag => (
            <span key={tag} style={{
              fontSize: 9, padding: '2px 8px', borderRadius: 20,
              background: t.accentDim,
              color: t.text3,
              border: `0.5px solid ${t.accentBorder}`,
              fontFamily: t.monoFont, letterSpacing: '0.04em',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {d.video_url && (
            <IconBtn title="Watch clip" onClick={onPlay} accent={t.accent} text3={t.text3}>
              <PlayIcon />
            </IconBtn>
          )}
          {canDelete && (
            <IconBtn title="Edit" onClick={onEdit} accent={t.accent} text3={t.text3}>
              <EditIcon />
            </IconBtn>
          )}
          <IconBtn title="Like" onClick={onLike} active={d.liked} accent={t.accent} text3={t.text3}>
            <HeartIcon filled={d.liked} />
          </IconBtn>
          {canDelete && (
            <IconBtn title="Delete" onClick={onDelete} danger accent={t.accent} text3={t.text3}>
              <TrashIcon />
            </IconBtn>
          )}
        </div>
      </div>
    </div>
  )
}

const IconBtn = ({ children, onClick, active, danger, title, accent, text3 }) => (
  <button
    title={title}
    onClick={onClick}
    style={{
      background: 'none', border: 'none',
      color: active ? accent : text3,
      cursor: 'pointer', padding: 4,
      display: 'flex', alignItems: 'center', transition: 'color 0.15s',
    }}
    onMouseEnter={e => e.currentTarget.style.color = danger ? '#e05a5a' : accent}
    onMouseLeave={e => e.currentTarget.style.color = active ? accent : text3}
  >
    {children}
  </button>
)

const PlayIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
const EditIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
const HeartIcon = ({ filled }) => <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
const TrashIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
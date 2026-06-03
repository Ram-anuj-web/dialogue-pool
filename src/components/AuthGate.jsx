import { useState } from 'react'

const USERS = {
  anuj: 'film$742',
  prayag: 'reel#519',
  kush: 'cuts@381',
  akshar: 'scene!267',
  namrah: 'take%854',
  someone: 'frame&493',
}

export default function AuthGate({ onAuth }) {
  const [name, setName] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  const handleEnter = () => {
    const user = name.trim().toLowerCase()
    if (!USERS[user]) return setError('Unknown user.')
    if (USERS[user] !== pw) return setError('Wrong password.')
    localStorage.setItem('dp_user', user)
    onAuth(user)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--bg2)', border: '0.5px solid var(--border2)', borderRadius: 14, padding: 36, width: 380 }}>
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, marginBottom: 8 }}>dialogue pool</div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 28 }}>Sign in to continue.</div>

        <label style={labelStyle}>Your name</label>
        <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} placeholder="e.g. anuj" />

        <label style={{ ...labelStyle, marginTop: 16 }}>Password</label>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} style={inputStyle} placeholder="••••••••"
          onKeyDown={e => e.key === 'Enter' && handleEnter()} />

        {error && <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 10 }}>{error}</div>}

        <button onClick={handleEnter} style={{ marginTop: 24, width: '100%', background: 'var(--gold)', border: 'none', color: '#0a0a0f', padding: '11px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
          Enter
        </button>
      </div>
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: 10, color: 'var(--text3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }
const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid var(--border2)', borderRadius: 8, padding: '10px 12px', color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box' }
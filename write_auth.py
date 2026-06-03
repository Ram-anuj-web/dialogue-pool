content = """import { useState } from 'react'

const PASSWORD = 'dialogues2024'

export default function AuthGate({ onAuth }) {
  const [pw, setPw] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleEnter = () => {
    if (pw !== PASSWORD) return setError('Wrong password.')
    if (!name.trim()) return setError('Enter your name.')
    localStorage.setItem('dp_user', name.trim().toLowerCase())
    onAuth(name.trim().toLowerCase())
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--bg2)', border: '0.5px solid var(--border2)', borderRadius: 14, padding: 36, width: 380 }}>
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, marginBottom: 8 }}>dialogue pool</div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 28 }}>Enter password and your name to continue.</div>
        <label style={labelStyle}>Password</label>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} style={inputStyle} placeholder="password" />
        <label style={{ ...labelStyle, marginTop: 16 }}>Your name</label>
        <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} placeholder="e.g. prayag" onKeyDown={e => e.key === 'Enter' && handleEnter()} />
        {error && <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 10 }}>{error}</div>}
        <button onClick={handleEnter} style={{ marginTop: 24, width: '100%', background: 'var(--gold)', border: 'none', color: '#0a0a0f', padding: '11px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Enter</button>
      </div>
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: 10, color: 'var(--text3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }
const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid var(--border2)', borderRadius: 8, padding: '10px 12px', color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box' }
"""
with open('src/components/AuthGate.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')

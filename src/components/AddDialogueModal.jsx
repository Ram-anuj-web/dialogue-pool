import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const CLOUD_NAME = 'dmli8pepw'
const UPLOAD_PRESET = 'dialogue_pool'

const TAG_THEMES = {
  default:    { accent: '#c9a96e', accentDim: 'rgba(201,169,110,0.15)', accentBorder: 'rgba(201,169,110,0.25)', bg: '#080810', bg2: '#0e0e1a', text: '#e8e0d0', text2: 'rgba(232,224,208,0.55)', text3: 'rgba(232,224,208,0.28)', border: 'rgba(255,255,255,0.07)', dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Default', desc: 'Dark gold' },
  thriller:   { accent: '#c0392b', accentDim: 'rgba(192,57,43,0.15)',   accentBorder: 'rgba(192,57,43,0.3)',   bg: '#0d0608', bg2: '#150a0d', text: '#f0e6e6', text2: 'rgba(240,230,230,0.55)', text3: 'rgba(240,230,230,0.28)', border: 'rgba(255,80,80,0.08)',   dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Thriller', desc: 'Deep crimson' },
  crime:      { accent: '#7b8cde', accentDim: 'rgba(123,140,222,0.15)', accentBorder: 'rgba(123,140,222,0.25)', bg: '#08090d', bg2: '#0f1018', text: '#dde3f5', text2: 'rgba(221,227,245,0.55)', text3: 'rgba(221,227,245,0.28)', border: 'rgba(123,140,222,0.1)',  dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Crime', desc: 'Midnight blue' },
  comedy:     { accent: '#e8a825', accentDim: 'rgba(232,168,37,0.15)',  accentBorder: 'rgba(232,168,37,0.28)',  bg: '#0d0b05', bg2: '#171208', text: '#f5eedb', text2: 'rgba(245,238,219,0.55)', text3: 'rgba(245,238,219,0.28)', border: 'rgba(232,168,37,0.09)', dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Comedy', desc: 'Warm amber' },
  romance:    { accent: '#d4608a', accentDim: 'rgba(212,96,138,0.15)',  accentBorder: 'rgba(212,96,138,0.28)',  bg: '#0d0509', bg2: '#160a10', text: '#f5dfe8', text2: 'rgba(245,223,232,0.55)', text3: 'rgba(245,223,232,0.28)', border: 'rgba(212,96,138,0.09)', dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Romance', desc: 'Dusty rose' },
  drama:      { accent: '#a0a0a0', accentDim: 'rgba(160,160,160,0.12)', accentBorder: 'rgba(160,160,160,0.22)', bg: '#090909', bg2: '#111111', text: '#e8e8e8', text2: 'rgba(232,232,232,0.5)',  text3: 'rgba(232,232,232,0.26)', border: 'rgba(255,255,255,0.07)', dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Drama', desc: 'Monochrome' },
  scifi:      { accent: '#00d4c8', accentDim: 'rgba(0,212,200,0.12)',   accentBorder: 'rgba(0,212,200,0.25)',   bg: '#050d10', bg2: '#091318', text: '#d0f0ee', text2: 'rgba(208,240,238,0.5)',  text3: 'rgba(208,240,238,0.26)', border: 'rgba(0,212,200,0.09)',  dialogueFont: "'DM Mono', monospace",         monoFont: "'DM Mono', monospace", label: 'Sci-Fi', desc: 'Neon teal' },
  horror:     { accent: '#8b0000', accentDim: 'rgba(139,0,0,0.18)',     accentBorder: 'rgba(139,0,0,0.32)',     bg: '#060304', bg2: '#0d0608', text: '#e0d5d5', text2: 'rgba(224,213,213,0.5)',  text3: 'rgba(224,213,213,0.25)', border: 'rgba(139,0,0,0.1)',    dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Horror', desc: 'Blood dark' },
  adventure:  { accent: '#4caf7d', accentDim: 'rgba(76,175,125,0.13)',  accentBorder: 'rgba(76,175,125,0.26)',  bg: '#060c08', bg2: '#0a1510', text: '#d8f0e0', text2: 'rgba(216,240,224,0.5)',  text3: 'rgba(216,240,224,0.26)', border: 'rgba(76,175,125,0.09)', dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Adventure', desc: 'Forest green' },
  philosophy: { accent: '#9b8fc4', accentDim: 'rgba(155,143,196,0.13)', accentBorder: 'rgba(155,143,196,0.26)', bg: '#080a0d', bg2: '#0e1118', text: '#e2dff0', text2: 'rgba(226,223,240,0.5)',  text3: 'rgba(226,223,240,0.26)', border: 'rgba(155,143,196,0.09)',dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Philosophy', desc: 'Indigo mist' },
  war:        { accent: '#b8960c', accentDim: 'rgba(184,150,12,0.13)',  accentBorder: 'rgba(184,150,12,0.26)',  bg: '#090800', bg2: '#120f00', text: '#f0ead0', text2: 'rgba(240,234,208,0.5)',  text3: 'rgba(240,234,208,0.26)', border: 'rgba(184,150,12,0.09)', dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'War', desc: 'Brass & smoke' },
  action:     { accent: '#e05a5a', accentDim: 'rgba(224,90,90,0.13)',   accentBorder: 'rgba(224,90,90,0.26)',   bg: '#08090d', bg2: '#0f1018', text: '#f0e6e6', text2: 'rgba(240,230,230,0.5)',  text3: 'rgba(240,230,230,0.26)', border: 'rgba(224,90,90,0.09)',  dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Action', desc: 'Electric red' },
  noir:       { accent: '#a0a0a0', accentDim: 'rgba(160,160,160,0.12)', accentBorder: 'rgba(160,160,160,0.22)', bg: '#080808', bg2: '#0f0f0f', text: '#d8d8d8', text2: 'rgba(216,216,216,0.5)',  text3: 'rgba(216,216,216,0.26)', border: 'rgba(160,160,160,0.08)', dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Noir', desc: 'Old silver' },
  western:    { accent: '#c8860a', accentDim: 'rgba(200,134,10,0.14)',  accentBorder: 'rgba(200,134,10,0.28)',  bg: '#0d0900', bg2: '#160e00', text: '#f0e8d0', text2: 'rgba(240,232,208,0.52)', text3: 'rgba(240,232,208,0.27)', border: 'rgba(200,134,10,0.09)', dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Western', desc: 'Desert ochre' },
  fantasy:    { accent: '#9b6bcc', accentDim: 'rgba(155,107,204,0.14)', accentBorder: 'rgba(155,107,204,0.27)', bg: '#08060d', bg2: '#100c18', text: '#e8dff5', text2: 'rgba(232,223,245,0.52)', text3: 'rgba(232,223,245,0.27)', border: 'rgba(155,107,204,0.09)', dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Fantasy', desc: 'Arcane violet' },
  mystery:    { accent: '#1fb8b8', accentDim: 'rgba(31,184,184,0.13)',  accentBorder: 'rgba(31,184,184,0.26)',  bg: '#050d0d', bg2: '#091414', text: '#d0ecec', text2: 'rgba(208,236,236,0.5)',  text3: 'rgba(208,236,236,0.26)', border: 'rgba(31,184,184,0.09)', dialogueFont: "'Playfair Display', serif", monoFont: "'DM Mono', monospace", label: 'Mystery', desc: 'Teal shadow' },
}

const SAMPLE_DIALOGUE = {
  movie: 'The Dark Knight',
  year: '2008',
  dialogue: "Why so serious? Let's put a smile on that face.",
  speaker: 'Joker',
}

export default function AddDialogueModal({ editing, onClose, onSaved, currentUser }) {
  const [movie, setMovie]       = useState('')
  const [year, setYear]         = useState('')
  const [dialogue, setDialogue] = useState('')
  const [speaker, setSpeaker]   = useState('')
  const [tags, setTags]         = useState('')
  const [timestamp, setTimestamp] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress]   = useState(0)
  const [saving, setSaving]       = useState(false)
  const [selectedTheme, setSelectedTheme] = useState('default')
  const [showThemeEditor, setShowThemeEditor] = useState(false)
  const [posterUrl, setPosterUrl] = useState(null)
  const [posterFetching, setPosterFetching] = useState(false)
  const [posterFetched, setPosterFetched] = useState(false)

  useEffect(() => {
    if (editing) {
      setMovie(editing.movie || '')
      setYear(editing.year || '')
      setDialogue(editing.dialogue || '')
      setSpeaker(editing.speaker || '')
      setTags((editing.tags || []).join(', '))
      setTimestamp(editing.timestamp || '')
      setPosterUrl(editing.poster_url || null)
      if (editing.poster_url) setPosterFetched(true)
      const firstTag = (editing.tags || [])[0]?.toLowerCase()
      if (firstTag && TAG_THEMES[firstTag]) setSelectedTheme(firstTag)
    }
  }, [editing])

  // sync theme when tags change
  useEffect(() => {
    const firstTag = tags.split(',')[0]?.trim().toLowerCase()
    if (firstTag && TAG_THEMES[firstTag]) setSelectedTheme(firstTag)
  }, [tags])

  // auto-fetch poster when movie name is typed (debounced)
  useEffect(() => {
    if (!movie || movie.length < 2) {
      if (!editing?.poster_url) { setPosterUrl(null); setPosterFetched(false) }
      return
    }
    // don't re-fetch if movie name hasn't changed from editing
    if (editing && movie === editing.movie && editing.poster_url) return

    const timer = setTimeout(async () => {
      setPosterFetching(true)
      const url = await fetchPoster(movie)
      setPosterUrl(url)
      setPosterFetched(true)
      setPosterFetching(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [movie])

  const t = TAG_THEMES[selectedTheme]

  // ── TMDB poster fetch ──
  const fetchPoster = async (movieTitle) => {
    if (!movieTitle) return null
    const apiKey = import.meta.env.VITE_TMDB_API_KEY
    if (!apiKey) return null
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}`
      )
      const data = await res.json()
      const path = data.results?.[0]?.poster_path
      return path ? `https://image.tmdb.org/t/p/w300${path}` : null
    } catch {
      return null
    }
  }

  const uploadVideo = (file) => new Promise((resolve, reject) => {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('upload_preset', UPLOAD_PRESET)
    fd.append('resource_type', 'video')
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`)
    xhr.upload.onprogress = e => { if (e.lengthComputable) setProgress(Math.round(e.loaded / e.total * 100)) }
    xhr.onload = () => { setUploading(false); xhr.status === 200 ? resolve(JSON.parse(xhr.responseText).secure_url) : reject() }
    xhr.onerror = () => { setUploading(false); reject() }
    xhr.send(fd)
  })

  const handleSave = async () => {
    if (!movie || !dialogue) return alert('Movie and dialogue are required.')
    setSaving(true)

    let videoUrl = editing?.video_url || null
    if (videoFile) {
      try { videoUrl = await uploadVideo(videoFile) } catch { alert('Upload failed') }
    }

    // If poster wasn't auto-fetched yet (e.g. user typed fast and saved), fetch now
    let finalPosterUrl = posterUrl
    if (!finalPosterUrl && movie) {
      finalPosterUrl = await fetchPoster(movie)
    }

    const tagArr = tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
    const payload = {
      movie,
      year,
      dialogue,
      speaker: speaker || '—',
      character_name: speaker || null,
      tags: tagArr.length ? tagArr : ['uncategorized'],
      video_url: videoUrl,
      poster_url: finalPosterUrl || null,
      timestamp: timestamp.trim() || null,
      added_by: currentUser,
    }

    if (editing) {
      await supabase.from('dialogues').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('dialogues').insert([{ ...payload, liked: false }])
    }
    setSaving(false)
    onSaved()
    onClose()
  }

  // preview values
  const previewMovie    = movie    || SAMPLE_DIALOGUE.movie
  const previewYear     = year     || SAMPLE_DIALOGUE.year
  const previewDialogue = dialogue || SAMPLE_DIALOGUE.dialogue
  const previewSpeaker  = speaker  || SAMPLE_DIALOGUE.speaker
  const previewTags     = tags.split(',').map(s => s.trim()).filter(Boolean).length
    ? tags.split(',').map(s => s.trim()).filter(Boolean)
    : [selectedTheme]

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <div style={{ background: 'var(--bg2)', border: '0.5px solid var(--border2)', borderRadius: 14, padding: 32, width: showThemeEditor ? 860 : 500, maxWidth: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto', animation: 'slideUp 0.22s ease', transition: 'width 0.25s ease' }}>

        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 18, fontWeight: 600, marginBottom: 24 }}>
          {editing ? 'Edit dialogue' : 'Add dialogue'}
        </div>

        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
          {/* ── LEFT: form ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Movie / Year row */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <Field label="Movie / Show">
                <div style={{ position: 'relative' }}>
                  <input
                    value={movie}
                    onChange={e => { setMovie(e.target.value); setPosterFetched(false) }}
                    placeholder="e.g. The Dark Knight"
                    style={inputStyle}
                  />
                  {/* poster status indicator */}
                  {movie.length > 1 && (
                    <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {posterFetching && (
                        <div style={{ width: 12, height: 12, border: '1.5px solid var(--text3)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                      )}
                      {!posterFetching && posterFetched && posterUrl && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4caf7d" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                      {!posterFetching && posterFetched && !posterUrl && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      )}
                    </div>
                  )}
                </div>
                {/* poster thumbnail preview */}
                {posterUrl && (
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img
                      src={posterUrl}
                      alt="poster"
                      style={{ width: 32, height: 48, objectFit: 'cover', borderRadius: 4, border: '0.5px solid var(--border2)' }}
                    />
                    <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'DM Mono,monospace' }}>poster found</span>
                    <button
                      onClick={() => { setPosterUrl(null); setPosterFetched(false) }}
                      style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 10, fontFamily: 'DM Mono,monospace', padding: 0 }}
                    >
                      remove ×
                    </button>
                  </div>
                )}
              </Field>
              <Field label="Year" style={{ maxWidth: 100 }}>
                <input value={year} onChange={e => setYear(e.target.value)} placeholder="2008" style={inputStyle} />
              </Field>
            </div>

            {/* Dialogue */}
            <Field label="Dialogue" style={{ marginBottom: 16 }}>
              <textarea value={dialogue} onChange={e => setDialogue(e.target.value)} placeholder="The dialogue or quote…" style={{ ...inputStyle, minHeight: 100, resize: 'vertical', lineHeight: 1.6 }} />
            </Field>

            {/* Speaker / Tags row */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <Field label="Speaker / Character">
                <input value={speaker} onChange={e => setSpeaker(e.target.value)} placeholder="e.g. Joker" style={inputStyle} />
              </Field>
              <Field label="Tags (comma separated)">
                <input value={tags} onChange={e => setTags(e.target.value)} placeholder="thriller, monologue" style={inputStyle} />
              </Field>
            </div>

            {/* Timestamp */}
            <div style={{ marginBottom: 16 }}>
              <Field label="Timestamp (optional)">
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <input
                    value={timestamp}
                    onChange={e => setTimestamp(e.target.value)}
                    placeholder="01:23:45"
                    style={{ ...inputStyle, maxWidth: 130 }}
                  />
                  <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'DM Mono,monospace', lineHeight: 1.4 }}>
                    Links to this moment<br />in the video clip
                  </span>
                </div>
              </Field>
            </div>

            {/* Theme editor toggle */}
            <div style={{ marginBottom: 16 }}>
              <button
                onClick={() => setShowThemeEditor(v => !v)}
                style={{
                  background: showThemeEditor ? 'rgba(255,255,255,0.06)' : 'transparent',
                  border: '0.5px solid var(--border2)',
                  color: 'var(--text2)', padding: '8px 14px', borderRadius: 8,
                  cursor: 'pointer', fontSize: 11, fontFamily: 'DM Mono,monospace',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: 7,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
                {showThemeEditor ? 'Hide theme editor' : 'Theme editor'}
                <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: t.accent, marginLeft: 2 }} />
              </button>
            </div>

            {/* Video clip */}
            <Field label="Video clip" style={{ marginBottom: 0 }}>
              <div
                onClick={() => document.getElementById('modal-video-input').click()}
                style={{ border: `1px dashed ${videoFile ? 'var(--gold-border)' : 'rgba(255,255,255,0.14)'}`, borderRadius: 8, padding: '24px 16px', textAlign: 'center', cursor: 'pointer', color: videoFile ? 'var(--gold)' : 'var(--text3)', fontSize: 12, background: videoFile ? 'var(--gold-dim)' : 'rgba(255,255,255,0.02)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 8px', display: 'block' }}><path d="m15 10 4.553-2.069A1 1 0 0 1 21 8.87v6.262a1 1 0 0 1-1.447.894L15 14"/><rect width="15" height="14" x="1" y="5" rx="2"/></svg>
                {videoFile ? `✓ ${videoFile.name}` : editing?.video_url ? '✓ Clip attached — tap to replace' : 'Tap to upload video clip'}
              </div>
              <input id="modal-video-input" type="file" accept="video/*" style={{ display: 'none' }} onChange={e => setVideoFile(e.target.files[0])} />
              {uploading && (
                <div style={{ marginTop: 8, background: 'var(--bg3)', borderRadius: 4, overflow: 'hidden', height: 3 }}>
                  <div style={{ height: '100%', background: 'var(--gold)', width: progress + '%', transition: 'width 0.3s' }} />
                </div>
              )}
            </Field>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
              <button onClick={onClose} style={{ background: 'transparent', border: '0.5px solid var(--border2)', color: 'var(--text2)', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans,sans-serif' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving || uploading} style={{ background: 'var(--gold)', border: 'none', color: '#0a0a0f', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500, fontFamily: 'DM Sans,sans-serif', opacity: saving || uploading ? 0.5 : 1 }}>
                {saving ? 'Saving…' : uploading ? `Uploading ${progress}%…` : editing ? 'Save changes' : 'Save dialogue'}
              </button>
            </div>
          </div>

          {/* ── RIGHT: theme editor panel ── */}
          {showThemeEditor && (
            <div style={{ width: 300, flexShrink: 0 }}>
              <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'DM Mono,monospace', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
                Select theme
              </div>

              {/* Theme grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 16 }}>
                {Object.entries(TAG_THEMES).map(([key, th]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTheme(key)}
                    style={{
                      background: selectedTheme === key ? th.accentDim : 'rgba(255,255,255,0.03)',
                      border: `0.5px solid ${selectedTheme === key ? th.accentBorder : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 8, padding: '8px 10px', cursor: 'pointer',
                      textAlign: 'left', transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: th.accent, display: 'inline-block' }} />
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: th.bg2, border: `1px solid ${th.accentBorder}`, display: 'inline-block' }} />
                    </div>
                    <div style={{ fontSize: 10, fontFamily: 'DM Mono,monospace', color: selectedTheme === key ? th.accent : 'var(--text2)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>{th.label}</div>
                    <div style={{ fontSize: 9, color: 'var(--text3)', fontFamily: 'DM Mono,monospace', marginTop: 1 }}>{th.desc}</div>
                  </button>
                ))}
              </div>

              {/* Live preview */}
              <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'DM Mono,monospace', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                Preview
              </div>
              <div style={{
                background: t.bg,
                borderLeft: `2px solid ${t.accentBorder}`,
                borderRadius: 8,
                padding: '14px 14px 12px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* top accent line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${t.accent}40, transparent)` }} />

                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  {/* poster thumbnail in preview */}
                  {posterUrl && (
                    <img
                      src={posterUrl}
                      alt="poster"
                      style={{ width: 28, height: 42, objectFit: 'cover', borderRadius: 3, flexShrink: 0, border: `0.5px solid ${t.accentBorder}` }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <span style={{ fontFamily: t.monoFont, fontSize: 9, letterSpacing: '0.06em', color: t.accent, textTransform: 'uppercase' }}>
                        {previewMovie}
                      </span>
                      <span style={{ fontSize: 9, color: t.text3 }}>{previewYear}</span>
                    </div>

                    <div style={{ fontFamily: t.dialogueFont, fontSize: 11, lineHeight: 1.65, color: t.text2, fontStyle: 'italic', marginBottom: 6 }}>
                      "{previewDialogue.length > 90 ? previewDialogue.slice(0, 90) + '…' : previewDialogue}"
                    </div>

                    <div style={{ fontFamily: t.monoFont, fontSize: 9, color: t.text3, letterSpacing: '0.04em', marginBottom: 6 }}>
                      — {previewSpeaker}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                  {previewTags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 8, padding: '2px 7px', borderRadius: 20,
                      background: t.accentDim, color: t.text3,
                      border: `0.5px solid ${t.accentBorder}`,
                      fontFamily: t.monoFont, letterSpacing: '0.04em',
                    }}>
                      {tag}
                    </span>
                  ))}
                  {/* timestamp chip in preview */}
                  {timestamp && (
                    <span style={{
                      fontSize: 8, padding: '2px 7px', borderRadius: 20,
                      background: 'rgba(255,255,255,0.05)', color: t.text3,
                      border: `0.5px solid rgba(255,255,255,0.1)`,
                      fontFamily: t.monoFont, letterSpacing: '0.04em',
                      display: 'flex', alignItems: 'center', gap: 3,
                    }}>
                      ▶ {timestamp}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}

const Field = ({ label, children, style }) => (
  <div style={{ flex: 1, ...style }}>
    <label style={{ display: 'block', fontSize: 10, color: 'var(--text3)', fontFamily: 'DM Mono,monospace', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
    {children}
  </div>
)

const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid var(--border2)', borderRadius: 8, padding: '10px 12px', color: 'var(--text)', fontSize: 13, fontFamily: 'DM Sans,sans-serif', outline: 'none', boxSizing: 'border-box' }
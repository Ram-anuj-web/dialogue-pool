import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const CLOUD_NAME = 'dmli8pepw'
const UPLOAD_PRESET = 'dialogue_pool'

export default function AddDialogueModal({ editing, onClose, onSaved }) {
  const [movie, setMovie] = useState('')
  const [year, setYear] = useState('')
  const [dialogue, setDialogue] = useState('')
  const [speaker, setSpeaker] = useState('')
  const [tags, setTags] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (editing) {
      setMovie(editing.movie || ''); setYear(editing.year || '')
      setDialogue(editing.dialogue || ''); setSpeaker(editing.speaker || '')
      setTags((editing.tags || []).join(', '))
    }
  }, [editing])

  const uploadVideo = (file) => new Promise((resolve, reject) => {
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file); fd.append('upload_preset', UPLOAD_PRESET); fd.append('resource_type', 'video')
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`)
    xhr.upload.onprogress = e => { if (e.lengthComputable) setProgress(Math.round(e.loaded/e.total*100)) }
    xhr.onload = () => { setUploading(false); xhr.status === 200 ? resolve(JSON.parse(xhr.responseText).secure_url) : reject() }
    xhr.onerror = () => { setUploading(false); reject() }
    xhr.send(fd)
  })

  const handleSave = async () => {
    if (!movie || !dialogue) return alert('Movie and dialogue are required.')
    setSaving(true)
    let videoUrl = editing?.video_url || null
    if (videoFile) { try { videoUrl = await uploadVideo(videoFile) } catch { alert('Upload failed') } }
    const tagArr = tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
    const payload = { movie, year, dialogue, speaker: speaker || '—', tags: tagArr.length ? tagArr : ['uncategorized'], video_url: videoUrl }

    if (editing) {
      await supabase.from('dialogues').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('dialogues').insert([{ ...payload, liked: false }])
    }
    setSaving(false); onSaved(); onClose()
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'var(--bg2)', border: '0.5px solid var(--border2)', borderRadius: 14, padding: 32, width: 500, maxWidth: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto', animation: 'slideUp 0.22s ease' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 18, fontWeight: 600, marginBottom: 24 }}>{editing ? 'Edit dialogue' : 'Add dialogue'}</div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Field label="Movie / Show"><input value={movie} onChange={e=>setMovie(e.target.value)} placeholder="e.g. The Dark Knight" style={inputStyle} /></Field>
          <Field label="Year" style={{ maxWidth: 100 }}><input value={year} onChange={e=>setYear(e.target.value)} placeholder="2008" style={inputStyle} /></Field>
        </div>
        <Field label="Dialogue" style={{ marginBottom: 16 }}><textarea value={dialogue} onChange={e=>setDialogue(e.target.value)} placeholder="The dialogue or quote…" style={{ ...inputStyle, minHeight: 100, resize: 'vertical', lineHeight: 1.6 }} /></Field>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Field label="Speaker"><input value={speaker} onChange={e=>setSpeaker(e.target.value)} placeholder="e.g. Joker" style={inputStyle} /></Field>
          <Field label="Tags (comma separated)"><input value={tags} onChange={e=>setTags(e.target.value)} placeholder="thriller, monologue" style={inputStyle} /></Field>
        </div>

        <Field label="Video clip" style={{ marginBottom: 0 }}>
          <div onClick={() => document.getElementById('modal-video-input').click()} style={{ border: `1px dashed ${videoFile ? 'var(--gold-border)' : 'rgba(255,255,255,0.14)'}`, borderRadius: 8, padding: '24px 16px', textAlign: 'center', cursor: 'pointer', color: videoFile ? 'var(--gold)' : 'var(--text3)', fontSize: 12, background: videoFile ? 'var(--gold-dim)' : 'rgba(255,255,255,0.02)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 8px', display: 'block' }}><path d="m15 10 4.553-2.069A1 1 0 0 1 21 8.87v6.262a1 1 0 0 1-1.447.894L15 14"/><rect width="15" height="14" x="1" y="5" rx="2"/></svg>
            {videoFile ? `✓ ${videoFile.name}` : editing?.video_url ? '✓ Clip attached — tap to replace' : 'Tap to upload video clip'}
          </div>
          <input id="modal-video-input" type="file" accept="video/*" style={{ display: 'none' }} onChange={e => setVideoFile(e.target.files[0])} />
          {uploading && <div style={{ marginTop: 8, background: 'var(--bg3)', borderRadius: 4, overflow: 'hidden', height: 3 }}><div style={{ height: '100%', background: 'var(--gold)', width: progress + '%', transition: 'width 0.3s' }} /></div>}
        </Field>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
          <button onClick={onClose} style={{ background: 'transparent', border: '0.5px solid var(--border2)', color: 'var(--text2)', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontFamily: 'DM Sans,sans-serif' }}>Cancel</button>
          <button onClick={handleSave} disabled={saving || uploading} style={{ background: 'var(--gold)', border: 'none', color: '#0a0a0f', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500, fontFamily: 'DM Sans,sans-serif', opacity: saving || uploading ? 0.5 : 1 }}>
            {saving ? 'Saving…' : uploading ? `Uploading ${progress}%…` : editing ? 'Save changes' : 'Save dialogue'}
          </button>
        </div>
      </div>
    </div>
  )
}

const Field = ({ label, children, style }) => (
  <div style={{ flex: 1, ...style }}>
    <label style={{ display: 'block', fontSize: 10, color: 'var(--text3)', fontFamily: 'DM Mono,monospace', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
    {children}
  </div>
)

const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '0.5px solid var(--border2)', borderRadius: 8, padding: '10px 12px', color: 'var(--text)', fontSize: 13, fontFamily: 'DM Sans,sans-serif', outline: 'none' }
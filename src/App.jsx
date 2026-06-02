import { useState, useEffect, useCallback } from 'react'
import { supabase } from './lib/supabase'
import Navbar from './components/Navbar'
import CategoryRow from './components/CategoryRow'
import Spotlight from './components/Spotlight'
import DialogueCard from './components/DialogueCard'
import AddDialogueModal from './components/AddDialogueModal'
import VideoPlayer from './components/VideoPlayer'

export default function App() {
  const [dialogues, setDialogues] = useState([])
  const [activeTab, setActiveTab] = useState('browse')
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingDialogue, setEditingDialogue] = useState(null)
  const [playingVideo, setPlayingVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchDialogues = useCallback(async () => {
    const { data } = await supabase
      .from('dialogues')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setDialogues(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchDialogues() }, [fetchDialogues])

  const filtered = dialogues.filter(d => {
    if (activeTab === 'liked' && !d.liked) return false
    if (activeCategory !== 'All' && !(d.tags || []).map(t => t.toLowerCase()).includes(activeCategory)) return false
    if (search && ![d.movie, d.dialogue, d.speaker].join(' ').toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const allCats = ['All', ...Array.from(new Set(dialogues.flatMap(d => d.tags || []).map(t => t.toLowerCase()))).sort()]

  const toggleLike = async (id, liked) => {
    await supabase.from('dialogues').update({ liked: !liked }).eq('id', id)
    setDialogues(prev => prev.map(d => d.id === id ? { ...d, liked: !liked } : d))
  }

  const deleteDialogue = async (id) => {
    if (!confirm('Remove this dialogue?')) return
    await supabase.from('dialogues').delete().eq('id', id)
    setDialogues(prev => prev.filter(d => d.id !== id))
  }

  const shuffle = () => setDialogues(prev => [...prev].sort(() => Math.random() - 0.5))

  return (
    <>
      <Navbar
        activeTab={activeTab} setActiveTab={setActiveTab}
        search={search} setSearch={setSearch}
        onShuffle={shuffle} onAdd={() => { setEditingDialogue(null); setShowModal(true) }}
      />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 32px 80px', position: 'relative', zIndex: 1 }}>
        <CategoryRow cats={allCats} active={activeCategory} setActive={setActiveCategory} />
        {activeTab === 'browse' && dialogues.length > 0 && (
          <Spotlight dialogues={dialogues} onLike={toggleLike} onPlay={setPlayingVideo} />
        )}
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text3)', padding: 64 }}>Loading…</div>
        ) : (
          <>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
              gap: 1, background: 'var(--border)', borderRadius: 12,
              overflow: 'hidden', border: '0.5px solid var(--border)'
            }}>
              {filtered.length === 0 ? (
                <div style={{ padding: '64px 24px', textAlign: 'center', color: 'var(--text3)', fontSize: 13, gridColumn: '1/-1', background: 'var(--bg)' }}>
                  No dialogues found.
                </div>
              ) : filtered.map(d => (
                <DialogueCard key={d.id} d={d}
                  onLike={() => toggleLike(d.id, d.liked)}
                  onDelete={() => deleteDialogue(d.id)}
                  onEdit={() => { setEditingDialogue(d); setShowModal(true) }}
                  onPlay={() => setPlayingVideo(d)}
                />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 24, paddingTop: 16, borderTop: '0.5px solid var(--border)' }}>
              {[['dialogues', dialogues.length], ['liked', dialogues.filter(d=>d.liked).length], ['with clip', dialogues.filter(d=>d.video_url).length], ['showing', filtered.length]]
                .map(([label, val]) => (
                  <div key={label} style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'DM Mono,monospace' }}>
                    <b style={{ color: 'var(--text2)', fontWeight: 400, marginRight: 4 }}>{val}</b>{label}
                  </div>
                ))}
            </div>
          </>
        )}
      </main>

      {showModal && (
        <AddDialogueModal
          editing={editingDialogue}
          onClose={() => { setShowModal(false); setEditingDialogue(null) }}
          onSaved={fetchDialogues}
        />
      )}
      {playingVideo && <VideoPlayer d={playingVideo} onClose={() => setPlayingVideo(null)} />}
    </>
  )
}
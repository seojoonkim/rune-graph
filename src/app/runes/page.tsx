import { RUNES } from '@/data/runes'
import { RuneCard } from '@/components/ui/RuneCard'

const CATEGORIES = ['All', ...Array.from(new Set(RUNES.map(r => r.category))).sort()]

export default function RunesPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🔮</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#E2E2E8', margin: 0, fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}>Rune Catalog</h1>
        </div>
        <p style={{ color: '#666', fontSize: '0.9rem', margin: 0, fontFamily: "'Rajdhani', sans-serif" }}>
          {RUNES.length} verified skill orchestration workflows · Free forever
        </p>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <span key={cat} style={{
            padding: '0.3rem 0.8rem', borderRadius: '5px', fontSize: '0.75rem',
            fontFamily: "'Rajdhani', sans-serif", cursor: 'pointer',
            background: cat === 'All' ? 'rgba(139,92,246,0.15)' : '#13131A',
            color: cat === 'All' ? '#8B5CF6' : '#666',
            border: `1px solid ${cat === 'All' ? 'rgba(139,92,246,0.4)' : '#2A2A35'}`,
            transition: 'all 0.15s',
          }}>{cat}</span>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {RUNES.map(r => <RuneCard key={r.id} rune={r} />)}
      </div>
    </div>
  )
}

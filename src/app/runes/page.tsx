import { RUNES } from '@/data/runes'
import { RuneCard } from '@/components/ui/RuneCard'

const CATEGORIES = ['All', ...Array.from(new Set(RUNES.map(r => r.category))).sort()]

export default function RunesPage() {
  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '3rem 2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🔮</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#c0caf5', margin: 0, fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}>Rune Catalog</h1>
        </div>
        <p style={{ color: '#9aa5ce', fontSize: '0.9rem', margin: 0, fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
          {RUNES.length} verified skill orchestration workflows · Free forever
        </p>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <span key={cat} style={{
            padding: '0.3rem 0.8rem', borderRadius: '5px', fontSize: '0.75rem',
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", cursor: 'pointer',
            background: cat === 'All' ? 'rgba(187,154,247,0.15)' : '#1e2030',
            color: cat === 'All' ? '#bb9af7' : '#7982a9',
            border: `1px solid ${cat === 'All' ? 'rgba(187,154,247,0.4)' : '#292e42'}`,
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

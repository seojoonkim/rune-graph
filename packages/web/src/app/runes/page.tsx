'use client'
import { useState } from 'react'
import { RUNES } from '@/data/runes'
import { RuneCard } from '@/components/ui/RuneCard'

const ALL_CATS = ['All', ...Array.from(new Set(RUNES.map(r => r.category))).sort()]

export default function RunesPage() {
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = RUNES.filter(r => {
    const matchCat = active === 'All' || r.category === active
    const matchSearch = !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.purpose.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="rg-page">

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🔮</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#dde4fc', margin: 0, fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em' }}>Rune Catalog</h1>
        </div>
        <p style={{ color: '#8ab4e0', fontSize: '0.95rem', margin: 0 }}>
          {RUNES.length} verified skill orchestration workflows · Open Source
        </p>
      </div>

      {/* Filter tabs + Search */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {ALL_CATS.map(cat => {
          const isActive = active === cat
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '0.35rem 0.9rem',
                borderRadius: '5px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.15s',
                background: isActive ? 'rgba(187,154,247,0.15)' : '#1e2030',
                color: isActive ? '#bb9af7' : '#8ab4e0',
                border: `1px solid ${isActive ? 'rgba(187,154,247,0.45)' : '#292e42'}`,
                fontWeight: isActive ? 600 : 400,
                boxShadow: isActive ? '0 0 8px rgba(187,154,247,0.15)' : 'none',
              }}
            >
              {cat}
            </button>
          )
        })}

        {/* Search */}
        <div style={{ marginLeft: 'auto', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: '#8ab4e0', fontSize: '0.8rem', pointerEvents: 'none' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search runes..."
            style={{
              background: '#1e2030', border: '1px solid #292e42', borderRadius: '6px',
              color: '#dde4fc', padding: '0.35rem 1rem 0.35rem 2rem',
              fontSize: '0.82rem', outline: 'none', width: '200px', fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Count */}
      <p style={{ color: '#9aa4d2', fontSize: '0.78rem', marginBottom: '1.25rem', fontFamily: "'JetBrains Mono', monospace" }}>
        {filtered.length} rune{filtered.length !== 1 ? 's' : ''} {active !== 'All' ? `in ${active}` : 'total'}
      </p>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {filtered.map(r => <RuneCard key={r.id} rune={r} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#414868' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔮</div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace" }}>No runes found{search ? ` for "${search}"` : ''}</p>
        </div>
      )}
    </div>
  )
}

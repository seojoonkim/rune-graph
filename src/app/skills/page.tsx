'use client'
import { useState } from 'react'
import Link from 'next/link'
import { SKILLS_REGISTRY } from '@/data/skills-registry'
import { RUNES } from '@/data/runes'

const CAT_COLORS: Record<string, string> = {
  input:  '#7aa2f7',
  api:    '#9ece6a',
  llm:    '#bb9af7',
  output: '#ff9e64',
}

const CAT_LABELS: Record<string, string> = {
  input:  '⬇ Input',
  api:    '🔌 API',
  llm:    '🧠 LLM',
  output: '⬆ Output',
}

// Count rune usage per skill
const runeUsageMap: Record<string, number> = {}
RUNES.forEach(r => r.nodes.forEach(n => {
  runeUsageMap[n.id] = (runeUsageMap[n.id] || 0) + 1
}))

const CATS = ['all', 'input', 'api', 'llm', 'output'] as const
type Cat = typeof CATS[number]

export default function SkillsPage() {
  const [active, setActive] = useState<Cat>('all')
  const [search, setSearch] = useState('')

  const filtered = SKILLS_REGISTRY.filter(s => {
    const matchCat = active === 'all' || s.category === active
    const matchSearch = !search || s.label.toLowerCase().includes(search.toLowerCase()) || s.service.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const counts: Record<string, number> = {
    all:    SKILLS_REGISTRY.length,
    input:  SKILLS_REGISTRY.filter(s => s.category === 'input').length,
    api:    SKILLS_REGISTRY.filter(s => s.category === 'api').length,
    llm:    SKILLS_REGISTRY.filter(s => s.category === 'llm').length,
    output: SKILLS_REGISTRY.filter(s => s.category === 'output').length,
  }

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '3rem 2rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>📦</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#c0caf5', margin: 0, fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}>Skills Registry</h1>
        </div>
        <p style={{ color: '#7aa2c8', fontSize: '0.95rem', margin: 0 }}>
          {SKILLS_REGISTRY.length} real-world skills across 4 categories
        </p>
      </div>

      {/* Filter tabs + Search */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {CATS.map(cat => {
          const isActive = active === cat
          const color = cat === 'all' ? '#bb9af7' : CAT_COLORS[cat]
          return (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: '0.45rem 1.1rem', borderRadius: '6px', cursor: 'pointer',
              border: `1px solid ${isActive ? color : '#292e42'}`,
              background: isActive ? `${color}18` : '#1e2030',
              color: isActive ? color : '#565f89',
              fontWeight: isActive ? 600 : 400,
              fontSize: '0.85rem',
              transition: 'all 0.15s',
              outline: 'none',
            }}>
              {cat === 'all' ? '✦ All' : CAT_LABELS[cat]}
              <span style={{ marginLeft: '0.4rem', fontSize: '0.75rem', opacity: 0.7 }}>{counts[cat]}</span>
            </button>
          )
        })}

        {/* Search */}
        <div style={{ marginLeft: 'auto', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#7aa2c8', fontSize: '0.85rem' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search skills..."
            style={{
              background: '#1e2030', border: '1px solid #292e42', borderRadius: '6px',
              color: '#c0caf5', padding: '0.45rem 1rem 0.45rem 2.2rem',
              fontSize: '0.85rem', outline: 'none', width: '220px',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Results count */}
      <p style={{ color: '#6272a4', fontSize: '0.8rem', marginBottom: '1.25rem', fontFamily: "'JetBrains Mono', monospace" }}>
        {filtered.length} skill{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Skills grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '0.75rem' }}>
        {filtered.map(skill => {
          const usedIn = runeUsageMap[skill.id] || 0
          const color = CAT_COLORS[skill.category] || '#565f89'
          return (
            <Link key={skill.id} href={`/skills/${skill.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px',
                padding: '1rem 1.1rem', transition: 'all 0.15s', cursor: 'pointer',
                position: 'relative', overflow: 'hidden', height: '100%',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = color + '60'
                  el.style.background = '#1f2335'
                  el.style.transform = 'translateY(-1px)'
                  el.style.boxShadow = `0 4px 20px ${color}18`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = '#292e42'
                  el.style.background = '#1e2030'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* corner brackets */}
                <div style={{ position: 'absolute', top: 4, left: 4, width: 8, height: 8, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}`, opacity: 0.4 }} />
                <div style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}`, opacity: 0.4 }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{skill.icon}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: '#c0caf5', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{skill.label}</div>
                      <div style={{ color: '#6272a4', fontSize: '0.68rem', fontFamily: "'JetBrains Mono', monospace", marginTop: '1px' }}>{skill.id}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.62rem', padding: '1px 7px', borderRadius: '3px', background: `${color}15`, color, border: `1px solid ${color}35`, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {skill.category}
                    </span>
                    {usedIn > 0 && (
                      <span style={{ fontSize: '0.62rem', padding: '1px 6px', borderRadius: '3px', background: 'rgba(187,154,247,0.1)', color: '#bb9af7', border: '1px solid rgba(187,154,247,0.25)', fontFamily: "'JetBrains Mono', monospace" }}>
                        ×{usedIn} runes
                      </span>
                    )}
                  </div>
                </div>

                <p style={{ margin: '0.6rem 0 0.4rem', color: '#9aa5ce', fontSize: '0.8rem', lineHeight: 1.5 }}>{skill.description}</p>
                <div style={{ fontSize: '0.68rem', color: '#6272a4', fontFamily: "'JetBrains Mono', monospace' " }}>{skill.service}</div>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#6272a4' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace" }}>No skills found for "{search}"</p>
        </div>
      )}
    </div>
  )
}

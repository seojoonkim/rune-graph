'use client'
import { SKILLS_REGISTRY } from '@/data/skills-registry'
import { RUNES } from '@/data/runes'

const CAT_COLORS: Record<string, string> = {
  input:  '#3B82F6',
  api:    '#10B981',
  llm:    '#8B5CF6',
  output: '#F59E0B',
}

const CAT_LABELS: Record<string, string> = {
  input:  '⬇ Input',
  api:    '🔌 API',
  llm:    '🧠 LLM',
  output: '⬆ Output',
}

// Count how many runes each skill appears in
const runeUsageMap: Record<string, number> = {}
RUNES.forEach(r => {
  r.nodes.forEach(n => {
    runeUsageMap[n.id] = (runeUsageMap[n.id] || 0) + 1
  })
})

const byCategory = {
  input:  SKILLS_REGISTRY.filter(s => s.category === 'input'),
  api:    SKILLS_REGISTRY.filter(s => s.category === 'api'),
  llm:    SKILLS_REGISTRY.filter(s => s.category === 'llm'),
  output: SKILLS_REGISTRY.filter(s => s.category === 'output'),
}

export default function SkillsPage() {
  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '3rem 2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>📦</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#E2E2E8', margin: 0, fontFamily: "'Cinzel', serif", letterSpacing: '0.05em' }}>Skills Registry</h1>
        </div>
        <p style={{ color: '#666', fontSize: '0.9rem', margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
          {SKILLS_REGISTRY.length} real-world skills across {Object.keys(byCategory).length} categories
        </p>
      </div>

      {/* Category summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
        {(Object.keys(byCategory) as Array<keyof typeof byCategory>).map(cat => (
          <div key={cat} style={{
            border: `1px solid ${CAT_COLORS[cat]}30`,
            borderRadius: '10px', background: '#13131A', padding: '1rem',
            boxShadow: `0 0 12px ${CAT_COLORS[cat]}0A`,
          }}>
            <div style={{ color: CAT_COLORS[cat], fontWeight: 700, fontSize: '0.85rem', fontFamily: "'Rajdhani', sans-serif", marginBottom: '0.5rem' }}>
              {CAT_LABELS[cat]}
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#E2E2E8' }}>{byCategory[cat].length}</div>
            <div style={{ fontSize: '0.72rem', color: '#555', marginTop: '0.2rem' }}>skills</div>
          </div>
        ))}
      </div>

      {/* Skill list by category */}
      {(Object.keys(byCategory) as Array<keyof typeof byCategory>).map(cat => (
        <section key={cat} style={{ marginBottom: '2.5rem' }}>
          <h2 style={{
            fontSize: '0.8rem', color: CAT_COLORS[cat], textTransform: 'uppercase',
            letterSpacing: '0.12em', fontFamily: "'Rajdhani', sans-serif",
            margin: '0 0 1rem', padding: '0.4rem 0', borderBottom: `1px solid ${CAT_COLORS[cat]}25`,
          }}>{CAT_LABELS[cat]} — {byCategory[cat].length} skills</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.6rem' }}>
            {byCategory[cat].map(skill => {
              const usedIn = runeUsageMap[skill.id] || 0
              return (
                <a key={skill.id} href={skill.docsUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: '#0F0F15', border: '1px solid #262636', borderRadius: '8px',
                    padding: '0.85rem 1rem', transition: 'all 0.15s', cursor: 'pointer',
                    position: 'relative',
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.borderColor = `${CAT_COLORS[cat]}55`
                      el.style.background = '#13131A'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.borderColor = '#262636'
                      el.style.background = '#0F0F15'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                        <span style={{ fontSize: '1rem', flexShrink: 0 }}>{skill.icon}</span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ color: '#E2E2E8', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{skill.label}</div>
                          <div style={{ color: '#555', fontSize: '0.65rem', fontFamily: "'JetBrains Mono', monospace", marginTop: '1px' }}>{skill.id}</div>
                        </div>
                      </div>
                      {usedIn > 0 && (
                        <span style={{
                          flexShrink: 0, fontSize: '0.6rem', padding: '1px 6px', borderRadius: '3px',
                          background: `${CAT_COLORS[cat]}18`, color: CAT_COLORS[cat],
                          border: `1px solid ${CAT_COLORS[cat]}35`,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}>×{usedIn}</span>
                      )}
                    </div>
                    <div style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.72rem', lineHeight: 1.4 }}>{skill.description}</div>
                    <div style={{ marginTop: '0.4rem', fontSize: '0.65rem', color: '#444', fontFamily: "'JetBrains Mono', monospace" }}>{skill.service}</div>
                  </div>
                </a>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

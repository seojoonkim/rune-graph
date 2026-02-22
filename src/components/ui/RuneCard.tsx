'use client'
import Link from 'next/link'
import { CATEGORY_COLORS, type Rune } from '@/data/runes'

const CAT_COLORS: Record<string, string> = {
  input: '#7aa2f7',
  api: '#9ece6a',
  llm: '#bb9af7',
  output: '#ff9e64',
}

function getGrade(n: number): { label: string; color: string } {
  if (n >= 7) return { label: 'Archmage', color: '#ff9e64' }
  if (n >= 6) return { label: 'Artisan',  color: '#9ece6a' }
  if (n >= 5) return { label: 'Smith',    color: '#7aa2f7' }
  return       { label: 'Apprentice',     color: '#c8d2ec' }
}

function getTrustScore(rune: Rune): number {
  // Deterministic score based on node count + edge count
  return Math.min(99, 40 + rune.nodes.length * 7 + rune.edges.length * 2)
}

export function RuneCard({ rune }: { rune: Rune }) {
  const skillCats = [...new Set(rune.nodes.map(n => n.category))]
  const grade = getGrade(rune.nodes.length)
  const trust = getTrustScore(rune)
  const trustColor = trust >= 85 ? '#9ece6a' : trust >= 70 ? '#bb9af7' : '#ff9e64'

  return (
    <Link href={`/runes/${rune.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#1e2030',
        border: '1px solid #292e42',
        borderRadius: '10px',
        padding: '1.25rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.borderColor = '#bb9af7'
          el.style.boxShadow = '0 0 20px rgba(187,154,247,0.2)'
          el.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.borderColor = '#292e42'
          el.style.boxShadow = 'none'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* Corner bracket decoration TL */}
        <div style={{ position: 'absolute', top: 4, left: 4, width: 10, height: 10, borderTop: '1.5px solid #bb9af7', borderLeft: '1.5px solid #bb9af7', opacity: 0.6 }} />
        {/* Corner bracket TR */}
        <div style={{ position: 'absolute', top: 4, right: 4, width: 10, height: 10, borderTop: '1.5px solid #bb9af7', borderRight: '1.5px solid #bb9af7', opacity: 0.6 }} />
        {/* Corner bracket BL */}
        <div style={{ position: 'absolute', bottom: 4, left: 4, width: 10, height: 10, borderBottom: '1.5px solid #bb9af7', borderLeft: '1.5px solid #bb9af7', opacity: 0.6 }} />
        {/* Corner bracket BR */}
        <div style={{ position: 'absolute', bottom: 4, right: 4, width: 10, height: 10, borderBottom: '1.5px solid #bb9af7', borderRight: '1.5px solid #bb9af7', opacity: 0.6 }} />

        {/* Header: title + badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
          <div style={{ fontWeight: 800, color: '#dde4fc', fontSize: '1.2rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.2 }}>{rune.name}</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
            <span style={{ fontSize: '0.65rem', background: 'rgba(187,154,247,0.15)', color: '#bb9af7', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(187,154,247,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>{rune.category}</span>
            <span style={{ fontSize: '0.6rem', color: grade.color, border: `1px solid ${grade.color}55`, padding: '1px 6px', borderRadius: '3px', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em' }}>{grade.label}</span>
          </div>
        </div>

        {/* Icon + description */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          {/* Icon box */}
          <div style={{
            flexShrink: 0,
            width: '42px', height: '42px',
            background: 'rgba(187,154,247,0.08)',
            border: '1px solid rgba(187,154,247,0.2)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem',
          }}>
            {rune.emoji}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#ccd4ee', lineHeight: 1.55, paddingTop: '2px' }}>{rune.purpose}</div>
        </div>

        {/* Trust score bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.62rem', color: '#8ab4e0', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '-0.01em', textTransform: 'uppercase' }}>Trust Score</span>
            <span style={{ fontSize: '0.62rem', color: trustColor, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{trust}</span>
          </div>
          <div style={{ height: '4px', background: '#1f2335', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${trust}%`,
              background: `linear-gradient(90deg, ${trustColor}99, ${trustColor})`,
              borderRadius: '2px',
              boxShadow: `0 0 6px ${trustColor}66`,
              transition: 'width 0.8s ease-out',
            }} />
          </div>
        </div>

        {/* Skill category badges */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: 'auto' }}>
          {skillCats.map(cat => (
            <span key={cat} style={{
              fontSize: '0.6rem', padding: '2px 6px', borderRadius: '3px',
              background: `${CAT_COLORS[cat] || '#ccd4ee'}18`,
              color: CAT_COLORS[cat] || '#ccd4ee',
              border: `1px solid ${CAT_COLORS[cat] || '#ccd4ee'}40`,
              fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em',
              fontFamily: "'JetBrains Mono', monospace",
            }}>{cat}</span>
          ))}
          <span style={{ fontSize: '0.6rem', padding: '2px 6px', borderRadius: '3px', background: '#1f2335', color: '#9aa4d2', marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace" }}>{rune.nodes.length} skills</span>
        </div>
      </div>
    </Link>
  )
}

export default RuneCard

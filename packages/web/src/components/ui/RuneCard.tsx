'use client'
import Link from 'next/link'
import { type Rune } from '@/data/runes'

// ── SVG Star ─────────────────────────────────────────────────────────
function StarSvg({ color, size = 10, delay = 0, bright = false }: {
  color: string; size?: number; delay?: number; bright?: boolean
}) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 10 10"
      className={bright ? 'rg-star-bright' : 'rg-star'}
      style={{ color, animationDelay: `${delay}s`, display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <polygon
        points="5,0.6 6.18,3.8 9.75,3.8 6.94,5.9 7.94,9.1 5,7.1 2.06,9.1 3.06,5.9 0.25,3.8 3.82,3.8"
        fill="currentColor"
      />
    </svg>
  )
}

function RarityStars({ count, color, bright }: { count: number; color: string; bright: boolean }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px', alignItems: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <StarSvg key={i} color={color} size={9} delay={i * 0.3} bright={bright} />
      ))}
    </span>
  )
}

const CAT_COLORS: Record<string, string> = {
  input:  '#7aa2f7',
  api:    '#9ece6a',
  llm:    '#bb9af7',
  output: '#ff9e64',
}

// ── Rarity system — maps Trust Score to RPG rarity tier ──────────────
type Rarity = {
  label:    string
  count:    number   // number of SVG stars
  color:    string
  glow:     string
  bg:       string
  animated: boolean
  bright:   boolean  // bright twinkle for Legendary/Epic
}

function getRarity(trust: number): Rarity {
  if (trust >= 94) return {
    label: 'LEGENDARY', count: 5,
    color: '#ffd060', glow: '#ffd060',
    bg: 'rgba(255,208,96,0.06)',
    animated: true, bright: true,
  }
  if (trust >= 85) return {
    label: 'EPIC', count: 4,
    color: '#ff9e64', glow: '#ff9e64',
    bg: 'rgba(255,158,100,0.05)',
    animated: false, bright: true,
  }
  if (trust >= 75) return {
    label: 'RARE', count: 3,
    color: '#bb9af7', glow: '#bb9af7',
    bg: 'rgba(187,154,247,0.05)',
    animated: false, bright: false,
  }
  if (trust >= 60) return {
    label: 'UNCOMMON', count: 2,
    color: '#7aa2f7', glow: '#7aa2f7',
    bg: 'rgba(122,162,247,0.04)',
    animated: false, bright: false,
  }
  return {
    label: 'COMMON', count: 1,
    color: '#8899bb', glow: '#8899bb',
    bg: 'rgba(136,153,187,0.03)',
    animated: false, bright: false,
  }
}

function getTrustScore(rune: Rune): number {
  return Math.min(99, 40 + rune.nodes.length * 7 + rune.edges.length * 2)
}

export function RuneCard({ rune }: { rune: Rune }) {
  const skillCats = [...new Set(rune.nodes.map(n => n.category))]
  const trust = getTrustScore(rune)
  const rarity = getRarity(trust)

  const baseBoxShadow = rarity.animated
    ? undefined  // CSS animation handles it
    : `0 0 12px ${rarity.glow}22, inset 0 0 20px ${rarity.glow}06`

  return (
    <Link href={`/runes/${rune.slug}`} style={{ textDecoration: 'none' }}>
      <div
        className={rarity.animated ? 'rg-card-legendary' : undefined}
        style={{
          background: `linear-gradient(145deg, #161824, #1e2030)`,
          backgroundImage: `linear-gradient(145deg, ${rarity.bg} 0%, transparent 60%), linear-gradient(145deg, #161824, #1e2030)`,
          border: `1.5px solid ${rarity.color}55`,
          borderRadius: '10px',
          padding: '1.25rem',
          cursor: 'pointer',
          transition: 'all 0.25s',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: baseBoxShadow,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.borderColor = `${rarity.color}cc`
          el.style.boxShadow = `0 0 20px ${rarity.glow}33, 0 4px 20px rgba(0,0,0,0.4)`
          el.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.borderColor = `${rarity.color}55`
          el.style.boxShadow = baseBoxShadow ?? 'none'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* ── Corner bracket decorations (rarity-colored) ── */}
        {(['tl','tr','bl','br'] as const).map(pos => (
          <div key={pos} style={{
            position: 'absolute',
            width: 14, height: 14,
            top:    pos.startsWith('t') ? 5 : undefined,
            bottom: pos.startsWith('b') ? 5 : undefined,
            left:   pos.endsWith('l')   ? 5 : undefined,
            right:  pos.endsWith('r')   ? 5 : undefined,
            borderTop:    pos.startsWith('t') ? `2px solid ${rarity.color}` : undefined,
            borderBottom: pos.startsWith('b') ? `2px solid ${rarity.color}` : undefined,
            borderLeft:   pos.endsWith('l')   ? `2px solid ${rarity.color}` : undefined,
            borderRight:  pos.endsWith('r')   ? `2px solid ${rarity.color}` : undefined,
            opacity: 0.75,
          }} />
        ))}

        {/* ── Rarity badge strip (top of card) ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '-0.25rem',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '0.58rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: rarity.color,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {rarity.label}
            <RarityStars count={rarity.count} color={rarity.color} bright={rarity.bright} />
          </span>
          <span style={{
            fontSize: '0.65rem',
            background: `${rarity.color}18`,
            color: rarity.color,
            padding: '2px 8px',
            borderRadius: '4px',
            border: `1px solid ${rarity.color}40`,
            fontFamily: "'JetBrains Mono', monospace",
          }}>{rune.category}</span>
        </div>

        {/* ── Title ── */}
        <div style={{
          fontWeight: 800,
          color: '#f0f4ff',
          fontSize: '1.1rem',
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}>{rune.name}</div>

        {/* ── Icon + description ── */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <div style={{
            flexShrink: 0,
            width: '42px', height: '42px',
            background: `${rarity.color}12`,
            border: `1px solid ${rarity.color}35`,
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem',
            boxShadow: `0 0 10px ${rarity.glow}22`,
          }}>{rune.emoji}</div>
          <div style={{ fontSize: '0.78rem', color: '#c8d2ec', lineHeight: 1.55, paddingTop: '2px' }}>{rune.purpose}</div>
        </div>

        {/* ── Trust / Power bar ── */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: '0.6rem', color: '#748ab8', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>⚡ Power</span>
            <span style={{ fontSize: '0.62rem', color: rarity.color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{trust} / 100</span>
          </div>
          <div style={{ height: '5px', background: '#0f1018', borderRadius: '3px', overflow: 'hidden', border: `1px solid ${rarity.color}18` }}>
            <div style={{
              height: '100%',
              width: `${trust}%`,
              background: `linear-gradient(90deg, ${rarity.color}66, ${rarity.color})`,
              borderRadius: '3px',
              boxShadow: `0 0 8px ${rarity.glow}88`,
              transition: 'width 0.8s ease-out',
            }} />
          </div>
        </div>

        {/* ── Skill category badges ── */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: 'auto' }}>
          {skillCats.map(cat => (
            <span key={cat} style={{
              fontSize: '0.6rem', padding: '2px 6px', borderRadius: '3px',
              background: `${CAT_COLORS[cat] || '#ccd4ee'}15`,
              color: CAT_COLORS[cat] || '#ccd4ee',
              border: `1px solid ${CAT_COLORS[cat] || '#ccd4ee'}40`,
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em',
              fontFamily: "'JetBrains Mono', monospace",
            }}>{cat}</span>
          ))}
          <span style={{
            fontSize: '0.6rem', padding: '2px 6px', borderRadius: '3px',
            background: '#0f1018', color: '#748ab8',
            border: '1px solid #1f2335',
            marginLeft: 'auto',
            fontFamily: "'JetBrains Mono', monospace",
          }}>{rune.nodes.length} skills</span>
        </div>
      </div>
    </Link>
  )
}

export default RuneCard

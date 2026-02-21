import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SKILLS_REGISTRY } from '@/data/skills-registry'
import { RUNES } from '@/data/runes'
import OverallScoreCard from '@/components/OverallScoreCard'
import { StatBar } from '@/components/StatBar'
import { getOverallScore, getSafetyReasons, getSafetyScore, safetyColor } from '@/lib/safety'

type Params = Promise<{ id: string }>

export async function generateStaticParams() {
  return SKILLS_REGISTRY.map(s => ({ id: s.id }))
}

const CAT_COLORS: Record<string, string> = {
  input:  '#7aa2f7',
  api:    '#9ece6a',
  llm:    '#bb9af7',
  output: '#ff9e64',
}
const CAT_LABELS: Record<string, string> = {
  input: '⬇ Input', api: '🔌 API', llm: '🧠 LLM', output: '⬆ Output',
}
const CAT_DESC: Record<string, string> = {
  input:  'Fetches or ingests data as the starting point of a Rune pipeline.',
  api:    'Calls an external service or API to process, enrich, or transform data.',
  llm:    'Uses a language model for generation, summarization, classification, or analysis.',
  output: 'Delivers the final result — sends a message, creates a record, or publishes content.',
}

function Corner({ pos, color }: { pos: 'tl'|'tr'|'bl'|'br'; color: string }) {
  const s: React.CSSProperties = {
    position: 'absolute', width: 10, height: 10, opacity: 0.5,
    top:    pos.startsWith('t') ? 6 : undefined,
    bottom: pos.startsWith('b') ? 6 : undefined,
    left:   pos.endsWith('l')   ? 6 : undefined,
    right:  pos.endsWith('r')   ? 6 : undefined,
    borderTop:    pos.startsWith('t') ? `1.5px solid ${color}` : undefined,
    borderBottom: pos.startsWith('b') ? `1.5px solid ${color}` : undefined,
    borderLeft:   pos.endsWith('l')   ? `1.5px solid ${color}` : undefined,
    borderRight:  pos.endsWith('r')   ? `1.5px solid ${color}` : undefined,
  }
  return <div style={s} />
}

export default async function SkillDetailPage({ params }: { params: Params }) {
  const { id } = await params
  const skill = SKILLS_REGISTRY.find(s => s.id === id)
  if (!skill) notFound()

  const color = CAT_COLORS[skill.category] || '#bb9af7'
  const usedInRunes = RUNES.filter(r => r.nodes.some(n => n.id === skill.id))
  const overall = getOverallScore(skill, usedInRunes.length)
  const reasons = getSafetyReasons(skill)
  const related = SKILLS_REGISTRY.filter(s => s.category === skill.category && s.id !== skill.id).slice(0, 8)

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem', fontSize: '0.82rem', color: '#7c86b8', fontFamily: "'JetBrains Mono', monospace" }}>
        <Link href="/skills" style={{ color: '#bb9af7', textDecoration: 'none' }}>Skills</Link>
        <span>›</span>
        <span style={{ color }}>{CAT_LABELS[skill.category]}</span>
        <span>›</span>
        <span style={{ color: '#b0bcd8' }}>{skill.id}</span>
      </div>

      {/* Hero */}
      <div style={{ background: '#1e2030', border: `1px solid ${color}30`, borderRadius: '14px', padding: '2rem', marginBottom: '1.25rem', position: 'relative', overflow: 'hidden' }}>
        <Corner pos="tl" color={color} /><Corner pos="tr" color={color} />
        <Corner pos="bl" color={color} /><Corner pos="br" color={color} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '350px', height: '250px', background: `radial-gradient(circle at top right, ${color}0A 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', position: 'relative' }}>
          <div style={{ width: 64, height: 64, borderRadius: '12px', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
            {skill.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.68rem', padding: '2px 10px', borderRadius: '4px', background: `${color}15`, color, border: `1px solid ${color}35`, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{skill.category}</span>
              <span style={{ fontSize: '0.68rem', color: '#7c86b8', fontFamily: "'JetBrains Mono', monospace" }}>{skill.service}</span>
            </div>
            <h1 style={{ margin: '0 0 0.4rem', fontSize: '1.75rem', color: '#c0caf5', fontFamily: "'Cinzel', serif", letterSpacing: '0.03em', fontWeight: 700 }}>{skill.label}</h1>
            <p style={{ margin: 0, fontSize: '0.65rem', color: '#7c86b8', fontFamily: "'JetBrains Mono', monospace" }}>{skill.id}</p>
          </div>
        </div>
        <p style={{ margin: '1.25rem 0 0', color: '#bac4e0', fontSize: '1rem', lineHeight: 1.7, maxWidth: '720px' }}>{skill.description}</p>
        <a
          href={skill.docsUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginTop: '0.95rem',
            padding: '0.45rem 1.1rem',
            borderRadius: '7px',
            border: `1px solid ${color}30`,
            background: `${color}15`,
            color,
            fontSize: '0.82rem',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          📖 Official Documentation ↗
        </a>
      </div>

      {/* Main 2-col layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.25rem', marginBottom: '1.25rem' }}>

        {/* Left col: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Type + Service */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <Corner pos="tl" color="#292e42" /><Corner pos="br" color="#292e42" />
              <h2 style={{ margin: '0 0 0.75rem', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8ab4e0', fontWeight: 600 }}>Skill Type</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{skill.category === 'input' ? '⬇' : skill.category === 'api' ? '🔌' : skill.category === 'llm' ? '🧠' : '⬆'}</span>
                <span style={{ color, fontWeight: 700, fontSize: '1rem' }}>{CAT_LABELS[skill.category]}</span>
              </div>
              <p style={{ margin: 0, color: '#b0bcd8', fontSize: '0.82rem', lineHeight: 1.6 }}>{CAT_DESC[skill.category]}</p>
            </section>

            <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <Corner pos="tl" color="#292e42" /><Corner pos="br" color="#292e42" />
              <h2 style={{ margin: '0 0 0.75rem', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8ab4e0', fontWeight: 600 }}>Powered By</h2>
              <div style={{ fontWeight: 700, color: '#c0caf5', fontSize: '1rem', marginBottom: '0.5rem' }}>{skill.service}</div>
              <p style={{ margin: '0 0 0.85rem', color: '#b0bcd8', fontSize: '0.82rem', lineHeight: 1.5 }}>Official API documentation and integration reference.</p>
            </section>
          </div>

          {/* Used in Runes */}
          {usedInRunes.length > 0 && (
            <section style={{ background: '#1e2030', border: `1px solid ${color}25`, borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <Corner pos="tl" color={color} /><Corner pos="tr" color={color} />
              <h2 style={{ margin: '0 0 1rem', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8ab4e0', fontWeight: 600 }}>
                Used in {usedInRunes.length} Rune{usedInRunes.length > 1 ? 's' : ''}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.6rem' }}>
                {usedInRunes.map(rune => (
                  <Link key={rune.id} href={`/runes/${rune.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#16161e', border: '1px solid #1f2335', borderRadius: '8px', padding: '0.85rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span>{rune.emoji}</span>
                        <span style={{ color: '#c0caf5', fontWeight: 600, fontSize: '0.88rem', fontFamily: "'Cinzel', serif" }}>{rune.name}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '0.6rem', color: '#bb9af7', background: 'rgba(187,154,247,0.1)', border: '1px solid rgba(187,154,247,0.2)', padding: '1px 6px', borderRadius: '3px', fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>{rune.category}</span>
                      </div>
                      <p style={{ margin: 0, color: '#8ab4e0', fontSize: '0.76rem', lineHeight: 1.5 }}>{rune.purpose}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related skills */}
          {related.length > 0 && (
            <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem', position: 'relative' }}>
              <Corner pos="tl" color="#292e42" />
              <h2 style={{ margin: '0 0 1rem', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8ab4e0', fontWeight: 600 }}>
                Related — {CAT_LABELS[skill.category]}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
                {related.map(s => {
                  const rs = getSafetyScore(s)
                  const rc = safetyColor(rs.total)
                  return (
                    <Link key={s.id} href={`/skills/${s.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ background: '#16161e', border: '1px solid #1f2335', borderRadius: '7px', padding: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                          <span style={{ fontSize: '0.9rem' }}>{s.icon}</span>
                          <span style={{ color: '#c0caf5', fontWeight: 600, fontSize: '0.8rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.label}</span>
                          <span style={{ fontSize: '0.6rem', color: rc, fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>{rs.total}</span>
                        </div>
                        <div style={{ color: '#7c86b8', fontSize: '0.63rem', fontFamily: "'JetBrains Mono', monospace" }}>{s.id}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
        </div>

        {/* Right col: Overall + Safety + Quick Facts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <OverallScoreCard overall={overall} reasons={reasons} />

          {/* Quick facts */}
          <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem' }}>
            <h2 style={{ margin: '0 0 0.85rem', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8ab4e0', fontWeight: 600 }}>Quick Facts</h2>
            {[
              { label: 'Skill ID', value: skill.id, mono: true },
              { label: 'Category', value: CAT_LABELS[skill.category], mono: false, col: color },
              { label: 'Service', value: skill.service, mono: false },
              { label: 'Used in', value: `${usedInRunes.length} Rune${usedInRunes.length !== 1 ? 's' : ''}`, mono: true },
            ].map(f => (
              <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0', borderBottom: '1px solid #1f2335' }}>
                <span style={{ fontSize: '0.78rem', color: '#8ab4e0' }}>{f.label}</span>
                <span style={{ fontSize: '0.78rem', color: f.col || '#a9b1d6', fontFamily: f.mono ? "'JetBrains Mono', monospace" : 'inherit', fontWeight: 500 }}>{f.value}</span>
              </div>
            ))}
            {skill.author && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0', borderBottom: '1px solid #1f2335' }}>
                <span style={{ fontSize: '0.78rem', color: '#8ab4e0' }}>Author</span>
                <span style={{ fontSize: '0.78rem', color: '#a9b1d6', fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>
                  {skill.author.url ? (
                    <a href={skill.author.url} target="_blank" rel="noreferrer" style={{ color: '#a8b8dc', textDecoration: 'underline' }}>
                      {skill.author.name}
                    </a>
                  ) : (
                    skill.author.name
                  )}
                </span>
              </div>
            )}
            {skill.version && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0', borderBottom: '1px solid #1f2335' }}>
                <span style={{ fontSize: '0.78rem', color: '#8ab4e0' }}>Version</span>
                <span style={{ fontSize: '0.78rem', color: '#a9b1d6', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
                  {skill.version}
                </span>
              </div>
            )}
            {skill.downloads !== undefined && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0', borderBottom: '1px solid #1f2335' }}>
                <span style={{ fontSize: '0.78rem', color: '#8ab4e0' }}>Downloads</span>
                <span style={{ fontSize: '0.78rem', color: '#a9b1d6', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
                  {skill.downloads.toLocaleString()}
                </span>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

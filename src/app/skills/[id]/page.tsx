import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SKILLS_REGISTRY } from '@/data/skills-registry'
import { RUNES } from '@/data/runes'

type Params = Promise<{ id: string }>

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

const CAT_DESC: Record<string, string> = {
  input:  'Fetches or ingests data as the starting point of a Rune pipeline.',
  api:    'Calls an external service or API to process, enrich, or transform data.',
  llm:    'Uses a language model for generation, summarization, classification, or analysis.',
  output: 'Delivers the final result — sends a message, creates a record, or publishes content.',
}

function Corner({ pos, color }: { pos: 'tl'|'tr'|'bl'|'br', color: string }) {
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

  // Runes that use this skill
  const usedInRunes = RUNES.filter(r => r.nodes.some(n => n.id === skill.id))

  // Related skills (same category, different skill)
  const related = SKILLS_REGISTRY
    .filter(s => s.category === skill.category && s.id !== skill.id)
    .slice(0, 6)

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem', fontSize: '0.85rem', color: '#414868', fontFamily: "'JetBrains Mono', monospace" }}>
        <Link href="/skills" style={{ color: '#bb9af7', textDecoration: 'none' }}>Skills</Link>
        <span>›</span>
        <span style={{ color: color }}>{CAT_LABELS[skill.category]}</span>
        <span>›</span>
        <span style={{ color: '#7982a9' }}>{skill.id}</span>
      </div>

      {/* Hero block */}
      <div style={{ background: '#1e2030', border: `1px solid ${color}30`, borderRadius: '14px', padding: '2rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <Corner pos="tl" color={color} />
        <Corner pos="tr" color={color} />
        <Corner pos="bl" color={color} />
        <Corner pos="br" color={color} />

        {/* bg glow */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: `radial-gradient(circle at top right, ${color}0A 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', position: 'relative' }}>
          {/* Icon */}
          <div style={{ width: 64, height: 64, borderRadius: '12px', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
            {skill.icon}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.7rem', padding: '2px 10px', borderRadius: '4px', background: `${color}15`, color, border: `1px solid ${color}35`, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                {skill.category}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#414868', fontFamily: "'JetBrains Mono', monospace" }}>{skill.service}</span>
            </div>
            <h1 style={{ margin: '0 0 0.4rem', fontSize: '1.8rem', color: '#c0caf5', fontFamily: "'Cinzel', serif", letterSpacing: '0.03em', fontWeight: 700 }}>
              {skill.label}
            </h1>
            <p style={{ margin: 0, fontSize: '0.65rem', color: '#414868', fontFamily: "'JetBrains Mono', monospace" }}>{skill.id}</p>
          </div>
        </div>

        <p style={{ margin: '1.25rem 0 0', color: '#a9b1d6', fontSize: '1rem', lineHeight: 1.7, maxWidth: '700px' }}>
          {skill.description}
        </p>
      </div>

      {/* 3-col info grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>

        {/* Category info */}
        <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" color="#292e42" />
          <Corner pos="br" color="#292e42" />
          <h2 style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#565f89', fontWeight: 600 }}>Skill Type</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '1.4rem' }}>
              {skill.category === 'input' ? '⬇' : skill.category === 'api' ? '🔌' : skill.category === 'llm' ? '🧠' : '⬆'}
            </span>
            <span style={{ color, fontWeight: 700, fontSize: '1.1rem' }}>{CAT_LABELS[skill.category]}</span>
          </div>
          <p style={{ margin: 0, color: '#7982a9', fontSize: '0.85rem', lineHeight: 1.6 }}>{CAT_DESC[skill.category]}</p>
        </section>

        {/* Service info */}
        <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" color="#292e42" />
          <Corner pos="br" color="#292e42" />
          <h2 style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#565f89', fontWeight: 600 }}>Powered By</h2>
          <div style={{ fontWeight: 700, color: '#c0caf5', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{skill.service}</div>
          <p style={{ margin: '0 0 1rem', color: '#7982a9', fontSize: '0.85rem', lineHeight: 1.5 }}>
            Official service documentation and API reference.
          </p>
          <a href={skill.docsUrl} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.4rem 1rem', borderRadius: '6px', fontSize: '0.82rem',
            background: `${color}15`, color, border: `1px solid ${color}35`,
            textDecoration: 'none', fontWeight: 600, transition: 'all 0.15s',
          }}>
            <span>↗</span> Visit {skill.service} Docs
          </a>
        </section>

        {/* Usage stats */}
        <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" color="#292e42" />
          <Corner pos="br" color="#292e42" />
          <h2 style={{ margin: '0 0 0.75rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#565f89', fontWeight: 600 }}>Usage</h2>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#c0caf5', fontFamily: "'Cinzel', serif", lineHeight: 1 }}>{usedInRunes.length}</div>
              <div style={{ fontSize: '0.72rem', color: '#565f89', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>Runes</div>
            </div>
          </div>
          {usedInRunes.length === 0 && (
            <p style={{ margin: 0, color: '#414868', fontSize: '0.82rem' }}>Not yet used in any Rune.</p>
          )}
          {usedInRunes.length > 0 && (
            <p style={{ margin: 0, color: '#7982a9', fontSize: '0.82rem' }}>This skill is a component in {usedInRunes.length} verified Rune{usedInRunes.length > 1 ? 's' : ''}.</p>
          )}
        </section>
      </div>

      {/* Used in Runes */}
      {usedInRunes.length > 0 && (
        <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" color={color} />
          <Corner pos="tr" color={color} />
          <h2 style={{ margin: '0 0 1.25rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#565f89', fontWeight: 600 }}>
            Used in Runes
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
            {usedInRunes.map(rune => (
              <Link key={rune.id} href={`/runes/${rune.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#16161e', border: '1px solid #1f2335', borderRadius: '8px', padding: '0.9rem 1rem', transition: 'all 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#bb9af7' + '50' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1f2335' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{rune.emoji}</span>
                    <span style={{ color: '#c0caf5', fontWeight: 600, fontSize: '0.9rem', fontFamily: "'Cinzel', serif" }}>{rune.name}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.62rem', color: '#bb9af7', background: 'rgba(187,154,247,0.1)', border: '1px solid rgba(187,154,247,0.2)', padding: '1px 6px', borderRadius: '3px', fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>
                      {rune.category}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: '#565f89', fontSize: '0.78rem', lineHeight: 1.5 }}>{rune.purpose}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related skills */}
      {related.length > 0 && (
        <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" color="#292e42" />
          <h2 style={{ margin: '0 0 1.25rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#565f89', fontWeight: 600 }}>
            Related Skills — {CAT_LABELS[skill.category]}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.6rem' }}>
            {related.map(s => (
              <Link key={s.id} href={`/skills/${s.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#16161e', border: '1px solid #1f2335', borderRadius: '7px', padding: '0.75rem', transition: 'all 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = color + '50' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1f2335' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.95rem' }}>{s.icon}</span>
                    <span style={{ color: '#c0caf5', fontWeight: 600, fontSize: '0.82rem' }}>{s.label}</span>
                  </div>
                  <div style={{ color: '#414868', fontSize: '0.65rem', fontFamily: "'JetBrains Mono', monospace" }}>{s.id}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

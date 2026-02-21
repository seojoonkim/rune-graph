import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RUNES, type Rune } from '@/data/runes'
import { SKILLS_REGISTRY } from '@/data/skills-registry'
import { PipelineGraph } from '@/components/graph/PipelineGraph'
import { getSafetyScore, safetyColor, safetyLabel } from '@/lib/safety'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return RUNES.map(r => ({ slug: r.slug }))
}

const CATEGORY_LABELS: Record<string, string> = { input: 'Input', api: 'API', llm: 'LLM', output: 'Output' }
const CATEGORY_COLORS: Record<string, string> = { input: '#7aa2f7', api: '#9ece6a', llm: '#bb9af7', output: '#ff9e64' }

function Corner({ pos, color = '#bb9af7' }: { pos: 'tl'|'tr'|'bl'|'br'; color?: string }) {
  const s: React.CSSProperties = {
    position: 'absolute', width: 10, height: 10, opacity: 0.45,
    top:    pos.startsWith('t') ? 5 : undefined, bottom: pos.startsWith('b') ? 5 : undefined,
    left:   pos.endsWith('l')   ? 5 : undefined, right:  pos.endsWith('r')   ? 5 : undefined,
    borderTop:    pos.startsWith('t') ? `1.5px solid ${color}` : undefined,
    borderBottom: pos.startsWith('b') ? `1.5px solid ${color}` : undefined,
    borderLeft:   pos.endsWith('l')   ? `1.5px solid ${color}` : undefined,
    borderRight:  pos.endsWith('r')   ? `1.5px solid ${color}` : undefined,
  }
  return <div style={s} />
}

// Compute overall rune trust score from node safety scores
function getRuneTrust(rune: Rune): number {
  const skillSafeties = rune.nodes.map(n => {
    const regSkill = SKILLS_REGISTRY.find(s => s.id === n.id)
    if (regSkill) return getSafetyScore(regSkill).total
    // fallback by category
    const fallback: Record<string, number> = { input: 72, api: 68, llm: 65, output: 70 }
    return fallback[n.category] || 65
  })
  const avg = skillSafeties.reduce((a, b) => a + b, 0) / skillSafeties.length
  return Math.round(avg)
}

export default async function RuneDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const rune = RUNES.find((r: Rune) => r.slug === slug)
  if (!rune) notFound()

  const trustScore = getRuneTrust(rune)
  const tColor = safetyColor(trustScore)
  const tLabel = safetyLabel(trustScore)

  // Enrich each node with registry data
  const enrichedNodes = rune.nodes.map(node => {
    const reg = SKILLS_REGISTRY.find(s => s.id === node.id)
    const safety = reg ? getSafetyScore(reg) : null
    return { ...node, reg, safety }
  })

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>
      {/* Back */}
      <Link href="/runes" style={{ color: '#bb9af7', textDecoration: 'none', fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace" }}>← Runes</Link>

      {/* Header */}
      <div style={{ marginTop: '1.25rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.85rem' }}>
          <div style={{ width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'radial-gradient(circle, rgba(187,154,247,0.2) 0%, transparent 70%)', border: '1px solid rgba(187,154,247,0.2)', flexShrink: 0, fontSize: '1.75rem' }}>
            {rune.emoji}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: '#bb9af7', background: 'rgba(187,154,247,0.12)', border: '1px solid rgba(187,154,247,0.3)', padding: '0.2rem 0.75rem', borderRadius: '999px', fontFamily: "'JetBrains Mono', monospace" }}>{rune.category}</span>
            <span style={{ fontSize: '0.72rem', color: tColor, background: `${tColor}12`, border: `1px solid ${tColor}35`, padding: '0.2rem 0.75rem', borderRadius: '999px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
              🛡 {tLabel} {trustScore}
            </span>
          </div>
        </div>
        <h1 style={{ margin: 0, fontSize: '2rem', color: '#c0caf5', lineHeight: 1.2, fontFamily: "'Cinzel', serif", letterSpacing: '0.03em' }}>{rune.name}</h1>
        <p style={{ color: '#9aa5ce', marginTop: '0.6rem', marginBottom: 0, maxWidth: '760px', lineHeight: 1.6, fontSize: '0.95rem' }}>{rune.purpose}</p>
      </div>

      {/* 3 info cards */}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: '1.5rem' }}>
        <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
          <h2 style={{ marginTop: 0, color: '#c0caf5', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.75rem' }}>Use Case</h2>
          <p style={{ margin: 0, color: '#9aa5ce', lineHeight: 1.65, fontSize: '0.875rem' }}>{rune.useCase}</p>
        </section>

        <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
          <h2 style={{ marginTop: 0, color: '#c0caf5', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.75rem' }}>
            Skill Pipeline <span style={{ color: '#7aa2c8', fontSize: '0.72rem', fontWeight: 400 }}>({rune.nodes.length} nodes)</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {rune.nodes.map((node, i) => (
              <div key={node.id} style={{ fontSize: '0.83rem', color: '#c0caf5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#a9b1d6' }}>{i + 1}. {node.label}</span>
                <span style={{ color: CATEGORY_COLORS[node.category] || '#888', fontSize: '0.62rem', fontFamily: "'JetBrains Mono', monospace", background: `${CATEGORY_COLORS[node.category] || '#888'}18`, border: `1px solid ${CATEGORY_COLORS[node.category] || '#888'}35`, padding: '1px 6px', borderRadius: '3px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {CATEGORY_LABELS[node.category] || node.category}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
          <h2 style={{ marginTop: 0, color: '#c0caf5', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.75rem' }}>
            Dependencies <span style={{ color: '#7aa2c8', fontSize: '0.72rem', fontWeight: 400 }}>({rune.edges.length})</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {rune.edges.map((e, i) => (
              <div key={`${e.source}-${e.target}-${i}`} style={{ fontSize: '0.78rem', color: '#9aa5ce', lineHeight: 1.4 }}>
                <span style={{ color: '#7aa2f7', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem' }}>{e.source}</span>
                <span style={{ margin: '0 0.3rem', color: '#7aa2c8' }}>→</span>
                <span style={{ color: '#ff9e64', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem' }}>{e.target}</span>
                <span style={{ marginLeft: '0.3rem', color: '#6272a4', fontSize: '0.7rem' }}>· {e.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Pipeline Graph */}
      <section style={{ background: '#0F0F18', border: '1px solid #292e42', borderRadius: '12px', padding: '1rem', position: 'relative', overflow: 'hidden', marginBottom: '1.5rem' }}>
        <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
        <h2 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#c0caf5', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Pipeline Graph</h2>
        <PipelineGraph rune={rune} />
      </section>

      {/* ── Skill Details (dense info below graph) ── */}
      <section style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <Corner pos="tl" color="#bb9af7" /><Corner pos="tr" color="#bb9af7" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ margin: 0, color: '#c0caf5', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
            Skill Breakdown — {rune.nodes.length} Skills
          </h2>
          {/* Avg safety */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#7aa2c8' }}>Avg Safety</span>
            <span style={{ fontSize: '0.82rem', color: tColor, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{trustScore}/100</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {enrichedNodes.map(({ id, label, category, reg, safety }) => {
            const cColor = CATEGORY_COLORS[category] || '#565f89'
            const sScore = safety?.total ?? 65
            const sColor2 = safetyColor(sScore)
            return (
              <div key={id} style={{ background: '#16161e', border: '1px solid #1f2335', borderRadius: '10px', padding: '1rem 1.25rem', transition: 'border-color 0.15s' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start' }}>
                  {/* Left: skill info */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1rem' }}>{reg?.icon || '⚙️'}</span>
                      <Link href={`/skills/${id}`} style={{ color: '#c0caf5', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none', fontFamily: "'Cinzel', serif" }}>
                        {label}
                      </Link>
                      <span style={{ fontSize: '0.6rem', padding: '1px 7px', borderRadius: '3px', background: `${cColor}15`, color: cColor, border: `1px solid ${cColor}35`, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {CATEGORY_LABELS[category]}
                      </span>
                      {reg && (
                        <span style={{ fontSize: '0.62rem', color: '#6272a4', fontFamily: "'JetBrains Mono', monospace"}}>{reg.service}</span>
                      )}
                    </div>
                    <div style={{ color: '#6272a4', fontSize: '0.65rem', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.4rem' }}>{id}</div>
                    {reg && (
                      <p style={{ margin: 0, color: '#9aa5ce', fontSize: '0.8rem', lineHeight: 1.5 }}>{reg.description}</p>
                    )}
                  </div>

                  {/* Right: safety */}
                  <div style={{ minWidth: '120px', textAlign: 'right' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: sColor2, fontFamily: "'Cinzel', serif", lineHeight: 1 }}>{sScore}</div>
                    <div style={{ fontSize: '0.6rem', color: sColor2, letterSpacing: '0.05em', marginBottom: '0.4rem', fontWeight: 600 }}>{safetyLabel(sScore)}</div>
                    {/* mini bar */}
                    <div style={{ height: '4px', background: '#1a1b26', borderRadius: '2px', overflow: 'hidden', width: '80px', marginLeft: 'auto' }}>
                      <div style={{ height: '100%', width: `${sScore}%`, background: `linear-gradient(90deg, ${sColor2}77, ${sColor2})`, borderRadius: '2px' }} />
                    </div>
                    {reg && (
                      <a href={reg.docsUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.65rem', color: '#7aa2c8', textDecoration: 'none' }}>↗ Docs</a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Overall pipeline safety summary */}
        <div style={{ marginTop: '1.25rem', padding: '1rem', background: `${tColor}08`, border: `1px solid ${tColor}25`, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.68rem', color: '#7aa2c8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>Pipeline Safety Score</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: tColor, fontFamily: "'Cinzel', serif" }}>{trustScore}/100 — {tLabel}</div>
          </div>
          <div style={{ flex: 1, height: '8px', background: '#1a1b26', borderRadius: '4px', overflow: 'hidden', minWidth: '120px' }}>
            <div style={{ height: '100%', width: `${trustScore}%`, background: `linear-gradient(90deg, ${tColor}66, ${tColor})`, borderRadius: '4px', boxShadow: `0 0 12px ${tColor}55` }} />
          </div>
          <div style={{ fontSize: '0.78rem', color: '#9aa5ce' }}>{rune.nodes.length} skills analyzed</div>
        </div>
      </section>
    </div>
  )
}

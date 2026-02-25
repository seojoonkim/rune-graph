import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Rune, Skill } from '@/lib/loader'
import { loadRunes, loadSkills, buildHubSkills, CATEGORY_COLORS as LOADER_CATEGORY_COLORS } from '@/lib/loader'
import { PipelineGraph } from '@/components/graph/PipelineGraph'
import { getSafetyScore, safetyColor, safetyLabel } from '@/lib/safety'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const RUNES = await loadRunes()
  return RUNES.map(r => ({ slug: r.slug }))
}

const CATEGORY_LABELS: Record<string, string> = { input: 'Input', api: 'API', llm: 'LLM', output: 'Output' }
const CATEGORY_COLORS: Record<string, string> = { input: '#7aa2f7', api: '#9ece6a', llm: '#bb9af7', output: '#ff9e64' }

function Corner({ pos, color = '#bb9af7' }: { pos: 'tl'|'tr'|'bl'|'br'; color?: string }) {
  const s: React.CSSProperties = {
    position: 'absolute', width: 16, height: 16, opacity: 0.85,
    top:    pos.startsWith('t') ? 5 : undefined, bottom: pos.startsWith('b') ? 5 : undefined,
    left:   pos.endsWith('l')   ? 5 : undefined, right:  pos.endsWith('r')   ? 5 : undefined,
    borderTop:    pos.startsWith('t') ? `2.5px solid ${color}` : undefined,
    borderBottom: pos.startsWith('b') ? `2.5px solid ${color}` : undefined,
    borderLeft:   pos.endsWith('l')   ? `2.5px solid ${color}` : undefined,
    borderRight:  pos.endsWith('r')   ? `2.5px solid ${color}` : undefined,
    filter: `drop-shadow(0 0 3px ${color}88)`,
  }
  return <div style={s} />
}

function StarSvg({ color, size = 10, delay = 0 }: { color: string; size?: number; delay?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" className="rg-star-bright"
      style={{ color, animationDelay: `${delay}s`, display: 'inline-block', verticalAlign: 'middle' }}>
      <polygon points="5,0.6 6.18,3.8 9.75,3.8 6.94,5.9 7.94,9.1 5,7.1 2.06,9.1 3.06,5.9 0.25,3.8 3.82,3.8" fill="currentColor" />
    </svg>
  )
}

function getRarity(trust: number): { label: string; count: number; color: string } {
  if (trust >= 94) return { label: 'LEGENDARY', count: 5, color: '#ffd060' }
  if (trust >= 85) return { label: 'EPIC',      count: 4, color: '#ff9e64' }
  if (trust >= 75) return { label: 'RARE',      count: 3, color: '#bb9af7' }
  if (trust >= 60) return { label: 'UNCOMMON',  count: 2, color: '#7aa2f7' }
  return                    { label: 'COMMON',   count: 1, color: '#8899bb' }
}

// Compute overall rune trust score from node safety scores
function getRuneTrust(rune: Rune, SKILLS_REGISTRY: Skill[]): number {
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
  const RUNES = await loadRunes()
  const SKILLS_REGISTRY = await loadSkills()

  const { slug } = await params
  const rune = RUNES.find((r: Rune) => r.slug === slug)
  if (!rune) notFound()

  const hubSkills = buildHubSkills(RUNES)

  const trustScore = getRuneTrust(rune, SKILLS_REGISTRY)
  const tColor = safetyColor(trustScore)
  const tLabel = safetyLabel(trustScore)
  const rarity = getRarity(trustScore)

  // Auth requirements for cookbook section
  type AuthReq = { key: string; docs: string; color: string }
  const authReqsRaw: (AuthReq | null)[] = rune.nodes.map(n => {
    if (n.category === 'llm') return { key: 'ANTHROPIC_API_KEY', docs: 'console.anthropic.com', color: '#bb9af7' }
    if (n.id.includes('gmail')) return { key: 'GMAIL_OAUTH', docs: 'console.cloud.google.com', color: '#7aa2f7' }
    if (n.id.includes('brave')) return { key: 'BRAVE_API_KEY', docs: 'api.search.brave.com', color: '#9ece6a' }
    if (n.id.includes('telegram')) return { key: 'TELEGRAM_BOT_TOKEN', docs: 't.me/BotFather', color: '#7aa2f7' }
    if (n.id.includes('notion')) return { key: 'NOTION_API_KEY', docs: 'notion.so/my-integrations', color: '#ff9e64' }
    if (n.id.includes('weather')) return { key: 'OPENWEATHER_API_KEY', docs: 'openweathermap.org/api', color: '#9ece6a' }
    if (n.id.includes('coingecko')) return { key: 'COINGECKO (free)', docs: 'coingecko.com/api', color: '#9ece6a' }
    if (n.id.includes('arxiv')) return { key: 'arXiv (free)', docs: 'arxiv.org/help/api', color: '#9ece6a' }
    return null
  })
  const authReqs: AuthReq[] = authReqsRaw
    .filter((x): x is AuthReq => x !== null)
    .filter((v, i, arr) => arr.findIndex(x => x.key === v.key) === i)

  // Enrich each node with registry data
  const enrichedNodes = rune.nodes.map(node => {
    const reg = SKILLS_REGISTRY.find(s => s.id === node.id)
    const safety = reg ? getSafetyScore(reg) : null
    return { ...node, reg, safety }
  })

  return (
    <div className="rg-page" style={{ maxWidth: '1300px', margin: '0 auto' }}>
      {/* Back */}
      <Link href="/runes" style={{ color: '#bb9af7', textDecoration: 'none', fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace" }}>← Runes</Link>

      {/* Header */}
      <div style={{ marginTop: '1.25rem', marginBottom: '1.75rem' }}>
        {/* Rarity + category badges */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.14em',
            color: rarity.color, background: `${rarity.color}15`,
            border: `1px solid ${rarity.color}55`, padding: '3px 10px', borderRadius: '4px',
            fontFamily: "'JetBrains Mono', monospace",
            boxShadow: `0 0 10px ${rarity.color}33`,
          }}>
            {rarity.label}&nbsp;
            {Array.from({ length: rarity.count }).map((_, i) => (
              <StarSvg key={i} color={rarity.color} size={11} delay={i * 0.3} />
            ))}
          </span>
          <span style={{ fontSize: '0.68rem', color: '#8ab4e0', background: 'rgba(122,162,247,0.08)', border: '1px solid rgba(122,162,247,0.2)', padding: '3px 10px', borderRadius: '4px', fontFamily: "'JetBrains Mono', monospace" }}>{rune.category}</span>
        </div>

        {/* Emoji + Title row */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.85rem' }}>
          <div style={{
            width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '12px', flexShrink: 0, fontSize: '2rem',
            background: `linear-gradient(145deg, ${rarity.color}18, ${rarity.color}06)`,
            border: `2px solid ${rarity.color}55`,
            boxShadow: `0 0 20px ${rarity.color}33, inset 0 0 20px ${rarity.color}08`,
          }}>{rune.emoji}</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', lineHeight: 1.2, fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em', color: '#f0f4ff', textShadow: `0 0 30px ${rarity.color}44` }}>{rune.name}</h1>
            <p style={{ color: '#c8d2ec', marginTop: '0.4rem', marginBottom: 0, maxWidth: '760px', lineHeight: 1.6, fontSize: '0.9rem' }}>{rune.purpose}</p>
          </div>
        </div>

        {/* Power Level HUD */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: `${rarity.color}08`, border: `1px solid ${rarity.color}25`, borderRadius: '8px', padding: '0.75rem 1rem', maxWidth: '480px' }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontSize: '0.55rem', color: rarity.color, fontWeight: 800, letterSpacing: '0.14em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '2px' }}>⚡ POWER LEVEL</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: rarity.color, fontFamily: "'Outfit', sans-serif", lineHeight: 1, textShadow: `0 0 20px ${rarity.color}88` }}>{trustScore}</div>
            <div style={{ fontSize: '0.55rem', color: '#748ab8', fontFamily: "'JetBrains Mono', monospace' " }}>{tLabel.toUpperCase()}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ height: '8px', background: '#0f1018', borderRadius: '4px', overflow: 'hidden', border: `1px solid ${rarity.color}22`, marginBottom: '6px' }}>
              <div style={{ height: '100%', width: `${trustScore}%`, background: `linear-gradient(90deg, ${rarity.color}66, ${rarity.color})`, borderRadius: '4px', boxShadow: `0 0 8px ${rarity.color}88` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.6rem', color: '#748ab8', fontFamily: "'JetBrains Mono', monospace" }}>TRUST SCORE</span>
              <span style={{ fontSize: '0.6rem', color: rarity.color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{trustScore} / 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 info cards */}
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', marginBottom: '1.5rem' }}>
        <section style={{ background: 'linear-gradient(145deg, #0f1018, #161824)', border: `1px solid ${rarity.color}33`, borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" color={rarity.color} /><Corner pos="tr" color={rarity.color} /><Corner pos="bl" color={rarity.color} /><Corner pos="br" color={rarity.color} />
          <h2 style={{ marginTop: 0, color: rarity.color, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800, marginBottom: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>◈ Use Case</h2>
          <p style={{ margin: 0, color: '#c8d2ec', lineHeight: 1.65, fontSize: '0.875rem' }}>{rune.useCase}</p>
        </section>

        <section style={{ background: 'linear-gradient(145deg, #0f1018, #161824)', border: `1px solid ${rarity.color}33`, borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" color={rarity.color} /><Corner pos="tr" color={rarity.color} /><Corner pos="bl" color={rarity.color} /><Corner pos="br" color={rarity.color} />
          <h2 style={{ marginTop: 0, color: rarity.color, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800, marginBottom: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
            ◈ Skill Pipeline <span style={{ color: '#748ab8', fontSize: '0.68rem', fontWeight: 500 }}>({rune.nodes.length} nodes)</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {rune.nodes.map((node, i) => (
              <div key={node.id} style={{ fontSize: '0.83rem', color: '#dde4fc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#ccd4ee' }}>{i + 1}. {node.label}</span>
                <span style={{ color: CATEGORY_COLORS[node.category] || '#888', fontSize: '0.62rem', fontFamily: "'JetBrains Mono', monospace", background: `${CATEGORY_COLORS[node.category] || '#888'}18`, border: `1px solid ${CATEGORY_COLORS[node.category] || '#888'}35`, padding: '1px 6px', borderRadius: '3px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {CATEGORY_LABELS[node.category] || node.category}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: 'linear-gradient(145deg, #0f1018, #161824)', border: `1px solid ${rarity.color}33`, borderRadius: '10px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <Corner pos="tl" color={rarity.color} /><Corner pos="tr" color={rarity.color} /><Corner pos="bl" color={rarity.color} /><Corner pos="br" color={rarity.color} />
          <h2 style={{ marginTop: 0, color: rarity.color, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800, marginBottom: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
            ◈ Dependencies <span style={{ color: '#748ab8', fontSize: '0.68rem', fontWeight: 500 }}>({rune.edges.length})</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {rune.edges.map((e, i) => (
              <div key={`${e.source}-${e.target}-${i}`} style={{ fontSize: '0.78rem', color: '#c8d2ec', lineHeight: 1.4 }}>
                <span style={{ color: '#7aa2f7', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem' }}>{e.source}</span>
                <span style={{ margin: '0 0.3rem', color: '#8ab4e0' }}>→</span>
                <span style={{ color: '#ff9e64', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem' }}>{e.target}</span>
                <span style={{ marginLeft: '0.3rem', color: '#9aa4d2', fontSize: '0.7rem' }}>· {e.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Pipeline Graph */}
      <section style={{ background: '#1a1b26', border: '1px solid #292e42', borderRadius: '12px', padding: '0', position: 'relative', overflow: 'hidden', marginBottom: '1.5rem' }}>
        <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
        <div style={{ padding: '1rem 1rem 0.5rem' }}>
          <h2 style={{ margin: 0, color: '#dde4fc', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Pipeline Graph</h2>
        </div>
        <PipelineGraph rune={rune} categoryColors={LOADER_CATEGORY_COLORS} hubSkills={hubSkills} />
      </section>

      {/* ── Cookbook Section ── */}
      <section style={{ background: 'linear-gradient(145deg, #0f1018, #161824)', border: `1px solid ${rarity.color}33`, borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden', marginBottom: '1.5rem' }}>
        <Corner pos="tl" color={rarity.color} /><Corner pos="tr" color={rarity.color} /><Corner pos="bl" color={rarity.color} /><Corner pos="br" color={rarity.color} />

        {/* Divider header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${rarity.color}44)` }} />
          <span style={{ fontSize: '0.68rem', fontWeight: 900, letterSpacing: '0.16em', color: rarity.color, fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap', textShadow: `0 0 12px ${rarity.color}88` }}>≪ ◈ COOKBOOK ◈ ≫</span>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${rarity.color}44, transparent)` }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>

          {/* Quick Start */}
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: rarity.color, letterSpacing: '0.12em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.75rem' }}>▸ QUICK START</div>
            <pre style={{ background: '#0d0e14', border: '1px solid #1f2335', borderRadius: '8px', padding: '1rem', margin: 0, fontSize: '0.75rem', color: '#c8d2ec', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.7, overflowX: 'auto' }}>
              <span style={{ color: '#636da6' }}># install the CLI</span>{'\n'}
              <span style={{ color: '#9ece6a' }}>npm</span> install -g rune-hub-cli{'\n\n'}
              <span style={{ color: '#636da6' }}># set up auth</span>{'\n'}
              {[...new Set(rune.nodes.map(n => n.category === 'llm' ? 'anthropic' : n.category === 'output' ? 'telegram' : n.id.split('-')[0]))].slice(0, 3).map(s => (
                <span key={s}><span style={{ color: '#9ece6a' }}>rune</span> auth {s}{'\n'}</span>
              ))}{'\n'}
              <span style={{ color: '#636da6' }}># run it</span>{'\n'}
              <span style={{ color: '#9ece6a' }}>rune</span> install <span style={{ color: '#e0af68' }}>{rune.slug}</span>{'\n'}
              <span style={{ color: '#9ece6a' }}>rune</span> run <span style={{ color: '#e0af68' }}>{rune.slug}</span>
            </pre>
          </div>

          {/* Ingredients */}
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: rarity.color, letterSpacing: '0.12em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.75rem' }}>▸ INGREDIENTS — {rune.nodes.length} SKILLS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {rune.nodes.map((node, i) => {
                const cColor = CATEGORY_COLORS[node.category] || '#9aa4d2'
                const reg = SKILLS_REGISTRY.find(s => s.id === node.id)
                return (
                  <div key={node.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0.75rem', background: '#0d0e14', borderRadius: '6px', border: `1px solid ${cColor}18` }}>
                    <span style={{ fontSize: '0.62rem', color: '#748ab8', fontFamily: "'JetBrains Mono', monospace", minWidth: '16px' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontSize: '0.95rem' }}>{reg?.icon || '⚙️'}</span>
                    <span style={{ color: '#dde4fc', fontSize: '0.82rem', flex: 1 }}>{node.label}</span>
                    <span style={{ fontSize: '0.58rem', padding: '1px 6px', borderRadius: '3px', background: `${cColor}15`, color: cColor, border: `1px solid ${cColor}35`, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase' as const }}>
                      {CATEGORY_LABELS[node.category]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* What you'll need */}
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: rarity.color, letterSpacing: '0.12em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.75rem' }}>▸ WHAT YOU&apos;LL NEED</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {authReqs.map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.45rem 0.75rem', background: '#0d0e14', borderRadius: '6px', border: `1px solid ${item.color}20` }}>
                  <span style={{ fontSize: '0.72rem', color: item.color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{item.key}</span>
                  <a href={`https://${item.docs}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.62rem', color: '#4a5578', textDecoration: 'none' }}>↗ {item.docs.split('/')[0]}</a>
                </div>
              ))}
              <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', background: `${rarity.color}08`, border: `1px solid ${rarity.color}20`, borderRadius: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: '#748ab8', fontFamily: "'JetBrains Mono', monospace" }}>Est. cost per run: </span>
                <span style={{ fontSize: '0.78rem', color: rarity.color, fontWeight: 700 }}>~$0.03–0.08</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skill Details (dense info below graph) ── */}
      <section style={{ background: 'linear-gradient(145deg, #0f1018, #161824)', border: `1px solid ${rarity.color}33`, borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <Corner pos="tl" color={rarity.color} /><Corner pos="tr" color={rarity.color} /><Corner pos="bl" color={rarity.color} /><Corner pos="br" color={rarity.color} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ margin: 0, color: rarity.color, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>
            ◈ Skill Breakdown — {rune.nodes.length} Skills
          </h2>
          {/* Avg safety */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.68rem', color: '#748ab8', fontFamily: "'JetBrains Mono', monospace" }}>Avg Safety</span>
            <span style={{ fontSize: '0.82rem', color: tColor, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace' " }}>{trustScore}/100</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {enrichedNodes.map(({ id, label, category, reg, safety }) => {
            const cColor = CATEGORY_COLORS[category] || '#9aa4d2'
            const sScore = safety?.total ?? 65
            const sColor2 = safetyColor(sScore)
            return (
              <div key={id} style={{ background: '#16161e', border: '1px solid #1f2335', borderRadius: '10px', padding: '1rem 1.25rem', transition: 'border-color 0.15s' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start' }}>
                  {/* Left: skill info */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1rem' }}>{reg?.icon || '⚙️'}</span>
                      <Link href={`/skills/${id}`} style={{ color: '#dde4fc', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none', fontFamily: "'Outfit', sans-serif" }}>
                        {label}
                      </Link>
                      <span style={{ fontSize: '0.6rem', padding: '1px 7px', borderRadius: '3px', background: `${cColor}15`, color: cColor, border: `1px solid ${cColor}35`, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                        {CATEGORY_LABELS[category]}
                      </span>
                      {reg && (
                        <span style={{ fontSize: '0.62rem', color: '#9aa4d2', fontFamily: "'JetBrains Mono', monospace"}}>{reg.service}</span>
                      )}
                    </div>
                    <div style={{ color: '#9aa4d2', fontSize: '0.65rem', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.4rem' }}>{id}</div>
                    {reg && (
                      <p style={{ margin: 0, color: '#c8d2ec', fontSize: '0.8rem', lineHeight: 1.5 }}>{reg.description}</p>
                    )}
                  </div>

                  {/* Right: safety */}
                  <div style={{ minWidth: '120px', textAlign: 'right' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: sColor2, fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>{sScore}</div>
                    <div style={{ fontSize: '0.6rem', color: sColor2, letterSpacing: '-0.01em', marginBottom: '0.4rem', fontWeight: 600 }}>{safetyLabel(sScore)}</div>
                    {/* mini bar */}
                    <div style={{ height: '4px', background: '#1a1b26', borderRadius: '2px', overflow: 'hidden', width: '80px', marginLeft: 'auto' }}>
                      <div style={{ height: '100%', width: `${sScore}%`, background: `linear-gradient(90deg, ${sColor2}77, ${sColor2})`, borderRadius: '2px' }} />
                    </div>
                    {reg && (
                      <a href={reg.docsUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.65rem', color: '#8ab4e0', textDecoration: 'none' }}>↗ Docs</a>
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
            <div style={{ fontSize: '0.68rem', color: '#8ab4e0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>Pipeline Safety Score</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: tColor, fontFamily: "'Outfit', sans-serif" }}>{trustScore}/100 — {tLabel}</div>
          </div>
          <div style={{ flex: 1, height: '8px', background: '#1a1b26', borderRadius: '4px', overflow: 'hidden', minWidth: '120px' }}>
            <div style={{ height: '100%', width: `${trustScore}%`, background: `linear-gradient(90deg, ${tColor}66, ${tColor})`, borderRadius: '4px', boxShadow: `0 0 12px ${tColor}55` }} />
          </div>
          <div style={{ fontSize: '0.78rem', color: '#c8d2ec' }}>{rune.nodes.length} skills analyzed</div>
        </div>
      </section>
    </div>
  )
}

'use client'
import { useState } from 'react'
import Link from 'next/link'
import { SKILLS_REGISTRY, SKILL_PACKAGES, type SkillCategory } from '@/data/skills-registry'
import { RUNES } from '@/data/runes'

// ── Colors ──────────────────────────────────────────────────────────────────
const ACTION_COLORS: Record<string, string> = {
  input: '#7aa2f7', api: '#9ece6a', llm: '#bb9af7', output: '#ff9e64',
}
const PKG_COLORS: Record<SkillCategory, string> = {
  ai:            '#c9a8ff',
  communication: '#7aa2f7',
  productivity:  '#9ece6a',
  dev:           '#f7768e',
  data:          '#2ac3de',
  finance:       '#ff9e64',
  marketing:     '#e0af68',
  iot:           '#73daca',
  media:         '#ff007c',
  utility:       '#9aa4d2',
}

// ── Rune usage count per action ──────────────────────────────────────────────
const runeUsageMap: Record<string, number> = {}
RUNES.forEach(r => r.nodes.forEach(n => {
  runeUsageMap[n.id] = (runeUsageMap[n.id] || 0) + 1
}))

// ── Action categories ────────────────────────────────────────────────────────
const ACTION_CATS = ['all', 'input', 'api', 'llm', 'output'] as const
type ActionCat = typeof ACTION_CATS[number]

const PKG_CATS: { id: SkillCategory | 'all'; label: string }[] = [
  { id: 'all',           label: 'All' },
  { id: 'ai',            label: 'AI Models' },
  { id: 'communication', label: 'Messaging' },
  { id: 'productivity',  label: 'Productivity' },
  { id: 'dev',           label: 'Dev Tools' },
  { id: 'data',          label: 'Data & Search' },
  { id: 'finance',       label: 'Finance' },
  { id: 'marketing',     label: 'Marketing' },
  { id: 'iot',           label: 'IoT' },
  { id: 'media',         label: 'Media' },
  { id: 'utility',       label: 'Utility' },
]

export default function SkillsPage() {
  const [view, setView]           = useState<'skills' | 'actions'>('skills')
  const [pkgCat, setPkgCat]       = useState<SkillCategory | 'all'>('all')
  const [actionCat, setActionCat] = useState<ActionCat>('all')
  const [search, setSearch]       = useState('')

  // ── Filtered skill packages ──────────────────────────────────────────────
  const filteredPkgs = SKILL_PACKAGES.filter(p => {
    const matchCat    = pkgCat === 'all' || p.category === pkgCat
    const matchSearch = !search
      || p.name.toLowerCase().includes(search.toLowerCase())
      || p.vendor.toLowerCase().includes(search.toLowerCase())
      || p.tagline.toLowerCase().includes(search.toLowerCase())
      || p.id.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  // ── Filtered actions ─────────────────────────────────────────────────────
  const filteredActions = SKILLS_REGISTRY.filter(s => {
    const matchCat    = actionCat === 'all' || s.category === actionCat
    const matchSearch = !search
      || s.label.toLowerCase().includes(search.toLowerCase())
      || s.service.toLowerCase().includes(search.toLowerCase())
      || s.id.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="rg-page" style={{ maxWidth: '1300px', margin: '0 auto' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem', fontWeight: 800, color: '#dde4fc',
          margin: '0 0 0.4rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em',
        }}>
          Skills Registry
        </h1>
        <p style={{ color: '#8ab4e0', fontSize: '0.95rem', margin: 0 }}>
          {SKILL_PACKAGES.length} skills · {SKILLS_REGISTRY.length} actions · powering {RUNES.length} runes
        </p>
      </div>

      {/* ── Layer explainer ── */}
      <div style={{
        display: 'flex', gap: '0.75rem', marginBottom: '2rem',
        padding: '1rem 1.25rem',
        background: '#13141f', border: '1px solid #2e3452', borderRadius: '10px',
        flexWrap: 'wrap',
      }}>
        {[
          { label: 'Action',  color: '#748ab8', desc: 'Single atomic API call — the primitive unit.', example: 'gmail.fetchEmails()', layer: '1' },
          { label: 'Skill',   color: '#a78bfa', desc: 'Installable service package bundling related actions.', example: 'rune skill add gmail', layer: '2' },
          { label: 'Rune',    color: '#f472b6', desc: 'Verified multi-skill workflow pipeline.', example: 'Morning Brief ↗', layer: '3' },
        ].map((item, i) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', flex: '1 1 200px', minWidth: 0 }}>
            {i > 0 && <span style={{ color: '#2e3452', alignSelf: 'center', fontSize: '1.1rem', flexShrink: 0, marginRight: '0.1rem' }}>›</span>}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
                <span style={{
                  fontSize: '8px', background: `${item.color}20`, color: item.color,
                  border: `1px solid ${item.color}40`, borderRadius: '3px',
                  padding: '1px 5px', fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700, letterSpacing: '0.5px',
                }}>LAYER {item.layer}</span>
                <span style={{ fontSize: '0.82rem', color: item.color, fontWeight: 700 }}>{item.label}</span>
              </div>
              <div style={{ fontSize: '0.76rem', color: '#9aa4d2', lineHeight: 1.4 }}>{item.desc}</div>
              <code style={{
                fontSize: '0.7rem', color: `${item.color}bb`,
                background: `${item.color}0f`, borderRadius: '4px', padding: '1px 6px',
                display: 'inline-block', marginTop: '3px',
                fontFamily: "'JetBrains Mono', monospace",
              }}>{item.example}</code>
            </div>
          </div>
        ))}
      </div>

      {/* ── View toggle + Search ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {/* View tabs */}
        <div style={{
          display: 'inline-flex', background: '#13141f',
          border: '1px solid #292e42', borderRadius: '8px', padding: '3px',
        }}>
          {[
            { id: 'skills',  label: `Skills  ${SKILL_PACKAGES.length}` },
            { id: 'actions', label: `Actions  ${SKILLS_REGISTRY.length}` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setView(tab.id as 'skills'|'actions'); setSearch(''); }}
              style={{
                padding: '5px 14px', borderRadius: '5px', border: 'none',
                cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                background: view === tab.id ? '#a78bfa22' : 'transparent',
                color: view === tab.id ? '#a78bfa' : '#748ab8',
                outline: 'none', transition: 'all 0.12s',
              }}
            >{tab.label}</button>
          ))}
        </div>

        {/* Category filter — Skills view */}
        {view === 'skills' && (
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {PKG_CATS.map(c => {
              const isActive = pkgCat === c.id
              const color = c.id === 'all' ? '#a78bfa' : PKG_COLORS[c.id as SkillCategory]
              return (
                <button key={c.id} onClick={() => setPkgCat(c.id as SkillCategory | 'all')} style={{
                  padding: '4px 10px', borderRadius: '5px', cursor: 'pointer',
                  border: `1px solid ${isActive ? color : '#292e42'}`,
                  background: isActive ? `${color}18` : '#1e2030',
                  color: isActive ? color : '#9aa4d2',
                  fontWeight: isActive ? 600 : 400, fontSize: '0.75rem', outline: 'none',
                }}>{c.label}</button>
              )
            })}
          </div>
        )}

        {/* Category filter — Actions view */}
        {view === 'actions' && (
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {ACTION_CATS.map(cat => {
              const isActive = actionCat === cat
              const color = cat === 'all' ? '#bb9af7' : ACTION_COLORS[cat]
              return (
                <button key={cat} onClick={() => setActionCat(cat)} style={{
                  padding: '4px 10px', borderRadius: '5px', cursor: 'pointer',
                  border: `1px solid ${isActive ? color : '#292e42'}`,
                  background: isActive ? `${color}18` : '#1e2030',
                  color: isActive ? color : '#9aa4d2',
                  fontWeight: isActive ? 600 : 400, fontSize: '0.75rem', outline: 'none',
                }}>
                  {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  <span style={{ marginLeft: '4px', fontSize: '0.7rem', opacity: 0.65 }}>
                    {cat === 'all' ? SKILLS_REGISTRY.length : SKILLS_REGISTRY.filter(s => s.category === cat).length}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* Search */}
        <div style={{ marginLeft: 'auto', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', color: '#8ab4e0', fontSize: '0.8rem' }}>🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder={view === 'skills' ? 'Search skills…' : 'Search actions…'}
            style={{
              background: '#1e2030', border: '1px solid #292e42', borderRadius: '6px',
              color: '#dde4fc', padding: '5px 10px 5px 2rem',
              fontSize: '0.82rem', outline: 'none', width: '200px', fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* ── Results count ── */}
      <p style={{ color: '#748ab8', fontSize: '0.75rem', marginBottom: '1.1rem', fontFamily: "'JetBrains Mono', monospace" }}>
        {view === 'skills'
          ? `${filteredPkgs.length} skill${filteredPkgs.length !== 1 ? 's' : ''} found`
          : `${filteredActions.length} action${filteredActions.length !== 1 ? 's' : ''} found`}
      </p>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* SKILL PACKAGES VIEW                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {view === 'skills' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '0.85rem' }}>
          {filteredPkgs.map(pkg => {
            const c = PKG_COLORS[pkg.category]
            const actionCount = pkg.actionIds.length
            const runesUsing = RUNES.filter(r => r.nodes.some(n => pkg.actionIds.includes(n.id))).length
            return (
              <div
                key={pkg.id}
                style={{
                  background: '#1e2030', border: `1px solid #292e42`,
                  borderRadius: '12px', padding: '1.1rem 1.25rem',
                  display: 'flex', flexDirection: 'column', gap: '0.6rem',
                  transition: 'all 0.15s', cursor: 'default', position: 'relative',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = `${c}55`; el.style.transform = 'translateY(-1px)'
                  el.style.boxShadow = `0 4px 20px ${c}14`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = '#292e42'; el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Verified badge */}
                {pkg.verified && (
                  <span style={{
                    position: 'absolute', top: 10, right: 10,
                    fontSize: '0.62rem', color: '#a8d878',
                    background: 'rgba(168,216,120,0.1)',
                    border: '1px solid rgba(168,216,120,0.3)',
                    borderRadius: '4px', padding: '1px 6px',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>✓ official</span>
                )}

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{
                    fontSize: '1.6rem', width: '2.4rem', height: '2.4rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${c}12`, borderRadius: '8px', border: `1px solid ${c}28`,
                    flexShrink: 0,
                  }}>{pkg.emoji}</span>
                  <div>
                    <div style={{ color: '#e2e8ff', fontWeight: 700, fontSize: '0.95rem' }}>{pkg.name}</div>
                    <div style={{ color: '#748ab8', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace" }}>
                      by {pkg.vendor}
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <p style={{ color: '#9aa4d2', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                  {pkg.tagline}
                </p>

                {/* Metadata row */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.65rem', padding: '1px 7px', borderRadius: '4px',
                    background: `${c}12`, color: c, border: `1px solid ${c}30`,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{pkg.category}</span>
                  <span style={{ fontSize: '0.65rem', padding: '1px 7px', borderRadius: '4px', background: '#1a1b26', color: '#748ab8', border: '1px solid #2e3452', fontFamily: "'JetBrains Mono', monospace" }}>
                    {actionCount} action{actionCount !== 1 ? 's' : ''}
                  </span>
                  {runesUsing > 0 && (
                    <span style={{ fontSize: '0.65rem', padding: '1px 7px', borderRadius: '4px', background: 'rgba(187,154,247,0.1)', color: '#bb9af7', border: '1px solid rgba(187,154,247,0.25)', fontFamily: "'JetBrains Mono', monospace" }}>
                      ×{runesUsing} runes
                    </span>
                  )}
                  {pkg.downloads && (
                    <span style={{ fontSize: '0.65rem', padding: '1px 7px', borderRadius: '4px', background: '#1a1b26', color: '#748ab8', border: '1px solid #2e3452', fontFamily: "'JetBrains Mono', monospace" }}>
                      ↓ {(pkg.downloads / 1000).toFixed(0)}k
                    </span>
                  )}
                </div>

                {/* Actions list */}
                <div style={{
                  background: '#13141f', borderRadius: '6px',
                  padding: '7px 10px', border: '1px solid #1f2335',
                }}>
                  <div style={{ fontSize: '0.65rem', color: '#4a5274', fontFamily: "'JetBrains Mono', monospace", marginBottom: '5px', letterSpacing: '0.5px' }}>
                    ACTIONS
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {pkg.actionIds.slice(0, 6).map(aid => {
                      const action = SKILLS_REGISTRY.find(s => s.id === aid)
                      if (!action) return null
                      const ac = ACTION_COLORS[action.category]
                      return (
                        <Link key={aid} href={`/skills/${aid}`} style={{ textDecoration: 'none' }}>
                          <span style={{
                            fontSize: '0.65rem', padding: '2px 7px', borderRadius: '4px',
                            background: `${ac}10`, color: `${ac}cc`,
                            border: `1px solid ${ac}25`,
                            fontFamily: "'JetBrains Mono', monospace",
                            cursor: 'pointer', display: 'inline-block',
                            transition: 'border-color 0.1s',
                          }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = `${ac}60`)}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = `${ac}25`)}
                          >
                            {action.icon} {action.label.replace(action.service, '').trim().replace(/^[- ]/, '')}
                          </span>
                        </Link>
                      )
                    })}
                    {pkg.actionIds.length > 6 && (
                      <span style={{ fontSize: '0.65rem', color: '#4a5274', padding: '2px 4px' }}>
                        +{pkg.actionIds.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Install command */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: '#0d0e17', borderRadius: '6px', padding: '6px 10px',
                  border: '1px solid #1f2335',
                }}>
                  <code style={{ fontSize: '0.72rem', color: '#a8d878', flex: 1, fontFamily: "'JetBrains Mono', monospace" }}>
                    {pkg.installCmd}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(pkg.installCmd)}
                    style={{
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: '#748ab8', fontSize: '10px', padding: '2px 5px',
                      borderRadius: '4px', flexShrink: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#a8d878')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#748ab8')}
                    title="Copy install command"
                  >
                    copy
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ACTIONS VIEW                                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {view === 'actions' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '0.75rem' }}>
          {filteredActions.map(action => {
            const usedIn = runeUsageMap[action.id] || 0
            const color = ACTION_COLORS[action.category] || '#9aa4d2'
            const parentSkill = SKILL_PACKAGES.find(p => p.actionIds.includes(action.id))
            return (
              <Link key={action.id} href={`/skills/${action.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#1e2030', border: '1px solid #292e42', borderRadius: '10px',
                  padding: '0.9rem 1rem', transition: 'all 0.15s', cursor: 'pointer',
                  position: 'relative', height: '100%',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = `${color}60`; el.style.transform = 'translateY(-1px)'
                    el.style.boxShadow = `0 4px 16px ${color}16`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = '#292e42'; el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0 }}>
                      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{action.icon}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ color: '#dde4fc', fontWeight: 600, fontSize: '0.86rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{action.label}</div>
                        <div style={{ color: '#9aa4d2', fontSize: '0.65rem', fontFamily: "'JetBrains Mono', monospace", marginTop: '1px' }}>{action.id}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.6rem', padding: '1px 6px', borderRadius: '3px', background: `${color}15`, color, border: `1px solid ${color}35`, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase' }}>
                        {action.category}
                      </span>
                      {usedIn > 0 && (
                        <span style={{ fontSize: '0.6rem', padding: '1px 6px', borderRadius: '3px', background: 'rgba(187,154,247,0.1)', color: '#bb9af7', border: '1px solid rgba(187,154,247,0.25)', fontFamily: "'JetBrains Mono', monospace" }}>
                          ×{usedIn} runes
                        </span>
                      )}
                    </div>
                  </div>
                  <p style={{ margin: '0.5rem 0 0.35rem', color: '#c8d2ec', fontSize: '0.78rem', lineHeight: 1.5 }}>
                    {action.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.65rem', color: '#748ab8', fontFamily: "'JetBrains Mono', monospace" }}>{action.service}</span>
                    {parentSkill && (
                      <span style={{ fontSize: '0.62rem', color: '#a78bfa', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '3px', padding: '0px 5px', fontFamily: "'JetBrains Mono', monospace" }}>
                        skill: {parentSkill.id}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Empty state */}
      {((view === 'skills' && filteredPkgs.length === 0) || (view === 'actions' && filteredActions.length === 0)) && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#9aa4d2' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace" }}>No results for "{search}"</p>
        </div>
      )}
    </div>
  )
}

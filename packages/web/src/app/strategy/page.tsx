'use client'
import Link from 'next/link'

const MONO = "'JetBrains Mono', monospace"
const OUTFIT = "'Outfit', sans-serif"

function SectionLabel({ color, children }: { color: string; children: string }) {
  return (
    <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.18em', color, marginBottom: '0.6rem', fontFamily: MONO, marginTop: 0 }}>
      {children}
    </p>
  )
}

function Code({ children, lang }: { children: string; lang?: string }) {
  return (
    <div style={{ background: '#0d0e17', border: '1px solid #1f2335', borderRadius: '10px', overflow: 'hidden', marginTop: '0.75rem' }}>
      {lang && (
        <div style={{ padding: '6px 14px', borderBottom: '1px solid #1f2335', fontSize: '0.6rem', color: '#4a5275', fontFamily: MONO, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f7768e', display: 'inline-block' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e0af68', display: 'inline-block' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#9ece6a', display: 'inline-block' }} />
          <span style={{ marginLeft: '4px' }}>{lang}</span>
        </div>
      )}
      <pre style={{ padding: '1rem 1.25rem', margin: 0, fontSize: '0.8rem', fontFamily: MONO, lineHeight: 1.75, overflowX: 'auto', whiteSpace: 'pre' }}>
        {children}
      </pre>
    </div>
  )
}

function InlineCode({ children }: { children: string }) {
  return (
    <code style={{ background: 'rgba(187,154,247,0.1)', border: '1px solid rgba(187,154,247,0.2)', borderRadius: '4px', padding: '1px 7px', fontSize: '0.82em', fontFamily: MONO, color: '#c9a8ff' }}>
      {children}
    </code>
  )
}

function Callout({ type, children }: { type: 'note' | 'warn' | 'tip'; children: React.ReactNode }) {
  const cfg = {
    note: { color: '#60a5fa', icon: 'ℹ', label: 'NOTE' },
    warn: { color: '#ff9e64', icon: '⚠', label: 'CAUTION' },
    tip:  { color: '#a8d878', icon: '✦', label: 'TIP' },
  }[type]
  return (
    <div style={{ display: 'flex', gap: '0.875rem', background: `${cfg.color}08`, border: `1px solid ${cfg.color}25`, borderRadius: '8px', padding: '0.875rem 1.1rem', margin: '1rem 0' }}>
      <span style={{ color: cfg.color, flexShrink: 0, fontSize: '0.75rem', fontWeight: 800, fontFamily: MONO, marginTop: '2px' }}>{cfg.label}</span>
      <div style={{ fontSize: '0.875rem', color: '#c8d2ec', lineHeight: 1.65 }}>{children}</div>
    </div>
  )
}

const TOC = [
  { id: 'overview',      label: '1. Overview' },
  { id: 'install',       label: '2. Installation' },
  { id: 'concepts',      label: '3. Core Concepts' },
  { id: 'first-run',     label: '4. Running Your First Rune' },
  { id: 'registry',      label: '5. The Rune Registry' },
  { id: 'builder',       label: '6. Building Custom Runes' },
  { id: 'tokens',        label: '7. Token Optimization' },
  { id: 'security',      label: '8. Security & Scopes' },
  { id: 'cli',           label: '9. CLI Reference' },
  { id: 'faq',           label: '10. FAQ' },
]

export default function GuidePage() {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '4rem 2rem 6rem' }}>

      {/* ── Header ── */}
      <SectionLabel color="#bb9af7">USER GUIDE</SectionLabel>
      <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#dde4fc', margin: '0 0 0.75rem', fontFamily: OUTFIT, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        RuneHub Documentation
      </h1>
      <p style={{ fontSize: '1rem', color: '#748ab8', lineHeight: 1.7, maxWidth: '600px', marginBottom: '0.5rem' }}>
        Everything you need to install, run, build, and optimize AI pipelines with RuneHub.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {['v0.1.0-beta', 'CLI required', 'Node ≥ 18'].map(b => (
          <span key={b} style={{ fontSize: '0.7rem', color: '#4a5275', background: '#1e2030', border: '1px solid #2e3452', padding: '2px 10px', borderRadius: '20px', fontFamily: MONO }}>{b}</span>
        ))}
      </div>

      {/* ── Table of Contents ── */}
      <div id="toc" style={{ background: '#16161e', border: '1px solid #2e3452', borderRadius: '12px', padding: '1.5rem', marginBottom: '4rem' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.18em', color: '#4a5275', marginBottom: '1rem', fontFamily: MONO, marginTop: 0 }}>TABLE OF CONTENTS</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.4rem' }}>
          {TOC.map(t => (
            <a key={t.id} href={`#${t.id}`} style={{ fontSize: '0.875rem', color: '#748ab8', textDecoration: 'none', padding: '4px 0', fontFamily: MONO, transition: 'color 0.1s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c9a8ff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#748ab8')}>
              {t.label}
            </a>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          1. OVERVIEW
      ════════════════════════════════════════════ */}
      <section id="overview" style={{ marginBottom: '4rem' }}>
        <SectionLabel color="#bb9af7">01</SectionLabel>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dde4fc', margin: '0 0 1rem', fontFamily: OUTFIT, letterSpacing: '-0.02em' }}>Overview</h2>
        <p style={{ color: '#9aa4d2', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          RuneHub is a composable AI workflow platform. It solves three persistent problems with LLM-based automation:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Reproducibility', color: '#bb9af7', body: 'The same Rune produces the same behavior every time. The workflow graph is locked — the LLM fills in content, not structure.' },
            { label: 'Token efficiency', color: '#ff9e64', body: 'Skip planning tokens, isolate context per step, cache repeated inputs, route to cheapest capable model. ~70% reduction per run.' },
            { label: 'Auditability',     color: '#34d399', body: 'Every skill declares its permission scope upfront. Every run produces an immutable step-by-step audit log.' },
          ].map(c => (
            <div key={c.label} style={{ background: '#1e2030', border: `1px solid ${c.color}22`, borderRadius: '10px', padding: '1rem 1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: c.color, fontWeight: 800, fontFamily: MONO, letterSpacing: '0.1em', marginBottom: '0.4rem' }}>{c.label.toUpperCase()}</div>
              <p style={{ color: '#9aa4d2', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>{c.body}</p>
            </div>
          ))}
        </div>
        <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>
          The core primitive is the <strong>Rune</strong> — a directed graph of <strong>Skills</strong> (packaged service capabilities) that runs deterministically, reports token usage, and carries a Trust Score.
        </p>
      </section>

      {/* ════════════════════════════════════════════
          2. INSTALLATION
      ════════════════════════════════════════════ */}
      <section id="install" style={{ marginBottom: '4rem' }}>
        <SectionLabel color="#34d399">02</SectionLabel>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dde4fc', margin: '0 0 1rem', fontFamily: OUTFIT, letterSpacing: '-0.02em' }}>Installation</h2>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, marginBottom: '0.4rem', marginTop: '1.5rem' }}>Prerequisites</h3>
        <ul style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 2, paddingLeft: '1.25rem', marginTop: 0 }}>
          <li>Node.js ≥ 18 (<InlineCode>node --version</InlineCode>)</li>
          <li>npm ≥ 9 or pnpm ≥ 8</li>
          <li>API keys for the services your Rune uses (added via <InlineCode>rune auth add</InlineCode>)</li>
        </ul>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, marginBottom: '0.4rem', marginTop: '1.5rem' }}>Install the CLI</h3>
        <Code lang="bash">{`# npm
npm install -g @runehub/cli

# pnpm
pnpm add -g @runehub/cli

# verify
rune --version   # → @runehub/cli 0.1.0`}</Code>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, marginBottom: '0.4rem', marginTop: '1.5rem' }}>Authenticate</h3>
        <Code lang="bash">{`# Link your RuneHub account (creates ~/.runehub/config.json)
rune login

# Add credentials for a service
rune auth add gmail          # opens OAuth flow
rune auth add openai         # prompts for API key
rune auth add slack --token  # manual token entry

# List configured credentials
rune auth list`}</Code>

        <Callout type="note">Credentials are stored locally in <InlineCode>~/.runehub/secrets/</InlineCode> and encrypted at rest. They are injected at runtime — never sent to RuneHub servers or included in LLM prompts.</Callout>
      </section>

      {/* ════════════════════════════════════════════
          3. CORE CONCEPTS
      ════════════════════════════════════════════ */}
      <section id="concepts" style={{ marginBottom: '4rem' }}>
        <SectionLabel color="#60a5fa">03</SectionLabel>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dde4fc', margin: '0 0 1rem', fontFamily: OUTFIT, letterSpacing: '-0.02em' }}>Core Concepts</h2>

        {/* 3.1 Skills */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#60a5fa', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '0 0 0.6rem' }}>3.1  Skills</h3>
          <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
            A Skill is a packaged service capability — one atomic action for one service. Skills are categorized as:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {[
              { cat: 'INPUT',  color: '#34d399', ex: 'gmail-fetch, gcal-list-events' },
              { cat: 'API',    color: '#60a5fa', ex: 'brave-search, openweather-fetch' },
              { cat: 'LLM',    color: '#a78bfa', ex: 'claude-summarize, gpt4o-vision' },
              { cat: 'OUTPUT', color: '#f472b6', ex: 'slack-post, notion-write' },
            ].map(c => (
              <div key={c.cat} style={{ background: '#16161e', border: `1px solid ${c.color}25`, borderRadius: '8px', padding: '0.75rem 1rem' }}>
                <div style={{ fontSize: '0.68rem', color: c.color, fontWeight: 800, fontFamily: MONO, letterSpacing: '0.12em', marginBottom: '0.3rem' }}>{c.cat}</div>
                <div style={{ fontSize: '0.75rem', color: '#748ab8', fontFamily: MONO }}>{c.ex}</div>
              </div>
            ))}
          </div>
          <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
            Skills are versioned, scoped, and independently auditable. The full registry contains 200+ skills across 40+ services — browse at <Link href="/skills" style={{ color: '#60a5fa', textDecoration: 'none' }}>runehub.ai/skills</Link>.
          </p>
        </div>

        {/* 3.2 Runes */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#bb9af7', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '0 0 0.6rem' }}>3.2  Runes</h3>
          <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
            A Rune is a directed acyclic graph (DAG) of Skills — a full workflow definition. The graph specifies execution order, parallelism, and data flow between steps.
          </p>
          <Code lang="json">{`// example: morning-brief.rune.json
{
  "name": "Morning Brief",
  "version": "3.0.0",
  "category": "Productivity",
  "trustScore": 91,
  "nodes": [
    { "id": "gcal",    "skill": "gcal-list-events",   "category": "input" },
    { "id": "gmail",   "skill": "gmail-fetch",         "category": "input" },
    { "id": "github",  "skill": "github-list-issues",  "category": "input" },
    { "id": "triage",  "skill": "claude-triage",       "category": "llm"   },
    { "id": "news",    "skill": "brave-news",           "category": "api"   },
    { "id": "weather", "skill": "openweather-fetch",   "category": "api"   },
    { "id": "compose", "skill": "claude-compose",      "category": "llm"   },
    { "id": "slack",   "skill": "slack-post",           "category": "output"},
    { "id": "tg",      "skill": "telegram-send",       "category": "output"},
    { "id": "notion",  "skill": "notion-write",        "category": "output"}
  ],
  "edges": [
    { "from": "gcal",   "to": "triage" },
    { "from": "gmail",  "to": "triage" },
    { "from": "github", "to": "triage" },
    { "from": "triage", "to": "compose" },
    { "from": "news",   "to": "compose" },
    { "from": "weather","to": "compose" },
    { "from": "compose","to": "slack" },
    { "from": "compose","to": "tg" },
    { "from": "compose","to": "notion" }
  ]
}`}</Code>
        </div>

        {/* 3.3 Trust Score */}
        <div>
          <h3 style={{ color: '#ff9e64', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '0 0 0.6rem' }}>3.3  Trust Score</h3>
          <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
            Every Rune carries a Trust Score (0–100) computed from its permission surface, data sensitivity, and service reputation. The score is deterministic and reproducible.
          </p>
          <div style={{ background: '#13131a', border: '1px solid #1f2335', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', padding: '0.5rem 1.1rem', borderBottom: '1px solid #1f2335', fontSize: '0.62rem', color: '#4a5275', fontFamily: MONO, fontWeight: 700, letterSpacing: '0.08em', gap: '1rem' }}>
              <span>SCORE</span><span>RISK LEVEL</span><span>WHAT IT MEANS</span>
            </div>
            {[
              ['90–100', '#a8d878', 'Low',      'Read-only scopes, no external data in LLM context. Safe for production use.'],
              ['75–89',  '#ffb07a', 'Moderate', 'Write permissions present or third-party API calls. Review scopes before running.'],
              ['55–74',  '#f87171', 'Elevated', 'Sensitive services, broad scopes, or unverified dependencies. Sandbox recommended.'],
              ['< 55',   '#f87171', 'High',     'Unverified or experimental. Audit manually. Do not run in production.'],
            ].map(([range, c, risk, desc]) => (
              <div key={range as string} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', padding: '0.7rem 1.1rem', borderBottom: '1px solid #1a1b2a', fontSize: '0.8rem', gap: '1rem', alignItems: 'start' }}>
                <span style={{ color: c as string, fontFamily: MONO, fontWeight: 700 }}>{range as string}</span>
                <span style={{ color: c as string, fontWeight: 600 }}>{risk as string}</span>
                <span style={{ color: '#748ab8', lineHeight: 1.55 }}>{desc as string}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. RUNNING YOUR FIRST RUNE
      ════════════════════════════════════════════ */}
      <section id="first-run" style={{ marginBottom: '4rem' }}>
        <SectionLabel color="#34d399">04</SectionLabel>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dde4fc', margin: '0 0 1rem', fontFamily: OUTFIT, letterSpacing: '-0.02em' }}>Running Your First Rune</h2>

        <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
          The following walkthrough installs and runs the <strong>Morning Brief</strong> Rune — a good representative of a full input → LLM → output pipeline.
        </p>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '0 0 0.4rem' }}>Step 1 — Browse and inspect</h3>
        <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.7, margin: '0 0 0.4rem' }}>
          Before installing, inspect what the Rune will access:
        </p>
        <Code lang="bash">{`# List all available Runes
rune list

# Inspect a specific Rune — shows skills, scopes, Trust Score
rune info morning-brief

# → Output:
#   Name:        Morning Brief
#   Version:     3.0.0
#   Trust Score: 91 / 100
#   Skills:      11  (gcal, gmail, github, brave-news, openweather,
#                     market-pulse, claude-triage, claude-compose,
#                     slack, telegram, notion)
#   Scopes:      calendar.readonly, gmail.readonly, github.read
#                slack.write, notion.write, telegram.write`}</Code>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '1.5rem 0 0.4rem' }}>Step 2 — Install</h3>
        <Code lang="bash">{`# Install skills (resolves deps like npm install)
rune install morning-brief

# → Resolving dependencies...
#   + gmail          ✓  (already authorized)
#   + calendar       ✓
#   + github         ✓
#   + brave-news     ✓  needs key → run: rune auth add brave-news
#   + openweather    ✓
#   + market-pulse   ✓
#   + llm-triage     ✓  uses ANTHROPIC_API_KEY
#   + llm-compose    ✓
#   + slack          ✓
#   + telegram       ✓
#   + notion         ✓
# ✓ 11 skills ready  |  Trust Score: 91  |  44 actions available`}</Code>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '1.5rem 0 0.4rem' }}>Step 3 — Run</h3>
        <Code lang="bash">{`rune run morning-brief

# → Running morning-brief v3.0.0...
#   [1/10] fetch-calendar    ✓  0.2s
#   [2/10] fetch-emails      ✓  0.3s
#   [3/10] fetch-github      ✓  0.5s
#   [4/10] claude-triage     ✓  1.4s   (1,240 tokens)
#   [5/10] fetch-news        ✓  0.4s
#   [6/10] fetch-weather     ✓  0.3s
#   [7/10] fetch-market      ✓  0.4s
#   [8/10] claude-compose    ✓  1.8s   (3,560 tokens)
#   [9/10] broadcast-3ch     ✓  0.3s
#  [10/10] archive-notion    ✓  0.1s
# ✓ Done in 5.8s  ·  4,800 tokens  ·  saved 71%  ·  archived to Notion`}</Code>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '1.5rem 0 0.4rem' }}>Step 4 — Review logs</h3>
        <Code lang="bash">{`# View last run
rune logs morning-brief --last

# View step-by-step detail
rune logs morning-brief --run <run-id> --verbose

# Export audit log as JSON
rune logs morning-brief --run <run-id> --format json > audit.json`}</Code>

        <Callout type="tip">Pass <InlineCode>--dry-run</InlineCode> to simulate execution without making any real API calls. Useful for testing pipelines before going live.</Callout>
      </section>

      {/* ════════════════════════════════════════════
          5. THE RUNE REGISTRY
      ════════════════════════════════════════════ */}
      <section id="registry" style={{ marginBottom: '4rem' }}>
        <SectionLabel color="#60a5fa">05</SectionLabel>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dde4fc', margin: '0 0 1rem', fontFamily: OUTFIT, letterSpacing: '-0.02em' }}>The Rune Registry</h2>
        <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>
          The registry hosts all verified Runes. Each Rune is reviewed for scope accuracy, dependency correctness, and Trust Score validity before publishing.
        </p>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '0 0 0.5rem' }}>Filtering and searching</h3>
        <Code lang="bash">{`# List by category
rune list --category productivity
rune list --category devops
rune list --category research

# Filter by minimum Trust Score
rune list --trust 85

# Search by keyword
rune search "github pr review"
rune search "slack notification"

# Sort by most-used
rune list --sort popular`}</Code>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '1.5rem 0 0.5rem' }}>Common Runes by use case</h3>
        <div style={{ background: '#13131a', border: '1px solid #1f2335', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', padding: '0.5rem 1.1rem', borderBottom: '1px solid #1f2335', fontSize: '0.62rem', color: '#4a5275', fontFamily: MONO, fontWeight: 700, letterSpacing: '0.08em', gap: '1rem' }}>
            <span>USE CASE</span><span>RUNE</span><span>TRUST</span>
          </div>
          {[
            ['Daily AI briefing from email + calendar',        'morning-brief',      '91', '#a8d878'],
            ['Summarize + triage GitHub PRs',                  'pr-digest',          '96', '#a8d878'],
            ['Multi-source research → Notion',                 'deep-research',      '96', '#a8d878'],
            ['Write SEO blog post and publish',                'blog-forge',         '87', '#ffb07a'],
            ['Monitor crypto prices → alerts',                 'market-alert',       '83', '#ffb07a'],
            ['Auto-reply to support tickets',                  'support-sage',       '79', '#ffb07a'],
            ['Meeting transcript → action items',              'meeting-scribe',     '94', '#a8d878'],
            ['Code review pipeline → PR comment',              'code-reviewer',      '88', '#a8d878'],
          ].map(([uc, rune, score, c], i, arr) => (
            <div key={rune as string} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', padding: '0.65rem 1.1rem', borderBottom: i < arr.length - 1 ? '1px solid #1a1b2a' : 'none', fontSize: '0.82rem', gap: '1rem', alignItems: 'center' }}>
              <span style={{ color: '#9aa4d2' }}>{uc as string}</span>
              <span style={{ color: '#c9a8ff', fontFamily: MONO, fontSize: '0.78rem' }}>{rune as string}</span>
              <span style={{ color: c as string, fontFamily: MONO, fontWeight: 700, fontSize: '0.78rem' }}>{score as string}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          6. BUILDING CUSTOM RUNES
      ════════════════════════════════════════════ */}
      <section id="builder" style={{ marginBottom: '4rem' }}>
        <SectionLabel color="#a78bfa">06</SectionLabel>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dde4fc', margin: '0 0 1rem', fontFamily: OUTFIT, letterSpacing: '-0.02em' }}>Building Custom Runes</h2>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '0 0 0.5rem' }}>6.1  Visual Builder (UI)</h3>
        <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '0.75rem' }}>
          Open the <Link href="/runes/build" style={{ color: '#a78bfa', textDecoration: 'none' }}>Rune Builder</Link> and:
        </p>
        <ol style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 2.1, paddingLeft: '1.5rem', marginTop: 0, marginBottom: '0.75rem' }}>
          <li>Start from a <strong>Quick Start template</strong> (Smart Alerts, Research Bot, Daily Brief) or a blank canvas.</li>
          <li>Drag skills from the left panel onto the canvas. Skills are categorized by type.</li>
          <li>Connect nodes by dragging from the right handle of one node to the left handle of another.</li>
          <li>Click <strong>✨ Auto-Fill Gaps</strong> — the engine detects missing LLM or output nodes, adds them, and wires all connections.</li>
          <li>Review the Trust Score in the top bar. Export as JSON when satisfied.</li>
        </ol>
        <Callout type="tip">Auto-Fill uses a fan-in/fan-out heuristic: multiple inputs converge to one LLM node; one LLM fan-out to all outputs. You can manually rewire anything after.</Callout>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '1.75rem 0 0.5rem' }}>6.2  CLI authoring</h3>
        <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '0.5rem' }}>
          Write Rune definitions directly in JSON or YAML and register them locally:
        </p>
        <Code lang="bash">{`# Scaffold a new Rune
rune init my-pipeline

# Edit the generated my-pipeline.rune.json
# (see Core Concepts §3.2 for the schema)

# Validate the graph before running
rune validate my-pipeline.rune.json

# Register it locally
rune register ./my-pipeline.rune.json

# Run it
rune run my-pipeline`}</Code>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '1.75rem 0 0.5rem' }}>6.3  Publishing to the registry</h3>
        <Code lang="bash">{`# Lint and verify Trust Score
rune publish --check my-pipeline.rune.json

# Publish (requires RuneHub account + Trust Score ≥ 70)
rune publish my-pipeline.rune.json

# Update an existing Rune
rune publish my-pipeline.rune.json --bump patch`}</Code>
        <Callout type="warn">Published Runes undergo automated scope verification. Trust Scores below 70 are rejected from the public registry — they can still be shared as private Runes.</Callout>
      </section>

      {/* ════════════════════════════════════════════
          7. TOKEN OPTIMIZATION
      ════════════════════════════════════════════ */}
      <section id="tokens" style={{ marginBottom: '4rem' }}>
        <SectionLabel color="#ff9e64">07</SectionLabel>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dde4fc', margin: '0 0 0.5rem', fontFamily: OUTFIT, letterSpacing: '-0.02em' }}>Token Optimization</h2>
        <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          A naive 8-skill LLM pipeline costs ~12,000 tokens per run. RuneHub reduces this to ~3,600 through four compounding techniques — all applied automatically.
        </p>
        {[
          {
            num: '7.1', color: '#34d399', title: 'Zero-token planning',
            body: 'Traditional agents burn 1,500–2,500 tokens per run just deciding what tools to call and in what order. In RuneHub, the Rune graph *is* the plan — there is no planning phase. Zero tokens spent on orchestration.',
            saving: '~2,000 tokens',
          },
          {
            num: '7.2', color: '#60a5fa', title: 'Context isolation',
            body: 'Each skill receives only its declared inputs — not the entire session history. A summarization step that takes one email as input does not receive the previous 5,000 tokens of context.',
            saving: '~4,000–5,000 tokens',
          },
          {
            num: '7.3', color: '#bb9af7', title: 'Semantic caching',
            body: 'Inputs are embedded and compared to a local vector cache. If a semantically equivalent input was processed within the TTL window, the cached output is returned and the LLM is never called.',
            saving: 'variable (0–100% on cache hit)',
          },
          {
            num: '7.4', color: '#ff9e64', title: 'Smart model routing',
            body: (
              <span>
                Each step is routed to the cheapest model capable of handling it. Classification and extraction → Groq (Llama/Mixtral, ~10× cheaper than GPT-4). Triage and scoring → Claude Haiku. Complex synthesis → Claude Sonnet. Opus is never used by default.
              </span>
            ),
            saving: '30–50% per LLM step',
          },
        ].map(t => (
          <div key={t.num} style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem 1.5rem', background: '#16161e', border: `1px solid ${t.color}18`, borderRadius: '12px', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontSize: '0.65rem', color: t.color, fontWeight: 800, fontFamily: MONO, marginBottom: '0.2rem' }}>{t.num}</div>
              <div style={{ fontSize: '0.65rem', color: '#4a5275', fontFamily: MONO, whiteSpace: 'nowrap' }}>saves</div>
              <div style={{ fontSize: '0.72rem', color: t.color, fontFamily: MONO, fontWeight: 700, whiteSpace: 'nowrap' }}>{t.saving}</div>
            </div>
            <div>
              <h3 style={{ color: '#dde4fc', fontSize: '0.95rem', fontWeight: 700, fontFamily: OUTFIT, margin: '0 0 0.35rem' }}>{t.title}</h3>
              <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{t.body}</p>
            </div>
          </div>
        ))}
        <div style={{ background: 'rgba(255,158,100,0.06)', border: '1px solid rgba(255,158,100,0.25)', borderRadius: '10px', padding: '1rem 1.25rem' }}>
          <span style={{ color: '#ff9e64', fontWeight: 800, fontSize: '0.875rem' }}>Combined result: </span>
          <span style={{ color: '#c8d2ec', fontSize: '0.875rem' }}>~12,000 tokens → ~3,600 tokens per run. At $0.003/1K tokens (Sonnet), that&apos;s $0.036 → $0.011 per run — roughly 70% cost reduction.</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          8. SECURITY & SCOPES
      ════════════════════════════════════════════ */}
      <section id="security" style={{ marginBottom: '4rem' }}>
        <SectionLabel color="#f87171">08</SectionLabel>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dde4fc', margin: '0 0 1rem', fontFamily: OUTFIT, letterSpacing: '-0.02em' }}>Security & Scopes</h2>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '0 0 0.5rem' }}>Least-privilege by default</h3>
        <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '0.75rem' }}>
          Every skill declares exactly the OAuth scope or API permission it requires. RuneHub never requests broader access than declared. For example:
        </p>
        <Code lang="json">{`// gmail-fetch skill manifest
{
  "id": "gmail-fetch",
  "scopes": ["https://www.googleapis.com/auth/gmail.readonly"],
  // NOT gmail.modify, NOT gmail.send — read-only
  "dataAccess": ["email_body", "email_headers"],
  "externalCalls": false   // no data leaves to third parties
}`}</Code>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '1.5rem 0 0.5rem' }}>Secrets never reach the LLM</h3>
        <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '0.75rem' }}>
          API keys and OAuth tokens are stored in <InlineCode>~/.runehub/secrets/</InlineCode> (AES-256 encrypted). At runtime, each skill receives its credentials via environment injection — the LLM prompt context never contains a secret, even accidentally.
        </p>

        <h3 style={{ color: '#c8d2ec', fontSize: '1rem', fontWeight: 700, fontFamily: OUTFIT, margin: '1.5rem 0 0.5rem' }}>Audit logs</h3>
        <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '0.75rem' }}>
          Every execution writes an immutable log entry:
        </p>
        <Code lang="json">{`// ~/.runehub/logs/morning-brief/<run-id>.json
{
  "runId": "rb_01j9x...",
  "rune": "morning-brief",
  "startedAt": "2026-02-22T03:00:00Z",
  "steps": [
    {
      "skill": "gmail-fetch",
      "status": "ok",
      "durationMs": 320,
      "inputHash": "sha256:a3f9...",   // hash, not raw data
      "tokensUsed": 0
    },
    {
      "skill": "claude-triage",
      "status": "ok",
      "durationMs": 1420,
      "tokensUsed": 1240,
      "model": "claude-haiku-4"
    }
    // ... all 10 steps
  ],
  "totalTokens": 4800,
  "tokensSaved": 7200
}`}</Code>
        <Callout type="note">Logs are stored locally by default. Cloud log sync (with retention policy) is available on the Optimizer and Pro tiers.</Callout>
      </section>

      {/* ════════════════════════════════════════════
          9. CLI REFERENCE
      ════════════════════════════════════════════ */}
      <section id="cli" style={{ marginBottom: '4rem' }}>
        <SectionLabel color="#7aa2f7">09</SectionLabel>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dde4fc', margin: '0 0 1rem', fontFamily: OUTFIT, letterSpacing: '-0.02em' }}>CLI Reference</h2>
        <div style={{ background: '#13131a', border: '1px solid #1f2335', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', padding: '0.5rem 1.1rem', borderBottom: '1px solid #1f2335', fontSize: '0.62rem', color: '#4a5275', fontFamily: MONO, fontWeight: 700, letterSpacing: '0.08em', gap: '1rem' }}>
            <span>COMMAND</span><span>DESCRIPTION</span>
          </div>
          {[
            ['rune list [--category] [--trust]',   'List Runes, filtered by category or minimum trust score'],
            ['rune info <name>',                    'Show full skill manifest, scopes, Trust Score for a Rune'],
            ['rune search <query>',                 'Search Runes by keyword, service, or category'],
            ['rune install <name>',                 'Install all skills + deps for a Rune'],
            ['rune run <name> [--dry-run]',         'Execute a Rune. --dry-run simulates without real calls'],
            ['rune run <name> --schedule "0 7 * * *"', 'Schedule a Rune via cron expression'],
            ['rune logs <name> [--last] [--run id]','View execution logs. --verbose shows full step detail'],
            ['rune auth add <service>',             'Authorize a service (OAuth flow or API key prompt)'],
            ['rune auth list',                      'List all configured credentials and their scope'],
            ['rune auth revoke <service>',          'Remove credentials for a service'],
            ['rune init <name>',                    'Scaffold a new Rune definition (JSON + README)'],
            ['rune validate <file>',                'Validate Rune JSON schema and graph connectivity'],
            ['rune register <file>',                'Register a local Rune definition for use with run/logs'],
            ['rune publish <file>',                 'Publish a Rune to the registry (Trust Score ≥ 70 required)'],
            ['rune publish --check <file>',         'Lint and compute Trust Score without publishing'],
            ['rune --version',                      'Print CLI version'],
            ['rune help [command]',                 'Show help for any command'],
          ].map(([cmd, desc], i, arr) => (
            <div key={cmd as string} style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', padding: '0.65rem 1.1rem', borderBottom: i < arr.length - 1 ? '1px solid #1a1b2a' : 'none', gap: '1rem', alignItems: 'start' }}>
              <code style={{ fontSize: '0.75rem', color: '#c9a8ff', fontFamily: MONO, lineHeight: 1.5 }}>{cmd as string}</code>
              <span style={{ fontSize: '0.82rem', color: '#748ab8', lineHeight: 1.55 }}>{desc as string}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          10. FAQ
      ════════════════════════════════════════════ */}
      <section id="faq" style={{ marginBottom: '4rem' }}>
        <SectionLabel color="#e0af68">10</SectionLabel>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dde4fc', margin: '0 0 1.5rem', fontFamily: OUTFIT, letterSpacing: '-0.02em' }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#1f2335', borderRadius: '12px', overflow: 'hidden' }}>
          {[
            {
              q: 'Do I need a RuneHub account to run Runes?',
              a: 'No. The CLI and all Runes work fully offline with your own API keys. A RuneHub account is required only to publish Runes to the registry or to use the Optimizer/Pro token-saving features.',
            },
            {
              q: 'Where are my API keys stored?',
              a: 'Locally in ~/.runehub/secrets/ — AES-256 encrypted using a key derived from your machine. Nothing is sent to RuneHub servers unless you explicitly enable cloud log sync (Optimizer/Pro).',
            },
            {
              q: 'Can I run Runes on a schedule?',
              a: 'Yes. Use rune run <name> --schedule "0 7 * * *" to register a cron-based schedule. The daemon runs locally via rune daemon start.',
            },
            {
              q: 'What if a skill I need is not in the registry?',
              a: 'You can author a custom skill using the skill SDK (npm package @runehub/skill-sdk), validate it locally, and register it for private use. Community skills can be submitted for registry review via rune publish.',
            },
            {
              q: 'What models does RuneHub support?',
              a: 'Claude (Haiku, Sonnet, Opus), GPT-4o / GPT-4o-mini, Groq-hosted open-source models (Llama 3, Mixtral), Gemini Pro, and local models via Ollama. Model routing is configurable per-skill.',
            },
            {
              q: 'What is the Trust Score based on?',
              a: 'Skill count, scope breadth (read vs. write), service sensitivity (financial APIs, social write access lower the score), and presence of LLM and output nodes. The formula is deterministic — the same Rune always produces the same score.',
            },
            {
              q: 'Is there a way to test a Rune without running it for real?',
              a: 'Yes — rune run <name> --dry-run simulates the full execution graph, shows which API calls would be made, and estimates token usage, without calling any external service.',
            },
          ].map(({ q, a }) => (
            <div key={q} style={{ background: '#16161e', padding: '1.25rem 1.5rem' }}>
              <h3 style={{ color: '#dde4fc', fontSize: '0.9rem', fontWeight: 700, fontFamily: OUTFIT, margin: '0 0 0.5rem' }}>{q}</h3>
              <p style={{ color: '#748ab8', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div style={{ background: '#1e2030', border: '1px solid #2e3452', borderRadius: '12px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: '#748ab8', fontSize: '0.8rem', fontFamily: MONO, margin: 0 }}>$ rune install morning-brief --run</p>
        <h2 style={{ color: '#dde4fc', fontSize: '1.3rem', fontWeight: 800, fontFamily: OUTFIT, margin: 0, letterSpacing: '-0.01em' }}>Ready to run your first pipeline?</h2>
        <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
          <Link href="/runes" style={{ padding: '0.65rem 1.5rem', background: 'linear-gradient(135deg, #9d7cd8, #bb9af7)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem', fontFamily: OUTFIT }}>Browse Runes ›</Link>
          <Link href="/runes/build" style={{ padding: '0.65rem 1.5rem', background: 'transparent', color: '#bb9af7', border: '1px solid rgba(187,154,247,0.4)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>Open Builder ›</Link>
          <Link href="/skills" style={{ padding: '0.65rem 1.5rem', background: 'transparent', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.3)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>Skill Registry ›</Link>
        </div>
      </div>

    </div>
  )
}

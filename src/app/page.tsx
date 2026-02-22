import Link from 'next/link'
import { RUNES, FULL_GRAPH } from '@/data/runes'
import { SKILLS_REGISTRY, SKILL_PACKAGES } from '@/data/skills-registry'
import { RuneCard } from '@/components/ui/RuneCard'
import { MorningBriefGraph } from '@/components/graph/MorningBriefGraph'

export default function Home() {
  const stats = [
    { value: RUNES.length,              label: 'Runes',              color: '#bb9af7' },
    { value: SKILL_PACKAGES.length,     label: 'Skills',             color: '#bb9af7' },
    { value: SKILLS_REGISTRY.length,    label: 'Actions',            color: '#bb9af7' },
    { value: '68%',                     label: 'Avg Token Savings',  color: '#34d399' },
    { value: '87',                      label: 'Avg Trust Score',    color: '#ff9e64' },
    { value: '95%',                     label: 'Skip Manual Setup',  color: '#7aa2f7' },
  ]

  return (
    <div>
      {/* ── Hero ── */}
      <section className="rg-hero">
        {/* BG image */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/hero-forge.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 30%', zIndex: 0 }} />
        {/* Dark overlay: top-heavy so text stays readable */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,27,38,0.92) 0%, rgba(26,27,38,0.78) 45%, rgba(26,27,38,0.97) 100%)', zIndex: 1 }} />
        {/* Subtle purple center glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(187,154,247,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 2 }} />

        {/* Hero content — above overlays */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(187,154,247,0.12)', border: '1px solid rgba(187,154,247,0.35)', borderRadius: '100px', padding: '0.35rem 1.1rem', fontSize: '0.75rem', color: '#bb9af7', marginBottom: '2rem', letterSpacing: '-0.01em', backdropFilter: 'blur(4px)' }}>
            ✦ {RUNES.length} verified Runes · install in one command
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.08, margin: '0 0 1.25rem', fontFamily: "'Outfit', sans-serif", textShadow: '0 2px 30px rgba(0,0,0,0.8)' }}>
            <span style={{ color: '#dde4fc' }}>Your AI stack,</span><br />
            <span style={{ color: '#bb9af7', textShadow: '0 0 40px rgba(187,154,247,0.5)' }}>already assembled.</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#ccd4ee', maxWidth: '520px', margin: '0 auto 0.75rem', lineHeight: 1.75 }}>
            Pick a workflow. Run one command. Everything installs, connects, and executes — automatically.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#748ab8', maxWidth: '480px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
            Deterministic runs. 70% fewer tokens. Trust-scored and auditable.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/runes" style={{
              padding: '0.8rem 2rem', background: 'linear-gradient(135deg, #9d7cd8, #bb9af7)',
              color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 700,
              fontSize: '1rem', boxShadow: '0 0 28px rgba(187,154,247,0.5)',
              fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em',
            }}>
              Browse Runes — Free →
            </Link>
            <a href="#why-rune" style={{
              padding: '0.8rem 2rem', background: 'rgba(26,27,38,0.6)',
              color: '#bb9af7', border: '1px solid rgba(187,154,247,0.45)',
              borderRadius: '8px', textDecoration: 'none', fontWeight: 600,
              fontSize: '1rem', backdropFilter: 'blur(4px)',
            }}>
              How it works →
            </a>
          </div>
        </div>
      </section>

      {/* ── What is a Rune + Why Rune (merged) ── */}
      <section id="why-rune" className="rg-pad-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>

        {/* Part 1: What is a Rune — 2-col: text left, orb right */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', color: '#bb9af7', marginBottom: '0.75rem', fontFamily: "'JetBrains Mono', monospace", marginTop: 0 }}>THE CORE CONCEPT</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: '#dde4fc', margin: '0 0 0.75rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              What is a Rune?
            </h2>
            <p style={{ color: '#c8d2ec', fontSize: '1rem', marginBottom: 0, maxWidth: '460px', lineHeight: 1.75 }}>
              A Rune is a composable AI workflow — a recipe that chains multiple Skills into one reliable pipeline. Install once, get the same result every time.
            </p>
          </div>
          {/* Orb image */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="rg-hero-circle" style={{ position: 'relative', border: '2px solid rgba(187,154,247,0.3)', boxShadow: '0 0 60px rgba(187,154,247,0.18), 0 0 120px rgba(187,154,247,0.07)' }}>
              <img src="/images/hero-hand-orb.jpg" alt="Rune Orb" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 45%, rgba(26,27,38,0.55) 100%)' }} />
            </div>
          </div>
        </div>

        {/* Concept 3-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.875rem', marginBottom: '3.5rem' }}>
          {([
            { label: 'Skill', accent: '#7aa2f7', title: 'The Ingredient', desc: 'A packaged service capability — gmail, slack, github. Each Skill bundles every action for that service with agent-ready instructions.' },
            { label: 'Rune',  accent: '#bb9af7', title: 'The Recipe',     desc: 'A multi-Skill workflow — chained in sequence or parallel, verified with a Trust Score before you run it.' },
            { label: 'Trust', accent: '#ff9e64', title: 'The Guarantee',  desc: 'Every Rune carries a Trust Score — showing which services it accesses, what scopes it needs, and the risk level of each action.' },
          ] as { label: string; accent: string; title: string; desc: string }[]).map(item => (
            <div key={item.label} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', padding: '1rem 1.1rem', background: '#16161e', border: `1px solid ${item.accent}25`, borderRadius: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: item.accent, textTransform: 'uppercase' as const, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>{item.label}</span>
                  <span style={{ color: '#dde4fc', fontWeight: 700, fontSize: '0.95rem', fontFamily: "'Outfit', sans-serif" }}>{item.title}</span>
                </div>
                <p style={{ color: '#8ab4e0', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider: Why it matters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#1f2335' }} />
          <p style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.18em', color: '#bb9af7', margin: 0, fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap' as const }}>WHY IT MATTERS</p>
          <div style={{ flex: 1, height: '1px', background: '#1f2335' }} />
        </div>
        <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', fontWeight: 800, color: '#dde4fc', margin: '0 0 0.75rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em', lineHeight: 1.2 }}>
          Vibe coding hits a ceiling.<br />
          <span style={{ color: '#bb9af7' }}>Runes break through it.</span>
        </h2>
        <p style={{ color: '#748ab8', fontSize: '1rem', marginBottom: '1.5rem', maxWidth: '600px' }}>
          92% of devs use AI daily. The edge isn&apos;t the model — it&apos;s the playbook. Runes make every playbook deterministic, auditable, and cheap to run.
        </p>
        {/* Wrapper gap callout */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(187,154,247,0.05)', border: '1px solid rgba(187,154,247,0.2)', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '2.5rem', maxWidth: '680px' }}>
          <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '1px' }}>💡</span>
          <p style={{ color: '#c8d2ec', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
            95% of potential users will never spend 10 hours configuring an AI agent. The winners in the Skill Era aren&apos;t the best engineers — they&apos;re the ones who package the right workflow and put it one command away.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>

            {/* Card 1: Reproducibility */}
            <div style={{ background: '#1e2030', border: '1px solid rgba(187,154,247,0.18)', borderRadius: '14px', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#bb9af7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M8 16H3v5"/>
                </svg>
                <h3 style={{ color: '#dde4fc', fontSize: '1.1rem', fontWeight: 800, fontFamily: "'Outfit', sans-serif", margin: 0 }}>Reproducible by Design</h3>
              </div>
              <div style={{ color: '#bb9af7', fontSize: '1.35rem', fontWeight: 900, fontFamily: "'Outfit', sans-serif", marginBottom: '0.75rem' }}>100% deterministic</div>
              <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
                LLMs improvise differently every run. A Rune locks the workflow graph — same Skills, same order, same result. Guaranteed.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.6rem', color: '#f87171', background: 'rgba(248,113,113,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono', monospace" }}>BEFORE</span>
                  <span style={{ color: '#748ab8', fontSize: '0.8rem' }}>Prompt → LLM freestyle → unpredictable</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.6rem', color: '#34d399', background: 'rgba(52,211,153,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono', monospace" }}>AFTER</span>
                  <span style={{ color: '#dde4fc', fontSize: '0.8rem', fontWeight: 600 }}>Rune → verified pipeline → guaranteed result</span>
                </div>
              </div>
            </div>

            {/* Card 2: Token Efficiency */}
            <div style={{ background: '#1e2030', border: '1px solid rgba(255,158,100,0.18)', borderRadius: '14px', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff9e64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                <h3 style={{ color: '#dde4fc', fontSize: '1.1rem', fontWeight: 800, fontFamily: "'Outfit', sans-serif", margin: 0 }}>Up to 70% Fewer Tokens</h3>
              </div>
              <div style={{ color: '#ff9e64', fontSize: '1.35rem', fontWeight: 900, fontFamily: "'Outfit', sans-serif", marginBottom: '0.75rem' }}>~70% cost savings</div>
              <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.7, margin: '0 0 1rem' }}>
                Zero-token planning. Per-step context isolation. Semantic caching. Smart model routing — cheapest model that gets the job done, automatically.
              </p>
              {/* SkillsBench callout */}
              <div style={{ background: 'rgba(255,158,100,0.06)', border: '1px solid rgba(255,158,100,0.2)', borderRadius: '8px', padding: '0.65rem 0.9rem', marginBottom: '1rem', fontSize: '0.78rem', color: '#c8d2ec', lineHeight: 1.55 }}>
                <span style={{ color: '#ff9e64', fontWeight: 700 }}>SkillsBench: </span>Haiku + Rune <span style={{ color: '#34d399', fontWeight: 700 }}>27.7%</span> pass rate vs Opus alone <span style={{ color: '#f87171', fontWeight: 700 }}>22.0%</span> — cheaper model, better result.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.6rem', color: '#f87171', background: 'rgba(248,113,113,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono', monospace" }}>BEFORE</span>
                  <span style={{ color: '#748ab8', fontSize: '0.8rem' }}>~12,000 tokens per run</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.6rem', color: '#34d399', background: 'rgba(52,211,153,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono', monospace" }}>AFTER</span>
                  <span style={{ color: '#dde4fc', fontSize: '0.8rem', fontWeight: 600 }}>~3,600 tokens per run</span>
                </div>
              </div>
            </div>

            {/* Card 3: Security */}
            <div style={{ background: '#1e2030', border: '1px solid rgba(52,211,153,0.18)', borderRadius: '14px', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <h3 style={{ color: '#dde4fc', fontSize: '1.1rem', fontWeight: 800, fontFamily: "'Outfit', sans-serif", margin: 0 }}>Trust, Don&apos;t Hope</h3>
              </div>
              <div style={{ color: '#34d399', fontSize: '1.35rem', fontWeight: 900, fontFamily: "'Outfit', sans-serif", marginBottom: '0.75rem' }}>Least-privilege scopes</div>
              <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.7, margin: '0 0 1rem' }}>
                Least-privilege by default. Secrets injected at runtime — never exposed to the LLM. Every execution produces an immutable audit log.
              </p>
              {/* ClawHavoc callout */}
              <div style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', padding: '0.65rem 0.9rem', marginBottom: '1rem', fontSize: '0.78rem', color: '#c8d2ec', lineHeight: 1.55 }}>
                <span style={{ color: '#f87171', fontWeight: 700 }}>ClawHavoc (Jan 2026): </span>341 malicious Skills → <span style={{ color: '#f87171', fontWeight: 700 }}>9,000+</span> installs compromised. Snyk: <span style={{ color: '#f87171', fontWeight: 700 }}>47%</span> of unvetted Skills had security issues. RuneHub&apos;s Trust Score was built for exactly this.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.6rem', color: '#f87171', background: 'rgba(248,113,113,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono', monospace" }}>BEFORE</span>
                  <span style={{ color: '#748ab8', fontSize: '0.8rem' }}>Unvetted registry — 47% have security issues</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.6rem', color: '#34d399', background: 'rgba(52,211,153,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono', monospace" }}>AFTER</span>
                  <span style={{ color: '#dde4fc', fontSize: '0.8rem', fontWeight: 600 }}>Trust Score 94 — scoped, audited, verified</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="rg-stats-row">
        {stats.map(s => (
          <div key={s.label} className="rg-stat-item">
            <div className="rg-stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="rg-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="rg-pad-section" style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 2rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', color: '#7aa2f7', marginBottom: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>HOW IT WORKS</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: '#dde4fc', margin: '0 0 0.75rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em' }}>
          One command. That&apos;s it.
        </h2>
        <p style={{ color: '#748ab8', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: '520px' }}>
          RuneHub resolves dependencies, configures auth, wires every step, and runs — all from a single CLI command.
        </p>

        {/* Hero terminal */}
        <div style={{ background: '#16161e', border: '1px solid rgba(187,154,247,0.25)', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 0 40px rgba(187,154,247,0.07)' }}>
          {/* Terminal title bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderBottom: '1px solid #1f2335', background: '#13131a' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f87171', display: 'inline-block' }}/>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff9e64', display: 'inline-block' }}/>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }}/>
            <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: '#4a5275', fontFamily: "'JetBrains Mono', monospace" }}>terminal</span>
          </div>
          <pre style={{ padding: '1.25rem 1.5rem', fontSize: '0.78rem', color: '#c8d2ec', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.75, margin: 0, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>{`$ rune install morning-brief --run

`}<span style={{ color: '#bb9af7' }}>{`Resolving dependencies...`}</span>{`
  + gmail          `}<span style={{ color: '#34d399' }}>✓</span>{`
  + calendar       `}<span style={{ color: '#34d399' }}>✓</span>{`
  + github         `}<span style={{ color: '#34d399' }}>✓</span>{`
  + brave-news     `}<span style={{ color: '#34d399' }}>✓</span>{`
  + openweather    `}<span style={{ color: '#34d399' }}>✓</span>{`
  + market-pulse   `}<span style={{ color: '#34d399' }}>✓</span>{`
  + llm-triage     `}<span style={{ color: '#34d399' }}>✓</span>{`
  + llm-compose    `}<span style={{ color: '#34d399' }}>✓</span>{`
  + slack          `}<span style={{ color: '#34d399' }}>✓</span>{`
  + telegram       `}<span style={{ color: '#34d399' }}>✓</span>{`
  + notion         `}<span style={{ color: '#34d399' }}>✓</span>{`
`}<span style={{ color: '#34d399' }}>{`✓ 11 skills auto-installed  |  Trust Score: 91  |  44 actions ready`}</span>{`

`}<span style={{ color: '#7aa2f7' }}>{`Running morning-brief...`}</span>{`
  `}<span style={{ color: '#748ab8' }}>{`[1/10]`}</span>{` fetch-calendar     `}<span style={{ color: '#34d399' }}>✓  0.2s</span>{`
  `}<span style={{ color: '#748ab8' }}>{`[2/10]`}</span>{` fetch-emails       `}<span style={{ color: '#34d399' }}>✓  0.3s</span>{`
  `}<span style={{ color: '#748ab8' }}>{`[3/10]`}</span>{` fetch-github       `}<span style={{ color: '#34d399' }}>✓  0.5s</span>{`
  `}<span style={{ color: '#748ab8' }}>{`[4/10]`}</span>{` triage-llm        `}<span style={{ color: '#34d399' }}>✓  1.4s</span>{`
  `}<span style={{ color: '#748ab8' }}>{`[5/10]`}</span>{` fetch-news         `}<span style={{ color: '#34d399' }}>✓  0.5s</span>{`
  `}<span style={{ color: '#748ab8' }}>{`[6/10]`}</span>{` fetch-weather      `}<span style={{ color: '#34d399' }}>✓  0.3s</span>{`
  `}<span style={{ color: '#748ab8' }}>{`[7/10]`}</span>{` fetch-market       `}<span style={{ color: '#34d399' }}>✓  0.4s</span>{`
  `}<span style={{ color: '#748ab8' }}>{`[8/10]`}</span>{` compose-llm       `}<span style={{ color: '#34d399' }}>✓  1.8s</span>{`
  `}<span style={{ color: '#748ab8' }}>{`[9/10]`}</span>{` broadcast-3ch      `}<span style={{ color: '#34d399' }}>✓  0.3s</span>{`
  `}<span style={{ color: '#748ab8' }}>{`[10/10]`}</span>{` archive-notion    `}<span style={{ color: '#34d399' }}>✓  0.1s</span>{`

`}<span style={{ color: '#34d399' }}>{`✓ Done in 5.8s  ·  4,800 tokens used  (saved 71%)  ·  archived to Notion`}</span></pre>
        </div>

        {/* 3 auto-things */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {[
            { color: '#bb9af7', icon: '⬡', label: 'Auto-install', desc: 'Skills resolve like npm packages — no hunting for dependencies or versions.' },
            { color: '#ff9e64', icon: '⬡', label: 'Auto-configure', desc: 'Auth scopes, action wiring, and agent context set in the correct order, every run.' },
            { color: '#34d399', icon: '⬡', label: 'Auto-audit', desc: 'Immutable logs per step. Token usage tracked. Nothing executes outside the declared graph.' },
          ].map(({ color, label, desc }) => (
            <div key={label} style={{ background: '#16161e', border: `1px solid ${color}22`, borderRadius: '10px', padding: '1.1rem 1.25rem' }}>
              <div style={{ color, fontSize: '0.68rem', fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em', marginBottom: '0.4rem' }}>{label.toUpperCase()}</div>
              <p style={{ color: '#9aa4d2', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live Example: Morning Brief ── */}
      <section className="rg-pad-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 5rem' }}>

        {/* ── Live Example: Morning Brief ── */}
        <div className="rg-live-box" style={{ marginTop: '3.5rem', background: '#16161e', border: '1px solid #2e3452', borderRadius: '14px', padding: '1.75rem 2rem' }}>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: '#c9a8ff', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>Live Example</span>
            <span style={{ color: '#2e3452' }}>·</span>
            <span style={{ fontSize: '1rem', color: '#e2e8ff', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>🌅 Morning Brief</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', flexShrink: 0, alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: '#a8d878', background: 'rgba(168,216,120,0.08)', border: '1px solid rgba(168,216,120,0.25)', padding: '2px 10px', borderRadius: '20px' }}>Trust Score 91</span>
              <span style={{ fontSize: '0.72rem', color: '#9aa4d2', background: 'rgba(154,164,210,0.08)', border: '1px solid rgba(154,164,210,0.2)', padding: '2px 10px', borderRadius: '20px' }}>11 skills</span>
              <span style={{ fontSize: '0.72rem', color: '#bb9af7', background: 'rgba(187,154,247,0.08)', border: '1px solid rgba(187,154,247,0.2)', padding: '2px 10px', borderRadius: '20px' }}>Dual LLM · 3-output</span>
            </div>
          </div>

          {/* Pipeline stage legend */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {[
              { dot: '#34d399', label: 'INPUT — Calendar · Email · GitHub' },
              { dot: '#a78bfa', label: 'LLM 1 — Triage & Score' },
              { dot: '#60a5fa', label: 'API — News · Weather · Market' },
              { dot: '#a78bfa', label: 'LLM 2 — Compose' },
              { dot: '#f472b6', label: 'OUTPUT — Slack · Telegram · Notion' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: '0.72rem', color: '#748ab8', fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Animated graph */}
          <div style={{ overflowX: 'auto' }}>
            <MorningBriefGraph />
          </div>

          {/* Caption */}
          <p style={{ margin: '1.25rem 0 0', fontSize: '0.875rem', color: '#9aa4d2', lineHeight: 1.65 }}>
            Three input channels — calendar, email, and GitHub Issues — feed <span style={{ color: '#a78bfa' }}>Claude Triage</span>, which classifies, dedupes, and urgency-scores everything into a priority matrix. <span style={{ color: '#a78bfa' }}>Claude Compose</span> then weaves that matrix with live headlines, weather forecasts, and market data into a brief personalized to your calendar density — broadcast simultaneously to <span style={{ color: '#f472b6' }}>Slack</span>, <span style={{ color: '#f472b6' }}>Telegram</span>, and <span style={{ color: '#f472b6' }}>Notion</span> for long-term recall.
          </p>
        </div>
      </section>

      {/* ── Featured Runes ── */}
      <section className="rg-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
          <h2 className="rg-section-h2">Featured Runes</h2>
          <Link href="/runes" style={{ color: '#bb9af7', textDecoration: 'none', fontSize: '0.875rem' }}>View all {RUNES.length} →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {RUNES.slice(0, 12).map(r => <RuneCard key={r.id} rune={r} />)}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section style={{ background: '#16161e', borderTop: '1px solid #1f2335', borderBottom: '1px solid #1f2335' }}>
        <div className="rg-pad-section" style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', color: '#ff9e64', marginBottom: '0.75rem', fontFamily: "'JetBrains Mono', monospace", textAlign: 'center' }}>PRICING</p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: '#dde4fc', margin: '0 0 0.75rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em', textAlign: 'center' }}>
            Start free. Optimize when ready.
          </h2>
          <p style={{ color: '#748ab8', fontSize: '1rem', marginBottom: '3rem', textAlign: 'center' }}>
            Use your own API keys at no cost. Upgrade for smart routing, caching, and guaranteed savings.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', alignItems: 'start' }}>

            {/* Free */}
            <div style={{ background: '#1a1b26', border: '1px solid rgba(122,162,247,0.25)', borderRadius: '14px', padding: '2rem' }}>
              <h3 style={{ color: '#7aa2f7', fontSize: '0.85rem', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', margin: '0 0 0.75rem' }}>FREE</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ color: '#dde4fc', fontSize: '2.5rem', fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>$0</span>
                <span style={{ color: '#748ab8', fontSize: '0.9rem' }}> / forever</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                {['Install & run any Rune', 'Use your own API keys', 'Community Rune registry', 'Basic execution logs'].map(f => (
                  <div key={f} style={{ color: '#9aa4d2', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#34d399' }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <Link href="/runes" style={{ display: 'block', textAlign: 'center', padding: '0.7rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(122,162,247,0.4)', color: '#7aa2f7', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>Get Started</Link>
            </div>

            {/* Optimizer */}
            <div style={{ background: '#1e2030', border: '1px solid rgba(187,154,247,0.45)', borderRadius: '14px', padding: '2rem', boxShadow: '0 0 40px rgba(187,154,247,0.08)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: '#bb9af7', color: '#1a1b26', fontSize: '0.6rem', fontWeight: 800, padding: '4px 14px', borderRadius: '20px', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>MOST POPULAR</div>
              <h3 style={{ color: '#bb9af7', fontSize: '0.85rem', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', margin: '0 0 0.75rem' }}>OPTIMIZER</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ color: '#dde4fc', fontSize: '2.5rem', fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>$29</span>
                <span style={{ color: '#748ab8', fontSize: '0.9rem' }}> / month</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                {['Everything in Free', 'Smart model routing', 'Semantic cache pool', 'Token usage analytics', 'Priority support'].map(f => (
                  <div key={f} style={{ color: '#c8d2ec', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#34d399' }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <Link href="/runes" style={{ display: 'block', textAlign: 'center', padding: '0.7rem 1.5rem', borderRadius: '8px', background: '#bb9af7', color: '#1a1b26', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 700 }}>Start Saving</Link>
            </div>

            {/* Pro */}
            <div style={{ background: '#1a1b26', border: '1px solid rgba(255,158,100,0.25)', borderRadius: '14px', padding: '2rem' }}>
              <h3 style={{ color: '#ff9e64', fontSize: '0.85rem', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', margin: '0 0 0.75rem' }}>PRO</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ color: '#dde4fc', fontSize: '2.5rem', fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>$99</span>
                <span style={{ color: '#748ab8', fontSize: '0.9rem' }}> / month</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                {['Everything in Optimizer', '50% savings SLA guaranteed', 'Full audit logs & export', 'Team workspaces (10 members)', 'Custom model routing rules'].map(f => (
                  <div key={f} style={{ color: '#9aa4d2', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#34d399' }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <Link href="/runes" style={{ display: 'block', textAlign: 'center', padding: '0.7rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(255,158,100,0.4)', color: '#ff9e64', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>Go Pro</Link>
            </div>

          </div>
          <p style={{ textAlign: 'center', color: '#748ab8', fontSize: '0.85rem', marginTop: '2rem' }}>
            Enterprise? <a href="mailto:hello@runehub.dev" style={{ color: '#bb9af7', textDecoration: 'none' }}>Contact us</a> for dedicated infrastructure, compliance, and custom SLAs.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ textAlign: 'center', padding: '5rem 2rem', position: 'relative', overflow: 'hidden' }}>
        {/* Market BG */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/hero-market.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,27,38,0.95) 0%, rgba(26,27,38,0.78) 50%, rgba(26,27,38,0.97) 100%)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dde4fc', marginBottom: '0.75rem', fontFamily: "'Outfit', sans-serif", textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>Browse the Skills Registry</h2>
          <p style={{ color: '#c8d2ec', marginBottom: '2rem', fontSize: '1rem' }}>{SKILL_PACKAGES.length} skills · {SKILLS_REGISTRY.length} actions · {RUNES.length} Runes</p>
          <Link href="/skills" style={{ padding: '0.75rem 2rem', background: 'rgba(187,154,247,0.15)', color: '#bb9af7', border: '1px solid rgba(187,154,247,0.4)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em', backdropFilter: 'blur(4px)' }}>
            View All Skills →
          </Link>
        </div>
      </section>
    </div>
  )
}

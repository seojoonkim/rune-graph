export default function StrategyPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>

      {/* Header */}
      <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', color: '#bb9af7', marginBottom: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>STRATEGY</p>
      <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#dde4fc', margin: '0 0 1rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        Why RuneHub Exists
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#9aa4d2', lineHeight: 1.7, maxWidth: '680px', marginBottom: '4rem' }}>
        AI agents are powerful but expensive, unpredictable, and opaque. We are building the infrastructure layer to fix all three — permanently.
      </p>

      {/* Section 1: The Problem */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#f87171', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.5rem', marginTop: 0 }}>THE PROBLEM</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {[
            {
              title: 'The Token Tax',
              body: "Every AI agent call burns tokens on planning, context assembly, and retries. A typical 8-skill workflow costs ~12,000 tokens per run. At scale, that's $500+/month on a single workflow.",
            },
            {
              title: 'The Reproducibility Gap',
              body: 'Ask an LLM to do the same task twice — you get different results. Different tool selection, different execution order, different output. Fine for chat. Unacceptable for production.',
            },
            {
              title: 'The Trust Deficit',
              body: "When an agent runs, you don't know what it accessed. Did it read your emails? Call an external API? Leak a secret? No audit trail. No scoping. No accountability.",
            },
          ].map(c => (
            <div key={c.title} style={{ background: '#16161e', border: '1px solid rgba(248,113,113,0.15)', borderRadius: '12px', padding: '1.5rem' }}>
              <h3 style={{ color: '#f87171', fontSize: '1rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", margin: '0 0 0.75rem' }}>{c.title}</h3>
              <p style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Our Approach */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.5rem', marginTop: 0 }}>OUR APPROACH</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          <div style={{ background: '#1e2030', border: '1px solid rgba(187,154,247,0.2)', borderRadius: '12px', padding: '1.75rem' }}>
            <h3 style={{ color: '#bb9af7', fontSize: '1.05rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", margin: '0 0 0.75rem' }}>🔁 Reproducibility — Lock the graph, free the LLM</h3>
            <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
              Runes encode the entire workflow graph — which skills run, in what order, with what inputs. The LLM handles content generation within strict boundaries. The structure never changes. Result: same Rune, same behavior, every time.
            </p>
          </div>

          <div style={{ background: '#1e2030', border: '1px solid rgba(255,158,100,0.2)', borderRadius: '12px', padding: '1.75rem' }}>
            <h3 style={{ color: '#ff9e64', fontSize: '1.05rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", margin: '0 0 0.75rem' }}>⚡ Token Efficiency — Four techniques, compounding</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {[
                ['Zero-token planning', 'The graph IS the plan — no LLM needed to decide what to do'],
                ['Context isolation', 'Each step sees only its inputs, not the entire conversation history'],
                ['Semantic caching', 'Identical or similar inputs skip the LLM entirely'],
                ['Smart model routing', 'Groq for extraction, Haiku for classification, Sonnet only when needed'],
              ].map(([name, desc]) => (
                <div key={name} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <span style={{ color: '#ff9e64', whiteSpace: 'nowrap', flexShrink: 0 }}>→</span>
                  <span><strong style={{ color: '#dde4fc' }}>{name}</strong><span style={{ color: '#748ab8' }}> — {desc}</span></span>
                </div>
              ))}
            </div>
            <p style={{ color: '#ff9e64', fontSize: '0.875rem', fontWeight: 700, margin: 0 }}>Combined: 60–70% token reduction on typical workflows.</p>
          </div>

          <div style={{ background: '#1e2030', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '12px', padding: '1.75rem' }}>
            <h3 style={{ color: '#34d399', fontSize: '1.05rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", margin: '0 0 0.75rem' }}>🔐 Security & Trust — Declared, not hoped</h3>
            <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.75, margin: '0 0 0.75rem' }}>
              Every Rune declares its permission scope upfront.{' '}
              <code style={{ color: '#34d399', background: 'rgba(52,211,153,0.1)', padding: '1px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>gmail.readonly</code>{' '}
              — not gmail.send. Secrets are injected at runtime and never appear in LLM prompts. Every execution produces an immutable audit log. Trust Scores quantify risk before you run.
            </p>
          </div>

        </div>
      </section>

      {/* Section 3: Business Model */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ color: '#7aa2f7', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.5rem', marginTop: 0 }}>BUSINESS MODEL</h2>
        <p style={{ color: '#9aa4d2', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.25rem', marginTop: 0 }}>
          We believe in transparent economics. RuneHub only makes money when it saves you money.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { tier: 'Free', color: '#7aa2f7', desc: 'Use your own API keys, zero cost. Community registry access. We earn nothing — you build trust with the platform.' },
            { tier: 'Optimizer · $29/mo', color: '#bb9af7', desc: 'Smart model routing + semantic cache. You save ~$150/mo on tokens. We keep $29. Net positive for both sides.' },
            { tier: 'Pro · $99/mo', color: '#ff9e64', desc: 'Guaranteed 50% token savings SLA. Audit logs, team workspaces, custom routing rules.' },
            { tier: 'Marketplace', color: '#34d399', desc: 'Rune creators earn 80% of sales revenue. We take 20% for hosting, verification, and distribution.' },
          ].map(m => (
            <div key={m.tier} style={{ display: 'flex', gap: '1rem', padding: '1rem 1.25rem', background: '#16161e', borderRadius: '10px', border: `1px solid ${m.color}20` }}>
              <span style={{ color: m.color, fontWeight: 700, fontSize: '0.875rem', whiteSpace: 'nowrap', minWidth: '160px', flexShrink: 0 }}>{m.tier}</span>
              <span style={{ color: '#9aa4d2', fontSize: '0.875rem', lineHeight: 1.65 }}>{m.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Roadmap */}
      <section>
        <h2 style={{ color: '#e0af68', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace", marginBottom: '1.5rem', marginTop: 0 }}>ROADMAP</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              phase: 'Phase 1 · Now',
              color: '#7aa2f7',
              items: [
                'Why Rune? section with before/after comparisons',
                'How It Works 3-step interactive guide',
                'Pricing tiers on homepage',
                'Strategy page (this page)',
              ],
            },
            {
              phase: 'Phase 2 · 1 month',
              color: '#bb9af7',
              items: [
                'Rune Builder: save to localStorage, shareable URL, YAML export',
                'Token Estimator — predicted savings per Rune',
                'Rune execution simulator (dry run mode)',
                'Search & filter improvements across registry',
              ],
            },
            {
              phase: 'Phase 3 · 3 months',
              color: '#ff9e64',
              items: [
                'User accounts (Auth0 / Clerk)',
                'Rune Marketplace — publish Runes & earn revenue',
                'Smart Model Router MVP (auto Groq → Haiku → Sonnet)',
                'Stripe subscriptions for Optimizer & Pro tiers',
                'Analytics dashboard with token tracking',
              ],
            },
          ].map(r => (
            <div key={r.phase} style={{ background: '#16161e', border: `1px solid ${r.color}20`, borderRadius: '12px', padding: '1.5rem' }}>
              <h3 style={{ color: r.color, fontSize: '0.9rem', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", margin: '0 0 0.75rem' }}>{r.phase}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {r.items.map(i => (
                  <div key={i} style={{ color: '#9aa4d2', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: r.color, flexShrink: 0 }}>→</span> {i}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

'use client';

// ─────────────────────────────────────────────────────────────────────
// MorningBriefGraph — Animated SVG pipeline for Morning Brief rune
// 11 nodes · 3-input · dual-LLM · 3-output · flowing data packets
// Canvas: 760 × 650
// ─────────────────────────────────────────────────────────────────────

type Cat = 'input' | 'api' | 'llm' | 'output';

const CLR: Record<Cat, string> = {
  input:  '#34d399',
  api:    '#60a5fa',
  llm:    '#a78bfa',
  output: '#f472b6',
};

const BADGE: Record<Cat, string> = {
  input:  'INPUT',
  api:    'API',
  llm:    'LLM',
  output: 'OUTPUT',
};

interface NNode {
  id: string; x: number; y: number; w: number; h: number;
  emoji: string; label: string; sub: string; cat: Cat;
}

interface Edge {
  id: string; cat: Cat; d: string;
  lbl: string; lx: number; ly: number; anchor: 'middle' | 'start' | 'end';
  dur: string; delay: string; thick?: boolean;
}

// Canvas: 760 × 650
const NODES: NNode[] = [
  // Row 1 — Inputs (y=0, h=82)
  { id: 'gcal',    x: 20,  y: 0,   w: 185, h: 82, emoji: '📅', label: 'Google Calendar', sub: 'schedule + conflicts',   cat: 'input'  },
  { id: 'gmail',   x: 288, y: 0,   w: 185, h: 82, emoji: '📧', label: 'Gmail Inbox',     sub: 'VIP + flagged emails',   cat: 'input'  },
  { id: 'github',  x: 556, y: 0,   w: 185, h: 82, emoji: '🐙', label: 'GitHub Issues',   sub: 'PRs · blockers · due',   cat: 'input'  },
  // Row 2 — LLM 1 (y=137, h=84, wide)
  { id: 'triage',  x: 80,  y: 137, w: 600, h: 84, emoji: '🎯', label: 'Claude Triage',   sub: 'classify · dedupe · urgency-score all inputs', cat: 'llm' },
  // Row 3 — APIs (y=283, h=82)
  { id: 'brave',   x: 20,  y: 283, w: 185, h: 82, emoji: '🔍', label: 'Brave News',      sub: 'agenda-aware headlines', cat: 'api'    },
  { id: 'weather', x: 288, y: 283, w: 185, h: 82, emoji: '⛅', label: 'OpenWeather',     sub: 'forecast + commute risk', cat: 'api'   },
  { id: 'market',  x: 556, y: 283, w: 185, h: 82, emoji: '📈', label: 'Market Pulse',    sub: 'portfolio snapshot',     cat: 'api'    },
  // Row 4 — LLM 2 (y=423, h=84, wide)
  { id: 'compose', x: 80,  y: 423, w: 600, h: 84, emoji: '✍️', label: 'Claude Compose',  sub: 'synthesize · personalize · adapt to calendar density', cat: 'llm' },
  // Row 5 — Outputs (y=564, h=76)
  { id: 'slack',   x: 60,  y: 564, w: 165, h: 76, emoji: '💬', label: 'Slack Post',      sub: '#morning-standup',       cat: 'output' },
  { id: 'telegram',x: 298, y: 564, w: 165, h: 76, emoji: '📱', label: 'Telegram',        sub: 'mobile push + actions',  cat: 'output' },
  { id: 'notion',  x: 536, y: 564, w: 165, h: 76, emoji: '📒', label: 'Notion Archive',  sub: 'knowledge base log',     cat: 'output' },
];

const EDGES: Edge[] = [
  // Inputs → Triage
  {
    id: 'e1', cat: 'input',
    d: 'M 113 82 C 113 112 200 137 200 137',
    lbl: 'schedule',       lx: 135, ly: 108, anchor: 'middle',
    dur: '1.8s', delay: '0s',
  },
  {
    id: 'e2', cat: 'input',
    d: 'M 381 82 C 381 112 380 137 380 137',
    lbl: 'emails',         lx: 396, ly: 107, anchor: 'start',
    dur: '1.8s', delay: '0.35s',
  },
  {
    id: 'e3', cat: 'input',
    d: 'M 649 82 C 649 112 560 137 560 137',
    lbl: 'dev tasks',      lx: 618, ly: 108, anchor: 'end',
    dur: '1.8s', delay: '0.7s',
  },
  // Triage → Compose (thick center)
  {
    id: 'e4', cat: 'llm',
    d: 'M 380 221 L 380 423',
    lbl: 'priority matrix', lx: 394, ly: 326, anchor: 'start',
    dur: '1.2s', delay: '2.3s',
    thick: true,
  },
  // APIs → Compose
  {
    id: 'e5', cat: 'api',
    d: 'M 113 365 C 113 395 200 423 200 423',
    lbl: 'headlines',      lx: 118, ly: 395, anchor: 'start',
    dur: '1.0s', delay: '1.2s',
  },
  {
    id: 'e6', cat: 'api',
    d: 'M 381 365 C 381 395 380 423 380 423',
    lbl: 'weather',        lx: 396, ly: 395, anchor: 'start',
    dur: '1.0s', delay: '1.5s',
  },
  {
    id: 'e7', cat: 'api',
    d: 'M 649 365 C 649 395 560 423 560 423',
    lbl: 'market',         lx: 620, ly: 395, anchor: 'end',
    dur: '1.0s', delay: '1.8s',
  },
  // Compose → Outputs
  {
    id: 'e8', cat: 'output',
    d: 'M 200 507 C 200 536 143 564 143 564',
    lbl: 'team brief',     lx: 155, ly: 537, anchor: 'start',
    dur: '1.6s', delay: '3.7s',
  },
  {
    id: 'e9', cat: 'output',
    d: 'M 380 507 L 381 564',
    lbl: 'push',           lx: 395, ly: 537, anchor: 'start',
    dur: '1.6s', delay: '3.9s',
  },
  {
    id: 'e10', cat: 'output',
    d: 'M 560 507 C 560 536 619 564 619 564',
    lbl: 'archive',        lx: 566, ly: 537, anchor: 'start',
    dur: '1.6s', delay: '4.1s',
  },
];

function GraphNode({ n }: { n: NNode }) {
  const cx = n.x + n.w / 2;
  const c = CLR[n.cat];
  const isLLM = n.cat === 'llm';
  const isOut = n.cat === 'output';
  const isWide = n.w >= 400;

  return (
    <g>
      {/* LLM breathing aura */}
      {isLLM && (
        <rect
          x={n.x - 5} y={n.y - 5} width={n.w + 10} height={n.h + 10}
          rx={15} fill={c}
          className="llm-aura"
        />
      )}
      {/* Output soft glow */}
      {isOut && (
        <rect
          x={n.x - 3} y={n.y - 3} width={n.w + 6} height={n.h + 6}
          rx={13} fill={c}
          className="out-aura"
        />
      )}
      {/* Node box */}
      <rect
        x={n.x} y={n.y} width={n.w} height={n.h} rx={10}
        fill="#1e2030"
        stroke={c}
        strokeOpacity={isLLM ? 0.7 : 0.38}
        strokeWidth={isLLM ? 2.4 : 1.6}
      />
      {/* Category badge (top-right) */}
      <rect
        x={n.x + n.w - 58} y={n.y + 6}
        width={52} height={17} rx={8}
        fill={c} opacity={0.14}
      />
      <text
        x={n.x + n.w - 32} y={n.y + 18}
        textAnchor="middle" fontSize="12" fill={c}
        fontWeight="700" fontFamily="'JetBrains Mono', monospace"
        letterSpacing="0.8"
      >
        {BADGE[n.cat]}
      </text>
      {/* Emoji — left for wide nodes, centered for narrow */}
      <text
        x={isWide ? n.x + 28 : cx}
        y={n.y + 30}
        textAnchor={isWide ? 'middle' : 'middle'}
        fontSize="22"
      >
        {n.emoji}
      </text>
      {/* Label */}
      <text
        x={isWide ? n.x + 60 : cx}
        y={n.y + 52}
        textAnchor={isWide ? 'start' : 'middle'}
        fontSize={isWide ? 19 : 17}
        fill="#e2e8ff"
        fontWeight="700"
        fontFamily="'Inter', sans-serif"
      >
        {n.label}
      </text>
      {/* Sublabel */}
      <text
        x={isWide ? n.x + 60 : cx}
        y={n.y + 70}
        textAnchor={isWide ? 'start' : 'middle'}
        fontSize="14"
        fill="#8fa8d4"
        fontFamily="'Inter', sans-serif"
      >
        {n.sub}
      </text>
      {/* Connection dots */}
      <circle cx={cx}         cy={n.y}        r={3.5} fill={c} opacity={0.6} />
      <circle cx={cx}         cy={n.y + n.h}  r={3.5} fill={c} opacity={0.6} />
      <circle cx={n.x}        cy={n.y + n.h / 2} r={3.5} fill={c} opacity={0.6} />
      <circle cx={n.x + n.w}  cy={n.y + n.h / 2} r={3.5} fill={c} opacity={0.6} />
      {/* Extra dots for wide LLM nodes at edge connection points */}
      {isWide && (
        <>
          <circle cx={n.x + 120} cy={n.y}       r={3} fill={c} opacity={0.45} />
          <circle cx={n.x + 480} cy={n.y}       r={3} fill={c} opacity={0.45} />
          <circle cx={n.x + 120} cy={n.y + n.h} r={3} fill={c} opacity={0.45} />
          <circle cx={n.x + 480} cy={n.y + n.h} r={3} fill={c} opacity={0.45} />
        </>
      )}
    </g>
  );
}

export function MorningBriefGraph() {
  const dotCss = EDGES.map(
    (e) =>
      `.dot-${e.id}{offset-path:path('${e.d}');animation:dot-move ${e.dur} linear ${e.delay} infinite;}`
  ).join('');

  const css = `
    @keyframes dash-flow { from{stroke-dashoffset:18} to{stroke-dashoffset:0} }
    @keyframes llm-breathe { 0%,100%{opacity:0.06} 50%{opacity:0.22} }
    @keyframes out-breathe { 0%,100%{opacity:0.04} 50%{opacity:0.12} }
    @keyframes dot-move { from{offset-distance:0%} to{offset-distance:100%} }
    .edge-anim{stroke-dasharray:6 4;animation:dash-flow 1.3s linear infinite}
    .llm-aura{animation:llm-breathe 2.5s ease-in-out infinite}
    .out-aura{animation:out-breathe 3s ease-in-out infinite}
    ${dotCss}
  `;

  return (
    <div style={{ width: '100%', maxWidth: 760, margin: '0 auto' }}>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <svg
        viewBox="0 -12 760 662"
        width="100%"
        height="auto"
        style={{ display: 'block', overflow: 'visible' }}
        aria-label="Morning Brief pipeline graph"
      >
        <defs>
          {(['input', 'api', 'llm', 'output'] as Cat[]).map((cat) => (
            <marker
              key={cat} id={`arr-${cat}`}
              markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"
            >
              <path d="M0,0 L0,6 L7,3 z" fill={CLR[cat]} opacity="0.85" />
            </marker>
          ))}
          <filter id="glow-llm" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Edges ── */}
        {EDGES.map((e) => (
          <path
            key={e.id}
            d={e.d}
            stroke={CLR[e.cat]}
            strokeWidth={e.thick ? 2.6 : 1.7}
            fill="none"
            strokeOpacity={e.thick ? 0.6 : 0.42}
            className="edge-anim"
            markerEnd={`url(#arr-${e.cat})`}
          />
        ))}

        {/* ── Edge Labels ── */}
        {EDGES.map((e) => (
          <text
            key={`lbl-${e.id}`}
            x={e.lx} y={e.ly}
            textAnchor={e.anchor}
            fontSize="12"
            fill={CLR[e.cat]}
            opacity="0.82"
            fontFamily="'JetBrains Mono', monospace"
          >
            {e.lbl}
          </text>
        ))}

        {/* ── Animated Data Packets ── */}
        {EDGES.map((e) => (
          <circle
            key={`dot-${e.id}`}
            className={`dot-${e.id}`}
            r={e.thick ? 5 : 4}
            fill={CLR[e.cat]}
            opacity={0.95}
            style={{ filter: `drop-shadow(0 0 4px ${CLR[e.cat]})` }}
          />
        ))}

        {/* ── Nodes ── */}
        {NODES.map((n) => (
          <GraphNode key={n.id} n={n} />
        ))}
      </svg>
    </div>
  );
}

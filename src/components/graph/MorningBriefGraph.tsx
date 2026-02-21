'use client';

// ─────────────────────────────────────────────────────────────────────
// MorningBriefGraph — Animated SVG pipeline for Morning Brief rune
// 8 nodes, dual-LLM, flowing data packets + glow animations
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

// Canvas: 760 × 510
const NODES: NNode[] = [
  // Row 1 — Inputs
  { id: 'gcal',     x: 78,  y: 0,   w: 162, h: 82, emoji: '📅', label: 'Google Calendar',  sub: "today's schedule",    cat: 'input'  },
  { id: 'gmail',    x: 520, y: 0,   w: 162, h: 82, emoji: '📧', label: 'Gmail Inbox',       sub: 'unread + flagged',    cat: 'input'  },
  // Row 2 — LLM pass 1
  { id: 'pri',      x: 238, y: 137, w: 284, h: 82, emoji: '🎯', label: 'Claude Prioritize', sub: 'rank tasks & emails', cat: 'llm'    },
  // Row 3 — API inputs + LLM pass 2
  { id: 'brave',    x: 18,  y: 278, w: 168, h: 82, emoji: '🔍', label: 'Brave News',        sub: 'top headlines',       cat: 'api'    },
  { id: 'comp',     x: 238, y: 278, w: 284, h: 82, emoji: '✍️', label: 'Claude Compose',    sub: 'write the brief',     cat: 'llm'    },
  { id: 'weather',  x: 574, y: 278, w: 168, h: 82, emoji: '⛅', label: 'OpenWeather',       sub: 'forecast + alerts',   cat: 'api'    },
  // Row 4 — Outputs
  { id: 'slack',    x: 112, y: 420, w: 168, h: 76, emoji: '💬', label: 'Slack Post',        sub: '#morning channel',    cat: 'output' },
  { id: 'telegram', x: 480, y: 420, w: 168, h: 76, emoji: '📱', label: 'Telegram Send',     sub: 'mobile push',         cat: 'output' },
];

// Edge definitions: path d, color, animation timing, label position
const EDGES = [
  {
    id: 'e1', cat: 'input' as Cat,
    d: 'M 159 82 C 159 110 380 110 380 137',
    lbl: 'schedule',        lx: 248, ly: 106, anchor: 'middle',
    dur: '2.2s', delay: '0s',
  },
  {
    id: 'e2', cat: 'input' as Cat,
    d: 'M 601 82 C 601 110 380 110 380 137',
    lbl: 'urgent emails',   lx: 514, ly: 106, anchor: 'middle',
    dur: '2.2s', delay: '0.5s',
  },
  {
    id: 'e3', cat: 'llm' as Cat,
    d: 'M 380 219 L 380 278',
    lbl: 'priority agenda', lx: 394, ly: 254, anchor: 'start',
    dur: '1.1s', delay: '2.1s',
    thick: true,
  },
  {
    id: 'e4', cat: 'api' as Cat,
    d: 'M 186 319 L 238 319',
    lbl: 'headlines',       lx: 212, ly: 312, anchor: 'middle',
    dur: '0.9s', delay: '1.0s',
  },
  {
    id: 'e5', cat: 'api' as Cat,
    d: 'M 574 319 L 522 319',
    lbl: 'weather',         lx: 548, ly: 312, anchor: 'middle',
    dur: '0.9s', delay: '1.3s',
  },
  {
    id: 'e6', cat: 'output' as Cat,
    d: 'M 380 360 C 380 395 196 395 196 420',
    lbl: 'morning brief',   lx: 268, ly: 394, anchor: 'middle',
    dur: '1.8s', delay: '3.2s',
  },
  {
    id: 'e7', cat: 'output' as Cat,
    d: 'M 380 360 C 380 395 564 395 564 420',
    lbl: 'mobile push',     lx: 492, ly: 394, anchor: 'middle',
    dur: '1.8s', delay: '3.5s',
  },
];

function GraphNode({ n }: { n: NNode }) {
  const cx = n.x + n.w / 2;
  const c = CLR[n.cat];
  const isLLM = n.cat === 'llm';
  const isOut = n.cat === 'output';

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
        strokeOpacity={isLLM ? 0.65 : 0.38}
        strokeWidth={isLLM ? 2.2 : 1.6}
      />
      {/* Category badge (top-right) */}
      <rect
        x={n.x + n.w - 58} y={n.y + 6}
        width={52} height={17} rx={8}
        fill={c} opacity={0.14}
      />
      <text
        x={n.x + n.w - 32} y={n.y + 18}
        textAnchor="middle" fontSize="10" fill={c}
        fontWeight="700" fontFamily="'JetBrains Mono', monospace"
        letterSpacing="0.8"
      >
        {BADGE[n.cat]}
      </text>
      {/* Emoji */}
      <text x={cx} y={n.y + 30} textAnchor="middle" fontSize="22">
        {n.emoji}
      </text>
      {/* Label */}
      <text
        x={cx} y={n.y + 52}
        textAnchor="middle" fontSize="19" fill="#e2e8ff"
        fontWeight="700" fontFamily="'Inter', sans-serif"
      >
        {n.label}
      </text>
      {/* Sublabel */}
      <text
        x={cx} y={n.y + 70}
        textAnchor="middle" fontSize="14" fill="#8fa8d4"
        fontFamily="'Inter', sans-serif"
      >
        {n.sub}
      </text>
      {/* Connection dots */}
      {/* top */}
      <circle cx={cx} cy={n.y}      r={3.5} fill={c} opacity={0.6} />
      {/* bottom */}
      <circle cx={cx} cy={n.y + n.h} r={3.5} fill={c} opacity={0.6} />
      {/* left */}
      <circle cx={n.x}       cy={n.y + n.h / 2} r={3.5} fill={c} opacity={0.6} />
      {/* right */}
      <circle cx={n.x + n.w} cy={n.y + n.h / 2} r={3.5} fill={c} opacity={0.6} />
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
    @keyframes llm-breathe { 0%,100%{opacity:0.06} 50%{opacity:0.2} }
    @keyframes out-breathe { 0%,100%{opacity:0.04} 50%{opacity:0.12} }
    @keyframes dot-move { from{offset-distance:0%} to{offset-distance:100%} }
    @keyframes title-pulse { 0%,100%{opacity:0.85} 50%{opacity:1} }
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
        viewBox="0 0 760 506"
        width="100%"
        height="auto"
        style={{ display: 'block', overflow: 'visible' }}
        aria-label="Morning Brief pipeline graph"
      >
        <defs>
          {/* Arrow markers per category */}
          {(['input', 'api', 'llm', 'output'] as Cat[]).map((cat) => (
            <marker
              key={cat} id={`arr-${cat}`}
              markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto"
            >
              <path d="M0,0 L0,6 L7,3 z" fill={CLR[cat]} opacity="0.85" />
            </marker>
          ))}

          {/* Soft glow filter for LLM nodes */}
          <filter id="glow-llm" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Edges (visible animated dashes) ── */}
        {EDGES.map((e) => (
          <path
            key={e.id}
            d={e.d}
            stroke={CLR[e.cat]}
            strokeWidth={e.thick ? 2.4 : 1.7}
            fill="none"
            strokeOpacity={e.thick ? 0.55 : 0.42}
            className="edge-anim"
            markerEnd={`url(#arr-${e.cat})`}
          />
        ))}

        {/* ── Edge Labels ── */}
        {EDGES.map((e) => (
          <text
            key={`lbl-${e.id}`}
            x={e.lx} y={e.ly}
            textAnchor={e.anchor as 'middle' | 'start'}
            fontSize="11"
            fill={CLR[e.cat]}
            opacity="0.85"
            fontFamily="'JetBrains Mono', monospace"
          >
            {e.lbl}
          </text>
        ))}

        {/* ── Animated Data Packets (offset-path CSS) ── */}
        {EDGES.map((e) => (
          <circle
            key={`dot-${e.id}`}
            className={`dot-${e.id}`}
            r={4}
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

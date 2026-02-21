'use client';

import { useCallback, useRef, useState, DragEvent } from 'react';
import ReactFlow, {
  Background, Controls, addEdge,
  useNodesState, useEdgesState,
  type Node, type Edge, type Connection,
  type ReactFlowInstance, Handle, Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { SKILLS_REGISTRY, type Skill } from '@/data/skills-registry';

// ─── Types ───────────────────────────────────────────────────────────────────
type Cat = 'input' | 'api' | 'llm' | 'output';

interface NodeData {
  id: string; label: string; emoji: string; category: Cat; service: string;
  onDelete: (id: string) => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const CAT_CLR: Record<Cat, string> = {
  input: '#34d399', api: '#60a5fa', llm: '#a78bfa', output: '#f472b6',
};
const CAT_ORDER: Cat[] = ['input', 'api', 'llm', 'output'];

// Curated action palette — most useful atomic actions across all categories
const PALETTE: Skill[] = (() => {
  const ids = [
    // Inputs
    'gcal-list-events', 'gmail-fetch', 'slack-fetch', 'notion-read',
    'github-list-prs', 'twitter-search', 'linear-fetch-issues',
    'coingecko-price', 'hackernews-fetch', 'user-input',
    'telegram-fetch', 'gsheets-read', 'pdf-parse',
    // APIs
    'brave-search', 'openweather-fetch', 'github-get-diff',
    'stripe-get-mrr', 'clearbit-enrich', 'eslint-check',
    'google-maps-places', 'apify-scraper', 'virustotal-scan',
    'cron-schedule', 'screenshot-capture',
    // LLMs
    'claude-summarize', 'claude-analyze', 'claude-draft',
    'claude-classify', 'claude-extract', 'gpt4o-vision',
    'whisper-transcribe', 'dalle3-generate',
    // Outputs
    'slack-post', 'telegram-send', 'gmail-send',
    'notion-write', 'github-post-comment', 'discord-post',
    'gsheets-write', 'hubspot-create-contact',
    'linear-create-issue', 'elevenlabs-tts', 'github-create-issue',
  ];
  // Inject synthetic skills not in registry
  const synth: Skill[] = [
    { id: 'user-input', label: 'User Text Input', category: 'input', service: 'Internal', description: 'Text input from user', docsUrl: '', icon: '📝' },
    { id: 'hackernews-fetch', label: 'Hacker News Fetch', category: 'input', service: 'Hacker News', description: 'Fetch top stories from HN', docsUrl: 'https://hacker-news.firebaseio.com/', icon: '🟠' },
    { id: 'twitter-search', label: 'Twitter/X Search', category: 'input', service: 'Twitter/X', description: 'Search tweets by query', docsUrl: 'https://developer.twitter.com/', icon: '𝕏' },
    { id: 'coingecko-price', label: 'CoinGecko Get Price', category: 'api', service: 'CoinGecko', description: 'Fetch crypto prices', docsUrl: 'https://www.coingecko.com/api/documentation', icon: '🦎' },
    { id: 'apify-scraper', label: 'Apify Web Scraper', category: 'api', service: 'Apify', description: 'Scrape web pages at scale', docsUrl: 'https://apify.com/docs', icon: '🕷️' },
    { id: 'virustotal-scan', label: 'VirusTotal Scan', category: 'api', service: 'VirusTotal', description: 'Scan URLs/files for malware', docsUrl: 'https://developers.virustotal.com/', icon: '🛡️' },
    { id: 'screenshot-capture', label: 'Screenshot Capture', category: 'input', service: 'Internal', description: 'Capture a web page screenshot', docsUrl: '', icon: '📸' },
    { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm', service: 'Anthropic', description: 'Analyze and reason over data', docsUrl: 'https://docs.anthropic.com/', icon: '🧠' },
    { id: 'claude-classify', label: 'Claude Classify', category: 'llm', service: 'Anthropic', description: 'Classify and label content', docsUrl: 'https://docs.anthropic.com/', icon: '🏷️' },
    { id: 'claude-extract', label: 'Claude Extract Data', category: 'llm', service: 'Anthropic', description: 'Extract structured data from text', docsUrl: 'https://docs.anthropic.com/', icon: '🔬' },
    { id: 'gpt4o-vision', label: 'GPT-4o Vision', category: 'llm', service: 'OpenAI', description: 'Analyze images with GPT-4o', docsUrl: 'https://platform.openai.com/docs', icon: '👁️' },
    { id: 'whisper-transcribe', label: 'Whisper Transcribe', category: 'llm', service: 'OpenAI', description: 'Transcribe audio to text', docsUrl: 'https://platform.openai.com/docs', icon: '🎤' },
    { id: 'dalle3-generate', label: 'DALL-E 3 Generate', category: 'llm', service: 'OpenAI', description: 'Generate images from text', docsUrl: 'https://platform.openai.com/docs', icon: '🎨' },
    { id: 'google-maps-places', label: 'Google Maps Places', category: 'api', service: 'Google Maps', description: 'Search for places and locations', docsUrl: 'https://developers.google.com/maps', icon: '📍' },
    { id: 'eslint-check', label: 'ESLint Check', category: 'api', service: 'ESLint', description: 'Run ESLint on code', docsUrl: 'https://eslint.org/', icon: '🔍' },
    { id: 'clearbit-enrich', label: 'Clearbit Enrich', category: 'api', service: 'Clearbit', description: 'Enrich company/person data', docsUrl: 'https://dashboard.clearbit.com/docs', icon: '🔎' },
    { id: 'elevenlabs-tts', label: 'ElevenLabs TTS', category: 'output', service: 'ElevenLabs', description: 'Convert text to realistic speech', docsUrl: 'https://docs.elevenlabs.io/', icon: '🔊' },
    { id: 'hubspot-create-contact', label: 'HubSpot Create Contact', category: 'output', service: 'HubSpot', description: 'Create a contact in HubSpot CRM', docsUrl: 'https://developers.hubspot.com/', icon: '🤝' },
    { id: 'github-post-comment', label: 'GitHub Post PR Comment', category: 'output', service: 'GitHub', description: 'Post a comment on a GitHub PR', docsUrl: 'https://docs.github.com/', icon: '💬' },
    { id: 'github-create-issue', label: 'GitHub Create Issue', category: 'output', service: 'GitHub', description: 'Create a GitHub issue', docsUrl: 'https://docs.github.com/', icon: '🐛' },
  ];
  const registry = [...SKILLS_REGISTRY, ...synth];
  const seen = new Set<string>();
  return ids
    .map(id => registry.find(s => s.id === id))
    .filter((s): s is Skill => !!s && !seen.has(s.id) && (seen.add(s.id), true));
})();

const CAT_SECTIONS: { cat: Cat; label: string }[] = [
  { cat: 'input',  label: '📥 Input Actions' },
  { cat: 'api',    label: '🔌 API Actions' },
  { cat: 'llm',    label: '🧠 LLM Actions' },
  { cat: 'output', label: '📤 Output Actions' },
];

// ─── Auto-fill Engine ────────────────────────────────────────────────────────
function autoFill(nodes: Node[], edges: Edge[]): {
  nodes: Node[]; edges: Edge[]; added: string[];
} {
  const cats = new Set(nodes.map((n) => n.data.category as Cat));
  const added: string[] = [];
  const newNodes = [...nodes];
  let uid = Date.now();

  function addNode(skill: Skill, col: number, row: number) {
    newNodes.push({
      id: `autofill-${skill.id}-${uid++}`,
      type: 'builderSkill',
      position: { x: col * 250, y: row * 120 },
      data: { ...skill, onDelete: () => {} },
    });
    added.push(skill.label);
  }

  // 1. Input with no LLM → add Claude Summarize
  if (cats.has('input') && !cats.has('llm')) {
    const llmSkill = PALETTE.find(s => s.id === 'claude-summarize')!;
    addNode(llmSkill, 2, 0);
    cats.add('llm');
  }

  // 2. Has content but no output → add Slack Post
  if ((cats.has('input') || cats.has('llm')) && !cats.has('output')) {
    const outSkill = PALETTE.find(s => s.id === 'slack-post')!;
    addNode(outSkill, 3, 0);
    cats.add('output');
  }

  // 3. Auto-layout by category
  const byCol: Record<string, Node[]> = { input: [], api: [], llm: [], output: [] };
  newNodes.forEach(n => byCol[n.data.category as Cat]?.push(n));

  let col = 0;
  const laidOut: Node[] = [];
  CAT_ORDER.forEach(cat => {
    const colNodes = byCol[cat] || [];
    colNodes.forEach((n, row) => {
      laidOut.push({ ...n, position: { x: col * 260, y: row * 120 - ((colNodes.length - 1) * 60) } });
    });
    if (colNodes.length > 0) col++;
  });

  // 4. Build edges — many-to-one funneling into LLM, one-to-many from LLM to outputs
  const presentCols = CAT_ORDER.filter(c => byCol[c]?.length > 0);
  const newEdges: Edge[] = [...edges];
  const existingPairs = new Set(edges.map(e => `${e.source}→${e.target}`));

  for (let i = 0; i < presentCols.length - 1; i++) {
    const fromCat = presentCols[i];
    const toCat = presentCols[i + 1];
    const fromNodes = byCol[fromCat];
    const toNodes = byCol[toCat];

    if (toNodes.length === 1) {
      // Many → one (fan-in to LLM)
      fromNodes.forEach(f => {
        const key = `${f.id}→${toNodes[0].id}`;
        if (!existingPairs.has(key)) {
          newEdges.push(makeEdge(f.id, toNodes[0].id));
          existingPairs.add(key);
        }
      });
    } else if (fromNodes.length === 1) {
      // One → many (fan-out from LLM to outputs)
      toNodes.forEach(t => {
        const key = `${fromNodes[0].id}→${t.id}`;
        if (!existingPairs.has(key)) {
          newEdges.push(makeEdge(fromNodes[0].id, t.id));
          existingPairs.add(key);
        }
      });
    } else {
      // Zip
      for (let j = 0; j < Math.max(fromNodes.length, toNodes.length); j++) {
        const f = fromNodes[Math.min(j, fromNodes.length - 1)];
        const t = toNodes[Math.min(j, toNodes.length - 1)];
        const key = `${f.id}→${t.id}`;
        if (!existingPairs.has(key)) {
          newEdges.push(makeEdge(f.id, t.id));
          existingPairs.add(key);
        }
      }
    }
  }

  return { nodes: laidOut, edges: newEdges, added };
}

function makeEdge(source: string, target: string): Edge {
  return {
    id: `ae-${source}-${target}`,
    source, target, animated: true,
    style: { stroke: '#bb9af7', strokeWidth: 1.8 },
    labelStyle: { fill: '#9aa4d2', fontSize: 9 },
    labelBgStyle: { fill: '#1a1b26', fillOpacity: 0.9 },
  };
}

function calcTrustScore(nodes: Node[]): number {
  if (nodes.length === 0) return 0;
  let score = 92;
  const services = nodes.map(n => (n.data.service as string).toLowerCase());
  if (services.some(s => s.includes('twitter') || s.includes('linkedin'))) score -= 8;
  if (services.some(s => s.includes('virustotal') || s.includes('stripe'))) score -= 5;
  if (!nodes.some(n => n.data.category === 'llm')) score -= 10;
  if (!nodes.some(n => n.data.category === 'output')) score -= 5;
  const unique = new Set(services).size;
  if (unique > 5) score -= (unique - 5) * 2;
  return Math.min(98, Math.max(45, score));
}

// ─── Builder Skill Node (React Flow custom node) ─────────────────────────────
function BuilderSkillNode({ id, data }: { id: string; data: NodeData }) {
  const c = CAT_CLR[data.category];
  return (
    <div style={{
      background: '#1e2030', border: `1.8px solid ${c}`,
      borderRadius: '10px', padding: '8px 12px 8px 10px',
      minWidth: '160px', maxWidth: '200px',
      boxShadow: data.category === 'llm' ? `0 0 18px ${c}44` : `0 0 8px ${c}22`,
      position: 'relative', cursor: 'default',
    }}>
      <Handle type="target" position={Position.Left}
        style={{ background: c, border: 'none', width: 9, height: 9 }} />
      {/* Delete button */}
      <button
        onClick={() => data.onDelete(id)}
        style={{
          position: 'absolute', top: 4, right: 4, width: 16, height: 16,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: '#4a5274', fontSize: '11px', lineHeight: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50%', padding: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#292e42')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        title="Remove"
      >✕</button>
      {/* Category badge */}
      <div style={{
        fontSize: '7px', color: c, fontWeight: 700, letterSpacing: '0.9px',
        textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace",
        marginBottom: '3px',
      }}>
        {data.category}
      </div>
      {/* Icon + Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontSize: '15px' }}>{data.emoji}</span>
        <span style={{ fontSize: '11.5px', color: '#dde4fc', fontWeight: 600, lineHeight: 1.3 }}>
          {data.label}
        </span>
      </div>
      <Handle type="source" position={Position.Right}
        style={{ background: c, border: 'none', width: 9, height: 9 }} />
    </div>
  );
}

const NODE_TYPES = { builderSkill: BuilderSkillNode };

// ─── Palette Skill Card ───────────────────────────────────────────────────────
function PaletteItem({ skill }: { skill: Skill }) {
  const c = CAT_CLR[skill.category as Cat];
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('application/rg-skill', JSON.stringify(skill));
    e.dataTransfer.effectAllowed = 'move';
  };
  return (
    <div
      draggable onDragStart={onDragStart}
      style={{
        display: 'flex', alignItems: 'center', gap: '7px',
        padding: '5px 8px', borderRadius: '7px',
        background: '#1e2030', border: `1px solid ${c}28`,
        cursor: 'grab', userSelect: 'none',
        transition: 'border-color 0.12s, background 0.12s',
        fontSize: '11.5px', color: '#c8d2ec',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${c}60`;
        e.currentTarget.style.background = '#232538';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${c}28`;
        e.currentTarget.style.background = '#1e2030';
      }}
      title={`Drag to add ${skill.label}`}
    >
      <span style={{ fontSize: '13px', flexShrink: 0 }}>{skill.icon}</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {skill.label}
      </span>
    </div>
  );
}

// ─── Main Canvas ─────────────────────────────────────────────────────────────
export default function BuildPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const [search, setSearch] = useState('');
  const [runeName, setRuneName] = useState('My Rune');
  const [toast, setToast] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Delete a node + connected edges
  const deleteNode = useCallback((id: string) => {
    setNodes(ns => ns.filter(n => n.id !== id));
    setEdges(es => es.filter(e => e.source !== id && e.target !== id));
  }, [setNodes, setEdges]);

  // Drag over canvas
  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  // Drop skill onto canvas
  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('application/rg-skill');
    if (!raw || !rfInstance) return;
    const skill: Skill = JSON.parse(raw);
    const position = rfInstance.screenToFlowPosition({ x: e.clientX, y: e.clientY });
    const id = `${skill.id}-${Date.now()}`;
    setNodes(ns => [
      ...ns,
      {
        id, type: 'builderSkill', position,
        data: { ...skill, onDelete: deleteNode },
      },
    ]);
  }, [rfInstance, setNodes, deleteNode]);

  // Connect nodes manually
  const onConnect = useCallback((params: Connection) => {
    setEdges(es => addEdge({ ...params, animated: true, style: { stroke: '#bb9af7', strokeWidth: 1.8 } }, es));
  }, [setEdges]);

  // Auto-fill gaps
  const handleAutoFill = () => {
    if (nodes.length === 0) {
      showToast('Add at least one skill first, then auto-fill will complete the pipeline!');
      return;
    }
    // Re-attach onDelete after auto-fill creates nodes
    const { nodes: filled, edges: filledEdges, added } = autoFill(nodes, edges);
    const withDelete = filled.map(n => ({
      ...n, data: { ...n.data, onDelete: deleteNode },
    }));
    setNodes(withDelete);
    setEdges(filledEdges);
    if (added.length > 0) {
      showToast(`✨ Added: ${added.join(', ')} · Auto-connected ${filledEdges.length - edges.length} edge(s)`);
    } else {
      showToast('✅ Pipeline looks complete! Re-arranged layout.');
    }
    // Fit view after layout
    setTimeout(() => rfInstance?.fitView({ padding: 0.3 }), 100);
  };

  // Clear canvas
  const handleClear = () => { setNodes([]); setEdges([]); };

  // Trust score
  const trustScore = calcTrustScore(nodes);
  const trustColor = trustScore >= 80 ? '#a8d878' : trustScore >= 60 ? '#ffb07a' : '#f7768e';

  // Export JSON
  const exportRune = () => {
    const cats = new Set(nodes.map(n => n.data.category as Cat));
    const rune = {
      name: runeName,
      category: 'Custom',
      trustScore,
      nodes: nodes.map(n => ({ id: n.data.id, label: n.data.label, category: n.data.category })),
      edges: edges.map(e => ({ source: e.source, target: e.target })),
    };
    return JSON.stringify(rune, null, 2);
  };

  // Filtered palette
  const q = search.toLowerCase();
  const filteredPalette = q
    ? PALETTE.filter(s => s.label.toLowerCase().includes(q) || s.service.toLowerCase().includes(q))
    : PALETTE;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 57px)', background: '#0d0e17' }}>

      {/* ── Top Bar ── */}
      <div className="rg-build-topbar">
        {/* Rune name */}
        <input
          value={runeName}
          onChange={e => setRuneName(e.target.value)}
          style={{
            background: 'transparent', border: '1px solid #2e3452',
            borderRadius: '6px', padding: '4px 10px',
            color: '#e2e8ff', fontSize: '0.85rem', fontWeight: 600,
            fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.01em',
            outline: 'none', width: '180px',
          }}
          placeholder="Rune name…"
        />

        <span style={{ color: '#2e3452', flexShrink: 0 }}>|</span>

        {/* Node / Edge count */}
        <span style={{ fontSize: '0.75rem', color: '#748ab8', flexShrink: 0 }}>
          {nodes.length} skill{nodes.length !== 1 ? 's' : ''} · {edges.length} edge{edges.length !== 1 ? 's' : ''}
        </span>

        {/* Trust Score */}
        {nodes.length > 0 && (
          <span style={{
            fontSize: '0.72rem', color: trustColor,
            background: `${trustColor}12`, border: `1px solid ${trustColor}35`,
            padding: '2px 10px', borderRadius: '20px', flexShrink: 0,
          }}>
            Trust {trustScore}
          </span>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Hint */}
        <span style={{ fontSize: '0.72rem', color: '#4a5274', flexShrink: 0 }}>
          <span className="rg-build-hint">Drag actions · Connect handles · Auto-fill gaps</span>
        </span>

        {/* Clear */}
        {nodes.length > 0 && (
          <button onClick={handleClear} style={btnStyle('#f7768e', false)}>
            Clear
          </button>
        )}

        {/* Auto-Fill */}
        <button onClick={handleAutoFill} style={btnStyle('#a78bfa', true)}>
          ✨ Auto-Fill Gaps
        </button>

        {/* Export */}
        {nodes.length > 0 && (
          <button onClick={() => setShowExport(v => !v)} style={btnStyle('#60a5fa', false)}>
            {showExport ? 'Hide' : 'Export'}
          </button>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── Left Palette ── */}
        <div className="rg-build-sidebar" style={{
          overflowY: 'auto',
          background: '#13141f', borderRight: '1px solid #292e42',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Search */}
          <div style={{ padding: '10px 10px 0' }}>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search actions…"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: '#1e2030', border: '1px solid #2e3452',
                borderRadius: '7px', padding: '6px 10px',
                color: '#c8d2ec', fontSize: '12px', outline: 'none',
              }}
            />
          </div>

          {/* Sections */}
          <div style={{ padding: '8px 8px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CAT_SECTIONS.map(({ cat, label }) => {
              const skills = filteredPalette.filter(s => s.category === cat);
              if (!skills.length) return null;
              return (
                <div key={cat}>
                  <div style={{
                    fontSize: '9px', color: CAT_CLR[cat], fontWeight: 700,
                    letterSpacing: '1px', textTransform: 'uppercase',
                    padding: '4px 2px', fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {label}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {skills.map(s => <PaletteItem key={s.id} skill={s} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Canvas ── */}
        <div ref={wrapperRef} style={{ flex: 1, position: 'relative' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={NODE_TYPES}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setRfInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            deleteKeyCode="Delete"
            style={{ background: '#0d0e17' }}
            defaultEdgeOptions={{
              animated: true,
              style: { stroke: '#bb9af7', strokeWidth: 1.8 },
            }}
          >
            <Background color="#1f2335" gap={24} size={1} />
            <Controls
              style={{ background: '#13141f', border: '1px solid #292e42', borderRadius: '8px' }}
              showInteractive={false}
            />

            {/* Empty state */}
            {nodes.length === 0 && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none', gap: '12px',
              }}>
                <div style={{ fontSize: '2.5rem', opacity: 0.25 }}>🔮</div>
                <div style={{ fontSize: '0.9rem', color: '#4a5274', fontWeight: 600 }}>
                  Drag actions from the left to start building
                </div>
                <div style={{ fontSize: '0.78rem', color: '#3a4268' }}>
                  Then click <span style={{ color: '#a78bfa' }}>✨ Auto-Fill Gaps</span> to complete the pipeline
                </div>
              </div>
            )}
          </ReactFlow>

          {/* Toast notification */}
          {toast && (
            <div style={{
              position: 'absolute', bottom: '1.5rem', left: '50%',
              transform: 'translateX(-50%)',
              background: '#1e2030', border: '1px solid #a78bfa',
              borderRadius: '8px', padding: '8px 18px',
              fontSize: '0.82rem', color: '#e2e8ff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              zIndex: 100, whiteSpace: 'nowrap',
            }}>
              {toast}
            </div>
          )}

          {/* Export panel */}
          {showExport && (
            <div style={{
              position: 'absolute', top: '1rem', right: '1rem',
              background: '#13141f', border: '1px solid #292e42',
              borderRadius: '10px', padding: '1rem',
              width: '320px', zIndex: 50,
              boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            }}>
              <div style={{ fontSize: '0.75rem', color: '#c9a8ff', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
                EXPORT RUNE
              </div>
              <pre style={{
                background: '#0d0e17', border: '1px solid #1f2335',
                borderRadius: '6px', padding: '10px',
                fontSize: '10px', color: '#a8d878', overflowX: 'auto',
                maxHeight: '260px', overflowY: 'auto', margin: 0,
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {exportRune()}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(exportRune());
                  showToast('Copied to clipboard!');
                }}
                style={{ ...btnStyle('#a8d878', false), marginTop: '0.5rem', width: '100%' }}
              >
                Copy JSON
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Button style helper
function btnStyle(color: string, primary: boolean): React.CSSProperties {
  return {
    padding: '5px 14px', borderRadius: '6px', border: `1px solid ${color}50`,
    background: primary ? `${color}18` : 'transparent',
    color, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
    fontFamily: "'Inter', sans-serif", flexShrink: 0,
    transition: 'all 0.12s',
  };
}

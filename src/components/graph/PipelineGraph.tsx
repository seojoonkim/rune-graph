'use client'
import ReactFlow, { Background, Controls, type Node, type Edge } from 'reactflow'
import { SkillNode } from './SkillNode'
import { type Rune } from '@/data/runes'

const nodeTypes = { skill: SkillNode }

// ── Vertical layout constants ──────────────────────────────────────────
// Category = ROW (top→bottom: input → api → llm → output)
// Nodes within same category = COLUMNS (centered horizontally)
const NODE_W   = 168   // must match SkillNode fixed width
const COL_GAP  = 32    // horizontal gap between sibling nodes
const COL_STEP = NODE_W + COL_GAP   // = 200px
const ROW_STEP = 115   // vertical step between category rows

export function PipelineGraph({ rune }: { rune: Rune }) {
  const categoryOrder = ['input', 'api', 'llm', 'output']
  const byCategory: Record<string, typeof rune.nodes> = {
    input: [], api: [], llm: [], output: [],
  }
  rune.nodes.forEach(n => { byCategory[n.category]?.push(n) })

  // Active rows (categories that have at least one node), in order
  const activeRows = categoryOrder.filter(cat => byCategory[cat].length > 0)
  const maxCols = Math.max(...activeRows.map(cat => byCategory[cat].length))
  const canvasW = maxCols * COL_STEP - COL_GAP   // total width for centering

  const nodes: Node[] = []

  activeRows.forEach((cat, rowIdx) => {
    const catNodes = byCategory[cat]
    const rowW = catNodes.length * COL_STEP - COL_GAP
    // Center this row within the canvas
    const startX = (canvasW - rowW) / 2

    catNodes.forEach((n, colIdx) => {
      nodes.push({
        id: n.id,
        type: 'skill',
        position: {
          x: startX + colIdx * COL_STEP,
          y: rowIdx * ROW_STEP,
        },
        data: { label: n.label, category: n.category },
        style: { overflow: 'visible' },
      })
    })
  })

  const edges: Edge[] = rune.edges.map((e, i) => ({
    id:       `e-${i}`,
    source:   e.source,
    target:   e.target,
    label:    e.label,
    type:     'smoothstep',
    animated: true,
    style: { stroke: '#bb9af7', strokeWidth: 1.6 },
    labelStyle:     { fill: '#c8d2ec', fontSize: 9, fontFamily: "'JetBrains Mono', monospace" },
    labelBgStyle:   { fill: '#16161e', fillOpacity: 1 },
    labelBgPadding: [4, 5] as [number, number],
    labelBgBorderRadius: 4,
  }))

  // Height: one ROW_STEP per category row + padding for last node
  const graphH = Math.max(300, activeRows.length * ROW_STEP + 120)

  return (
    <div style={{
      height: graphH,
      background: '#1a1b26',
      borderRadius: '12px',
      border: '1px solid #292e42',
      overflow: 'hidden',
    }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnDrag={false}
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background color="#1f2335" gap={22} size={1} />
        <Controls
          showInteractive={false}
          style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '6px' }}
        />
      </ReactFlow>
    </div>
  )
}

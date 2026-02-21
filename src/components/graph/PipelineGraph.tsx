'use client'
import ReactFlow, { Background, Controls, type Node, type Edge } from 'reactflow'
import { SkillNode } from './SkillNode'
import { CATEGORY_COLORS, type Rune } from '@/data/runes'

const nodeTypes = { skill: SkillNode }

// Layout constants
// NODE_W must stay in sync with SkillNode width (168px)
const NODE_W   = 168   // px — matches SkillNode's fixed `width`
const COL_GAP  = 88    // horizontal gap between node right-edge and next node left-edge
const COL_STEP = NODE_W + COL_GAP   // = 256px per column
const ROW_STEP = 108   // vertical gap between nodes in the same column

export function PipelineGraph({ rune }: { rune: Rune }) {
  const categoryOrder = ['input', 'api', 'llm', 'output']
  const byCategory: Record<string, typeof rune.nodes> = {
    input: [], api: [], llm: [], output: [],
  }
  rune.nodes.forEach(n => { byCategory[n.category]?.push(n) })

  // Build nodes with corrected layout
  const nodes: Node[] = []
  let col = 0
  let maxRows = 1

  categoryOrder.forEach(cat => {
    const catNodes = byCategory[cat]
    if (!catNodes.length) return

    catNodes.forEach((n, row) => {
      nodes.push({
        id: n.id,
        type: 'skill',
        // Vertically center multi-node columns around the row midpoint
        position: {
          x: col * COL_STEP,
          y: row * ROW_STEP - ((catNodes.length - 1) * ROW_STEP) / 2,
        },
        data: { label: n.label, category: n.category },
        // Let overflow be visible so nothing is clipped by React Flow's node wrapper
        style: { overflow: 'visible' },
      })
    })

    maxRows = Math.max(maxRows, catNodes.length)
    col++
  })

  // Re-offset Y so nothing is negative
  const minY = Math.min(...nodes.map(n => n.position.y))
  if (minY < 0) {
    nodes.forEach(n => { n.position = { ...n.position, y: n.position.y - minY } })
  }

  const edges: Edge[] = rune.edges.map((e, i) => ({
    id:     `e-${i}`,
    source: e.source,
    target: e.target,
    label:  e.label,
    animated: true,
    style: { stroke: '#bb9af7', strokeWidth: 1.6 },
    // Compact label style — smaller font + opaque bg to prevent bleed
    labelStyle:   { fill: '#c8d2ec', fontSize: 9, fontFamily: "'JetBrains Mono', monospace" },
    labelBgStyle: { fill: '#16161e', fillOpacity: 1 },
    labelBgPadding: [4, 5] as [number, number],
    labelBgBorderRadius: 4,
  }))

  // Dynamic height: enough for all rows + padding
  const graphH = Math.max(220, maxRows * ROW_STEP + 100)

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
        fitViewOptions={{ padding: 0.28 }}
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

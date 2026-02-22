'use client'
import ReactFlow, { Background, Controls, type Node, type Edge } from 'reactflow'
import { SkillNode } from './SkillNode'
import { type Rune } from '@/data/runes'

const nodeTypes = { skill: SkillNode }

// ── Layout constants ───────────────────────────────────────────────────
const NODE_W   = 168   // must match SkillNode fixed width
const NODE_H   = 66    // approximate rendered height of SkillNode
const COL_GAP  = 72    // horizontal gap between sibling nodes
const COL_STEP = NODE_W + COL_GAP   // = 240px
const ROW_STEP = 160   // vertical step between layers

export function PipelineGraph({ rune }: { rune: Rune }) {
  // ── Topological layer assignment (Kahn's BFS) ─────────────────────────
  // Guarantees every edge goes source-layer → target-layer (never upward)
  const adj: Record<string, string[]> = {}
  const inDeg: Record<string, number> = {}
  rune.nodes.forEach(n => { adj[n.id] = []; inDeg[n.id] = 0 })
  rune.edges.forEach(e => {
    adj[e.source].push(e.target)
    inDeg[e.target]++
  })

  // Longest-path layer (so A→B→C puts B at layer 1, C at layer 2)
  const nodeLayer: Record<string, number> = {}
  rune.nodes.forEach(n => { nodeLayer[n.id] = 0 })
  const inDegCopy = { ...inDeg }

  // Process nodes with in-degree 0 first, propagate layers
  const queue: string[] = rune.nodes
    .filter(n => inDeg[n.id] === 0)
    .map(n => n.id)

  while (queue.length > 0) {
    const cur = queue.shift()!
    adj[cur].forEach(nxt => {
      nodeLayer[nxt] = Math.max(nodeLayer[nxt], nodeLayer[cur] + 1)
      inDegCopy[nxt]--
      if (inDegCopy[nxt] === 0) queue.push(nxt)
    })
  }

  // ── Group nodes by layer, center each row ─────────────────────────────
  const numLayers = Math.max(...rune.nodes.map(n => nodeLayer[n.id])) + 1
  const byLayer: string[][] = Array.from({ length: numLayers }, () => [])
  rune.nodes.forEach(n => byLayer[nodeLayer[n.id]].push(n.id))

  const maxCols = Math.max(...byLayer.map(l => l.length))
  const canvasW = maxCols * COL_STEP - COL_GAP

  const nodes: Node[] = []
  byLayer.forEach((layerNodes, rowIdx) => {
    const rowW = layerNodes.length * COL_STEP - COL_GAP
    const startX = (canvasW - rowW) / 2   // center-align each row
    layerNodes.forEach((nodeId, colIdx) => {
      const rn = rune.nodes.find(n => n.id === nodeId)!
      nodes.push({
        id: rn.id,
        type: 'skill',
        position: {
          x: startX + colIdx * COL_STEP,
          y: rowIdx * ROW_STEP,
        },
        data: { label: rn.label, category: rn.category },
        style: { overflow: 'visible' },
      })
    })
  })

  // ── Edges ──────────────────────────────────────────────────────────────
  const edges: Edge[] = rune.edges.map((e, i) => ({
    id:       `e-${i}`,
    source:   e.source,
    target:   e.target,
    label:    e.label,
    type:     'smoothstep',
    animated: true,
    style: { stroke: '#bb9af7', strokeWidth: 1.6 },
    labelStyle:     { fill: '#c8d2ec', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" },
    labelBgStyle:   { fill: '#16161e', fillOpacity: 1 },
    labelBgPadding: [4, 5] as [number, number],
    labelBgBorderRadius: 4,
  }))

  // ── Container: aspect-ratio matches graph dimensions ──────────────────
  // This prevents vertical whitespace on mobile (avoids fitView over-zoom-out)
  const naturalH = (numLayers - 1) * ROW_STEP + NODE_H
  const AR_W = canvasW
  const AR_H = naturalH + 80   // +80 for edge labels above/below boundary rows

  return (
    <div style={{
      aspectRatio: `${AR_W} / ${AR_H}`,
      minHeight: '180px',
      maxHeight: '680px',
      overflow: 'hidden',
    }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        style={{ background: '#1a1b26' }}
        fitView
        fitViewOptions={{ padding: 0.06 }}
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

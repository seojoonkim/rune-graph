'use client'
import { useCallback } from 'react'
import ReactFlow, { Background, type Node, type Edge, type ReactFlowInstance } from 'reactflow'
import { SkillNode } from './SkillNode'
import { type Rune } from '@/data/runes'

const nodeTypes = { skill: SkillNode }

// ── Layout constants ───────────────────────────────────────────────────
const NODE_W   = 168
const NODE_H   = 66
const COL_GAP  = 72
const COL_STEP = NODE_W + COL_GAP   // = 240px
const ROW_STEP = 160

// Max nodes per rendered row — keeps canvasW narrow enough to zoom in on mobile
const MAX_COLS = 3

export function PipelineGraph({ rune }: { rune: Rune }) {
  // ── Step 1: Topological layer assignment (Kahn's BFS) ─────────────────
  // Assigns each node the LONGEST distance from any root (ensures all edges go down)
  const adj: Record<string, string[]> = {}
  const inDeg: Record<string, number> = {}
  rune.nodes.forEach(n => { adj[n.id] = []; inDeg[n.id] = 0 })
  rune.edges.forEach(e => {
    adj[e.source].push(e.target)
    inDeg[e.target]++
  })

  const nodeLayer: Record<string, number> = {}
  rune.nodes.forEach(n => { nodeLayer[n.id] = 0 })
  const inDegCopy = { ...inDeg }
  const queue: string[] = rune.nodes.filter(n => inDeg[n.id] === 0).map(n => n.id)

  while (queue.length > 0) {
    const cur = queue.shift()!
    adj[cur].forEach(nxt => {
      nodeLayer[nxt] = Math.max(nodeLayer[nxt], nodeLayer[cur] + 1)
      inDegCopy[nxt]--
      if (inDegCopy[nxt] === 0) queue.push(nxt)
    })
  }

  // ── Step 2: Group by topological layer ───────────────────────────────
  const maxOrigLayer = Math.max(...rune.nodes.map(n => nodeLayer[n.id]))
  const byOrigLayer: string[][] = Array.from({ length: maxOrigLayer + 1 }, () => [])
  rune.nodes.forEach(n => byOrigLayer[nodeLayer[n.id]].push(n.id))

  // ── Step 3: Split wide layers into sub-rows (MAX_COLS limit) ──────────
  // Nodes in the same topological layer have no edges between each other,
  // so any sub-row ordering is safe — all edges still point downward.
  const renderLayers: string[][] = []
  byOrigLayer.forEach(layerNodes => {
    if (layerNodes.length <= MAX_COLS) {
      renderLayers.push(layerNodes)
    } else {
      // Chunk into groups of MAX_COLS
      for (let i = 0; i < layerNodes.length; i += MAX_COLS) {
        renderLayers.push(layerNodes.slice(i, i + MAX_COLS))
      }
    }
  })

  // ── Step 4: Position nodes by render layer ────────────────────────────
  const numLayers = renderLayers.length
  const maxCols = Math.max(...renderLayers.map(l => l.length))
  const canvasW = maxCols * COL_STEP - COL_GAP

  const nodes: Node[] = []
  renderLayers.forEach((layerNodes, rowIdx) => {
    const rowW = layerNodes.length * COL_STEP - COL_GAP
    const startX = (canvasW - rowW) / 2  // center-align each row
    layerNodes.forEach((nodeId, colIdx) => {
      const rn = rune.nodes.find(n => n.id === nodeId)!
      nodes.push({
        id: rn.id,
        type: 'skill',
        position: { x: startX + colIdx * COL_STEP, y: rowIdx * ROW_STEP },
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
    labelBgStyle:   { fill: '#1a1b26', fillOpacity: 1 },
    labelBgPadding: [4, 5] as [number, number],
    labelBgBorderRadius: 4,
  }))

  // ── Container height ──────────────────────────────────────────────────
  const naturalH = (numLayers - 1) * ROW_STEP + NODE_H
  const graphH = Math.min(560, Math.max(240, naturalH + 80))

  // ── fitView after mount ────────────────────────────────────────────────
  const onInit = useCallback((instance: ReactFlowInstance) => {
    requestAnimationFrame(() => {
      instance.fitView({ padding: 0.12, includeHiddenNodes: false })
    })
  }, [])

  return (
    <div style={{ height: graphH, overflow: 'hidden' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        style={{ background: '#1a1b26' }}
        onInit={onInit}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        panOnDrag={false}
        minZoom={0.15}
        maxZoom={2.0}
      >
        <Background color="#1f2335" gap={22} size={1} />
      </ReactFlow>
    </div>
  )
}

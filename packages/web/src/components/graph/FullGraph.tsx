'use client'
import { useState, useCallback } from 'react'
import ReactFlow, {
  Background, Controls, MiniMap,
  type Node, type Edge, type NodeMouseHandler,
} from 'reactflow'
import { SkillNode } from './SkillNode'
import type { Rune, SkillNode as SkillNodeType, SkillEdge, NodeCategory } from '@/lib/loader'

const nodeTypes = { skill: SkillNode }

const CAT_LABELS: Record<string, string> = { input: '⬇️ Input', api: '🔌 API', llm: '🧠 LLM', output: '⬆️ Output' }

interface FullGraphProps {
  fullGraph: { nodes: SkillNodeType[]; edges: SkillEdge[] }
  categoryColors: Record<string, string>
  runes: Rune[]
  hubSkills: string[]
}

export function FullGraph({ fullGraph, categoryColors, runes, hubSkills }: FullGraphProps) {
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set(['input','api','llm','output']))
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hubOnly, setHubOnly] = useState(false)

  const toggleCat = (cat: string) => {
    const s = new Set(activeCategories)
    if (s.has(cat)) s.delete(cat); else s.add(cat)
    setActiveCategories(s)
  }

  // Build layout with force-inspired grid
  const gridLayout = useCallback(() => {
    const cols: Record<string, number> = { input: 0, api: 1, llm: 2, output: 3 }
    const byCol: Record<number, typeof fullGraph.nodes> = { 0: [], 1: [], 2: [], 3: [] }
    fullGraph.nodes.forEach(n => byCol[cols[n.category]]?.push(n))

    const nodes: Node[] = []
    Object.entries(byCol).forEach(([col, ns]) => {
      ns.forEach((n, i) => {
        const visible = activeCategories.has(n.category) && (!hubOnly || hubSkills.includes(n.id))
        nodes.push({
          id: n.id, type: 'skill',
          position: { x: parseInt(col) * 220, y: i * 80 },
          data: { label: n.label, category: n.category, categoryColors, hubSkills },
          hidden: !visible,
          selected: n.id === selectedNode,
        })
      })
    })
    return nodes
  }, [activeCategories, hubOnly, selectedNode, fullGraph, categoryColors, hubSkills])

  const edges: Edge[] = fullGraph.edges
    .filter(e => {
      const src = fullGraph.nodes.find(n => n.id === e.source)
      const tgt = fullGraph.nodes.find(n => n.id === e.target)
      if (!src || !tgt) return false
      if (!activeCategories.has(src.category) || !activeCategories.has(tgt.category)) return false
      if (hubOnly && !hubSkills.includes(e.source) && !hubSkills.includes(e.target)) return false
      return true
    })
    .map((e, i) => ({
      id: `e-${i}`, source: e.source, target: e.target,
      label: e.label, animated: true,
      style: { stroke: '#bb9af7', strokeWidth: 1.2, opacity: 0.6 },
      labelStyle: { fill: '#9aa4d2', fontSize: 9 },
      labelBgStyle: { fill: '#1a1b26' },
    }))

  const onNodeClick: NodeMouseHandler = (_, node) => setSelectedNode(node.id === selectedNode ? null : node.id)

  const usedInRunes = selectedNode
    ? runes.filter(r => r.nodes.some(n => n.id === selectedNode)).map(r => r.name)
    : []

  return (
    <div style={{ display: 'flex', height: '70vh', gap: '1rem' }}>
      {/* Sidebar */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ background: '#1e2030', border: '1px solid #292e42', borderRadius: '8px', padding: '1rem' }}>
          <div style={{ fontSize: '0.7rem', color: '#8ab4e0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Filter</div>
          {Object.entries(CAT_LABELS).map(([cat, label]) => (
            <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '0.5rem' }}>
              <input type="checkbox" checked={activeCategories.has(cat)} onChange={() => toggleCat(cat)} style={{ accentColor: categoryColors[cat] }} />
              <span style={{ fontSize: '0.8rem', color: activeCategories.has(cat) ? categoryColors[cat] : '#9aa4d2' }}>{label}</span>
            </label>
          ))}
          <div style={{ borderTop: '1px solid #292e42', marginTop: '0.75rem', paddingTop: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={hubOnly} onChange={() => setHubOnly(!hubOnly)} style={{ accentColor: '#bb9af7' }} />
              <span style={{ fontSize: '0.8rem', color: hubOnly ? '#bb9af7' : '#9aa4d2' }}>⭐ Hub Skills Only</span>
            </label>
          </div>
        </div>

        {selectedNode && (
          <div style={{ background: '#1e2030', border: '1px solid #bb9af7', borderRadius: '8px', padding: '1rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#bb9af7', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Used In</div>
            {usedInRunes.length ? usedInRunes.map(r => (
              <div key={r} style={{ fontSize: '0.75rem', color: '#dde4fc', marginBottom: '0.25rem' }}>· {r}</div>
            )) : <div style={{ fontSize: '0.75rem', color: '#8ab4e0' }}>No Runes</div>}
          </div>
        )}
      </div>

      {/* Graph */}
      <div style={{ flex: 1, background: '#1a1b26', borderRadius: '12px', border: '1px solid #292e42', overflow: 'hidden' }}>
        <ReactFlow nodes={gridLayout()} edges={edges} nodeTypes={nodeTypes} onNodeClick={onNodeClick} fitView fitViewOptions={{ padding: 0.2 }}>
          <Background color="#1f2335" gap={24} />
          <Controls style={{ background: '#1e2030', border: '1px solid #292e42' }} />
          <MiniMap nodeColor={(n) => categoryColors[(n.data?.category as NodeCategory) ?? 'api']} style={{ background: '#1e2030', border: '1px solid #292e42' }} />
        </ReactFlow>
      </div>
    </div>
  )
}

import { existsSync } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

// ── Type definitions (formerly in @/data/skills-registry and @/data/runes) ──

export interface Action {
  id: string
  label: string
  category: 'input' | 'api' | 'llm' | 'output'
  service: string
  description: string
  docsUrl: string
  icon: string
  author?: { name: string; url?: string }
  downloads?: number
  stars?: number
  version?: string
}

export type Skill = Action

export type SkillCategory =
  | 'ai'
  | 'communication'
  | 'productivity'
  | 'dev'
  | 'data'
  | 'finance'
  | 'marketing'
  | 'iot'
  | 'media'
  | 'utility'

export interface SkillPackage {
  id: string
  name: string
  vendor: string
  emoji: string
  tagline: string
  description: string
  category: SkillCategory
  installCmd: string
  docsUrl: string
  actionIds: string[]
  downloads?: number
  stars?: number
  version?: string
  verified?: boolean
}

export type NodeCategory = 'input' | 'api' | 'llm' | 'output'

export interface SkillNode {
  id: string
  label: string
  category: NodeCategory
}

export interface SkillEdge {
  source: string
  target: string
  label: string
  rune?: string
}

export interface Rune {
  id: string
  slug: string
  name: string
  purpose: string
  category: string
  emoji: string
  useCase: string
  description?: string
  nodes: SkillNode[]
  edges: SkillEdge[]
}

function getMonorepoRoot(): string {
  let dir = process.cwd()
  for (let i = 0; i < 5; i++) {
    if (existsSync(path.join(dir, 'skill-packages'))) return dir
    dir = path.dirname(dir)
  }
  throw new Error('Cannot find monorepo root (looking for skill-packages/)')
}

function toServiceName(skillId: string): string {
  const first = skillId.split('-')[0] ?? skillId
  return first.charAt(0).toUpperCase() + first.slice(1)
}

export async function loadSkillPackages(): Promise<SkillPackage[]> {
  const root = getMonorepoRoot()
  const skillPackagesDir = path.join(root, 'skill-packages')
  const entries = await fs.readdir(skillPackagesDir, { withFileTypes: true })

  const packages = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const skillJsonPath = path.join(skillPackagesDir, entry.name, 'SKILL.json')
        const source = await fs.readFile(skillJsonPath, 'utf8')
        const data = JSON.parse(source)

        return {
          id: data.name,
          name: data.displayName,
          vendor: data.vendor,
          emoji: data.emoji,
          tagline: data.tagline,
          description: data.description,
          category: data.category as SkillCategory,
          installCmd: `rune skill add ${data.name}`,
          docsUrl: data.docsUrl,
          actionIds: data.skills ?? [],
          downloads: data.downloads,
          stars: data.stars,
          version: data.version,
          verified: data.verified,
        } as SkillPackage
      })
  )

  return packages
}

export async function loadSkills(preloadedPackages?: SkillPackage[]): Promise<Skill[]> {
  const root = getMonorepoRoot()
  const skillsDir = path.join(root, 'skills')
  const entries = await fs.readdir(skillsDir, { withFileTypes: true })
  const packages = preloadedPackages ?? await loadSkillPackages()
  const packageById = new Map(packages.map((pkg) => [pkg.id, pkg]))

  const skills = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const skillMdPath = path.join(skillsDir, entry.name, 'SKILL.md')
        const source = await fs.readFile(skillMdPath, 'utf8')
        const { data } = matter(source)

        const pkg = data.package ? packageById.get(data.package) : undefined
        const service = pkg?.name ?? toServiceName(data.name)

        return {
          id: data.name,
          label: data.label,
          category: data.category,
          service,
          description: data.description,
          docsUrl: pkg?.docsUrl ?? '',
          icon: data.icon,
          author: undefined,
          downloads: undefined,
          stars: undefined,
          version: undefined,
        } as Action
      })
  )

  return skills
}

export async function loadRunes(): Promise<Rune[]> {
  const root = getMonorepoRoot()
  const runesDir = path.join(root, 'runes')
  const entries = await fs.readdir(runesDir, { withFileTypes: true })

  const runes = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const runeJsonPath = path.join(runesDir, entry.name, 'RUNE.json')
        const source = await fs.readFile(runeJsonPath, 'utf8')
        return JSON.parse(source) as Rune
      })
  )

  return runes.map((rune) => ({
    ...rune,
    description: rune.description ?? rune.purpose,
  }))
}

export function buildFullGraph(runes: Rune[]): { nodes: SkillNode[]; edges: SkillEdge[] } {
  const nodeMap = new Map<string, SkillNode>()
  const allEdges: SkillEdge[] = []

  for (const rune of runes) {
    for (const node of rune.nodes) {
      if (!nodeMap.has(node.id)) {
        nodeMap.set(node.id, node)
      }
    }

    for (const edge of rune.edges) {
      allEdges.push({ ...edge, rune: rune.slug })
    }
  }

  return {
    nodes: Array.from(nodeMap.values()),
    edges: allEdges,
  }
}

export function buildHubSkills(runes: Rune[]): string[] {
  const useMap = new Map<string, number>()
  for (const rune of runes) {
    const seen = new Set<string>()
    for (const node of rune.nodes) {
      if (seen.has(node.id)) continue
      seen.add(node.id)
      useMap.set(node.id, (useMap.get(node.id) ?? 0) + 1)
    }
  }

  return Array.from(useMap.entries())
    .sort((a, b) => b[1] - a[1])
    .filter(([, count]) => count >= 2)
    .slice(0, 24)
    .map(([id]) => id)
}

export const CATEGORY_COLORS: Record<NodeCategory, string> = {
  input: '#34d399',
  api: '#60a5fa',
  llm: '#a78bfa',
  output: '#f472b6',
}

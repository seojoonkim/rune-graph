import { SKILL_PACKAGES, SKILLS_REGISTRY } from '../packages/web/src/data/skills-registry.js'
import { RUNES } from '../packages/web/src/data/runes.js'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

const SKILL_PACKAGES_DIR = path.join(ROOT_DIR, 'skill-packages')
const SKILLS_DIR = path.join(ROOT_DIR, 'skills')
const RUNES_DIR = path.join(ROOT_DIR, 'runes')

const escapeYaml = (value: string): string =>
  value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, '\\n')

const yamlString = (value: string | undefined): string => `"${escapeYaml(value ?? '')}"`

const toSkillPackageMarkdown = (pkg: (typeof SKILL_PACKAGES)[number]): string => {
  const skillsYaml = pkg.actionIds.map((id) => `  - ${id}`).join('\n')

  return `---
name: ${pkg.id}
description: ${yamlString(pkg.description)}
displayName: ${yamlString(pkg.name)}
vendor: ${yamlString(pkg.vendor)}
emoji: ${yamlString(pkg.emoji)}
tagline: ${yamlString(pkg.tagline)}
category: ${pkg.category}
version: ${yamlString(pkg.version ?? '1.0.0')}
verified: ${pkg.verified ?? false}
docsUrl: ${yamlString(pkg.docsUrl)}
downloads: ${pkg.downloads ?? 0}
stars: ${pkg.stars ?? 0}
skills:
${skillsYaml}
---

# ${pkg.name}

${pkg.description}
`
}

const toSkillMarkdown = (
  skill: (typeof SKILLS_REGISTRY)[number],
  packageId: string,
): string => `---
name: ${skill.id}
description: ${yamlString(skill.description)}
label: ${yamlString(skill.label)}
category: ${skill.category}
icon: ${yamlString(skill.icon)}
package: ${packageId}
---

# ${skill.id}

${skill.description}
`

const toRuneJson = (rune: (typeof RUNES)[number]): string => {
  const payload = {
    id: rune.id,
    slug: rune.slug,
    name: rune.name,
    purpose: rune.purpose,
    category: rune.category,
    emoji: rune.emoji,
    useCase: rune.useCase,
    description: rune.description,
    nodes: rune.nodes,
    edges: rune.edges,
  }

  return `${JSON.stringify(payload, null, 2)}\n`
}

const ensureCleanRootDirectories = async () => {
  await Promise.all([
    fs.rm(SKILL_PACKAGES_DIR, { recursive: true, force: true }),
    fs.rm(SKILLS_DIR, { recursive: true, force: true }),
    fs.rm(RUNES_DIR, { recursive: true, force: true }),
  ])

  await Promise.all([
    fs.mkdir(SKILL_PACKAGES_DIR, { recursive: true }),
    fs.mkdir(SKILLS_DIR, { recursive: true }),
    fs.mkdir(RUNES_DIR, { recursive: true }),
  ])

  await Promise.all([
    fs.writeFile(path.join(SKILL_PACKAGES_DIR, '.gitkeep'), ''),
    fs.writeFile(path.join(SKILLS_DIR, '.gitkeep'), ''),
    fs.writeFile(path.join(RUNES_DIR, '.gitkeep'), ''),
  ])
}

const buildSkillToPackageMap = () => {
  const map = new Map<string, string>()
  for (const pkg of SKILL_PACKAGES) {
    for (const actionId of pkg.actionIds) {
      map.set(actionId, pkg.id)
    }
  }
  return map
}

const generate = async () => {
  await ensureCleanRootDirectories()

  let skillPackageCount = 0
  let skillCount = 0
  let runeCount = 0

  for (const pkg of SKILL_PACKAGES) {
    const dirPath = path.join(SKILL_PACKAGES_DIR, pkg.id)
    await fs.mkdir(dirPath, { recursive: true })
    await fs.writeFile(path.join(dirPath, 'SKILL.md'), toSkillPackageMarkdown(pkg), 'utf8')
    skillPackageCount += 1
  }

  const skillToPackageMap = buildSkillToPackageMap()

  for (const skill of SKILLS_REGISTRY) {
    const dirPath = path.join(SKILLS_DIR, skill.id)
    const packageId = skillToPackageMap.get(skill.id) ?? ''
    await fs.mkdir(dirPath, { recursive: true })
    await fs.writeFile(path.join(dirPath, 'SKILL.md'), toSkillMarkdown(skill, packageId), 'utf8')
    skillCount += 1
  }

  for (const rune of RUNES) {
    const dirPath = path.join(RUNES_DIR, rune.slug)
    await fs.mkdir(dirPath, { recursive: true })
    await fs.writeFile(path.join(dirPath, 'RUNE.json'), toRuneJson(rune), 'utf8')
    runeCount += 1
  }

  console.log(`Generated skill-packages: ${skillPackageCount}`)
  console.log(`Generated skills: ${skillCount}`)
  console.log(`Generated runes: ${runeCount}`)
}

generate().catch((error) => {
  console.error('Failed to generate registry files:', error)
  process.exit(1)
})

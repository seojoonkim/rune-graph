import { loadSkills } from '@/lib/loader'
import { BuildPageClient } from './BuildPageClient'

export default async function BuildPage() {
  const skills = await loadSkills()
  return <BuildPageClient skillsRegistry={skills} />
}

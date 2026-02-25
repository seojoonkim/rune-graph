import { loadRunes } from '@/lib/loader'
import RunesPageClient from './RunesPageClient'

export default async function RunesPage() {
  const runes = await loadRunes()

  return <RunesPageClient runes={runes} />
}

import { getStats } from "@/utils/actions"
import StatsCard from "./StatsCard"

async function StatsContainer() {
  const data = await getStats()

  return <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
    <StatsCard title="lietotāji" value={data.usersCount || 0} />
    <StatsCard title="sludinājumi" value={data.itemsCount || 0} />
    <StatsCard title="rezervācijas" value={data.reservationsCount || 0} />
  </div>
}

export default StatsContainer
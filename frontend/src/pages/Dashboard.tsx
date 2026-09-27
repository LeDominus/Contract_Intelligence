import { StatsCards } from "@/components/dashboard/StatsCards"
import { RecentContracts } from "@/components/dashboard/RecentContracts"

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Обзор</h2>
        <p className="text-sm text-muted-foreground">
          Последние загруженные договоры и метрики извлечения
        </p>
      </div>

      <StatsCards />
      <RecentContracts />
    </div>
  )
}
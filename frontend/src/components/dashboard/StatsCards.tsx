import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, Target, Bug } from "lucide-react"
import { mockStats } from "@/mocks/data"

const cards = [
  {
    title: "Всего договоров",
    value: mockStats.totalContracts,
    icon: FileText,
  },
  {
    title: "Требует проверки",
    value: mockStats.needsReview,
    icon: AlertTriangle,
  },
  {
    title: "Средняя точность",
    value: `${Math.round(mockStats.averageAccuracy * 100)}%`,
    icon: Target,
  },
  {
    title: "Галлюцинации",
    value: `${(mockStats.hallucinationRate * 100).toFixed(1)}%`,
    icon: Bug,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
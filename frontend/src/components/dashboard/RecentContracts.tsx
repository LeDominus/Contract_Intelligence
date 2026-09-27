import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "@tanstack/react-router"
import { useContracts } from "@/hooks/useContract"

const STATUS_META = {
  extracted: { label: "Извлечён", color: "bg-emerald-100 text-emerald-800" },
  processing: { label: "Обработка", color: "bg-blue-100 text-blue-800" },
  pending: { label: "Ожидает", color: "bg-gray-100 text-gray-800" },
  failed: { label: "Ошибка", color: "bg-red-100 text-red-800" },
}

export function RecentContracts() {
  const { data: contracts = [], isLoading } = useContracts()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Последние договоры</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Загрузка...</p>
        ) : (
          <div className="space-y-3">
            {contracts.slice(0, 5).map((contract) => {
              const status = STATUS_META[contract.status]
              return (
                <Link
                  key={contract.id}
                  to="/contracts/$contractId"
                  params={{ contractId: contract.id }}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{contract.filename}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(contract.uploadedAt).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                  <Badge variant="outline" className={status.color}>
                    {status.label}
                  </Badge>
                </Link>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
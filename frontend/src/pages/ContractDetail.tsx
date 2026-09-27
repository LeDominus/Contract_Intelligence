import { useParams } from "@tanstack/react-router"
import { useContract } from "@/hooks/useContract"
import { useExtractions } from "@/hooks/useExtractions"
import { FieldsTable } from "@/components/contract/FieldsTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContractDetail() {
  const { contractId } = useParams({ from: "/contracts/$contractId" })
  const { data: contract } = useContract(contractId)
  const { data: extraction } = useExtractions(contractId)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {contract?.filename ?? "Загрузка..."}
        </h2>
        <p className="text-sm text-muted-foreground">
          {contract && new Date(contract.uploadedAt).toLocaleString("ru-RU")}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Документ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[60vh] rounded-lg border-2 border-dashed bg-muted/30">
              <p className="text-sm text-muted-foreground">
                PDF viewer появится здесь
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Извлечённые поля</CardTitle>
          </CardHeader>
          <CardContent>
            {extraction ? (
              <FieldsTable
                fields={extraction.fields}
                onFieldClick={(field) => console.log("clicked", field.id)}
              />
            ) : (
              <p className="text-sm text-muted-foreground">Загрузка...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
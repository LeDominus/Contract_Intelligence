import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Link } from "@tanstack/react-router"
import { useContracts } from "@/hooks/useContract"

const STATUS_META = {
  extracted: { label: "Извлечён", color: "bg-emerald-100 text-emerald-800" },
  processing: { label: "Обработка", color: "bg-blue-100 text-blue-800" },
  pending: { label: "Ожидает", color: "bg-gray-100 text-gray-800" },
  failed: { label: "Ошибка", color: "bg-red-100 text-red-800" },
}

export function ContractsList() {
  const { data: contracts = [], isLoading } = useContracts()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Договоры</h2>
        <p className="text-sm text-muted-foreground">
          Все загруженные документы и результаты извлечения
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Файл</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Загружен</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : (
              contracts.map((contract) => {
                const status = STATUS_META[contract.status]
                return (
                  <TableRow key={contract.id}>
                    <TableCell>
                      <Link
                        to="/contracts/$contractId"
                        params={{ contractId: contract.id }}
                        className="font-medium hover:underline"
                      >
                        {contract.filename}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {contract.contractType}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(contract.uploadedAt).toLocaleDateString("ru-RU")}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={status.color}>
                        {status.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
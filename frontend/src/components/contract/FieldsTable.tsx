import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ConfidenceBadge } from "./ConfidenceBadge"
import type { ExtractedField } from "@/types/contract"

interface Props {
  fields: ExtractedField[]
  onFieldClick: (field: ExtractedField) => void
}

export function FieldsTable({ fields, onFieldClick }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Поле</TableHead>
          <TableHead>Значение</TableHead>
          <TableHead>Уверенность</TableHead>
          <TableHead>Статус</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field) => (
          <TableRow
            key={field.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onFieldClick(field)}
          >
            <TableCell className="font-medium">{field.label}</TableCell>
            <TableCell>{field.value ?? "—"}</TableCell>
            <TableCell>
              <ConfidenceBadge value={field.confidence} />
            </TableCell>
            <TableCell>
              {field.needsReview && (
                <Badge variant="outline" className="text-amber-600 border-amber-300">
                  Требует проверки
                </Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
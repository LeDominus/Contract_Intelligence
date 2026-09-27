import { Badge } from "@/components/ui/badge"

export function ConfidenceBadge({ value }: { value: number }) {
  const color =
    value >= 0.85
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : value >= 0.6
        ? "bg-amber-100 text-amber-800 border-amber-200"
        : "bg-red-100 text-red-800 border-red-200"

  return (
    <Badge variant="outline" className={color}>
      {Math.round(value * 100)}%
    </Badge>
  )
}
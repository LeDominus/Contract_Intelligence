import { createFileRoute } from "@tanstack/react-router"
import { ContractDetail } from "@/pages/ContractDetail"

export const Route = createFileRoute("/contracts/$contractId")({
  component: ContractDetail,
})
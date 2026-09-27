import { createFileRoute } from "@tanstack/react-router"
import { ContractsList } from "@/pages/ContractsList"

export const Route = createFileRoute("/contracts")({
  component: ContractsList,
})
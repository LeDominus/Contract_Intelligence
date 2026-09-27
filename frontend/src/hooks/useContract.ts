import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Contract } from "@/types/contract"

export function useContract(contractId: string) {
  return useQuery({
    queryKey: ["contracts", contractId],
    queryFn: async () => {
      const { data } = await api.get<Contract>(`/contracts/${contractId}`)
      return data
    },
    enabled: Boolean(contractId),
  })
}

export function useContracts() {
  return useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const { data } = await api.get<Contract[]>("/contracts")
      return data
    },
  })
}
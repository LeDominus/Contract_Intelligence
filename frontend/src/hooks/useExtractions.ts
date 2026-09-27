import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { ExtractionResult } from "@/types/contract"

export function useExtractions(contractId: string) {
  return useQuery({
    queryKey: ["extractions", contractId],
    queryFn: async () => {
      const { data } = await api.get<ExtractionResult>(
        `/contracts/${contractId}/extractions`,
      )
      return data
    },
    enabled: Boolean(contractId),
    staleTime: 60_000,
  })
}
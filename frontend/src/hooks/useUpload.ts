import { useCallback, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Contract } from "@/types/contract"

type UploadStatus = "idle" | "uploading" | "success" | "error"

interface UseUploadResult {
  upload: (file: File) => Promise<void>
  progress: number
  status: UploadStatus
  error: string | null
  reset: () => void
}

export function useUpload(): UseUploadResult {
  const queryClient = useQueryClient()
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append("file", file)

      const { data } = await api.post<Contract>("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          if (event.total) {
            setProgress(Math.round((event.loaded / event.total) * 100))
          }
        },
      })
      return data
    },
    onMutate: () => {
      setStatus("uploading")
      setProgress(0)
      setError(null)
    },
    onSuccess: () => {
      setStatus("success")
      setProgress(100)
      queryClient.invalidateQueries({ queryKey: ["contracts"] })
    },
    onError: (err) => {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Ошибка загрузки")
    },
  })

  const upload = useCallback(
    async (file: File) => {
      await mutation.mutateAsync(file)
    },
    [mutation],
  )

  const reset = useCallback(() => {
    setStatus("idle")
    setProgress(0)
    setError(null)
    mutation.reset()
  }, [mutation])

  return { upload, progress, status, error, reset }
}
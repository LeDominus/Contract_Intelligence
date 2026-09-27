import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useNavigate } from "@tanstack/react-router"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Upload, CheckCircle2, XCircle } from "lucide-react"
import { useUpload } from "@/hooks/useUpload"

export function UploadPanel() {
  const navigate = useNavigate()
  const { upload, progress, status, error, reset } = useUpload()

  const onDrop = useCallback(
    async (files: File[]) => {
      if (!files[0]) return
      await upload(files[0])
    },
    [upload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
    disabled: status === "uploading",
  })

  if (status === "success") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center p-12 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4" />
          <p className="text-lg font-medium">Договор загружен</p>
          <p className="text-sm text-muted-foreground mt-1">
            Извлечение полей запущено
          </p>
          <div className="flex gap-2 mt-6">
            <Button onClick={() => navigate({ to: "/contracts" })}>
              К списку договоров
            </Button>
            <Button variant="outline" onClick={reset}>
              Загрузить ещё
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent
        {...getRootProps()}
        className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-border"
        } ${status === "uploading" ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        <Upload className="h-10 w-10 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">
          {isDragActive ? "Отпустите файл" : "Перетащите договор сюда"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          или нажмите для выбора файла
        </p>
        {status === "uploading" && (
          <Progress value={progress} className="mt-4 w-full max-w-xs" />
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 mt-4 text-red-600">
            <XCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
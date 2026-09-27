import { UploadPanel } from "@/components/upload/UploadPanel"

export function UploadPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Загрузить договор</h2>
        <p className="text-sm text-muted-foreground">
          PDF или DOCX, до 50 МБ. Извлечение занимает 10–30 секунд.
        </p>
      </div>
      <UploadPanel />
    </div>
  )
}
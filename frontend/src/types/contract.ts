export interface ExtractedField {
  id: string
  label: string
  value: string | number | boolean | null
  confidence: number
  sourceQuote?: string
  sourcePage?: number
  bbox?: [number, number, number, number]
  needsReview: boolean
}

export interface Contract {
  id: string
  filename: string
  uploadedAt: string
  status: "pending" | "processing" | "extracted" | "failed"
  contractType: string
  pdfUrl?: string
}

export interface ExtractionResult {
  contractId: string
  fields: ExtractedField[]
  metrics: {
    totalFields: number
    highConfidence: number
    needsReview: number
    averageConfidence: number
  }
}
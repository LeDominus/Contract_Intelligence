import type { Contract, ExtractedField, ExtractionResult } from "@/types/contract"

export const mockContracts: Contract[] = [
  {
    id: "c_001",
    filename: "Договор_оказания_услуг_123.pdf",
    uploadedAt: "2026-09-25T10:15:00Z",
    status: "extracted",
    contractType: "services",
  },
  {
    id: "c_002",
    filename: "Договор_аренды_помещения.docx",
    uploadedAt: "2026-09-24T14:30:00Z",
    status: "extracted",
    contractType: "lease",
  },
  {
    id: "c_003",
    filename: "NDA_партнёрство.pdf",
    uploadedAt: "2026-09-23T09:00:00Z",
    status: "processing",
    contractType: "nda",
  },
  {
    id: "c_004",
    filename: "Договор_поставки_2026.pdf",
    uploadedAt: "2026-09-22T16:45:00Z",
    status: "failed",
    contractType: "supply",
  },
]

export const mockExtractions: Record<string, ExtractedField[]> = {
  c_001: [
    {
      id: "parties",
      label: "Стороны",
      value: "ООО «Альфа», ООО «Бета»",
      confidence: 0.95,
      sourceQuote: "ООО «Альфа», именуемое в дальнейшем Заказчик, и ООО «Бета», именуемое Исполнитель",
      sourcePage: 1,
      needsReview: false,
    },
    {
      id: "amount",
      label: "Сумма договора",
      value: "1 500 000 ₽",
      confidence: 0.92,
      sourceQuote: "Общая стоимость услуг составляет 1 500 000 (один миллион пятьсот тысяч) рублей",
      sourcePage: 2,
      needsReview: false,
    },
    {
      id: "start_date",
      label: "Дата начала",
      value: "01.10.2026",
      confidence: 0.98,
      sourceQuote: "Срок начала оказания услуг — 01 октября 2026 года",
      sourcePage: 1,
      needsReview: false,
    },
    {
      id: "end_date",
      label: "Дата окончания",
      value: "30.09.2027",
      confidence: 0.97,
      sourceQuote: "Срок окончания — 30 сентября 2027 года",
      sourcePage: 1,
      needsReview: false,
    },
    {
      id: "auto_renewal",
      label: "Автопродление",
      value: "Да, на 12 месяцев",
      confidence: 0.68,
      sourceQuote: "Договор автоматически продлевается на 12 месяцев, если ни одна из сторон не заявит о расторжении",
      sourcePage: 3,
      needsReview: true,
    },
    {
      id: "penalties",
      label: "Штрафы",
      value: "0.1% за каждый день просрочки",
      confidence: 0.89,
      sourceQuote: "За нарушение сроков оплаты начисляется пеня в размере 0.1% от суммы задолженности за каждый день",
      sourcePage: 2,
      needsReview: false,
    },
  ],
}

export function buildMockExtraction(contractId: string): ExtractionResult {
  const fields = mockExtractions[contractId] ?? []
  return {
    contractId,
    fields,
    metrics: {
      totalFields: fields.length,
      highConfidence: fields.filter((f) => f.confidence >= 0.85).length,
      needsReview: fields.filter((f) => f.needsReview).length,
      averageConfidence:
        fields.length > 0
          ? fields.reduce((sum, f) => sum + f.confidence, 0) / fields.length
          : 0,
    },
  }
}

export const mockStats = {
  totalContracts: 142,
  needsReview: 12,
  averageAccuracy: 0.87,
  hallucinationRate: 0.032,
}
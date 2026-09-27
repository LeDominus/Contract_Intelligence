from datetime import datetime
from src.schemas.extraction_schema import Contract, ExtractedField, ExtractionMetrics, ExtractionResult


def _iso(dt_str: str) -> datetime:
    return datetime.fromisoformat(dt_str.replace("Z", "+00:00"))


MOCK_CONTRACTS: list[Contract] = [
    Contract(
        id="c_001",
        filename="Договор_оказания_услуг_123.pdf",
        uploadedAt=_iso("2026-09-25T10:15:00Z"),
        status="extracted",
        contractType="services",
    ),
    Contract(
        id="c_002",
        filename="Договор_аренды_помещения.docx",
        uploadedAt=_iso("2026-09-24T14:30:00Z"),
        status="extracted",
        contractType="lease",
    ),
    Contract(
        id="c_003",
        filename="NDA_партнёрство.pdf",
        uploadedAt=_iso("2026-09-23T09:00:00Z"),
        status="processing",
        contractType="nda",
    ),
    Contract(
        id="c_004",
        filename="Договор_поставки_2026.pdf",
        uploadedAt=_iso("2026-09-22T16:45:00Z"),
        status="failed",
        contractType="supply",
    ),
]


MOCK_EXTRACTIONS: dict[str, list[ExtractedField]] = {
    "c_001": [
        ExtractedField(
            id="parties",
            label="Стороны",
            value="ООО «Альфа», ООО «Бета»",
            confidence=0.95,
            sourceQuote="ООО «Альфа», именуемое в дальнейшем Заказчик...",
            sourcePage=1,
            needsReview=False,
        ),
        ExtractedField(
            id="amount",
            label="Сумма договора",
            value="1 500 000 ₽",
            confidence=0.92,
            sourceQuote="Общая стоимость услуг составляет 1 500 000 рублей",
            sourcePage=2,
            needsReview=False,
        ),
        ExtractedField(
            id="auto_renewal",
            label="Автопродление",
            value="Да, на 12 месяцев",
            confidence=0.68,
            sourceQuote="Договор автоматически продлевается на 12 месяцев...",
            sourcePage=3,
            needsReview=True,
        ),
    ],
}


def build_mock_extraction(contract_id: str) -> ExtractionResult:
    fields = MOCK_EXTRACTIONS.get(contract_id, [])
    metrics = ExtractionMetrics(
        totalFields=len(fields),
        highConfidence=sum(1 for f in fields if f.confidence >= 0.85),
        needsReview=sum(1 for f in fields if f.needsReview),
        averageConfidence=(
            sum(f.confidence for f in fields) / len(fields) if fields else 0.0
        ),
    )
    return ExtractionResult(contractId=contract_id, fields=fields, metrics=metrics)
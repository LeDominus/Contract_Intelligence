from datetime import datetime
from typing import Literal
from pydantic import BaseModel


class ExtractedField(BaseModel):
    id: str
    label: str
    value: str | int | float | bool | None
    confidence: float
    sourceQuote: str | None = None
    sourcePage: int | None = None
    bbox: tuple[float, float, float, float] | None = None
    needsReview: bool


class ExtractionMetrics(BaseModel):
    totalFields: int
    highConfidence: int
    needsReview: int
    averageConfidence: float


class ExtractionResult(BaseModel):
    contractId: str
    fields: list[ExtractedField]
    metrics: ExtractionMetrics


class Contract(BaseModel):
    id: str
    filename: str
    uploadedAt: datetime
    status: Literal["pending", "processing", "extracted", "failed"]
    contractType: str
    pdfUrl: str | None = None


class UploadResponse(BaseModel):
    status: str
    contract: Contract
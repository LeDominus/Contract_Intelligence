import uvicorn
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from data.mocks import build_mock_extraction
from src.storage.contract_storage import storage
from src.schemas.extraction_schema import Contract, ExtractionResult, UploadResponse
from src.config.config import FRONTEND_URL

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def main():
    return {"status": "ok"}

@app.get("/{extract_id}", response_model=Contract)
def get_contract(contract_id: str) -> Contract:
    contract = storage.get(contract_id)
    if contract is None:
        raise HTTPException(status_code = 404, detail = "Contract not Found")
    return contract

@app.get("/{contract_id}/extractions", response_model=ExtractionResult)
def get_extractions(contract_id: str) -> ExtractionResult:
    contract = storage.get(contract_id)
    if contract is None:
        raise HTTPException(status_code=404, detail="Contract not found")  
    return build_mock_extraction(contract_id)

@app.post("/upload", response_model=UploadResponse)
async def upload_contract(file: UploadFile = File(...)) -> UploadResponse:
    contract = Contract(
        id=f"c_{int(datetime.now().timestamp())}",
        filename=file.filename or "unknown.pdf",
        uploadedAt=datetime.now(timezone.utc),
        status="processing",
        contractType="services"
    )
    storage.save(contract)
    return UploadResponse(status="accepted", contract=contract)


if __name__ == "__main__":
    uvicorn.run(app, port=4444)
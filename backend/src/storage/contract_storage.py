from data.mocks import MOCK_CONTRACTS
from src.schemas.extraction_schema import Contract


class ContractStorage:
    def __init__(self) -> None:
        self._contracts: dict[str, Contract] = {c.id: c for c in MOCK_CONTRACTS}

    def list_all(self) -> list[Contract]:
        return sorted(
            self._contracts.values(),
            key=lambda c: c.uploadedAt,
            reverse=True,
        )

    def get(self, contract_id: str) -> Contract | None:
        return self._contracts.get(contract_id)

    def save(self, contract: Contract) -> None:
        self._contracts[contract.id] = contract


storage = ContractStorage()
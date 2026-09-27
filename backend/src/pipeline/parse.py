
import fitz
from pathlib import Path
from docx import Document


def parse_pdf(path: Path) -> list[dict]:
    """Парсинг PDF документа"""
    if not path:
        raise ValueError("путь не может быть пустым")
    
    doc = fitz.open(path)
    paragraphs = []
    for page_num, page in enumerate(doc):
        blocks = page.get_text("blocks")
        for block in blocks:
            x0, y0, x1, y1, text, block_no, block_type = block
            if block_type == 0 and text.strip():
                paragraphs.append({
                    "page": page_num,
                    "text": text.strip(),
                    "bbox": [x0, y0, x1, y1]
                })
    return paragraphs

def parse_docx(path: Path) -> list[dict]:
    """Парсинг docx документа"""
    doc = Document(path)
    return {
        {"page": 0, "text": p.text.strip(), "bbox": None}
        for p in doc.paragraphs if p.text.strip()
    }

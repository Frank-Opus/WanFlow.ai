from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

JSON_BLOCK_RE = re.compile(r"```(?:json)?\s*(\{.*?\})\s*```", re.DOTALL)


def read_text_from_path(path: str | Path) -> str:
    file_path = Path(path)
    suffix = file_path.suffix.lower()
    if suffix in {".txt", ".md", ".tex", ".json"}:
        return file_path.read_text(encoding="utf-8")
    if suffix == ".pdf":
        try:
            import fitz
        except ModuleNotFoundError as exc:
            raise ModuleNotFoundError("PyMuPDF is required to read PDF source files.") from exc
        doc = fitz.open(file_path)
        return "\n".join(page.get_text("text") for page in doc)
    if suffix == ".docx":
        try:
            from docx import Document
        except ModuleNotFoundError as exc:
            raise ModuleNotFoundError("python-docx is required to read DOCX source files.") from exc
        doc = Document(str(file_path))
        paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
        return "\n".join(paragraphs)
    raise ValueError(f"Unsupported source format: {file_path}")


def dump_json(data: Any, path: str | Path) -> None:
    Path(path).write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def extract_json_object(text: str) -> dict[str, Any]:
    text = text.strip()
    if not text:
        raise ValueError("Empty response")

    fenced = JSON_BLOCK_RE.search(text)
    if fenced:
        text = fenced.group(1)

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}")
        if start == -1 or end == -1 or end <= start:
            raise
        return json.loads(text[start : end + 1])

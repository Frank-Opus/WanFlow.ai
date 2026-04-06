from __future__ import annotations

import re
import shutil
import subprocess
import tempfile
from pathlib import Path
from typing import Any

from .utils import read_text_from_path


def classify_source_kind(file_name: str) -> tuple[str, str]:
    suffix = Path(file_name).suffix.lower()
    if suffix == ".json":
        return "json", "json_structured"
    if suffix == ".pdf":
        return "pdf", "pdf_text"
    if suffix == ".docx":
        return "docx", "docx_text"
    if suffix == ".md":
        return "md", "doc_like_text"
    if suffix == ".tex":
        return "tex", "latex_source"
    return "txt", "doc_like_text"


def detect_language(text: str) -> str:
    has_cjk = bool(re.search(r"[\u4e00-\u9fff]", text))
    has_latin = bool(re.search(r"[A-Za-z]", text))
    if has_cjk and has_latin:
        return "mixed"
    if has_cjk:
        return "zh"
    if has_latin:
        return "en"
    return "unknown"


def latex_escape(text: str) -> str:
    replacements = {
        "\\": r"\textbackslash{}",
        "&": r"\&",
        "%": r"\%",
        "$": r"\$",
        "#": r"\#",
        "_": r"\_",
        "{": r"\{",
        "}": r"\}",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    text = text.replace("^", r"\textasciicircum{}")
    text = text.replace("~", r"\textasciitilde{}")
    return text


def _title_from_text(text: str, fallback: str) -> str:
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith("#"):
            return stripped.lstrip("#").strip() or fallback
        return stripped[:120]
    return fallback


def build_section_blocks(text: str) -> list[dict[str, Any]]:
    blocks: list[dict[str, Any]] = []
    normalized = text.replace("\r\n", "\n")
    chunks = [chunk.strip() for chunk in re.split(r"\n\s*\n", normalized) if chunk.strip()]
    for chunk in chunks:
        lines = [line.strip() for line in chunk.splitlines() if line.strip()]
        heading = None
        block_type = "other"
        if lines and lines[0].startswith("#"):
            heading = lines[0].lstrip("#").strip()
            body_lines = lines[1:]
            block_type = "section"
        else:
            body_lines = lines
            first_line = lines[0] if lines else ""
            if re.match(r"^(problem|题目|question)\b", first_line, re.IGNORECASE):
                heading = first_line
                body_lines = lines[1:] or lines
                block_type = "problem"
            elif re.match(r"^(answer|答案|solution)\b", first_line, re.IGNORECASE):
                heading = first_line
                body_lines = lines[1:] or lines
                block_type = "solution"
        body_text = "\n".join(body_lines).strip() or chunk
        if block_type == "other":
            if re.search(r"^(answer|答案)\s*[:：]", body_text, re.IGNORECASE | re.MULTILINE):
                block_type = "problem"
            elif re.search(r"(question|问题)\s*[:：]", body_text, re.IGNORECASE):
                block_type = "problem"
        blocks.append({
            "heading": heading,
            "bodyText": body_text,
            "blockType": block_type,
        })
    return blocks or [{"heading": None, "bodyText": text.strip(), "blockType": "other"}]


def build_basic_latex_document(text: str, title: str) -> str:
    paragraphs = [part.strip() for part in re.split(r"\n\s*\n", text.replace("\r\n", "\n")) if part.strip()]
    body: list[str] = []
    for paragraph in paragraphs:
        lines = [line.strip() for line in paragraph.splitlines() if line.strip()]
        if not lines:
            continue
        first_line = lines[0]
        if first_line.startswith("#"):
            heading = latex_escape(first_line.lstrip("#").strip())
            body.append(f"\\section*{{{heading}}}")
            if len(lines) > 1:
                body.append(latex_escape("\n".join(lines[1:])).replace("\n", "\n\n"))
            continue
        body.append(latex_escape("\n".join(lines)).replace("\n", "\n\n"))

    document_body = "\n\n".join(body) if body else latex_escape(text)
    return (
        "\\documentclass[11pt,a4paper]{article}\n"
        "\\usepackage[utf8]{inputenc}\n"
        "\\usepackage[T1]{fontenc}\n"
        "\\usepackage[margin=1in]{geometry}\n"
        "\\usepackage{amsmath,amssymb}\n"
        "\\usepackage{hyperref}\n"
        f"\\title{{{latex_escape(title)}}}\n"
        "\\date{}\n"
        "\\begin{document}\n"
        "\\maketitle\n\n"
        f"{document_body}\n\n"
        "\\end{document}\n"
    )


def extract_source_text_with_diagnostics(
    source_path: Path,
    original_file_name: str,
) -> tuple[str, str, str, list[str]]:
    source_kind, classifier = classify_source_kind(original_file_name)
    warnings: list[str] = []

    if source_kind == "pdf":
        plain_text = read_text_from_path(source_path).strip()
        if plain_text:
            return plain_text, classifier, "pymupdf_text", warnings

        ocr_text, ocr_method = try_pdf_ocr(source_path, warnings)
        if ocr_text:
            return ocr_text, "pdf_scan_ocr", ocr_method, warnings

        warnings.append("PDF contains little or no embedded text, and OCR fallback did not produce usable text.")
        return "", "pdf_scan_unreadable", "ocr_unavailable", warnings

    extraction_method = {
        "docx": "python_docx",
        "tex": "latex_source",
        "md": "python_text",
        "txt": "python_text",
        "json": "python_text",
    }.get(source_kind, "python_text")
    return read_text_from_path(source_path).strip(), classifier, extraction_method, warnings


def try_pdf_ocr(source_path: Path, warnings: list[str]) -> tuple[str, str]:
    rapidocr_text = try_rapidocr_pdf_text(source_path, warnings)
    if rapidocr_text:
        return rapidocr_text, "rapidocr_onnxruntime"

    tesseract_bin = shutil.which("tesseract")
    if not tesseract_bin:
        warnings.append("OCR fallback unavailable: tesseract is not installed on this host.")
        return "", "ocr_unavailable"

    try:
        import fitz
    except ModuleNotFoundError:
        warnings.append("OCR fallback unavailable: PyMuPDF is missing.")
        return "", "ocr_unavailable"

    try:
        with tempfile.TemporaryDirectory(prefix="wanflow-pdf-ocr-") as temp_dir:
            doc = fitz.open(source_path)
            texts: list[str] = []
            for page_index, page in enumerate(doc):
                image_path = Path(temp_dir) / f"page-{page_index + 1}.png"
                pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
                pixmap.save(str(image_path))
                result = subprocess.run(
                    [tesseract_bin, str(image_path), "stdout", "-l", "eng"],
                    capture_output=True,
                    text=True,
                    check=False,
                )
                if result.returncode != 0:
                    detail = result.stderr.strip() or f"exit code {result.returncode}"
                    warnings.append(f"OCR fallback failed on page {page_index + 1}: {detail}")
                    continue
                if result.stdout.strip():
                    texts.append(result.stdout.strip())
            return "\n\n".join(texts).strip(), "tesseract_ocr"
    except Exception as exc:  # pragma: no cover - defensive branch
        warnings.append(f"OCR fallback failed unexpectedly: {exc}")
        return "", "ocr_unavailable"


def try_rapidocr_pdf_text(source_path: Path, warnings: list[str]) -> str:
    try:
        import fitz
        from rapidocr_onnxruntime import RapidOCR
    except ModuleNotFoundError:
        return ""

    try:
        with tempfile.TemporaryDirectory(prefix="wanflow-pdf-rapidocr-") as temp_dir:
            doc = fitz.open(source_path)
            engine = RapidOCR()
            texts: list[str] = []
            for page_index, page in enumerate(doc):
                image_path = Path(temp_dir) / f"page-{page_index + 1}.png"
                pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
                pixmap.save(str(image_path))
                result, _ = engine(str(image_path))
                if not result:
                    continue
                page_lines = [str(item[1]).strip() for item in result if len(item) > 1 and str(item[1]).strip()]
                if page_lines:
                    texts.append("\n".join(page_lines))
            if texts:
                warnings.append("PDF embedded text was empty; OCR fallback used rapidocr-onnxruntime.")
            return "\n\n".join(texts).strip()
    except Exception as exc:  # pragma: no cover - defensive branch
        warnings.append(f"rapidocr fallback failed unexpectedly: {exc}")
        return ""


def normalize_source_file(
    source_path: str | Path,
    project_id: str,
    source_file_id: str,
    original_file_name: str,
) -> dict[str, Any]:
    source_path = Path(source_path)
    source_kind, _ = classify_source_kind(original_file_name)
    plain_text, classifier, extraction_method, warnings = extract_source_text_with_diagnostics(
        source_path,
        original_file_name,
    )
    title = _title_from_text(plain_text, original_file_name)
    language = detect_language(plain_text)
    section_blocks = build_section_blocks(plain_text)
    latex_source = source_path.read_text(encoding="utf-8") if source_kind == "tex" else build_basic_latex_document(plain_text, title)

    return {
        "schemaVersion": "v1",
        "sourceFileId": source_file_id,
        "projectId": project_id,
        "sourceKind": source_kind,
        "title": title,
        "language": language,
        "plainText": plain_text,
        "latexSource": latex_source,
        "sectionBlocks": section_blocks,
        "sourceFiles": [original_file_name],
        "diagnostics": {
            "classifier": classifier,
            "extractionMethod": extraction_method,
            "warnings": warnings,
        },
    }

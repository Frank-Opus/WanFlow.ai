from __future__ import annotations

import json
import os
import subprocess
from pathlib import Path

import pytest

from math_eval_framework.normalizer import normalize_source_file


def test_normalize_markdown_source_generates_plain_text_and_latex(tmp_path: Path):
    source_path = tmp_path / "notes.md"
    source_path.write_text("# Algebra\n\nProblem 1\nSolve x+1=2.\nAnswer: 1\n", encoding="utf-8")

    result = normalize_source_file(
        source_path=source_path,
        project_id="project-1",
        source_file_id="source-1",
        original_file_name="notes.md",
    )

    assert result["sourceKind"] == "md"
    assert "Solve x+1=2" in result["plainText"]
    assert result["latexSource"]
    assert any(block["blockType"] == "problem" for block in result["sectionBlocks"])


def test_cli_normalize_source_writes_json(tmp_path: Path):
    source_path = tmp_path / "notes.txt"
    output_path = tmp_path / "normalized.json"
    source_path.write_text("Problem 1\nQuestion: 2+2=?\nAnswer: 4\n", encoding="utf-8")

    result = subprocess.run(
        [
            "python3",
            "-m",
            "math_eval_framework.cli",
            "normalize-source",
            "--input",
            str(source_path),
            "--project-id",
            "project-1",
            "--source-file-id",
            "source-1",
            "--original-file-name",
            "notes.txt",
            "--output-json",
            str(output_path),
        ],
        capture_output=True,
        text=True,
        check=False,
        env={
            **os.environ,
            "PYTHONPATH": str(Path(__file__).resolve().parents[1] / "src"),
        },
    )

    assert result.returncode == 0, result.stderr
    payload = json.loads(output_path.read_text(encoding="utf-8"))
    assert payload["sourceFileId"] == "source-1"


def test_normalize_pdf_source_generates_text_and_problem_block(tmp_path: Path):
    fitz = pytest.importorskip("fitz")

    source_path = tmp_path / "sheet.pdf"
    doc = fitz.open()
    page = doc.new_page()
    page.insert_text(
        (72, 72),
        "Problem 1\nQuestion: Solve x^2-1=0 and return the positive root only.\nAnswer: 1",
    )
    doc.save(source_path)
    doc.close()

    result = normalize_source_file(
        source_path=source_path,
        project_id="project-1",
        source_file_id="source-pdf-1",
        original_file_name="sheet.pdf",
    )

    assert result["sourceKind"] == "pdf"
    assert "Solve x^2-1=0" in result["plainText"]
    assert result["latexSource"]
    assert any(block["blockType"] == "problem" for block in result["sectionBlocks"])


def test_normalize_docx_source_generates_problem_block(tmp_path: Path):
    docx = pytest.importorskip("docx")

    source_path = tmp_path / "sheet.docx"
    document = docx.Document()
    document.add_paragraph("Problem 3")
    document.add_paragraph("Question: Compute 5+6.")
    document.add_paragraph("Answer: 11")
    document.save(source_path)

    result = normalize_source_file(
        source_path=source_path,
        project_id="project-1",
        source_file_id="source-docx-1",
        original_file_name="sheet.docx",
    )

    assert result["sourceKind"] == "docx"
    assert "Compute 5+6" in result["plainText"]
    assert any(block["blockType"] == "problem" for block in result["sectionBlocks"])


def test_normalize_image_only_pdf_reports_ocr_warning(tmp_path: Path):
    fitz = pytest.importorskip("fitz")
    pil = pytest.importorskip("PIL.Image")

    image_path = tmp_path / "scan.png"
    pdf_path = tmp_path / "scan.pdf"

    image = pil.new("RGB", (480, 180), color="white")
    image.save(image_path)

    doc = fitz.open()
    rect = fitz.Rect(0, 0, 480, 180)
    page = doc.new_page(width=rect.width, height=rect.height)
    page.insert_image(rect, filename=str(image_path))
    doc.save(pdf_path)
    doc.close()

    result = normalize_source_file(
        source_path=pdf_path,
        project_id="project-1",
        source_file_id="source-pdf-scan-1",
        original_file_name="scan.pdf",
    )

    assert result["sourceKind"] == "pdf"
    assert result["diagnostics"]["warnings"]
    assert any("OCR" in warning or "ocr" in warning for warning in result["diagnostics"]["warnings"])


def test_normalize_image_only_pdf_uses_rapidocr_when_available(tmp_path: Path):
    fitz = pytest.importorskip("fitz")
    pil_image = pytest.importorskip("PIL.Image")
    pil_draw = pytest.importorskip("PIL.ImageDraw")
    pytest.importorskip("rapidocr_onnxruntime")

    image_path = tmp_path / "ocr-source.png"
    pdf_path = tmp_path / "ocr-source.pdf"

    image = pil_image.new("RGB", (1000, 300), color="white")
    draw = pil_draw.Draw(image)
    draw.text((40, 40), "Problem 6", fill="black")
    draw.text((40, 120), "Question: Compute 9+3.", fill="black")
    draw.text((40, 200), "Answer: 12", fill="black")
    image.save(image_path)

    doc = fitz.open()
    page = doc.new_page(width=1000, height=300)
    page.insert_image(fitz.Rect(0, 0, 1000, 300), filename=str(image_path))
    doc.save(pdf_path)
    doc.close()

    result = normalize_source_file(
        source_path=pdf_path,
        project_id="project-1",
        source_file_id="source-pdf-ocr-1",
        original_file_name="ocr-source.pdf",
    )

    assert result["sourceKind"] == "pdf"
    assert result["diagnostics"]["extractionMethod"] == "rapidocr_onnxruntime"
    assert "Question: Compute 9+3." in result["plainText"]
    assert any(block["blockType"] == "problem" for block in result["sectionBlocks"])

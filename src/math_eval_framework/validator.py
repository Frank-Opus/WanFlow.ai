from __future__ import annotations

import re

from .models import MathItem


MULTI_QUESTION_RE = re.compile(r"(?:\(\w\)|（\w）|\b[1-9][\.\)]|\bpart\b)", re.IGNORECASE)


def validate_item(item: MathItem) -> list[dict[str, str]]:
    results: list[dict[str, str]] = []

    if len(item.final_answer) > 50:
        results.append(
            {
                "rule": "final_answer_length",
                "status": "FAIL",
                "detail": "最终答案长度超过 50 个字符。",
            }
        )
    else:
        results.append(
            {
                "rule": "final_answer_length",
                "status": "PASS",
                "detail": "最终答案长度满足约束。",
            }
        )

    banned_text = "如图" in item.question or "见下图" in item.question
    results.append(
        {
            "rule": "no_image_reference",
            "status": "FAIL" if banned_text else "PASS",
            "detail": "题面未包含图片引用。" if not banned_text else "题面包含图片引用。",
        }
    )

    multiple = bool(MULTI_QUESTION_RE.search(item.question))
    results.append(
        {
            "rule": "single_question",
            "status": "NEEDS_REVIEW" if multiple else "PASS",
            "detail": "启发式检查到可能存在多问结构。" if multiple else "未发现明显多问结构。",
        }
    )

    results.append(
        {
            "rule": "solution_steps_array",
            "status": "PASS" if item.solution_steps else "FAIL",
            "detail": "解题过程为分步数组。" if item.solution_steps else "解题过程为空。",
        }
    )

    return results

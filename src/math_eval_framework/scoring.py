from __future__ import annotations

import re


LATEX_WRAPPER_PATTERNS = [
    (re.compile(r"^\$(.*)\$$", re.DOTALL), 1),
    (re.compile(r"^\\\[(.*)\\\]$", re.DOTALL), 1),
    (re.compile(r"^\\boxed\{(.*)\}$", re.DOTALL), 1),
]


def _unwrap_latex(text: str) -> str:
    changed = True
    value = text.strip()
    while changed:
        changed = False
        for pattern, group in LATEX_WRAPPER_PATTERNS:
            match = pattern.match(value)
            if match:
                value = match.group(group).strip()
                changed = True
    return value


def normalize_answer(text: str) -> str:
    value = _unwrap_latex(text)
    value = value.replace("\\left", "").replace("\\right", "")
    value = value.replace("\\displaystyle", "")
    value = value.replace("\n", "")
    value = value.replace("\r", "")
    value = value.replace(" ", "")
    value = value.replace("{", "").replace("}", "")
    value = re.sub(r"^最终答案[:：]?", "", value)
    value = re.sub(r"^答案[:：]?", "", value)
    return value.strip()


def answers_match(expected: str, predicted: str) -> bool:
    expected_norm = normalize_answer(expected)
    predicted_norm = normalize_answer(predicted)

    if not expected_norm or not predicted_norm:
        return False
    if expected_norm == predicted_norm:
        return True

    if "=" in predicted_norm:
        rhs = predicted_norm.split("=")[-1]
        if rhs == expected_norm:
            return True

    return expected_norm in predicted_norm

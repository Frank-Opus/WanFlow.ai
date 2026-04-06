import pytest

from math_eval_framework.utils import extract_json_object


def test_extract_json_object_from_fenced_block() -> None:
    text = '```json\n{"最终答案":"$3$"}\n```'
    assert extract_json_object(text) == {"最终答案": "$3$"}


def test_extract_json_object_raises_on_non_json() -> None:
    with pytest.raises(ValueError):
        extract_json_object("")

from __future__ import annotations

import json
import time
from typing import Any

import requests

from .utils import extract_json_object


SYSTEM_PROMPT = """
You are evaluating one math problem. Solve it carefully and return exactly one JSON object.
Do not use markdown fences.
Required keys:
- 最终答案: string
The final answer must be a LaTeX formula or number only, with no label text.
""".strip()


class QwenClient:
    def __init__(self, base_url: str, api_key: str, model_name: str) -> None:
        self.base_url = base_url.rstrip("/")
        self.api_key = api_key
        self.model_name = model_name
        self.session = requests.Session()
        self.session.trust_env = False

    def run_once(
        self,
        payload: dict[str, Any],
        temperature: float = 0.7,
        max_tokens: int = 4000,
    ) -> tuple[str, dict[str, Any], float]:
        request_payload = {
            "model": self.model_name,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": json.dumps(payload, ensure_ascii=False, indent=2),
                },
            ],
        }
        start = time.perf_counter()
        response = self.session.post(
            f"{self.base_url}/chat/completions",
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            },
            json=request_payload,
            timeout=180,
        )
        latency = time.perf_counter() - start
        response.raise_for_status()
        body = response.json()
        content = body["choices"][0]["message"]["content"]
        parsed = extract_json_object(content)
        return content, parsed, latency

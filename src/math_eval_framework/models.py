from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class MathItem(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    sequence: int = Field(alias="序号")
    question: str = Field(alias="问题")
    grade_level: str = Field(alias="适合年级")
    domain_type: str = Field(alias="领域类型")
    key_points: list[str] = Field(alias="考察知识点")
    pitfalls: list[str] = Field(alias="易错点")
    reasoning: str = Field(alias="思考过程/分析")
    solution_steps: list[str] = Field(alias="解题过程")
    final_answer: str = Field(alias="最终答案")
    source_files: list[str] = Field(default_factory=list, alias="源文件")
    validation_notes: list[str] = Field(default_factory=list, alias="校验备注")

    def prompt_payload(self) -> dict[str, Any]:
        return {
            "问题": self.question,
            "任务": "Solve the problem and return JSON with one key: 最终答案",
            "输出格式": {"最终答案": "LaTeX formula or number only, no extra words"},
        }


class EvaluationRun(BaseModel):
    run_index: int
    query: str
    raw_response: str
    parsed_response: dict[str, Any]
    predicted_answer: str
    is_correct: bool
    error: str | None = None
    latency_seconds: float | None = None


class EvaluationSummary(BaseModel):
    item_sequence: int
    model_name: str
    run_count: int
    correct_count: int
    accuracy: float
    generated_at: datetime


class EvaluationArtifact(BaseModel):
    item: MathItem
    summary: EvaluationSummary
    runs: list[EvaluationRun]
    request_config: dict[str, Any]
    validation_results: list[dict[str, Any]]

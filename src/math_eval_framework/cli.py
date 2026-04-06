from __future__ import annotations

import argparse
import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from pathlib import Path

from .exporter import export_evaluation_artifact
from .models import EvaluationArtifact, EvaluationRun, EvaluationSummary, MathItem
from .normalizer import normalize_source_file
from .qwen_client import QwenClient
from .scoring import answers_match
from .utils import dump_json
from .validator import validate_item


def _load_item(path: str | Path) -> MathItem:
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    return MathItem.model_validate(data)


def _run_evaluation(args: argparse.Namespace) -> None:
    item = _load_item(args.item_json)
    validation_results = validate_item(item)
    client = QwenClient(
        base_url=args.base_url,
        api_key=args.api_key,
        model_name=args.model_name,
    )
    payload = item.prompt_payload()
    query = json.dumps(payload, ensure_ascii=False, indent=2)

    runs: list[EvaluationRun] = []
    with ThreadPoolExecutor(max_workers=args.parallelism) as executor:
        futures = {
            executor.submit(
                client.run_once,
                payload,
                args.temperature,
                args.max_tokens,
            ): index
            for index in range(1, args.runs + 1)
        }
        for future in as_completed(futures):
            run_index = futures[future]
            try:
                raw_response, parsed, latency = future.result()
                predicted_answer = str(parsed.get("最终答案", ""))
                is_correct = answers_match(item.final_answer, predicted_answer)
                runs.append(
                    EvaluationRun(
                        run_index=run_index,
                        query=query,
                        raw_response=raw_response,
                        parsed_response=parsed,
                        predicted_answer=predicted_answer,
                        is_correct=is_correct,
                        latency_seconds=latency,
                    )
                )
            except Exception as exc:
                runs.append(
                    EvaluationRun(
                        run_index=run_index,
                        query=query,
                        raw_response="",
                        parsed_response={},
                        predicted_answer="",
                        is_correct=False,
                        error=str(exc),
                    )
                )

    runs.sort(key=lambda run: run.run_index)
    correct_count = sum(run.is_correct for run in runs)
    summary = EvaluationSummary(
        item_sequence=item.sequence,
        model_name=args.model_name,
        run_count=args.runs,
        correct_count=correct_count,
        accuracy=correct_count / args.runs if args.runs else 0.0,
        generated_at=datetime.now(),
    )
    artifact = EvaluationArtifact(
        item=item,
        summary=summary,
        runs=runs,
        request_config={
            "base_url": args.base_url,
            "model_name": args.model_name,
            "runs": args.runs,
            "parallelism": args.parallelism,
            "temperature": args.temperature,
            "max_tokens": args.max_tokens,
        },
        validation_results=validation_results,
    )
    export_evaluation_artifact(artifact, args.output_xlsx)
    if args.output_json:
        dump_json(artifact.model_dump(mode="json", by_alias=True), args.output_json)


def _run_source_normalization(args: argparse.Namespace) -> None:
    normalized = normalize_source_file(
        source_path=args.input,
        project_id=args.project_id,
        source_file_id=args.source_file_id,
        original_file_name=args.original_file_name,
    )
    dump_json(normalized, args.output_json)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Math evaluation framework CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    evaluate = subparsers.add_parser("evaluate", help="Run multi-sample evaluation")
    evaluate.add_argument("--item-json", required=True)
    evaluate.add_argument("--base-url", required=True)
    evaluate.add_argument("--api-key", required=True)
    evaluate.add_argument("--model-name", default="qwen3-235b-a22b-thinking-2507")
    evaluate.add_argument("--runs", type=int, default=8)
    evaluate.add_argument("--parallelism", type=int, default=8)
    evaluate.add_argument("--temperature", type=float, default=0.7)
    evaluate.add_argument("--max-tokens", type=int, default=4000)
    evaluate.add_argument("--output-xlsx", required=True)
    evaluate.add_argument("--output-json")
    evaluate.set_defaults(func=_run_evaluation)

    normalize_source = subparsers.add_parser("normalize-source", help="Normalize a source document into a shared JSON structure")
    normalize_source.add_argument("--input", required=True)
    normalize_source.add_argument("--project-id", required=True)
    normalize_source.add_argument("--source-file-id", required=True)
    normalize_source.add_argument("--original-file-name", required=True)
    normalize_source.add_argument("--output-json", required=True)
    normalize_source.set_defaults(func=_run_source_normalization)
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()

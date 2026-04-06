from math_eval_framework.scoring import answers_match, normalize_answer


def test_normalize_answer_strips_wrappers() -> None:
    assert normalize_answer(r"$\boxed{\frac{a+b}{c}}$") == r"\fraca+b c".replace(" ", "")


def test_answers_match_with_rhs_only() -> None:
    expected = r"\frac{\phi(r)[\phi^2(r)-1]}{r^2}"
    predicted = r"\phi''(r)=\frac{\phi(r)[\phi^2(r)-1]}{r^2}"
    assert answers_match(expected, predicted)


def test_answers_mismatch() -> None:
    assert not answers_match(r"$3$", r"$4$")

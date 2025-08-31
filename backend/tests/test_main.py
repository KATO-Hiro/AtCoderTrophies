import pytest
from fastapi import HTTPException, status
from fastapi.testclient import TestClient

from api import crud
from api.crud import (
    read_accepted_count_by_language_using_user_name,
    read_accepted_count_by_user_name,
    read_longest_streak_by_user_name,
    read_rated_point_sum_by_user_name,
)
from api.schemas import AcceptedCount, LongestStreak, RatedPointSum


@pytest.mark.skip(reason="A simple function and broken dependencies of anyio")
def test_root(client: TestClient) -> None:
    response = client.get("/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"message": "Hello, AtCoder Trophies!"}


@pytest.fixture()
def user_name() -> str:
    return "chokudai"


@pytest.mark.vcr()
def test_read_accepted_count_by_user_name(vcr_config: dict, user_name: str) -> None:
    accepted_count: AcceptedCount | None = read_accepted_count_by_user_name(user_name)
    assert accepted_count

    _contain_keys(accepted_count)


@pytest.mark.vcr()
def test_read_accepted_count_by_language_using_user_name(vcr_config: dict, user_name) -> None:
    accepted_count_list = read_accepted_count_by_language_using_user_name(user_name)
    assert accepted_count_list

    keys = ["language", "count", "rank"]

    for key in keys:
        assert key in dict(accepted_count_list[0]).keys()
        assert key in dict(accepted_count_list[-1]).keys()


@pytest.mark.vcr()
def test_read_rated_point_sum_by_user_name(vcr_config: dict, user_name) -> None:
    rated_point_sum: RatedPointSum | None = read_rated_point_sum_by_user_name(user_name)
    assert rated_point_sum

    _contain_keys(rated_point_sum)


@pytest.mark.vcr()
def test_read_longest_streak_by_user_name(vcr_config: dict, user_name) -> None:
    longest_streak: LongestStreak | None = read_longest_streak_by_user_name(user_name)
    assert longest_streak

    _contain_keys(longest_streak)


def _contain_keys(json_object, keys=None) -> None:
    if keys is None:
        keys = ["count", "rank"]

    for key in keys:
        assert key in dict(json_object).keys()


def test_failed_to_read_accepted_count_by_user_name(monkeypatch) -> None:
    _catch_http_error(
        monkeypatch,
        func_with_module_name=crud.read_accepted_count_by_user_name,
        method_name="read_accepted_count_by_user_name",
    )


@pytest.mark.xfail()
def test_failed_to_read_accepted_count_by_language_using_user_name(monkeypatch) -> None:
    _catch_http_error(
        monkeypatch,
        func_with_module_name=crud.read_accepted_count_by_language_using_user_name,
        method_name="read_accepted_count_by_language_using_user_name",
    )


def test_failed_to_read_rated_point_sum_by_user_name(monkeypatch) -> None:
    _catch_http_error(
        monkeypatch,
        func_with_module_name=crud.read_rated_point_sum_by_user_name,
        method_name="read_rated_point_sum_by_user_name",
    )


def test_failed_to_read_longest_streak_by_user_name(monkeypatch) -> None:
    _catch_http_error(
        monkeypatch,
        func_with_module_name=crud.read_longest_streak_by_user_name,
        method_name="read_longest_streak_by_user_name",
    )


def _catch_http_error(monkeypatch, func_with_module_name, method_name: str):
    monkeypatch.setattr(
        crud,
        method_name,
        lambda user_name: (_ for _ in (user_name)).throw(HTTPException(status.HTTP_404_NOT_FOUND)),
    )

    # See:
    # https://doc.pytest.org/en/latest/how-to/assert.html#assertions-about-expected-exceptions
    with pytest.raises(HTTPException) as excinfo:
        func_with_module_name("dummy_user_name")
        assert "not found" in str(excinfo.value)  # Might not detecting an error?

from collections.abc import Generator
from typing import Any
from unittest.mock import MagicMock, patch

import pytest
from fastapi import status
from fastapi.testclient import TestClient

from api.crud import (
    read_accepted_count_by_language_using_user_name,
    read_accepted_count_by_user_name,
    read_longest_streak_by_user_name,
    read_rated_point_sum_by_user_name,
)


def test_root(client: TestClient) -> None:
    response = client.get("/")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"message": "Hello, AtCoder Trophies!"}


@pytest.fixture()
def user_name() -> str:
    return "chokudai"


@pytest.fixture
def mock_failed_api_response() -> Generator[MagicMock, None, None]:
    """Fixture for simulating API failure"""
    with patch("api.crud._get_response", return_value=None) as mock:
        yield mock


@pytest.fixture
def mock_failed_fetch_api() -> Generator[MagicMock, None, None]:
    """Fixture for simulating fetch_api failure"""
    with patch("api.crud.fetch_api", return_value=None) as mock:
        yield mock


class TestAcceptedCount:
    @pytest.mark.vcr()
    def test_contain_keys(self, vcr_config: dict, user_name: str) -> None:
        accepted_count: dict[str, Any] | None = read_accepted_count_by_user_name(user_name)
        assert accepted_count

        _contain_keys(accepted_count)

    def test_not_available(self, user_name: str, mock_failed_api_response: MagicMock) -> None:
        accepted_count: dict[str, Any] | None = read_accepted_count_by_user_name(user_name)
        assert accepted_count is None

        mock_failed_api_response.assert_called_once()


class TestAcceptedCountByLanguage:
    @pytest.mark.vcr()
    def test_contain_keys(self, vcr_config: dict, user_name: str) -> None:
        accepted_count_list = read_accepted_count_by_language_using_user_name(user_name)
        assert accepted_count_list

        keys = ["language", "count", "rank"]

        for key in keys:
            assert key in dict(accepted_count_list[0]).keys()
            assert key in dict(accepted_count_list[-1]).keys()

    def test_not_available(self, user_name: str, mock_failed_fetch_api: MagicMock) -> None:
        accepted_count_list = read_accepted_count_by_language_using_user_name(user_name)
        assert accepted_count_list is None

        mock_failed_fetch_api.assert_called_once()


class TestRatedPointSum:
    @pytest.mark.vcr()
    def test_contain_keys(self, vcr_config: dict, user_name: str) -> None:
        rated_point_sum: dict[str, Any] | None = read_rated_point_sum_by_user_name(user_name)
        assert rated_point_sum

        _contain_keys(rated_point_sum)

    def test_not_available(self, user_name: str, mock_failed_api_response: MagicMock) -> None:
        rated_point_sum: dict[str, Any] | None = read_rated_point_sum_by_user_name(user_name)
        assert rated_point_sum is None

        mock_failed_api_response.assert_called_once()


class TestLongestStreak:
    @pytest.mark.vcr()
    def test_contain_keys(self, vcr_config: dict, user_name: str) -> None:
        longest_streak: dict[str, Any] | None = read_longest_streak_by_user_name(user_name)
        assert longest_streak

        _contain_keys(longest_streak)

    def test_not_available(self, user_name: str, mock_failed_api_response: MagicMock) -> None:
        longest_streak: dict[str, Any] | None = read_longest_streak_by_user_name(user_name)
        assert longest_streak is None

        mock_failed_api_response.assert_called_once()


def _contain_keys(json_object: dict[str, Any], keys: list[str] | None = None) -> None:
    if keys is None:
        keys = ["count", "rank"]

    for key in keys:
        assert key in dict(json_object).keys()

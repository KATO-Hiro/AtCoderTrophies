from typing import Any

from api.constants import (
    get_accepted_count_api_url,
    get_accepted_count_for_each_language_api_url,
    get_longest_streak_api_url,
    get_rated_point_sum_api_url,
)
from api.services import fetch_api, to_json


def read_accepted_count_by_user_name(user_name: str) -> dict[str, Any] | None:
    url: str = get_accepted_count_api_url(user_name)
    return _get_response(url)


def read_accepted_count_by_language_using_user_name(user_name: str) -> list[dict[str, Any]] | None:
    url: str = get_accepted_count_for_each_language_api_url(user_name)
    response = fetch_api(url)

    if not response:
        return None

    # This endpoint returns a list, not a single dict
    result: list[dict[str, Any]] = response.json()
    return result


def read_rated_point_sum_by_user_name(user_name: str) -> dict[str, Any] | None:
    url: str = get_rated_point_sum_api_url(user_name)
    return _get_response(url)


def read_longest_streak_by_user_name(user_name: str) -> dict[str, Any] | None:
    url: str = get_longest_streak_api_url(user_name)
    return _get_response(url)


def _get_response(url: str) -> dict[str, Any] | None:
    response = fetch_api(url)

    if not response:
        return None

    return to_json(response)

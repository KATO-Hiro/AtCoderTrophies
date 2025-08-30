from typing import Optional

from fastapi import HTTPException, status

from app.constants import (
    get_accepted_count_api_url,
    get_accepted_count_for_each_language_api_url,
    get_longest_streak_api_url,
    get_rated_point_sum_api_url,
)
from app.schemas import (
    AcceptedCount,
    LongestStreak,
    RatedPointSum,
    StatisticsByLanguage,
)
from app.services import fetch_api, to_json


def read_accepted_count_by_user_name(user_name: str) -> Optional[AcceptedCount]:
    url: str = get_accepted_count_api_url(user_name)
    response = fetch_api(url)

    if not response:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=user_name + " was not found.")

    return to_json(response)


def read_accepted_count_by_language_using_user_name(
    user_name: str,
) -> list[StatisticsByLanguage]:
    url: str = get_accepted_count_for_each_language_api_url(user_name)
    response = fetch_api(url)

    if not response:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=user_name + " was not found.")

    # HACK: Use to_json.
    return response.json()


def read_rated_point_sum_by_user_name(user_name: str) -> Optional[RatedPointSum]:
    url: str = get_rated_point_sum_api_url(user_name)
    response = fetch_api(url)

    if not response:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=user_name + " was not found.")

    return to_json(response)


def read_longest_streak_by_user_name(user_name: str) -> Optional[LongestStreak]:
    url: str = get_longest_streak_api_url(user_name)
    response = fetch_api(url)

    if not response:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail=user_name + " was not found.")

    return to_json(response)

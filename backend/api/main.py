from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from api.constants import API_V1, PRODUCT_NAME, TWO_HOURS_IN_SECONDS
from api.crud import (
    read_accepted_count_by_language_using_user_name,
    read_accepted_count_by_user_name,
    read_longest_streak_by_user_name,
    read_rated_point_sum_by_user_name,
)
from api.schemas import (
    AcceptedCount,
    AcceptedCountByLanguage,
    AtCoderProblemsStatisticsAPI,
    LongestStreak,
    RatedPointSum,
    StatisticsByLanguage,
)

app = FastAPI(title=PRODUCT_NAME)

# See:
# https://fastapi.tiangolo.com/tutorial/cors/?h=cors#use-corsmiddleware
app.add_middleware(CORSMiddleware, allow_origins=["*"], max_age=TWO_HOURS_IN_SECONDS)


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "Hello, AtCoder Trophies!"}


@app.get(
    API_V1 + "/ac_count/{user_name}",
    tags=["statistics"],
    response_model=AcceptedCount,
    status_code=status.HTTP_200_OK,
    summary="Read unique ac count for user",
)
async def read_accepted_count(user_name: str) -> AcceptedCount:
    """
    Read unique accepted (ac) count for user.

    - **count**: the number of unique ac problems.
    - **rank**: rank based on accepted count (0-indexed).
    """

    try:
        results = read_accepted_count_by_user_name(user_name)

        if results is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Not found {user_name}.")

        return AcceptedCount(**results)
    except Exception as e:
        if isinstance(e, HTTPException):
            raise

        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error") from e


@app.get(
    API_V1 + "/ac_count_by_lang/{user_name}",
    tags=["statistics"],
    response_model=AcceptedCountByLanguage,
    status_code=status.HTTP_200_OK,
    summary="Read ac count of each language for user",
)
async def read_accepted_count_by_language(user_name: str) -> AcceptedCountByLanguage:
    """
    Read ac count of each language for user.

    - **languages**: list of accepted count and its rank for each language.

    - **language**: name of programming language.
    - **count**: the number of unique ac problems.
    - **rank**: rank based on accepted count (1-indexed).
    """

    try:
        results = read_accepted_count_by_language_using_user_name(user_name)

        if results is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Not found {user_name}.")

        accepted_count_by_language = AcceptedCountByLanguage()

        for result in results:
            # Convert dict to StatisticsByLanguage object for Pydantic v2
            stats = StatisticsByLanguage(**result)
            accepted_count_by_language.languages.append(stats)

        return accepted_count_by_language
    except Exception as e:
        if isinstance(e, HTTPException):
            raise

        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error") from e


@app.get(
    API_V1 + "/rated_point_sum/{user_name}",
    tags=["statistics"],
    response_model=RatedPointSum,
    status_code=status.HTTP_200_OK,
    summary="Read rated point sum for user",
)
async def read_rated_point_sum(user_name: str) -> RatedPointSum:
    """
    Read rated point sum (RPS) for user.

    - **count**: the total points for rated contests.
    - **rank**: rank based on RPS (0-indexed).
    """

    try:
        results = read_rated_point_sum_by_user_name(user_name)

        if results is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"{user_name} was not found.")

        return RatedPointSum(**results)
    except Exception as e:
        if isinstance(e, HTTPException):
            raise

        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error") from e


@app.get(
    API_V1 + "/longest_streak/{user_name}",
    tags=["statistics"],
    response_model=LongestStreak,
    status_code=status.HTTP_200_OK,
    summary="Read the longest streak for user",
)
async def read_longest_streak(user_name: str) -> LongestStreak:
    """
    Read the longest streak (JST) for user.

    - **count**: the longest streak (in day).
    - **rank**: rank based on the longest streak (0-indexed).
    """

    try:
        results = read_longest_streak_by_user_name(user_name)

        if results is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail=f"Not found {user_name}.")

        return LongestStreak(**results)
    except Exception as e:
        if isinstance(e, HTTPException):
            raise

        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error") from e


@app.get(
    API_V1 + "/problems_stat_api/{user_name}",
    tags=["statistics"],
    response_model=AtCoderProblemsStatisticsAPI,
    status_code=status.HTTP_200_OK,
    summary="Read AtCoder Problems Statistics API for user",
)
async def read_atcoder_problems_statistics_api(user_name: str) -> AtCoderProblemsStatisticsAPI:
    """
    Read AtCoder Problems Statistics API for user.

    - Unique accepted (AC) count
        - **count**: the number of unique ac problems.
        - **rank**: rank based on accepted count (0-indexed).

    - AC count of each language
        - **languages**: list of accepted count and its rank for each language.
        - **language**: name of programming language.
        - **count**: the number of unique ac problems.
        - **rank**: rank based on accepted count (**1-indexed**).

    - Rated point sum (RPS)
        - **count**: the total points for rated contests.
        - **rank**: rank based on RPS (0-indexed).

    - The longest streak (JST)
        - **count**: the longest streak (in day).
        - **rank**: rank based on the longest streak (0-indexed).
    """

    try:
        # Prepare accepted count language stats
        accepted_count_by_language = AcceptedCountByLanguage()
        results = read_accepted_count_by_language_using_user_name(user_name)

        if results is not None:
            for result in results:
                # Convert dict to StatisticsByLanguage object for Pydantic v2
                stats_for_language = StatisticsByLanguage(**result)
                accepted_count_by_language.languages.append(stats_for_language)

        # Fetch each stats, using defaults if None
        accepted_counts = read_accepted_count_by_user_name(user_name)
        rated_point_sums = read_rated_point_sum_by_user_name(user_name)
        longest_streaks = read_longest_streak_by_user_name(user_name)

        NOT_AVAILABLE = -999_999_999

        stat_api = AtCoderProblemsStatisticsAPI(
            accepted_count=AcceptedCount(**accepted_counts)
            if accepted_counts is not None
            else AcceptedCount(count=NOT_AVAILABLE, rank=NOT_AVAILABLE),
            accepted_count_by_language=accepted_count_by_language,
            rated_point_sum=RatedPointSum(**rated_point_sums)
            if rated_point_sums is not None
            else RatedPointSum(count=NOT_AVAILABLE, rank=NOT_AVAILABLE),
            longest_streak=LongestStreak(**longest_streaks)
            if longest_streaks is not None
            else LongestStreak(count=NOT_AVAILABLE, rank=NOT_AVAILABLE),
        )

        return stat_api
    except Exception as e:
        if isinstance(e, HTTPException):
            raise

        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error") from e


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("api.main:app", host="0.0.0.0", reload=True, port=8000)

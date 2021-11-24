from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.constants import API_V1, PRODUCT_NAME, TWO_HOURS_IN_SECONDS
from app.crud import (
    read_accepted_count_by_language_using_user_name,
    read_accepted_count_by_user_name,
    read_rated_point_sum_by_user_name,
    read_longest_streak_by_user_name,
)
from app.schemas import (
    AcceptedCount,
    AcceptedCountByLanguage,
    AtCoderProblemsStatisticsAPI,
    RatedPointSum,
    LongestStreak,
)


app = FastAPI(title=PRODUCT_NAME)

# See:
# https://fastapi.tiangolo.com/tutorial/cors/?h=cors#use-corsmiddleware
app.add_middleware(CORSMiddleware, allow_origins=["*"], max_age=TWO_HOURS_IN_SECONDS)


@app.get("/")
async def root():
    return {"message": "Hello, AtCoder Trophies!"}


@app.get(
    API_V1 + "/problems_stat_api/{user_name}",
    tags=["statistics"],
    # response_model=AtCoderProblemsStatisticsAPI, HACK: Enable to show schemas in OpenAPI.
    status_code=status.HTTP_200_OK,
    summary="Read AtCoder Problems Statistics API for user",
)
async def read_atcoder_problems_statistics_api(user_name: str):
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

    stat_api = AtCoderProblemsStatisticsAPI()

    accepted_count = read_accepted_count_by_user_name(user_name)
    stat_api.accepted_count = AcceptedCount(**accepted_count)

    accepted_count_by_language = AcceptedCountByLanguage()
    results = read_accepted_count_by_language_using_user_name(user_name)

    # HACK: The following code is expected to be written more simply.
    for result in results:
        accepted_count_by_language.languages.append(result)

    stat_api.accepted_count_by_language = accepted_count_by_language

    rated_point_sum = read_rated_point_sum_by_user_name(user_name)
    stat_api.rated_point_sum = RatedPointSum(**rated_point_sum)

    longest_streak = read_longest_streak_by_user_name(user_name)
    stat_api.longest_streak = LongestStreak(**longest_streak)

    return stat_api


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8000)

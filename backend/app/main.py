from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.constants import API_V1, PRODUCT_NAME
from app.crud import (
    read_accepted_count_by_language_using_user_name,
    read_accepted_count_by_user_name,
    read_rated_point_sum_by_user_name,
    read_longest_streak_by_user_name,
)
from app.schemas import (
    AcceptedCount,
    AcceptedCountByLanguage,
    RatedPointSum,
    LongestStreak,
)


app = FastAPI(title=PRODUCT_NAME)

# See:
# https://fastapi.tiangolo.com/tutorial/cors/?h=cors#use-corsmiddleware
app.add_middleware(CORSMiddleware, allow_origins=["*"])


@app.get("/")
async def root():
    return {"message": "Hello, AtCoder Trophies!"}


@app.get(
    API_V1 + "/ac_count/{user_name}",
    tags=["statistics"],
    response_model=AcceptedCount,
    status_code=status.HTTP_200_OK,
    summary="Read unique ac count for user",
)
async def read_accepted_count(user_name: str):
    """
    Read unique accepted (ac) count for user.

    - **count**: the number of unique ac problems.
    - **rank**: rank based on accepted count (0-indexed).
    """

    results = read_accepted_count_by_user_name(user_name)

    return AcceptedCount(**results)


@app.get(
    API_V1 + "/ac_count_by_lang/{user_name}",
    tags=["statistics"],
    response_model=AcceptedCountByLanguage,
    status_code=status.HTTP_200_OK,
    summary="Read ac count of each language for user",
)
async def read_accepted_count_by_language(user_name: str):
    """
    Read ac count of each language for user.

    - **languages**: list of accepted count and its rank for each language.

    - **language**: name of programming language.
    - **count**: the number of unique ac problems.
    - **rank**: rank based on accepted count (1-indexed).
    """

    results = read_accepted_count_by_language_using_user_name(user_name)

    # HACK: The following code is expected to be written more simply.
    accepted_count_by_language = AcceptedCountByLanguage()

    for result in results:
        accepted_count_by_language.languages.append(result)

    return accepted_count_by_language


@app.get(
    API_V1 + "/rated_point_sum/{user_name}",
    tags=["statistics"],
    response_model=RatedPointSum,
    status_code=status.HTTP_200_OK,
    summary="Read rated point sum for user",
)
async def read_rated_point_sum(user_name: str):
    """
    Read rated point sum (RPS) for user.

    - **count**: the total points for rated contests.
    - **rank**: rank based on RPS (0-indexed).
    """

    results = read_rated_point_sum_by_user_name(user_name)

    return RatedPointSum(**results)


@app.get(
    API_V1 + "/longest_streak/{user_name}",
    tags=["statistics"],
    response_model=LongestStreak,
    status_code=status.HTTP_200_OK,
    summary="Read the longest streak for user",
)
async def read_longest_streak(user_name: str):
    """
    Read the longest streak (JST) for user.

    - **count**: the longest streak (in day).
    - **rank**: rank based on the longest streak (0-indexed).
    """

    results = read_longest_streak_by_user_name(user_name)

    return LongestStreak(**results)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8000)

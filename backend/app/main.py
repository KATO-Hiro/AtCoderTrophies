from fastapi import FastAPI, status
import uvicorn

from app.crud import read_accepted_count_by_user_name
from app.schemas import AcceptedCount


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello, AtCoder Trophies!"}


@app.get(
    "/ac_count/{user_name}",
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


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8000)

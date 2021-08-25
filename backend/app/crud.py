from typing import Optional

from fastapi import HTTPException, status

from app.constants import get_accepted_count_api_url
from app.schemas import AcceptedCount
from app.services import fetch_api


def read_accepted_count_by_user_name(user_name: str) -> Optional[AcceptedCount]:
    url: str = get_accepted_count_api_url(user_name)
    results = fetch_api(url)

    if not results:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND, detail=user_name + " was not found."
        )

    return results

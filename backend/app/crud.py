from typing import Optional

from fastapi import HTTPException, status

import constants
import schemas
import services


def read_accepted_count_by_user_name(user_name: str) -> Optional[schemas.AcceptedCount]:
    url: str = constants.get_accepted_count_api_url(user_name)
    results = services.fetch_api(url)

    if not results:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND, detail=user_name + " was not found."
        )

    return results

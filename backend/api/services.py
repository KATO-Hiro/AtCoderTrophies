from json import JSONDecodeError
from typing import Any

from fastapi import status
from requests.exceptions import ConnectTimeout  # type: ignore
from requests.models import Response  # type: ignore


def fetch_api(url: str) -> Response | None:
    import requests  # type: ignore
    from requests.adapters import HTTPAdapter  # type: ignore
    from urllib3.util import Retry

    # See:
    # https://2.python-requests.org/en/master/user/advanced/
    # https://urllib3.readthedocs.io/en/latest/reference/urllib3.util.html
    try_count = 5
    base_sleep_time_second = 1
    retries = Retry(
        total=try_count,
        backoff_factor=base_sleep_time_second,
        status_forcelist=[
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            status.HTTP_502_BAD_GATEWAY,
            status.HTTP_503_SERVICE_UNAVAILABLE,
            status.HTTP_504_GATEWAY_TIMEOUT,
        ],
    )

    this_session = requests.Session()
    this_session.mount("https://", HTTPAdapter(max_retries=retries))

    headers, parameters = {"content-type": "Application/json"}, None
    connect_timeout_seconds, read_timeout_seconds = 10, 30

    try:
        response = this_session.get(
            url,
            headers=headers,
            params=parameters,
            stream=True,
            timeout=(connect_timeout_seconds, read_timeout_seconds),
        )
    except ConnectTimeout:
        # TODO: Output log.
        print(
            "The request timed out while trying to connect to the remote \
            server."
        )
        return None
    else:
        return response


def to_json(response: Response) -> dict[str, Any] | None:
    try:
        results: dict[str, Any] = response.json()
    except JSONDecodeError:
        # TODO: Output log.
        print("Failed to convert to json.")

        return None
    else:
        return results

import os
import typing

import pytest
from fastapi.testclient import TestClient

from api.main import app


@pytest.fixture
def client() -> typing.Generator:
    """
    Get a TestClient instance.
    """

    yield TestClient(app)


@pytest.fixture(scope="module")
def vcr_config() -> dict:
    """Overwrite headers and query parameters where key can be leaked.
    See:
    https://github.com/kiwicom/pytest-recording
    https://vcrpy.readthedocs.io/en/latest/usage.html#pytest-integration
    """

    if os.getenv("GITHUB_ACTIONS"):
        record_mode = "none"
    else:
        record_mode = "once"

    # Replace the Authorization request header with None in cassettes
    return {
        "record_mode": record_mode,
        "decode_compressed_response": False,
        "filter_headers": [
            ("authorization", None),
            ("Set-Cookie", None),
            ("User-Agent", None),
        ],
    }

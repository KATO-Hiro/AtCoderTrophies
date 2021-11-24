from fastapi.testclient import TestClient

import typing
import pytest

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
    https://pytest-vcr.readthedocs.io/en/latest/
    https://vcrpy.readthedocs.io/en/latest/usage.html#pytest-integration
    """

    # Replace the Authorization request header with None in cassettes
    return {
        "record_mode": "once",
        "decode_compressed_response": False,
        "filter_headers": [
            ("authorization", None),
            ("Set-Cookie", None),
            ("User-Agent", None),
        ],
    }

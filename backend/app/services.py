from fastapi import status
import json
import requests


def fetch_api(url: str):
    headers = {"content-type": "application/json"}
    response = requests.get(url, headers=headers)

    if response.status_code == status.HTTP_200_OK:
        json_data = response.json()

        return json_data
    else:
        return None

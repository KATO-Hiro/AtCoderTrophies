ATCODER_PROBLEMS_API_BASE: str = "https://kenkoooo.com/atcoder/atcoder-api"
ATCODER_PROBLEMS_API_VERSION: str = "/v3"


def get_accepted_count_api_url(user_name: str) -> str:
    url: str = (
        ATCODER_PROBLEMS_API_BASE
        + ATCODER_PROBLEMS_API_VERSION
        + "/user/ac_rank?user="
        + user_name
    )

    return url


def get_rated_point_sum_api_url(user_name: str) -> str:
    url: str = (
        ATCODER_PROBLEMS_API_BASE
        + ATCODER_PROBLEMS_API_VERSION
        + "/user/rated_point_sum_rank?user="
        + user_name
    )

    return url

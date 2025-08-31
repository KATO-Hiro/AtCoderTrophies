PRODUCT_NAME: str = "AtCoder Trophies"
API_V1: str = "/v1"
ATCODER_PROBLEMS_API_BASE: str = "https://kenkoooo.com/atcoder/atcoder-api"
ATCODER_PROBLEMS_API_VERSION: str = "/v3"
TWO_HOURS_IN_SECONDS = 2 * 60 * 60


def get_accepted_count_api_url(user_name: str) -> str:
    url: str = ATCODER_PROBLEMS_API_BASE + ATCODER_PROBLEMS_API_VERSION + "/user/ac_rank?user=" + user_name

    return url


def get_accepted_count_for_each_language_api_url(user_name: str) -> str:
    url: str = ATCODER_PROBLEMS_API_BASE + ATCODER_PROBLEMS_API_VERSION + "/user/language_rank?user=" + user_name

    return url


def get_rated_point_sum_api_url(user_name: str) -> str:
    url: str = ATCODER_PROBLEMS_API_BASE + ATCODER_PROBLEMS_API_VERSION + "/user/rated_point_sum_rank?user=" + user_name

    return url


def get_longest_streak_api_url(user_name: str) -> str:
    url: str = ATCODER_PROBLEMS_API_BASE + ATCODER_PROBLEMS_API_VERSION + "/user/streak_rank?user=" + user_name

    return url

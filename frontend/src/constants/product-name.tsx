const PRODUCT_NAME = 'AtCoder Trophies';

export const PRODUCT_URL = 'https://atcoder-trophies.vercel.app';

export const PRODUCT_DESCRIPTION =
  'Show dynamically generated AtCoder Stat Trophies.';

export const BACKEND_BASE_URL = 'https://atcoder-trophies-api.vercel.app';

export const BACKEND_API_V1 = '/v1';

export const ACCEPTED_COUNT_API_URL = (userName: string): string =>
  `${BACKEND_BASE_URL + BACKEND_API_V1}/ac_count/${userName}`;

export const ACCEPTED_COUNT_BY_LANGUAGE_API_URL = (userName: string): string =>
  `${BACKEND_BASE_URL + BACKEND_API_V1}/ac_count_by_lang/${userName}`;

export const RATED_POINT_SUM_API_URL = (userName: string): string =>
  `${BACKEND_BASE_URL + BACKEND_API_V1}/rated_point_sum/${userName}`;

export const LONGEST_STREAK_API_URL = (userName: string): string =>
  `${BACKEND_BASE_URL + BACKEND_API_V1}/longest_streak/${userName}`;

export { PRODUCT_NAME as default };

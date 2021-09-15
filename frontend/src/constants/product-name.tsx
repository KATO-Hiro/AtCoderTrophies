const PRODUCT_NAME = 'AtCoder Trophies';

export const PRODUCT_URL = 'https://atcoder-trophies.vercel.app';

export const PRODUCT_DESCRIPTION =
  'Show dynamically generated AtCoder Stat Trophies.';

export const BACKEND_BASE_URL = 'https://atcoder-trophies-api.vercel.app';

export const BACKEND_API_V1 = '/v1';

export const ATCODER_PROBLEMS_STAT_API_URL = (userName: string): string =>
  `${BACKEND_BASE_URL + BACKEND_API_V1}/problems_stat_api/${userName}`;

export { PRODUCT_NAME as default };

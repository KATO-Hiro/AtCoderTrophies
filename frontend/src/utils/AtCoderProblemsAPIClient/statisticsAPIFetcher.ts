import { ATCODER_PROBLEMS_STAT_API_URL } from '../../constants/product-name';
import type { AtCoderProblemsStatAPI } from '../../interfaces/AtCoderProblemsStatAPI';

export default async function fetchAtCoderProblemsStatisticsAPI(
  userName: string,
): Promise<AtCoderProblemsStatAPI | null> {
  let results: AtCoderProblemsStatAPI;

  try {
    const response = await fetch(ATCODER_PROBLEMS_STAT_API_URL(userName));

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    results = (await response.json()) as AtCoderProblemsStatAPI;
  } catch (error) {
    // TODO: Enable to output log.
    console.log(error);

    return null;
  }

  return results;
}

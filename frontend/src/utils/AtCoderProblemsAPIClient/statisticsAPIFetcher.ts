import axios from 'axios';

import { ATCODER_PROBLEMS_STAT_API_URL } from '../../constants/product-name';
import { AtCoderProblemsStatAPI } from '../../interfaces/AtCoderProblemsStatAPI';

export default async function fetchAtCoderProblemsStatisticsAPI(
  userName: string,
): Promise<AtCoderProblemsStatAPI | null> {
  let results: AtCoderProblemsStatAPI;

  try {
    const response = await axios.get(ATCODER_PROBLEMS_STAT_API_URL(userName));
    results = response.data as AtCoderProblemsStatAPI;
  } catch (error) {
    // TODO: Enable to output log.
    console.log(error);

    return null;
  }

  return results;
}

import axios from 'axios';

import { RATED_POINT_SUM_API_URL } from '../../constants/product-name';
import { RatedPointSumAPI } from '../../interfaces/RatedPointSumAPI';

export default async function fetchRatedPointSumAPI(
  userName: string,
): Promise<RatedPointSumAPI | null> {
  let results: RatedPointSumAPI;

  try {
    const response = await axios.get(RATED_POINT_SUM_API_URL(userName));
    results = response.data as RatedPointSumAPI;
  } catch (error) {
    // TODO: Enable to output log.
    console.log(error);

    return null;
  }

  return results;
}

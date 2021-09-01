import axios from 'axios';

import { LONGEST_STREAK_API_URL } from '../../constants/product-name';
import { LongestStreakAPI } from '../../interfaces/LongestStreakAPI';

export default async function fetchLongestStreakAPI(
  userName: string,
): Promise<LongestStreakAPI | null> {
  let results: LongestStreakAPI;

  try {
    const response = await axios.get(LONGEST_STREAK_API_URL(userName));
    results = response.data as LongestStreakAPI;
  } catch (error) {
    // TODO: Enable to output log.
    console.log(error);

    return null;
  }

  return results;
}

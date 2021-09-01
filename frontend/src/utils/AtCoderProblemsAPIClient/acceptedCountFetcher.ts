import axios from 'axios';

import { ACCEPTED_COUNT_API_URL } from '../../constants/product-name';
import { AcceptedCountAPI } from '../../interfaces/AcceptedCountAPI';

export default async function fetchAcceptedCountAPI(
  userName: string,
): Promise<AcceptedCountAPI | null> {
  let results: AcceptedCountAPI;

  try {
    const response = await axios.get(ACCEPTED_COUNT_API_URL(userName));
    results = response.data as AcceptedCountAPI;
  } catch (error) {
    // TODO: Enable to output log.
    console.log(error);

    return null;
  }

  return results;
}

import axios from 'axios';

import { ACCEPTED_COUNT_BY_LANGUAGE_API_URL } from '../../constants/product-name';
import { AcceptedCountByLanguageAPI } from '../../interfaces/AcceptedCountByLanguageAPI';

export default async function fetchAcceptedCountByLanguageAPI(
  userName: string,
): Promise<AcceptedCountByLanguageAPI | null> {
  let results: AcceptedCountByLanguageAPI;

  try {
    const response = await axios.get(
      ACCEPTED_COUNT_BY_LANGUAGE_API_URL(userName),
    );
    results = response.data as AcceptedCountByLanguageAPI;
  } catch (error) {
    // TODO: Enable to output log.
    console.log(error);

    return null;
  }

  return results;
}

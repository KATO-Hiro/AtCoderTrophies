import { acceptedCountByLanguageList } from '../../constants/languages';
import { AcceptedCountAPI } from '../../interfaces/AcceptedCountAPI';
import { AcceptedCountByLanguageAPI } from '../../interfaces/AcceptedCountByLanguageAPI';
import { LongestStreakAPI } from '../../interfaces/LongestStreakAPI';
import { RatedPointSumAPI } from '../../interfaces/RatedPointSumAPI';
import fetchAcceptedCountByLanguageAPI from './acceptedCountByLanguageFetcher';
import fetchAcceptedCountAPI from './acceptedCountFetcher';
import fetchLongestStreakAPI from './longestStreakFetcher';
import fetchRatedPointSumAPI from './ratedPointSumFetcher';

export default class AtCoderProblemsAPIClient {
  private userName = '';

  private totalAcceptedCount = 0;

  private acceptedCountByLanguageList: Map<string, number> = new Map();

  private ratedPointSum = 0;

  private longestStreak = 0;

  constructor(userName: string) {
    this.userName = userName;
  }

  async readAPI(): Promise<void> {
    await this.readAcceptedCountAPI();
    await this.readAcceptedCountByLanguageAPI();
    await this.readRatedPointSumAPI();
    await this.readLongestStreakAPI();
  }

  private async readAcceptedCountAPI(): Promise<void> {
    const acceptedCountAPI: AcceptedCountAPI | null =
      await fetchAcceptedCountAPI(this.userName);
    const acceptedCount = acceptedCountAPI?.count;

    // HACK: This code is not beautiful.
    if (acceptedCount !== undefined) {
      this.totalAcceptedCount = acceptedCount;
    }
  }

  private async readAcceptedCountByLanguageAPI(): Promise<void> {
    const acceptedCountByLanguageAPI: AcceptedCountByLanguageAPI | null =
      await fetchAcceptedCountByLanguageAPI(this.userName);
    const languages = acceptedCountByLanguageAPI?.languages;

    // HACK: This code is not beautiful.
    if (languages !== undefined) {
      // eslint-disable-next-line no-restricted-syntax
      for (const language of Object.values(languages)) {
        acceptedCountByLanguageList.set(language.language, language.count);
      }

      this.acceptedCountByLanguageList = acceptedCountByLanguageList;
    }
  }

  private async readRatedPointSumAPI(): Promise<void> {
    const ratedPointSumAPI: RatedPointSumAPI | null =
      await fetchRatedPointSumAPI(this.userName);
    const ratedPointSum = ratedPointSumAPI?.count;

    // HACK: This code is not beautiful.
    if (ratedPointSum !== undefined) {
      this.ratedPointSum = ratedPointSum;
    }
  }

  private async readLongestStreakAPI(): Promise<void> {
    const longestStreakAPI: LongestStreakAPI | null =
      await fetchLongestStreakAPI(this.userName);
    const longestStreak = longestStreakAPI?.count;

    // HACK: This code is not beautiful.
    if (longestStreak !== undefined) {
      this.longestStreak = longestStreak;
    }
  }

  public getTotalAcceptedCount(): number {
    return this.totalAcceptedCount;
  }

  public getAcceptedCountByLanguageList(): Map<string, number> {
    return this.acceptedCountByLanguageList;
  }

  public getRatedPointSum(): number {
    return this.ratedPointSum;
  }

  public getLongestStreak(): number {
    return this.longestStreak;
  }
}

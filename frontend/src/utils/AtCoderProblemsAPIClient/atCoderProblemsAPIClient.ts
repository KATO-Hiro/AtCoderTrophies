import { AcceptedCountByLanguageList } from '../../constants/languages';
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

  private existsUserName = true;

  private totalAcceptedCount = 0;

  private acceptedCountByLanguageList = new AcceptedCountByLanguageList();

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

  isValidUserName(): boolean {
    return this.existsUserName;
  }

  private async readAcceptedCountAPI(): Promise<void> {
    const acceptedCountAPI: AcceptedCountAPI | null =
      await fetchAcceptedCountAPI(this.userName);

    // HACK: This code is not beautiful.
    if (acceptedCountAPI === null) {
      this.existsUserName = false;
    } else {
      this.totalAcceptedCount = acceptedCountAPI.count;
    }
  }

  private async readAcceptedCountByLanguageAPI(): Promise<void> {
    const acceptedCountByLanguageAPI: AcceptedCountByLanguageAPI | null =
      await fetchAcceptedCountByLanguageAPI(this.userName);

    // HACK: This code is not beautiful.
    if (acceptedCountByLanguageAPI === null) {
      this.existsUserName = false;
    } else {
      const { languages } = acceptedCountByLanguageAPI;

      // eslint-disable-next-line no-restricted-syntax
      for (const language of Object.values(languages)) {
        this.acceptedCountByLanguageList.update(
          language.language,
          language.count,
        );
      }
    }
  }

  private async readRatedPointSumAPI(): Promise<void> {
    const ratedPointSumAPI: RatedPointSumAPI | null =
      await fetchRatedPointSumAPI(this.userName);

    // HACK: This code is not beautiful.
    if (ratedPointSumAPI === null) {
      this.existsUserName = false;
    } else {
      this.ratedPointSum = ratedPointSumAPI.count;
    }
  }

  private async readLongestStreakAPI(): Promise<void> {
    const longestStreakAPI: LongestStreakAPI | null =
      await fetchLongestStreakAPI(this.userName);

    // HACK: This code is not beautiful.
    if (longestStreakAPI === null) {
      this.existsUserName = false;
    } else {
      this.longestStreak = longestStreakAPI.count;
    }
  }

  public getTotalAcceptedCount(): number {
    return this.totalAcceptedCount;
  }

  public getAcceptedCountByLanguageList(): Map<string, number> {
    return this.acceptedCountByLanguageList.getLanguageList();
  }

  public getRatedPointSum(): number {
    return this.ratedPointSum;
  }

  public getLongestStreak(): number {
    return this.longestStreak;
  }
}

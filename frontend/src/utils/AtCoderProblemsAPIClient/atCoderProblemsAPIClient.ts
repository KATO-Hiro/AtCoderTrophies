import { AcceptedCountByLanguageList } from '../../constants/languages';
import { AcceptedCountAPI } from '../../interfaces/AcceptedCountAPI';
import { AcceptedCount } from '../../interfaces/AcceptedCountByLanguageAPI';
import { AtCoderProblemsStatAPI } from '../../interfaces/AtCoderProblemsStatAPI';
import { LongestStreakAPI } from '../../interfaces/LongestStreakAPI';
import { RatedPointSumAPI } from '../../interfaces/RatedPointSumAPI';
import fetchAtCoderProblemsStatisticsAPI from './statisticsAPIFetcher';

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
    await this.readAtCoderProblemsStatisticsAPI();
  }

  isValidUserName(): boolean {
    return this.existsUserName;
  }

  private async readAtCoderProblemsStatisticsAPI(): Promise<void> {
    const atCoderProblemsStatAPI: AtCoderProblemsStatAPI | null =
      await fetchAtCoderProblemsStatisticsAPI(this.userName);

    if (atCoderProblemsStatAPI === null) {
      this.existsUserName = false;
    } else {
      const NON_EXISTENT = -999999999;
      const isNotFoundUser =
        atCoderProblemsStatAPI.accepted_count.count === NON_EXISTENT ||
        atCoderProblemsStatAPI.accepted_count.rank === NON_EXISTENT;

      if (isNotFoundUser) {
        this.existsUserName = false;
        return;
      }

      this.readAcceptedCountAPI(atCoderProblemsStatAPI.accepted_count);
      this.readAcceptedCountByLanguageAPI(
        atCoderProblemsStatAPI.accepted_count_by_language.languages,
      );
      this.readRatedPointSumAPI(atCoderProblemsStatAPI.rated_point_sum);
      this.readLongestStreakAPI(atCoderProblemsStatAPI.longest_streak);
    }
  }

  private readAcceptedCountAPI(
    acceptedCountAPI: AcceptedCountAPI | null,
  ): void {
    // HACK: This code is not beautiful.
    if (acceptedCountAPI !== null) {
      this.totalAcceptedCount = acceptedCountAPI.count;
    }
  }

  private readAcceptedCountByLanguageAPI(
    acceptedCountByLanguageAPI: AcceptedCount[],
  ): void {
    // HACK: This code is not beautiful.
    if (acceptedCountByLanguageAPI !== null) {
      const languages = acceptedCountByLanguageAPI;

      // eslint-disable-next-line no-restricted-syntax
      for (const aLanguage of Object.values(languages)) {
        const { language, count, rank } = aLanguage;

        this.acceptedCountByLanguageList.update(language, count);
      }
    }
  }

  private readRatedPointSumAPI(
    ratedPointSumAPI: RatedPointSumAPI | null,
  ): void {
    // HACK: This code is not beautiful.
    if (ratedPointSumAPI !== null) {
      this.ratedPointSum = ratedPointSumAPI.count;
    }
  }

  private readLongestStreakAPI(
    longestStreakAPI: LongestStreakAPI | null,
  ): void {
    // HACK: This code is not beautiful.
    if (longestStreakAPI !== null) {
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

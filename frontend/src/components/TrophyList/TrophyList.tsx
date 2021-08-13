import { RANK, RANK_ORDER } from '../../constants/rank';
import AcceptedCountTrophy from '../Trophy/AcceptedCountTrophy';
import AllSuperRankTrophy from '../Trophy/AllSuperRankTrophy';
import CPlusPlusTrophy from '../Trophy/CPlusPlusTrophy';
import CSharperTrophy from '../Trophy/CSharperTrophy';
import JavaerTrophy from '../Trophy/JavaerTrophy';
import LongestStreakCount from '../Trophy/LongestStreakCount';
import PythonistaTrophy from '../Trophy/PythonistaTrophy';
import RatedPointSumTrophy from '../Trophy/RatedPointSumTrophy';
import RubyistTrophy from '../Trophy/RubyistTrophy';
import RustaceanTrophy from '../Trophy/RustaceanTrophy';
import Trophy from '../Trophy/Trophy';

export default class TrophyList {
  private trophies = new Array<Trophy>();

  constructor(userInfo: unknown) {
    // Basic trophies.
    // TODO: Replace numbers to UserInfo.
    this.trophies.push(
      new AcceptedCountTrophy(5000),
      new CPlusPlusTrophy(3500),
      new CSharperTrophy(30),
      new JavaerTrophy(5),
      new LongestStreakCount(200),
      new PythonistaTrophy(350),
      new RatedPointSumTrophy(275000),
      new RubyistTrophy(200),
      new RustaceanTrophy(800),
    );

    // Secret trophies.
    this.trophies.push(new AllSuperRankTrophy(this.isAllSRank));
  }

  get length(): number {
    return this.trophies.length;
  }

  getArray(): Array<Trophy> {
    return this.trophies;
  }

  private get isAllSRank(): number {
    return this.trophies.every((trophy) => trophy.rank.slice(0, 1) === RANK.S)
      ? 1
      : 0;
  }

  filterByHidden(): void {
    this.trophies = this.trophies.filter(
      (trophy) => !trophy.hidden || trophy.rank !== RANK.UNKNOWN,
    );
  }

  filterByTitles(titles: Array<string>): void {
    this.trophies = this.trophies.filter((trophy) =>
      trophy.filterTitles.some((title) => titles.includes(title)),
    );
  }

  filterByRanks(ranks: Array<string>): void {
    this.trophies = this.trophies.filter((trophy) =>
      ranks.includes(trophy.rank),
    );
  }

  sortByRank(): void {
    this.trophies = this.trophies.sort(
      (a: Trophy, b: Trophy) =>
        RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank),
    );
  }
}

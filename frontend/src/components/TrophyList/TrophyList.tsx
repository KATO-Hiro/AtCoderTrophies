import { RANK, RANK_ORDER } from '../../constants/rank';
import AcceptedCountTrophy from '../Trophy/AcceptedCountTrophy';
import AllSuperRankTrophy from '../Trophy/AllSuperRankTrophy';
import CPlusPluserTrophy from '../Trophy/CPlusPluserTrophy';
import CProgrammerTrophy from '../Trophy/CProgrammerTrophy';
import CSharperTrophy from '../Trophy/CSharperTrophy';
import DProgrammerTrophy from '../Trophy/DProgrammerTrophy';
import GopherTrophy from '../Trophy/GopherTrophy';
import HaskellerTrophy from '../Trophy/HaskellerTrophy';
import JavaScripterTrophy from '../Trophy/JavaScripterTrophy';
import JavaerTrophy from '../Trophy/JavaerTrophy';
import KotlinerTrophy from '../Trophy/KotlinerTrophy';
import LongestStreakCount from '../Trophy/LongestStreakCount';
import PHPerTrophy from '../Trophy/PHPerTrophy';
import PerlerTrophy from '../Trophy/PerlerTrophy';
import PyPyUserTrophy from '../Trophy/PyPyUserTrophy';
import PythonistaTrophy from '../Trophy/PythonistaTrophy';
import RatedPointSumTrophy from '../Trophy/RatedPointSumTrophy';
import RubyistTrophy from '../Trophy/RubyistTrophy';
import RustaceanTrophy from '../Trophy/RustaceanTrophy';
import Trophy from '../Trophy/Trophy';
import UserInfo from '../UserInfo/UserInfo';

export default class TrophyList {
  private trophies = new Array<Trophy>();

  constructor(userInfo: UserInfo) {
    const problemsAPIClient = userInfo.atCoderProblemsAPIClient;
    const acceptedCount = problemsAPIClient.getTotalAcceptedCount();
    const longestStreak = problemsAPIClient.getLongestStreak();
    const ratedPointSum = problemsAPIClient.getRatedPointSum();

    // Basic trophies.
    // TODO: Replace numbers to UserInfo.
    this.trophies.push(
      new AcceptedCountTrophy(acceptedCount),
      new CPlusPluserTrophy(3500),
      new CProgrammerTrophy(15),
      new CSharperTrophy(30),
      new DProgrammerTrophy(1),
      new GopherTrophy(120),
      new HaskellerTrophy(80),
      new JavaScripterTrophy(10),
      new JavaerTrophy(5),
      new KotlinerTrophy(9),
      new LongestStreakCount(longestStreak),
      new PHPerTrophy(2),
      new PerlerTrophy(950),
      new PyPyUserTrophy(250),
      new PythonistaTrophy(350),
      new RatedPointSumTrophy(ratedPointSum),
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

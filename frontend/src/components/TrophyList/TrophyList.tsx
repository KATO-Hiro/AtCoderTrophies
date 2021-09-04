import { SupportedLanguages as Languages } from '../../constants/languages';
import { RANK, RANK_ORDER } from '../../constants/rank';
import { SupportedLanguages } from '../../interfaces/SupportedLanguages';
import AcceptedCountTrophy from '../Trophy/AcceptedCountTrophy';
import AllSuperRankTrophy from '../Trophy/AllSuperRankTrophy';
import CPlusPluserTrophy from '../Trophy/CPlusPluserTrophy';
import CProgrammerTrophy from '../Trophy/CProgrammerTrophy';
import CSharperTrophy from '../Trophy/CSharperTrophy';
import CommonLisperTrophy from '../Trophy/CommonLisperTrophy';
import CrystalUserTrophy from '../Trophy/CrystalUserTrophy';
import DProgrammerTrophy from '../Trophy/DProgrammerTrophy';
import GopherTrophy from '../Trophy/GopherTrophy';
import HaskellerTrophy from '../Trophy/HaskellerTrophy';
import JavaScripterTrophy from '../Trophy/JavaScripterTrophy';
import JavaerTrophy from '../Trophy/JavaerTrophy';
import JuliaUserTrophy from '../Trophy/JuliaUserTrophy';
import KotlinerTrophy from '../Trophy/KotlinerTrophy';
import LongestStreakCount from '../Trophy/LongestStreakCount';
import NimUserTrophy from '../Trophy/NimUserTrophy';
import OCamelUserTrophy from '../Trophy/OCamelUserTrophy';
import PHPerTrophy from '../Trophy/PHPerTrophy';
import PascalUserTrophy from '../Trophy/PascalUserTrophy';
import PerlerTrophy from '../Trophy/PerlerTrophy';
import PyPyUserTrophy from '../Trophy/PyPyUserTrophy';
import PythonistaTrophy from '../Trophy/PythonistaTrophy';
import RatedPointSumTrophy from '../Trophy/RatedPointSumTrophy';
import RubyistTrophy from '../Trophy/RubyistTrophy';
import RustaceanTrophy from '../Trophy/RustaceanTrophy';
import SwiftUserTrophy from '../Trophy/SwiftUserTrophy';
import Trophy from '../Trophy/Trophy';
import UserInfo from '../UserInfo/UserInfo';

export default class TrophyList {
  private trophies = new Array<Trophy>();

  private acceptedCountByLanguageList: Map<string, number> = new Map();

  constructor(userInfo: UserInfo) {
    const problemsAPIClient = userInfo.atCoderProblemsAPIClient;
    const acceptedCount = problemsAPIClient.getTotalAcceptedCount();
    const longestStreak = problemsAPIClient.getLongestStreak();
    const ratedPointSum = problemsAPIClient.getRatedPointSum();
    this.acceptedCountByLanguageList =
      problemsAPIClient.getAcceptedCountByLanguageList();

    // Basic trophies.
    // TODO: Refactoring.
    this.trophies.push(
      new AcceptedCountTrophy(acceptedCount),
      new CPlusPluserTrophy(
        this.getAcceptedCountByLanguage(Languages.C_PLUS_PLUS),
      ),
      new CProgrammerTrophy(this.getAcceptedCountByLanguage(Languages.C)),
      new CSharperTrophy(this.getAcceptedCountByLanguage(Languages.C_SHARP)),
      new CommonLisperTrophy(
        this.getAcceptedCountByLanguage(Languages.COMMON_LISP),
      ),
      new CrystalUserTrophy(this.getAcceptedCountByLanguage(Languages.CRYSTAL)),
      new DProgrammerTrophy(this.getAcceptedCountByLanguage(Languages.D)),
      new GopherTrophy(this.getAcceptedCountByLanguage(Languages.GO)),
      new HaskellerTrophy(this.getAcceptedCountByLanguage(Languages.HASKELL)),
      new JavaScripterTrophy(
        this.getAcceptedCountByLanguage(Languages.JAVASCRIPT),
      ),
      new JavaerTrophy(this.getAcceptedCountByLanguage(Languages.JAVA)),
      new JuliaUserTrophy(this.getAcceptedCountByLanguage(Languages.JULIA)),
      new KotlinerTrophy(this.getAcceptedCountByLanguage(Languages.KOTLIN)),
      new LongestStreakCount(longestStreak),
      new NimUserTrophy(this.getAcceptedCountByLanguage(Languages.NIM)),
      new OCamelUserTrophy(this.getAcceptedCountByLanguage(Languages.OCAML)),
      new PHPerTrophy(this.getAcceptedCountByLanguage(Languages.PHP)),
      new PascalUserTrophy(this.getAcceptedCountByLanguage(Languages.PASCAL)),
      new PerlerTrophy(this.getAcceptedCountByLanguage(Languages.PERL)),
      new PyPyUserTrophy(this.getAcceptedCountByLanguage(Languages.PYPY)),
      new PythonistaTrophy(this.getAcceptedCountByLanguage(Languages.PYTHON)),
      new RatedPointSumTrophy(ratedPointSum),
      new RubyistTrophy(this.getAcceptedCountByLanguage(Languages.RUBY)),
      new RustaceanTrophy(this.getAcceptedCountByLanguage(Languages.RUST)),
      new SwiftUserTrophy(this.getAcceptedCountByLanguage(Languages.SWIFT)),
    );

    // Secret trophies.
    this.trophies.push(new AllSuperRankTrophy(this.isAllSRank));
  }

  private getAcceptedCountByLanguage(language: SupportedLanguages): number {
    const acceptedCount = this.acceptedCountByLanguageList?.get(
      language,
    ) as number;

    return acceptedCount;
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

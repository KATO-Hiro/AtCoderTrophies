import { SupportedLanguages as Languages } from '../../constants/languages';
import { RANK, RANK_ORDER } from '../../constants/rank';
import { SupportedLanguages } from '../../interfaces/SupportedLanguages';
import AcceptedCountTrophy from '../Trophy/AcceptedCountTrophy';
import AdaUserTrophy from '../Trophy/AdaUserTrophy';
import AllSuperRankTrophy from '../Trophy/AllSuperRankTrophy';
import AwkUserTrophy from '../Trophy/AwkUserTrophy';
import BashUserTrophy from '../Trophy/BashUserTrophy';
import BcUserTrophy from '../Trophy/BcUserTrophy';
import BrainfuckUserTrophy from '../Trophy/BrainfuckUserTrophy';
import CPlusPluserTrophy from '../Trophy/CPlusPluserTrophy';
import CProgrammerTrophy from '../Trophy/CProgrammerTrophy';
import CSharperTrophy from '../Trophy/CSharperTrophy';
import CeylonUserTrophy from '../Trophy/CeylonUserTrophy';
import ClojureUserTrophy from '../Trophy/ClojureUserTrophy';
import CommonLisperTrophy from '../Trophy/CommonLisperTrophy';
import CrystalUserTrophy from '../Trophy/CrystalUserTrophy';
import CythonUserTrophy from '../Trophy/CythonUserTrophy';
import DProgrammerTrophy from '../Trophy/DProgrammerTrophy';
import DartUserTrophy from '../Trophy/DartUserTrophy';
import DashUserTrophy from '../Trophy/DashUserTrophy';
import ElixirUserTrophy from '../Trophy/ElixirUserTrophy';
import FSharperTrophy from '../Trophy/FSharperTrophy';
import FortranUserTrophy from '../Trophy/FortranUserTrophy';
import GopherTrophy from '../Trophy/GopherTrophy';
import HaskellerTrophy from '../Trophy/HaskellerTrophy';
import JavaScripterTrophy from '../Trophy/JavaScripterTrophy';
import JavaerTrophy from '../Trophy/JavaerTrophy';
import JuliaUserTrophy from '../Trophy/JuliaUserTrophy';
import KotlinerTrophy from '../Trophy/KotlinerTrophy';
import LongestStreakCountTrophy from '../Trophy/LongestStreakCountTrophy';
import LuaUserTrophy from '../Trophy/LuaUserTrophy';
import NimUserTrophy from '../Trophy/NimUserTrophy';
import OCamelUserTrophy from '../Trophy/OCamelUserTrophy';
import OctaveUserTrophy from '../Trophy/OctaveUserTrophy';
import PHPerTrophy from '../Trophy/PHPerTrophy';
import PascalUserTrophy from '../Trophy/PascalUserTrophy';
import PerlerTrophy from '../Trophy/PerlerTrophy';
import PyPyUserTrophy from '../Trophy/PyPyUserTrophy';
import PythonistaTrophy from '../Trophy/PythonistaTrophy';
import RakuUserTrophy from '../Trophy/RakuUserTrophy';
import RatedPointSumTrophy from '../Trophy/RatedPointSumTrophy';
import RubyistTrophy from '../Trophy/RubyistTrophy';
import RustaceanTrophy from '../Trophy/RustaceanTrophy';
import SedUserTrophy from '../Trophy/SedUserTrophy';
import SwiftUserTrophy from '../Trophy/SwiftUserTrophy';
import TextUserTrophy from '../Trophy/TextUserTrophy';
import Trophy from '../Trophy/Trophy';
import VimmerTrophy from '../Trophy/VimmerTrophy';
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
    this.addTrophyAsNeeded(new AcceptedCountTrophy(acceptedCount));
    this.addTrophyAsNeeded(
      new AdaUserTrophy(this.getAcceptedCountByLanguage(Languages.ADA)),
    );
    this.addTrophyAsNeeded(
      new AwkUserTrophy(this.getAcceptedCountByLanguage(Languages.AWK)),
    );
    this.addTrophyAsNeeded(
      new BashUserTrophy(this.getAcceptedCountByLanguage(Languages.BASH)),
    );
    this.addTrophyAsNeeded(
      new BcUserTrophy(this.getAcceptedCountByLanguage(Languages.BC)),
    );
    this.addTrophyAsNeeded(
      new BrainfuckUserTrophy(
        this.getAcceptedCountByLanguage(Languages.BRAINFUCK),
      ),
    );
    this.addTrophyAsNeeded(
      new CPlusPluserTrophy(
        this.getAcceptedCountByLanguage(Languages.C_PLUS_PLUS),
      ),
    );
    this.addTrophyAsNeeded(
      new CProgrammerTrophy(this.getAcceptedCountByLanguage(Languages.C)),
    );
    this.addTrophyAsNeeded(
      new CSharperTrophy(this.getAcceptedCountByLanguage(Languages.C_SHARP)),
    );
    this.addTrophyAsNeeded(
      new CeylonUserTrophy(this.getAcceptedCountByLanguage(Languages.CEYLON)),
    );
    this.addTrophyAsNeeded(
      new ClojureUserTrophy(this.getAcceptedCountByLanguage(Languages.CLOJURE)),
    );
    this.addTrophyAsNeeded(
      new CommonLisperTrophy(
        this.getAcceptedCountByLanguage(Languages.COMMON_LISP),
      ),
    );
    this.addTrophyAsNeeded(
      new CrystalUserTrophy(this.getAcceptedCountByLanguage(Languages.CRYSTAL)),
    );
    this.addTrophyAsNeeded(
      new CythonUserTrophy(this.getAcceptedCountByLanguage(Languages.CYTHON)),
    );
    this.addTrophyAsNeeded(
      new DProgrammerTrophy(this.getAcceptedCountByLanguage(Languages.D)),
    );
    this.addTrophyAsNeeded(
      new DartUserTrophy(this.getAcceptedCountByLanguage(Languages.DART)),
    );
    this.addTrophyAsNeeded(
      new DashUserTrophy(this.getAcceptedCountByLanguage(Languages.DASH)),
    );
    this.addTrophyAsNeeded(
      new ElixirUserTrophy(this.getAcceptedCountByLanguage(Languages.ELIXIR)),
    );
    this.addTrophyAsNeeded(
      new FSharperTrophy(this.getAcceptedCountByLanguage(Languages.F_SHARP)),
    );
    this.addTrophyAsNeeded(
      new FortranUserTrophy(this.getAcceptedCountByLanguage(Languages.FORTRAN)),
    );
    this.addTrophyAsNeeded(
      new GopherTrophy(this.getAcceptedCountByLanguage(Languages.GO)),
    );
    this.addTrophyAsNeeded(
      new HaskellerTrophy(this.getAcceptedCountByLanguage(Languages.HASKELL)),
    );
    this.addTrophyAsNeeded(
      new JavaScripterTrophy(
        this.getAcceptedCountByLanguage(Languages.JAVASCRIPT),
      ),
    );
    this.addTrophyAsNeeded(
      new JavaerTrophy(this.getAcceptedCountByLanguage(Languages.JAVA)),
    );
    this.addTrophyAsNeeded(
      new JuliaUserTrophy(this.getAcceptedCountByLanguage(Languages.JULIA)),
    );
    this.addTrophyAsNeeded(
      new KotlinerTrophy(this.getAcceptedCountByLanguage(Languages.KOTLIN)),
    );
    this.addTrophyAsNeeded(new LongestStreakCountTrophy(longestStreak));
    this.addTrophyAsNeeded(
      new LuaUserTrophy(this.getAcceptedCountByLanguage(Languages.LUA)),
    );
    this.addTrophyAsNeeded(
      new NimUserTrophy(this.getAcceptedCountByLanguage(Languages.NIM)),
    );
    this.addTrophyAsNeeded(
      new OCamelUserTrophy(this.getAcceptedCountByLanguage(Languages.OCAML)),
    );
    this.addTrophyAsNeeded(
      new OctaveUserTrophy(this.getAcceptedCountByLanguage(Languages.OCTAVE)),
    );
    this.addTrophyAsNeeded(
      new PHPerTrophy(this.getAcceptedCountByLanguage(Languages.PHP)),
    );
    this.addTrophyAsNeeded(
      new PascalUserTrophy(this.getAcceptedCountByLanguage(Languages.PASCAL)),
    );
    this.addTrophyAsNeeded(
      new PerlerTrophy(this.getAcceptedCountByLanguage(Languages.PERL)),
    );
    this.addTrophyAsNeeded(
      new PyPyUserTrophy(this.getAcceptedCountByLanguage(Languages.PYPY)),
    );
    this.addTrophyAsNeeded(
      new PythonistaTrophy(this.getAcceptedCountByLanguage(Languages.PYTHON)),
    );
    this.addTrophyAsNeeded(
      new RakuUserTrophy(this.getAcceptedCountByLanguage(Languages.RAKU)),
    );
    this.addTrophyAsNeeded(new RatedPointSumTrophy(ratedPointSum));
    this.addTrophyAsNeeded(
      new RubyistTrophy(this.getAcceptedCountByLanguage(Languages.RUBY)),
    );
    this.addTrophyAsNeeded(
      new RustaceanTrophy(this.getAcceptedCountByLanguage(Languages.RUST)),
    );
    this.addTrophyAsNeeded(
      new SedUserTrophy(this.getAcceptedCountByLanguage(Languages.SED)),
    );
    this.addTrophyAsNeeded(
      new SwiftUserTrophy(this.getAcceptedCountByLanguage(Languages.SWIFT)),
    );
    this.addTrophyAsNeeded(
      new TextUserTrophy(this.getAcceptedCountByLanguage(Languages.TEXT)),
    );
    this.addTrophyAsNeeded(
      new VimmerTrophy(this.getAcceptedCountByLanguage(Languages.VIM)),
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

  private addTrophyAsNeeded(trophy: Trophy): void {
    const score = trophy.getScore();

    if (score >= 1) {
      this.trophies.push(trophy);
    }
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

import { RANK } from '../../constants/rank';
import RankCondition from './RankCondition';
import Trophy from './Trophy';

export default class JavaScripterTrophy extends Trophy {
  constructor(score: number) {
    const rankConditions = [
      new RankCondition(RANK.SSS, 'God Solver', 1500),
      new RankCondition(RANK.SS, 'Legendary Solver', 1000),
      new RankCondition(RANK.S, 'Ultra Solver', 500),
      new RankCondition(RANK.AAA, 'Hyper Solver', 250),
      new RankCondition(RANK.AA, 'Super Solver', 100),
      new RankCondition(RANK.A, 'Regular Solver', 50),
      new RankCondition(RANK.B, 'Beginner Solver', 10),
      new RankCondition(RANK.C, 'First AC', 1),
    ];

    super(score, rankConditions);
    this.title = `JavaScripter`;
    this.filterTitles = [
      'JavaScripter',
      'JavaScript',
      'javascript',
      'JavaScripter',
      'javascripter',
      'cjs',
      'mjs',
      'JS',
      'js',
    ];
  }
}

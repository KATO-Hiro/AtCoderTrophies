import { RANK } from '../../constants/rank';
import RankCondition from './RankCondition';
import Trophy from './Trophy';

export default class RatedPointSumTrophy extends Trophy {
  constructor(score: number) {
    const rankConditions = [
      new RankCondition(RANK.SSS, 'God Scorer', 1000000),
      new RankCondition(RANK.SS, 'Legendary Scorer', 500000),
      new RankCondition(RANK.S, 'Ultra Scorer', 250000),
      new RankCondition(RANK.AAA, 'Hyper Scorer', 100000),
      new RankCondition(RANK.AA, 'Super Scorer', 50000),
      new RankCondition(RANK.A, 'Regular Scorer', 10000),
      new RankCondition(RANK.B, 'Beginner Scorer', 1000),
      new RankCondition(RANK.C, 'First Point', 100),
    ];

    super(score, rankConditions);
    this.title = 'RatedPointSum';
    this.filterTitles = ['RatedPointSum', 'RPS', 'Rps', 'rps'];
  }
}

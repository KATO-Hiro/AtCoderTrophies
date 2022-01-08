import { RANK } from '../../constants/rank';
import RankCondition from './RankCondition';
import Trophy from './Trophy';

export default class LongestStreakCount extends Trophy {
  constructor(score: number) {
    const rankConditions = [
      new RankCondition(RANK.SSS, '2nd Anniversary!!', 730),
      new RankCondition(RANK.SS, '1st Anniversary!', 365),
      new RankCondition(RANK.S, '6 months Anniv.', 180),
      new RankCondition(RANK.AAA, 'Long Vacation', 90),
      new RankCondition(RANK.AA, 'Vacation', 30),
      new RankCondition(RANK.A, 'Golden Week', 7),
      new RankCondition(RANK.B, 'Welcome!', 3),
      new RankCondition(RANK.C, 'First Day', 1),
    ];

    super(score, rankConditions);
    this.title = 'LongestStreak';
    this.filterTitles = ['LongestStreak', 'Streak', 'streak', 'LS', 'Ls'];
  }
}

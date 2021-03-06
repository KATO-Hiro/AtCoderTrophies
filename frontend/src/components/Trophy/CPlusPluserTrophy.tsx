import { RANK } from '../../constants/rank';
import RankCondition from './RankCondition';
import Trophy from './Trophy';

export default class CPlusPluserTrophy extends Trophy {
  constructor(score: number) {
    const rankConditions = [
      new RankCondition(RANK.SSS, 'God Solver', 5000),
      new RankCondition(RANK.SS, 'Legendary Solver', 2500),
      new RankCondition(RANK.S, 'Ultra Solver', 1000),
      new RankCondition(RANK.AAA, 'Hyper Solver', 500),
      new RankCondition(RANK.AA, 'Super Solver', 250),
      new RankCondition(RANK.A, 'Regular Solver', 100),
      new RankCondition(RANK.B, 'Beginner Solver', 10),
      new RankCondition(RANK.C, 'First AC', 1),
    ];

    super(score, rankConditions);
    this.title = `CPlusPluser`;
    this.filterTitles = [
      'CPlusPluser',
      'CPlusPlus',
      'Cplusplus',
      'cplusplus',
      'C++',
      'Cpp',
      'cpp',
      'Cxx',
      'cxx',
      'cc',
    ];
  }
}

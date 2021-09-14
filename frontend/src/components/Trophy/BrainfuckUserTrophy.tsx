import { RANK } from '../../constants/rank';
import RankCondition from './RankCondition';
import Trophy from './Trophy';

export default class BrainfuckUserTrophy extends Trophy {
  constructor(score: number) {
    const rankConditions = [
      new RankCondition(RANK.SSS, 'God Solver', 1000),
      new RankCondition(RANK.SS, 'Legendary Solver', 500),
      new RankCondition(RANK.S, 'Ultra Solver', 250),
      new RankCondition(RANK.AAA, 'Hyper Solver', 100),
      new RankCondition(RANK.AA, 'Super Solver', 50),
      new RankCondition(RANK.A, 'Regular Solver', 25),
      new RankCondition(RANK.B, 'Beginner Solver', 10),
      new RankCondition(RANK.C, 'First AC', 1),
    ];

    super(score, rankConditions);
    this.title = `BrainfuckUser`;
    this.filterTitles = ['Brainfuck', 'brainfuck'];
  }
}

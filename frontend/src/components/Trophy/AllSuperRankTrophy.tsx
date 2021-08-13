import { RANK } from '../../constants/rank';
import RankCondition from './RankCondition';
import Trophy from './Trophy';

export default class AllSuperRankTrophy extends Trophy {
  constructor(score: number) {
    const rankConditions = [new RankCondition(RANK.SECRET, 'S Rank Hacker', 1)];

    super(score, rankConditions);
    this.title = 'AllSuperRank';
    this.filterTitles = ['AllSuperRank'];
    this.bottomMessage = 'All S Rank';
    this.hidden = true;
  }
}

import type { RANK } from '../../constants/rank';

export default class RankCondition {
  readonly rank: RANK;

  readonly titleName: string;

  readonly requiredScore: number;

  constructor(rank: RANK, titleName: string, requiredScore: number) {
    this.rank = rank;
    this.titleName = titleName;
    this.requiredScore = requiredScore;
  }

  get getRank(): RANK {
    return this.rank;
  }

  get getTitleName(): string {
    return this.titleName;
  }

  get getRequiredScore(): number {
    return this.requiredScore;
  }
}

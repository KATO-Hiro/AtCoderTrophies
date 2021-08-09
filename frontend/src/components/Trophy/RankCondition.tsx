import { RANK } from '../../constants/rank';

export default class RankCondition {
  readonly rank: RANK;

  readonly message: string;

  readonly requiredScore: number;

  constructor(rank: RANK, message: string, requiredScore: number) {
    this.rank = rank;
    this.message = message;
    this.requiredScore = requiredScore;
  }

  get getRank(): RANK {
    return this.rank;
  }

  get getMessage(): string {
    return this.message;
  }

  get getRequiredScore(): number {
    return this.requiredScore;
  }
}

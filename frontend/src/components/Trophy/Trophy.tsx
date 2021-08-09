import {
  DEFAULT_NO_BACKGROUND,
  DEFAULT_NO_FRAME,
  DEFAULT_PANEL_SIZE,
} from '../../constants/default-values';
import { RANK, RANK_ORDER } from '../../constants/rank';
import { Theme } from '../../interfaces/Theme';
import { COLORS } from '../../styles/background-themes';
import abridgeScore from '../../utils/abridgeScore';
import getNextRankBar from '../NextRankBar/NextRankBar';
import getTrophyIcon from '../TrophyIcon/TrophyIcon';
import RankCondition from './RankCondition';

export default class Trophy {
  rankCondition: RankCondition | null = null;

  rank: RANK = RANK.UNKNOWN;

  topMessage = 'Unknown';

  bottomMessage = '0';

  title = ''; // Use Pascal case (ex: HogeFugaFoo)

  filterTitles: Array<string> = [];

  hidden = false;

  constructor(
    private score: number,
    private rankConditions: Array<RankCondition>,
  ) {
    this.bottomMessage = abridgeScore(score);
    this.setRank();
  }

  setRank(): void {
    const sortedRankConditions = this.rankConditions.sort(
      (a, b) => RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank),
    );

    // Set the rank that hit the first condition.
    const rankCondition = sortedRankConditions.find(
      (r) => this.score >= r.getRequiredScore,
    );

    if (rankCondition != null) {
      this.rank = rankCondition.getRank;
      this.rankCondition = rankCondition;
      this.topMessage = rankCondition.getTitleName;
    }
  }

  private calculateNextRankRatio() {
    if (this.rank === RANK.UNKNOWN) {
      return 0;
    }

    const nextRankIndex = RANK_ORDER.indexOf(this.rank) - 1;

    // When got the max rank.
    if (nextRankIndex < 0 || this.rank === RANK.SSS) {
      return 1;
    }

    const nextRank = RANK_ORDER[nextRankIndex];
    const nextRankCondition = this.rankConditions.find(
      (r) => r.rank === nextRank,
    );
    const distance =
      nextRankCondition!.requiredScore - this.rankCondition!.requiredScore;
    const progress = this.score - this.rankCondition!.requiredScore;
    const result = progress / distance;

    return result;
  }

  render(
    theme: Theme = COLORS.default,
    x = 0,
    y = 0,
    panelSize = DEFAULT_PANEL_SIZE,
    noBackground = DEFAULT_NO_BACKGROUND,
    noFrame = DEFAULT_NO_FRAME,
  ): string {
    const {
      BACKGROUND: PRIMARY,
      TITLE: SECONDARY,
      TEXT,
      NEXT_RANK_BAR,
    } = theme;
    const nextRankBar = getNextRankBar(
      this.title,
      this.calculateNextRankRatio(),
      NEXT_RANK_BAR,
    );
    return `
      <svg
        x="${x}"
        y="${y}"
        width="${panelSize}"
        height="${panelSize}"
        viewBox="0 0 ${panelSize} ${panelSize}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          rx="4.5"
          width="${panelSize - 1}"
          height="${panelSize - 1}"
          stroke="#e1e4e8"
          fill="${PRIMARY}"
          stroke-opacity="${noFrame ? '0' : '1'}"
          fill-opacity="${noBackground ? '0' : '1'}"
        />
        ${getTrophyIcon(theme, this.rank)}
        <text
          x="50%"
          y="18"
          text-anchor="middle"
          font-family="Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji"
          font-weight="bold"
          font-size="13"
          fill="${SECONDARY}"
        >
          ${this.title}
        </text>
        <text
          x="50%"
          y="85"
          text-anchor="middle"
          font-family="Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji"
          font-weight="bold"
          font-size="10.5"
          fill="${TEXT}"
        >
          ${this.topMessage}
        </text>
        <text
          x="50%"
          y="97"
          text-anchor="middle"
          font-family="Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji"
          font-weight="bold"
          font-size="10"
          fill="${TEXT}"
        >
          ${this.bottomMessage}
        </text>
        ${nextRankBar}
      </svg>
    `;
  }
}

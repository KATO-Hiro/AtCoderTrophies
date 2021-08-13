import { Theme } from '../../interfaces/Theme';
import Trophy from '../Trophy/Trophy';
import TrophyList from '../TrophyList/TrophyList';

export default class TrophyFrame {
  private width = 0;

  private height = 0;

  constructor(
    private titles: Array<string>,
    private ranks: Array<string>,
    private maxColumn: number,
    private maxRow: number,
    private panelSize: number,
    private marginWidth: number,
    private marginHeight: number,
    private noBackground: boolean,
    private noFrame: boolean,
  ) {
    this.width =
      panelSize * this.maxColumn + this.marginWidth * (this.maxColumn - 1);
  }

  // TODO: Use UserInfo type.
  render(userInfo: unknown, theme: Theme): string {
    const trophyList = new TrophyList(userInfo);

    trophyList.filterByHidden();

    if (this.titles.length !== 0) {
      trophyList.filterByTitles(this.titles);
    }

    if (this.ranks.length !== 0) {
      trophyList.filterByRanks(this.ranks);
    }

    trophyList.sortByRank();

    const row = this.getRow(trophyList);
    this.height = this.getHeight(row);

    return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${this.renderTrophy(trophyList, theme)}
      </svg>`;
  }

  private getRow(trophyList: TrophyList): number {
    let row = Math.floor((trophyList.length - 1) / this.maxColumn) + 1;

    if (row > this.maxRow) {
      row = this.maxRow;
    }

    return row;
  }

  private getHeight(row: number): number {
    // Calculate the height of frame from turns
    return this.panelSize * row + this.marginHeight * (row - 1);
  }

  private renderTrophy(trophyList: TrophyList, theme: Theme): string {
    const reducer = (svg: string, trophy: Trophy, index: number) => {
      const currentColumn = index % this.maxColumn;
      const currentRow = Math.floor(index / this.maxColumn);
      const x =
        this.panelSize * currentColumn + this.marginWidth * currentColumn;
      const y = this.panelSize * currentRow + this.marginHeight * currentRow;

      return (
        svg +
        trophy.render(
          theme,
          x,
          y,
          this.panelSize,
          this.noBackground,
          this.noFrame,
        )
      );
    };

    return trophyList.getArray().reduce(reducer, '');
  }
}

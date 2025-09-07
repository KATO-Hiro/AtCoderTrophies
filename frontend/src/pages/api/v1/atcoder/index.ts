import type { NextApiRequest, NextApiResponse } from 'next';
import TrophyFrame from '../../../../components/TrophyFrame/TrophyFrame';
import UserInfo from '../../../../components/UserInfo/UserInfo';
import {
  DEFAULT_MARGIN_H,
  DEFAULT_MARGIN_W,
  DEFAULT_MAX_COLUMN,
  DEFAULT_MAX_ROW,
  DEFAULT_NO_BACKGROUND,
  DEFAULT_NO_FRAME,
  DEFAULT_PANEL_SIZE,
  ONE_DAY_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
} from '../../../../constants/default-values';
import { COLORS } from '../../../../styles/background-themes';
import AtCoderProblemsAPIClient from '../../../../utils/AtCoderProblemsAPIClient/atCoderProblemsAPIClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const {
    username: userName,
    theme: themeColor,
    column,
    row,
    title,
    rank,
    margin_w: marginWidth,
    margin_h: marginHeight,
    no_bg,
    no_frame,
  } = req.query;

  // Enable to change the following parameters using user info.
  const maxColumn = column === undefined || column === '' ? DEFAULT_MAX_COLUMN : column;
  const maxRow = row === undefined || row === '' ? DEFAULT_MAX_ROW : row;
  const theme = Object.keys(COLORS).includes(themeColor as string)
    ? COLORS[themeColor as string]
    : COLORS.default;
  const paddingWidth =
    marginWidth === undefined || marginWidth === '' ? DEFAULT_MARGIN_W : marginWidth;
  const paddingHeight =
    marginHeight === undefined || marginHeight === '' ? DEFAULT_MARGIN_H : marginHeight;
  const noBackground =
    no_bg === undefined || no_bg === '' || no_bg === 'false' ? DEFAULT_NO_BACKGROUND : no_bg;
  const noFrame =
    no_frame === undefined || no_frame === '' || no_frame === 'false' ? DEFAULT_NO_FRAME : no_frame;
  const titleList = title as string;
  const titles: Array<string> = title === undefined || title === '' ? [] : titleList.split(',');
  const rankList = rank as string;
  const ranks: Array<string> = rank === undefined || rank === '' ? [] : rankList.split(',');

  // No username.
  if (userName === '') {
    res.setHeader('Content-type', 'text');
    res.status(404).send('Not found a query parameter: username');
    return;
  }

  const atCoderProblemsAPIClient = new AtCoderProblemsAPIClient(userName as string);
  await atCoderProblemsAPIClient.readAPI();

  // username is not exist.
  if (!atCoderProblemsAPIClient.isValidUserName()) {
    res.setHeader('Content-type', 'text');
    res.status(404).send(`Not found username: ${userName as string}`);
    return;
  }

  const userInfo = new UserInfo(atCoderProblemsAPIClient);
  const cacheSeconds = ONE_DAY_IN_SECONDS;

  res.setHeader('Content-type', 'image/svg+xml');
  res.setHeader(
    'Cache-Control',
    `public, max-age=${cacheSeconds}, stale-while-revalidate=${ONE_HOUR_IN_SECONDS}`,
  );

  const trophyFrame = new TrophyFrame(
    titles,
    ranks,
    maxColumn as number,
    maxRow as number,
    DEFAULT_PANEL_SIZE,
    paddingWidth as number,
    paddingHeight as number,
    noBackground as boolean,
    noFrame as boolean,
  );

  res.status(200).send(trophyFrame.render(userInfo, theme));
}

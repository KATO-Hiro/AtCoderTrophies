import { NextApiRequest, NextApiResponse } from 'next';
import TrophyFrame from '../../../../components/TrophyFrame/TrophyFrame';
import UserInfo from '../../../../components/UserInfo/UserInfo';
import {
  DEFAULT_PANEL_SIZE,
  DEFAULT_MARGIN_H,
  DEFAULT_MARGIN_W,
  DEFAULT_NO_BACKGROUND,
  DEFAULT_NO_FRAME,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
} from '../../../../constants/default-values';
import { COLORS } from '../../../../styles/background-themes';
import AtCoderProblemsAPIClient from '../../../../utils/AtCoderProblemsAPIClient/atCoderProblemsAPIClient';

const circle = (name: string) => `\
  <svg height="100" width="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="20" stroke="black" stroke-width="3" fill="blue" />
    <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em">
      <tspan x="10" y="70">${name}</tspan>
    </text>
  </svg>
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> {
  const { username: userName, background_theme: backgroundTheme } = req.query;

  // TODO: Enable to change the following parameters using user info.
  const maxColumn = 5;
  const maxRow = 5;
  const theme = COLORS.monokai;
  const marginWidth = DEFAULT_MARGIN_W;
  const paddingHeight = DEFAULT_MARGIN_H;
  const noBackground = DEFAULT_NO_BACKGROUND;
  const noFrame = DEFAULT_NO_FRAME;
  const titles: Array<string> = [];
  const ranks: Array<string> = [];

  // No username.
  if (userName === '') {
    res.setHeader('Content-type', 'text');
    res.status(404).send('Not found a query parameter: username');
    return;
  }

  const atCoderProblemsAPIClient = new AtCoderProblemsAPIClient(
    userName as string,
  );
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
    maxColumn,
    maxRow,
    DEFAULT_PANEL_SIZE,
    marginWidth,
    paddingHeight,
    noBackground,
    noFrame,
  );

  res.status(200).send(trophyFrame.render(userInfo, theme));
}

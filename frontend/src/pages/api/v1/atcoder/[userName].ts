import { NextApiRequest, NextApiResponse } from 'next';
import AcceptedCountTrophy from '../../../../components/Trophy/AcceptedCountTrophy';

import {
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
} from '../../../../constants/default-values';

const circle = (name: string) => `\
  <svg height="100" width="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="20" stroke="black" stroke-width="3" fill="blue" />
    <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="16" letter-spacing="0em">
      <tspan x="10" y="70">${name}</tspan>
    </text>
  </svg>
`;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): any {
  const { userName, background_theme: backgroundTheme } = req.query;

  // TODO: Set initial values.

  // TODO: Error handling.
  // No username.

  // TODO: Error handling.
  // username is not exist.

  res.setHeader('Content-type', 'image/svg+xml');

  const cacheSeconds = ONE_DAY_IN_SECONDS;
  res.setHeader(
    'Cache-Control',
    `public, max-age=${cacheSeconds}, stale-while-revalidate=${ONE_HOUR_IN_SECONDS}`,
  );

  // res.status(200).send(circle(userName as string));

  // TODO: Enable to show multiple trophies.
  const acceptedCountTrophy = new AcceptedCountTrophy(1000);
  res.status(200).send(acceptedCountTrophy.render());
}

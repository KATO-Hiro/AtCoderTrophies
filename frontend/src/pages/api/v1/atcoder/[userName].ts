import { NextApiRequest, NextApiResponse } from 'next';

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
  res.status(200).send(circle(userName as string));
}

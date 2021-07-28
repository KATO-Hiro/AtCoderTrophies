// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

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

  res.setHeader('Content-type', 'application/json');
  res
    .status(200)
    .json({ user_name: userName, background_theme: backgroundTheme });
}

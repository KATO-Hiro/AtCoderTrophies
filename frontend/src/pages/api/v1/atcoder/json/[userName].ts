// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): any {
  const { userName, background_theme: backgroundTheme } = req.query;

  res
    .status(200)
    .json({ user_name: userName, background_theme: backgroundTheme });
}

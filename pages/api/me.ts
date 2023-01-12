import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;
  const jwt = cookies.OurSiteJWT;

  res.json({ message: 'Top secret data!' });
}

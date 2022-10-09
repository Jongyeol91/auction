import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;
  const jwt = cookies.OurSiteJWT;
  console.log(jwt);

  res.json({ message: 'Top secret data!' });
}

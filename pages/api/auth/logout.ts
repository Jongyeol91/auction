import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;
  const jwt = cookies.OursiteJWT;

  if (!jwt) {
    res.json({ message: 'you are already not logged in' });
  } else {
    const serialised = serialize('OurSiteJWT', null, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    });
    res.setHeader('Set-Cookie', serialised);
    res.json({ message: 'Successfuly logged out!' });
  }
}

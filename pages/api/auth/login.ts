import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const secret = 'testSecret';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { userId, password } = req.body;

  if (userId === 'admin' && password === 'admin') {
    const token = sign(
      {
        exp: (Math.floor(Date.now() / 1000) + 60 * 60 * 60) ^ (24 * 30),
        userId: userId,
      },
      secret,
    );
    const serialised = serialize('OurSiteJWT', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    res.setHeader('Set-Cookie', serialised);
    res.status(200).json({ message: 'Success!' });
  } else {
    return res.status(401).json({ message: 'invalid credentials' });
  }
}

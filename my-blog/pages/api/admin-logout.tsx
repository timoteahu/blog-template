import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  // Clear the cookie by setting maxAge to -1
  const cookie = serialize('admin', '', {
    path: '/',
    httpOnly: true,
    maxAge: -1,
  });

  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ message: 'Logged out' });
}
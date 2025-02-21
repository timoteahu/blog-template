import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'Password required' });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    // Set the admin cookie
    const cookie = serialize('admin', 'true', {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 8, // 8 hours
    });

    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ message: 'Logged in successfully' });
  } else {
    return res.status(401).json({ message: 'Invalid password' });
  }
}
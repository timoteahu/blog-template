// pages/api/admin-login.js
import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end() // Method Not Allowed
  }

  const { password } = req.body

  // Compare with your stored password (from env)
  if (password === process.env.ADMIN_PASSWORD) {
    // If correct, set a "token" in a cookie (just something to signify admin)
    // In production, you'd want a more secure approach, set HttpOnly, etc.
    const token = 'some-admin-token'
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: 'strict',
        path: '/',
      })
    )
    return res.status(200).json({ message: 'Logged in' })
  } else {
    return res.status(401).json({ message: 'Invalid password' })
  }
}

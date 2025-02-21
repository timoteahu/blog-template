import { GetServerSidePropsContext } from 'next'
import cookie from 'cookie'

export function checkAdminToken(context: GetServerSidePropsContext) {
  const { req } = context
  if (!req.headers.cookie) return false

  const { admin_token } = cookie.parse(req.headers.cookie)
  // Check if it matches the token we set above
  // e.g. "some-admin-token"
  return admin_token === process.env.ADMIN_TOKEN
}


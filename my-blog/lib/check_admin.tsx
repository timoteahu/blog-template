import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export function isAdmin(context: GetServerSidePropsContext): boolean {
  const cookies = parseCookies(context);
  return cookies.admin === 'true';
}
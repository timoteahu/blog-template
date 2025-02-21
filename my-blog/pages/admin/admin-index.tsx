import Link from 'next/link'
import { checkAdminToken } from '../../lib/check_admin'
import { GetServerSidePropsContext } from 'next'

export default function AdminHome() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <Link href="/admin/new-post">
        <a>Create New Post</a>
      </Link>
      {/* Add more admin links like "Edit Post", etc. */}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const isAdmin = checkAdminToken(context)
  if (!isAdmin) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
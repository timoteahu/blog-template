import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabaseClient'
import { checkAdminToken } from '../../lib/check_admin'
import { GetServerSidePropsContext } from 'next'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !content) return

    const { error } = await supabase
      .from('posts')
      .insert([{ title, content }])

    if (error) {
      alert('Error creating post: ' + error.message)
    } else {
      // Go back to home or admin page
      router.push('/')
    }
  }

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Publish</button>
      </form>
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

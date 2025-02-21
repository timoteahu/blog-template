import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    // Call our API route to check if password is correct
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      // If success, redirect to /admin
      router.push('/admin')
    } else {
      alert('Wrong password')
    }
  }

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}
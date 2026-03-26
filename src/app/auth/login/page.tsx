'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        setIsLoading(false)
        return
      }

      setIsLoading(false)
      router.replace('/dashboard')
    } catch (err) {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(circle at 30% 50%, var(--primary) 0%, transparent 50%)',
          transform: 'scale(1.5)'
        }}
      />
      
      <div 
        className="relative w-full max-w-md"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="card">
          <div className="mb-8">
            <Link href="/" className="inline-block mb-6">
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                SellFast
              </h1>
            </Link>
            <h2 className="heading-2 mb-2" style={{ color: 'var(--text)' }}>
              Welcome back
            </h2>
            <p className="text-base" style={{ color: 'var(--text-muted)' }}>
              Enter your credentials to access your account
            </p>
          </div>
          
          {error && (
            <div 
              className="mb-6 p-4 rounded-lg border"
              style={{
                background: 'rgba(255, 107, 157, 0.1)',
                borderColor: 'var(--accent)',
                color: 'var(--accent)'
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full text-base"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center mt-8 text-sm" style={{ color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link 
              href="/auth/register" 
              className="font-semibold hover:opacity-70 transition-opacity"
              style={{ color: 'var(--primary)' }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

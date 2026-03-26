'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
        redirect: 'follow',
      })

      if (response.redirected) {
        window.location.href = response.url
        return
      }

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Registration failed')
        setIsLoading(false)
        return
      }

      window.location.href = '/dashboard'
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
          background: 'radial-gradient(circle at 70% 50%, var(--secondary) 0%, transparent 50%)',
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
              Create account
            </h2>
            <p className="text-base" style={{ color: 'var(--text-muted)' }}>
              Start selling digital products in minutes
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

            <div>
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center mt-8 text-sm" style={{ color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link 
              href="/auth/login" 
              className="font-semibold hover:opacity-70 transition-opacity"
              style={{ color: 'var(--primary)' }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface ApiKey {
  id: string
  name: string
  keyPrefix: string
  shopId: string
  shop: {
    id: string
    name: string
  }
  lastUsedAt: string | null
  createdAt: string
}

export default function ApiKeysPage() {
  const [isVisible, setIsVisible] = useState(false)
  
  const apiKeys: ApiKey[] = [
    {
      id: '1',
      name: 'Production Key',
      keyPrefix: 'sk_live_',
      shopId: '1',
      shop: {
        id: '1',
        name: 'Tech Store'
      },
      lastUsedAt: new Date(Date.now() - 86400000).toISOString(),
      createdAt: new Date(Date.now() - 604800000).toISOString()
    },
    {
      id: '2',
      name: 'Test Key',
      keyPrefix: 'sk_test_',
      shopId: '1',
      shop: {
        id: '1',
        name: 'Tech Store'
      },
      lastUsedAt: new Date(Date.now() - 3600000).toISOString(),
      createdAt: new Date(Date.now() - 2592000000).toISOString()
    },
    {
      id: '3',
      name: 'Fashion API Key',
      keyPrefix: 'sk_live_',
      shopId: '2',
      shop: {
        id: '2',
        name: 'Fashion Hub'
      },
      lastUsedAt: new Date(Date.now() - 172800000).toISOString(),
      createdAt: new Date(Date.now() - 1209600000).toISOString()
    }
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen flex">
      <aside className="sidebar">
        <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <Link href="/" className="inline-block">
            <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
              SellFast
            </h1>
          </Link>
        </div>
        <nav className="py-6">
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link href="/dashboard/shops" className="nav-link">
            Shops
          </Link>
          <Link href="/dashboard/products" className="nav-link">
            Products
          </Link>
          <Link href="/dashboard/api-keys" className="nav-link active">
            API Keys
          </Link>
          <Link href="/dashboard/analytics" className="nav-link">
            Analytics
          </Link>
          <Link href="/api/auth/logout" className="nav-link" style={{ color: 'var(--accent)' }}>
            Logout
          </Link>
        </nav>
      </aside>
      
      <main className="flex-1 ml-[240px]">
        <div className="p-8 lg:p-12">
          <div 
            className="mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <h2 className="heading-2 mb-4" style={{ color: 'var(--text)' }}>
              API Keys
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Manage your API keys for integrations
            </p>
          </div>

          <div className="space-y-4">
            {apiKeys.map((apiKey, index) => (
              <ApiKeyCard key={apiKey.id} apiKey={apiKey} delay={index * 100} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function ApiKeyCard({ apiKey, delay }: { apiKey: ApiKey; delay: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="heading-3 mb-3" style={{ color: 'var(--text)' }}>
            {apiKey.name}
          </h3>
          <div className="mb-4">
            <code 
              className="text-sm px-3 py-2 rounded-lg inline-block"
              style={{ 
                background: 'var(--background)',
                color: 'var(--text-muted)',
                fontFamily: 'monospace'
              }}
            >
              {apiKey.keyPrefix}••••••••
            </code>
          </div>
          <div className="space-y-2">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              <span className="font-semibold" style={{ color: 'var(--text)' }}>Shop:</span> {apiKey.shop.name}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              <span className="font-semibold" style={{ color: 'var(--text)' }}>Last used:</span> {apiKey.lastUsedAt ? new Date(apiKey.lastUsedAt).toLocaleDateString() : 'Never'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/api-keys/${apiKey.id}`}
            className="text-sm font-semibold hover:opacity-70 transition-opacity"
            style={{ color: 'var(--primary)' }}
          >
            Manage
          </Link>
        </div>
      </div>
    </div>
  )
}

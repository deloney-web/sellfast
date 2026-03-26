'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Shop {
  id: string
  name: string
  subdomain: string
  description: string | null
  _count: {
    products: number
    customers: number
    purchases: number
  }
}

export default function ShopsPage() {
  const [isVisible, setIsVisible] = useState(false)
  
  const shops: Shop[] = [
    {
      id: '1',
      name: 'Tech Store',
      subdomain: 'techstore',
      description: 'Premium electronics and gadgets',
      _count: {
        products: 24,
        customers: 156,
        purchases: 89
      }
    },
    {
      id: '2',
      name: 'Fashion Hub',
      subdomain: 'fashionhub',
      description: 'Trendy clothing and accessories',
      _count: {
        products: 45,
        customers: 234,
        purchases: 167
      }
    },
    {
      id: '3',
      name: 'Home Essentials',
      subdomain: 'homeessentials',
      description: 'Quality home and kitchen products',
      _count: {
        products: 32,
        customers: 189,
        purchases: 124
      }
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
          <Link href="/dashboard/shops" className="nav-link active">
            Shops
          </Link>
          <Link href="/dashboard/products" className="nav-link">
            Products
          </Link>
          <Link href="/dashboard/api-keys" className="nav-link">
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
              Shops
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Manage your digital product stores
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop, index) => (
              <ShopCard key={shop.id} shop={shop} delay={index * 100} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function ShopCard({ shop, delay }: { shop: Shop; delay: number }) {
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
      <h3 className="heading-3 mb-2" style={{ color: 'var(--text)' }}>
        {shop.name}
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
        {shop.subdomain}.yourdomain.com
      </p>
      {shop.description && (
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          {shop.description}
        </p>
      )}
      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        <div>
          <div className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
            {shop._count.products}
          </div>
          <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Products
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
            {shop._count.customers}
          </div>
          <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Customers
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
            {shop._count.purchases}
          </div>
          <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Purchases
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Link
          href={`/dashboard/shops/${shop.id}`}
          className="text-sm font-semibold hover:opacity-70 transition-opacity"
          style={{ color: 'var(--primary)' }}
        >
          Manage
        </Link>
        <Link
          href={`/dashboard/products?shop_id=${shop.id}`}
          className="text-sm font-semibold hover:opacity-70 transition-opacity"
          style={{ color: 'var(--text-muted)' }}
        >
          Products
        </Link>
      </div>
    </div>
  )
}

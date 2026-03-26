'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  shopId: string
  shop: {
    id: string
    name: string
  }
}

export default function ProductsPage() {
  const [isVisible, setIsVisible] = useState(false)
  
  const products: Product[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones',
      price: 199.99,
      shopId: '1',
      shop: {
        id: '1',
        name: 'Tech Store'
      }
    },
    {
      id: '2',
      name: 'Smart Watch',
      description: 'Fitness tracking smartwatch with heart rate monitor',
      price: 299.99,
      shopId: '1',
      shop: {
        id: '1',
        name: 'Tech Store'
      }
    },
    {
      id: '3',
      name: 'Designer T-Shirt',
      description: '100% cotton designer t-shirt',
      price: 49.99,
      shopId: '2',
      shop: {
        id: '2',
        name: 'Fashion Hub'
      }
    },
    {
      id: '4',
      name: 'Leather Jacket',
      description: 'Premium leather jacket with multiple pockets',
      price: 249.99,
      shopId: '2',
      shop: {
        id: '2',
        name: 'Fashion Hub'
      }
    },
    {
      id: '5',
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with thermal carafe',
      price: 89.99,
      shopId: '3',
      shop: {
        id: '3',
        name: 'Home Essentials'
      }
    },
    {
      id: '6',
      name: 'Blender Set',
      description: 'High-speed blender with multiple attachments',
      price: 129.99,
      shopId: '3',
      shop: {
        id: '3',
        name: 'Home Essentials'
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
          <Link href="/dashboard/shops" className="nav-link">
            Shops
          </Link>
          <Link href="/dashboard/products" className="nav-link active">
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
              Products
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Manage your digital products
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} delay={index * 100} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function ProductCard({ product, delay }: { product: Product; delay: number }) {
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
        {product.name}
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
        {product.description}
      </p>
      <p className="text-xs mb-6 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        {product.shop.name}
      </p>
      <div className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
        ${product.price.toFixed(2)}
      </div>
      <Link
        href={`/dashboard/products/${product.id}`}
        className="text-sm font-semibold hover:opacity-70 transition-opacity"
        style={{ color: 'var(--primary)' }}
      >
        Manage
      </Link>
    </div>
  )
}

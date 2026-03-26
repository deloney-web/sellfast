'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Analytics {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalShops: number
  averageOrderValue: number
  conversionRate: number
}

export default function AnalyticsPage() {
  const [isVisible, setIsVisible] = useState(false)
  
  const analytics: Analytics = {
    totalRevenue: 45678.90,
    totalOrders: 1234,
    totalProducts: 89,
    totalShops: 12,
    averageOrderValue: 37.02,
    conversionRate: 3.5
  }

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
          <Link href="/dashboard/api-keys" className="nav-link">
            API Keys
          </Link>
          <Link href="/dashboard/analytics" className="nav-link active">
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
              Analytics
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Track your performance metrics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <StatCard
              title="Total Revenue"
              value={`$${analytics.totalRevenue.toFixed(2)}`}
              delay={0}
              color="var(--primary)"
            />
            <StatCard
              title="Total Orders"
              value={analytics.totalOrders.toString()}
              delay={100}
              color="var(--secondary)"
            />
            <StatCard
              title="Total Products"
              value={analytics.totalProducts.toString()}
              delay={200}
              color="var(--accent)"
            />
            <StatCard
              title="Total Shops"
              value={analytics.totalShops.toString()}
              delay={300}
              color="var(--primary)"
            />
            <StatCard
              title="Avg. Order Value"
              value={`$${analytics.averageOrderValue.toFixed(2)}`}
              delay={400}
              color="var(--secondary)"
            />
            <StatCard
              title="Conversion Rate"
              value={`${analytics.conversionRate}%`}
              delay={500}
              color="var(--accent)"
            />
          </div>

          <div 
            className="card"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 600ms'
            }}
          >
            <h3 className="heading-3 mb-6" style={{ color: 'var(--text)' }}>
              Performance Overview
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                    Revenue Growth
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    +23.5%
                  </span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'var(--background)' }}>
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: '78%',
                      background: 'var(--primary)',
                      transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                    Order Completion
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    94.2%
                  </span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'var(--background)' }}>
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: '94%',
                      background: 'var(--secondary)',
                      transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                    Customer Satisfaction
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    4.8/5.0
                  </span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'var(--background)' }}>
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: '96%',
                      background: 'var(--accent)',
                      transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ title, value, delay, color }: { title: string; value: string; delay: number; color: string }) {
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
      <div className="text-sm font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        {title}
      </div>
      <div className="text-4xl font-bold" style={{ color }}>
        {value}
      </div>
    </div>
  )
}

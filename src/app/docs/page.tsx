'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DocsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-500" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(-20px)' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
              SellFast
            </h1>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/auth/login"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-muted)' }}
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="btn btn-primary text-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div 
          className="mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <h2 className="heading-1 mb-6" style={{ color: 'var(--text)' }}>
            API Documentation
          </h2>
          <p className="text-xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Build powerful integrations with our RESTful API
          </p>
        </div>

        <div className="card mb-12">
          <h3 className="heading-2 mb-6" style={{ color: 'var(--text)' }}>
            Authentication
          </h3>
          <p className="text-lg mb-6" style={{ color: 'var(--text-muted)' }}>
            All API requests require authentication using an API key in the Authorization header.
          </p>
          <div 
            className="p-6 rounded-lg mb-6"
            style={{ 
              background: 'var(--background)',
              border: '1px solid var(--border)'
            }}
          >
            <code 
              className="text-sm"
              style={{ 
                color: 'var(--text)',
                fontFamily: 'monospace'
              }}
            >
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
          <p className="text-base" style={{ color: 'var(--text-muted)' }}>
            API keys can be created and managed in your dashboard under API Keys.
          </p>
        </div>

        <div className="card mb-12">
          <h3 className="heading-2 mb-6" style={{ color: 'var(--text)' }}>
            Rate Limiting
          </h3>
          <p className="text-lg mb-6" style={{ color: 'var(--text-muted)' }}>
            API requests are rate limited to prevent abuse. The default limits are:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3" style={{ color: 'var(--text-muted)' }}>
              <div 
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ background: 'var(--primary)' }}
              />
              <span>100 requests per 15 minutes per API key</span>
            </li>
            <li className="flex items-start gap-3" style={{ color: 'var(--text-muted)' }}>
              <div 
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ background: 'var(--primary)' }}
              />
              <span>100 requests per 15 minutes per authenticated user</span>
            </li>
          </ul>
          <p className="text-base" style={{ color: 'var(--text-muted)' }}>
            When rate limits are exceeded, you will receive a 429 status code.
          </p>
        </div>

        <div className="card mb-12">
          <h3 className="heading-2 mb-8" style={{ color: 'var(--text)' }}>
            API Endpoints
          </h3>

          <div className="space-y-12">
            <div>
              <h4 className="heading-3 mb-6" style={{ color: 'var(--text)' }}>
                Shops
              </h4>
              <div className="space-y-4">
                <EndpointCard method="GET" endpoint="/api/shops" description="Get all shops for authenticated user" />
                <EndpointCard method="POST" endpoint="/api/shops" description="Create a new shop" />
                <EndpointCard method="PATCH" endpoint="/api/shops/:id" description="Update a shop" />
                <EndpointCard method="DELETE" endpoint="/api/shops/:id" description="Delete a shop" />
              </div>
            </div>

            <div>
              <h4 className="heading-3 mb-6" style={{ color: 'var(--text)' }}>
                Products
              </h4>
              <div className="space-y-4">
                <EndpointCard method="GET" endpoint="/api/products?shop_id=X" description="Get all products for a shop" />
                <EndpointCard method="POST" endpoint="/api/products" description="Create a new product" />
                <EndpointCard method="PATCH" endpoint="/api/products/:id" description="Update a product" />
                <EndpointCard method="DELETE" endpoint="/api/products/:id" description="Delete a product" />
              </div>
            </div>

            <div>
              <h4 className="heading-3 mb-6" style={{ color: 'var(--text)' }}>
                API Keys
              </h4>
              <div className="space-y-4">
                <EndpointCard method="GET" endpoint="/api/api-keys?shop_id=X" description="Get all API keys for a shop" />
                <EndpointCard method="POST" endpoint="/api/api-keys" description="Create a new API key" />
                <EndpointCard method="POST" endpoint="/api/api-keys/:id/rotate" description="Rotate an API key (generate new key)" />
                <EndpointCard method="DELETE" endpoint="/api/api-keys/:id" description="Delete an API key" />
              </div>
            </div>

            <div>
              <h4 className="heading-3 mb-6" style={{ color: 'var(--text)' }}>
                Customers
              </h4>
              <div className="space-y-4">
                <EndpointCard method="GET" endpoint="/api/customers?shop_id=X" description="Get all customers for a shop" />
                <EndpointCard method="POST" endpoint="/api/customers" description="Create a new customer" />
              </div>
            </div>

            <div>
              <h4 className="heading-3 mb-6" style={{ color: 'var(--text)' }}>
                Tickets
              </h4>
              <div className="space-y-4">
                <EndpointCard method="GET" endpoint="/api/tickets?shop_id=X" description="Get all tickets for a shop" />
                <EndpointCard method="POST" endpoint="/api/tickets" description="Create a new ticket" />
                <EndpointCard method="POST" endpoint="/api/tickets/:id/replies" description="Add a reply to a ticket" />
              </div>
            </div>

            <div>
              <h4 className="heading-3 mb-6" style={{ color: 'var(--text)' }}>
                Analytics
              </h4>
              <div className="space-y-4">
                <EndpointCard method="GET" endpoint="/api/analytics?shop_id=X" description="Get analytics for a shop" />
                <EndpointCard method="POST" endpoint="/api/analytics" description="Create an analytics event" />
              </div>
            </div>

            <div>
              <h4 className="heading-3 mb-6" style={{ color: 'var(--text)' }}>
                Checkout
              </h4>
              <div className="space-y-4">
                <EndpointCard method="POST" endpoint="/api/checkout/create-session" description="Create a checkout session" />
                <EndpointCard method="POST" endpoint="/api/checkout/complete" description="Complete a checkout session" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="heading-2 mb-8" style={{ color: 'var(--text)' }}>
            Code Examples
          </h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="heading-3 mb-4" style={{ color: 'var(--text)' }}>
                JavaScript/Node.js
              </h4>
              <div 
                className="p-6 rounded-lg overflow-x-auto"
                style={{ 
                  background: 'var(--background)',
                  border: '1px solid var(--border)'
                }}
              >
                <pre className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>
{`const response = await fetch('https://api.example.com/api/products?shop_id=YOUR_SHOP_ID', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
})

const data = await response.json()`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="heading-3 mb-4" style={{ color: 'var(--text)' }}>
                Python
              </h4>
              <div 
                className="p-6 rounded-lg overflow-x-auto"
                style={{ 
                  background: 'var(--background)',
                  border: '1px solid var(--border)'
                }}
              >
                <pre className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>
{`import requests

response = requests.get(
    'https://api.example.com/api/products',
    params={'shop_id': 'YOUR_SHOP_ID'},
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
    }
)

data = response.json()
print(data['products'])`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="heading-3 mb-4" style={{ color: 'var(--text)' }}>
                cURL
              </h4>
              <div 
                className="p-6 rounded-lg overflow-x-auto"
                style={{ 
                  background: 'var(--background)',
                  border: '1px solid var(--border)'
                }}
              >
                <pre className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>
{`curl -X GET \\
  'https://api.example.com/api/products?shop_id=YOUR_SHOP_ID' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EndpointCard({ method, endpoint, description }: { method: string; endpoint: string; description: string }) {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'var(--secondary)'
      case 'POST': return 'var(--primary)'
      case 'PATCH': return '#f59e0b'
      case 'DELETE': return 'var(--accent)'
      default: return 'var(--text-muted)'
    }
  }

  return (
    <div 
      className="p-4 rounded-lg border-l-4"
      style={{ 
        borderColor: getMethodColor(method),
        background: 'var(--surface)'
      }}
    >
      <code 
        className="text-sm font-semibold mb-2 block"
        style={{ 
          color: getMethodColor(method),
          fontFamily: 'monospace'
        }}
      >
        {method} {endpoint}
      </code>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {description}
      </p>
    </div>
  )
}

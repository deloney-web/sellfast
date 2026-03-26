'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-500" style={{ opacity: isVisible ?1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(-20px)' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
            SellFast
          </h1>
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

      <section 
        ref={heroRef}
        className="min-h-screen flex items-center px-6 relative"
        style={{ 
          paddingTop: '120px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="heading-1" style={{ color: 'var(--text)' }}>
                  Sell Digital
                  <br />
                  <span style={{ color: 'var(--primary)' }}>Products</span>
                </h2>
                <p 
                  className="text-xl leading-relaxed max-w-lg"
                  style={{ 
                    color: 'var(--text-muted)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                  }}
                >
                  Create your own online shop, manage products, and sell digital files
                  with our powerful multi-tenant platform.
                </p>
              </div>
              <div 
                className="flex flex-wrap gap-4"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
                }}
              >
                <Link
                  href="/auth/register"
                  className="btn btn-primary text-base"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/docs"
                  className="btn btn-secondary text-base"
                >
                  View API Docs
                </Link>
              </div>
            </div>
            
            <div 
              className="relative hidden lg:block"
              style={{ 
                opacity: isVisible ?1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
              }}
            >
              <div 
                className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
                style={{ 
                  background: 'var(--primary)',
                  transform: 'rotate(-6deg)'
                }}
              />
              <div 
                className="relative rounded-3xl p-8 space-y-4"
                style={{ 
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  transform: 'rotate(-3deg)'
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ background: 'var(--primary)' }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ background: 'var(--secondary)' }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ background: 'var(--accent)' }}
                  />
                </div>
                <div className="space-y-3">
                  <div className="h-4 rounded" style={{ background: 'var(--border)', width: '80%' }} />
                  <div className="h-4 rounded" style={{ background: 'var(--border)', width: '60%' }} />
                  <div className="h-4 rounded" style={{ background: 'var(--border)', width: '90%' }} />
                </div>
                <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Revenue</span>
                    <span className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>$12,450</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h3 className="heading-2 mb-6" style={{ color: 'var(--text)' }}>
              Features
            </h3>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              Everything you need to build, manage, and scale your digital product business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Multi-Tenant Shops',
                description: 'Create multiple shops with unique subdomains. Each shop has its own products, customers, and analytics.',
                delay: 0
              },
              {
                title: 'Developer API',
                description: 'RESTful API with authentication, rate limiting, and comprehensive documentation. Integrate with any platform.',
                delay: 100
              },
              {
                title: 'Analytics & Insights',
                description: 'Track product views, purchases, revenue, and API usage. Get detailed insights to grow your business.',
                delay: 200
              },
              {
                title: 'Secure Payments',
                description: 'Built-in checkout integration with Stripe. Secure payment processing for your digital products.',
                delay: 300
              },
              {
                title: 'Customer Management',
                description: 'Manage your customers, track purchases, and provide support through our built-in ticket system.',
                delay: 400
              },
              {
                title: 'API Keys',
                description: 'Generate API keys for your applications. Full control over authentication and rate limiting.',
                delay: 500
              }
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6" style={{ background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h3 className="heading-2 mb-6" style={{ color: 'var(--text)' }}>
              How It Works
            </h3>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              Get started in minutes, not days.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { number: '01', title: 'Create Account', description: 'Sign up for free and create your first shop in minutes.' },
              { number: '02', title: 'Add Products', description: 'Upload your digital products and set prices and descriptions.' },
              { number: '03', title: 'Start Selling', description: 'Share your shop link and start selling to customers worldwide.' }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div 
                  className="text-8xl font-bold mb-6 opacity-10"
                  style={{ 
                    color: 'var(--primary)',
                    fontFamily: 'monospace'
                  }}
                >
                  {step.number}
                </div>
                <h4 className="heading-3 mb-3" style={{ color: 'var(--text)' }}>
                  {step.title}
                </h4>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h3 className="heading-2 mb-6" style={{ color: 'var(--text)' }}>
              Pricing
            </h3>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              Simple, transparent pricing. No hidden fees.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard
              title="Free"
              price="$0"
              features={['1 Shop', '10 Products', 'Basic Analytics', 'Community Support']}
              buttonText="Get Started"
              href="/auth/register"
              variant="secondary"
            />
            <PricingCard
              title="Pro"
              price="$29"
              features={['Unlimited Shops', 'Unlimited Products', 'Advanced Analytics', 'Priority Support', 'API Access']}
              buttonText="Get Started"
              href="/auth/register"
              variant="primary"
              badge="Popular"
            />
            <PricingCard
              title="Enterprise"
              price="$99"
              features={['Everything in Pro', 'Custom Domain', 'White Label', 'Dedicated Support', 'SLA Guarantee']}
              buttonText="Contact Sales"
              href="/auth/register"
              variant="secondary"
            />
          </div>
        </div>
      </section>

      <section className="py-32 px-6" style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-20">
            <h3 className="heading-2 mb-6" style={{ color: 'var(--text)' }}>
              FAQ
            </h3>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Common questions about SellFast.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: 'What types of digital products can I sell?',
                answer: 'You can sell any type of digital product including software, ebooks, courses, templates, music, videos, and more.'
              },
              {
                question: 'How do I receive payments?',
                answer: 'We integrate with Stripe for secure payment processing. Payments are automatically deposited to your Stripe account.'
              },
              {
                question: 'Can I use my own domain?',
                answer: 'Yes! With our Enterprise plan, you can use your own custom domain for your shop.'
              },
              {
                question: 'Is there a transaction fee?',
                answer: 'We charge a small transaction fee on each sale. Stripe also charges their standard processing fees.'
              }
            ].map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="heading-2 mb-6" style={{ color: 'var(--text)' }}>
            Ready to Start Selling?
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Join thousands of creators selling digital products with SellFast.
          </p>
          <Link href="/auth/register" className="btn btn-primary text-lg">
            Get Started Free
          </Link>
        </div>
      </section>

      <footer className="py-16 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Product
              </h4>
              <ul className="space-y-3">
                <li><Link href="/docs" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text)' }}>Features</Link></li>
                <li><Link href="/docs" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text)' }}>Pricing</Link></li>
                <li><Link href="/docs" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text)' }}>API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Company
              </h4>
              <ul className="space-y-3">
                <li><Link href="/docs" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text)' }}>About</Link></li>
                <li><Link href="/docs" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text)' }}>Blog</Link></li>
                <li><Link href="/docs" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text)' }}>Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Support
              </h4>
              <ul className="space-y-3">
                <li><Link href="/docs" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text)' }}>Help Center</Link></li>
                <li><Link href="/docs" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text)' }}>Contact</Link></li>
                <li><Link href="/docs" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text)' }}>Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Legal
              </h4>
              <ul className="space-y-3">
                <li><Link href="/docs" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text)' }}>Privacy</Link></li>
                <li><Link href="/docs" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text)' }}>Terms</Link></li>
                <li><Link href="/docs" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text)' }}>Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            © 2026 SellFast. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, delay }: { title: string; description: string; delay: number }) {
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
      <h4 className="heading-3 mb-4" style={{ color: 'var(--text)' }}>
        {title}
      </h4>
      <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {description}
      </p>
    </div>
  )
}

function PricingCard({ 
  title, 
  price, 
  features, 
  buttonText, 
  href, 
  variant,
  badge 
}: { 
  title: string; 
  price: string; 
  features: string[]; 
  buttonText: string; 
  href: string; 
  variant: 'primary' | 'secondary';
  badge?: string;
}) {
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
      className="card relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        borderColor: variant === 'primary' ? 'var(--primary)' : 'var(--border)'
      }}
    >
      {badge && (
        <div 
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold"
          style={{ 
            background: 'var(--primary)',
            color: '#0f0f0f'
          }}
        >
          {badge}
        </div>
      )}
      <h4 className="heading-3 mb-2" style={{ color: 'var(--text)' }}>
        {title}
      </h4>
      <div className="text-5xl font-bold mb-6" style={{ color: 'var(--text)' }}>
        {price}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3" style={{ color: 'var(--text-muted)' }}>
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--primary)' }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {feature}
          </li>
        ))}
      </ul>
      <Link 
        href={href} 
        className={`btn btn-${variant} w-full`}
      >
        {buttonText}
      </Link>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
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
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <h4 className="heading-3 mb-3" style={{ color: 'var(--text)' }}>
        {question}
      </h4>
      <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {answer}
      </p>
    </div>
  )
}

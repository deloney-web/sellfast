import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-text mb-4">Page Not Found</h2>
        <p className="text-text-muted mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn btn-primary"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}

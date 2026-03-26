# SellFast - Multi-Tenant Digital Product Platform

A modern, multi-tenant platform for creating and managing digital product shops with built-in authentication, API access, analytics, and customer support.

This is still a prototype, not for production use.
## Features

- **Multi-Tenant Architecture**: Each user can create multiple shops with unique subdomains
- **Digital Product Management**: Create, update, and manage digital products with pricing and categories
- **Secure Authentication**: JWT-based session authentication with bcrypt password hashing
- **API Access**: Generate and manage API keys for third-party integrations
- **Analytics Dashboard**: Track product views, purchases, and revenue
- **Customer Support**: Built-in ticket system for customer inquiries
- **Checkout System**: Mock checkout flow with purchase tracking
- **Rate Limiting**: Configurable rate limiting for API endpoints
- **Responsive Design**: Beautiful, award-winning UI with smooth animations

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT (jose) + bcrypt
- **Validation**: Zod
- **Rate Limiting**: rate-limiter-flexible
- **API**: RESTful API with Next.js Route Handlers

## Project Structure

```
webapp/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/             # Authentication pages
│   │   │   ├── login/       # Login page
│   │   │   └── register/    # Registration page
│   │   ├── dashboard/        # Dashboard pages (protected)
│   │   │   ├── page.tsx     # Main dashboard
│   │   │   ├── shops/       # Shop management
│   │   │   ├── products/    # Product management
│   │   │   ├── api-keys/    # API key management
│   │   │   └── analytics/   # Analytics dashboard
│   │   ├── docs/             # API documentation
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── shops/        # Shop CRUD operations
│   │   │   ├── products/     # Product CRUD operations
│   │   │   ├── api-keys/     # API key management
│   │   │   ├── customers/    # Customer management
│   │   │   ├── tickets/      # Support ticket system
│   │   │   ├── analytics/    # Analytics endpoints
│   │   │   └── checkout/     # Checkout flow
│   │   ├── layout.tsx        # Root layout
│   │   ├── not-found.tsx     # 404 page
│   │   ├── page.tsx          # Landing page
│   │   └── globals.css       # Global styles
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts           # Authentication utilities
│   │   ├── api-auth.ts       # API authentication
│   │   ├── api-keys.ts       # API key generation
│   │   ├── prisma.ts         # Prisma client
│   │   ├── rate-limit.ts     # Rate limiting
│   │   └── validations.ts    # Zod schemas
│   └── middleware.ts          # Next.js middleware
├── prisma/                   # Database configuration
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── dev.db                # SQLite database (dev)
├── public/                    # Static assets
├── Configuration Files
│   ├── package.json            # Dependencies
│   ├── tsconfig.json          # TypeScript config
│   ├── next.config.js         # Next.js config
│   ├── tailwind.config.ts      # Tailwind config
│   ├── postcss.config.js      # PostCSS config
│   ├── .eslintrc.json        # ESLint config
│   └── .gitignore             # Git ignore rules
└── Environment Files
    ├── .env.example           # Environment template
    └── .env                  # Actual environment (not in git)
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd webapp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-secret-key-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
RATE_LIMIT_MAX_REQUESTS="100"
RATE_LIMIT_WINDOW_MS="900000"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Documentation

The platform provides a RESTful API for managing shops, products, customers, and more. Full API documentation is available at `/docs`.

### Authentication

All API requests require authentication via:
- **Session Token**: For authenticated users (set in cookie)
- **API Key**: For third-party integrations (Bearer token in Authorization header)

### Rate Limiting

API endpoints are rate limited to prevent abuse:
- Default: 100 requests per 15 minutes per API key
- Default: 100 requests per 15 minutes per authenticated user

### Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout current session

#### Shops
- `GET /api/shops` - Get all shops for authenticated user
- `POST /api/shops` - Create a new shop
- `GET /api/shops/:id` - Get a specific shop
- `PATCH /api/shops/:id` - Update a shop
- `DELETE /api/shops/:id` - Delete a shop

#### Products
- `GET /api/products?shop_id=X` - Get products for a shop
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get a specific product
- `PATCH /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

#### API Keys
- `GET /api/api-keys?shop_id=X` - Get API keys for a shop
- `POST /api/api-keys` - Create a new API key
- `GET /api/api-keys/:id` - Get a specific API key
- `PATCH /api/api-keys/:id` - Update an API key
- `DELETE /api/api-keys/:id` - Delete an API key
- `POST /api/api-keys/:id/rotate` - Rotate an API key

#### Customers
- `GET /api/customers?shop_id=X` - Get customers for a shop
- `POST /api/customers` - Create a new customer

#### Tickets
- `GET /api/tickets?shop_id=X` - Get tickets for a shop
- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets/:id/replies` - Get ticket replies
- `POST /api/tickets/:id/replies` - Add a reply to a ticket

#### Analytics
- `GET /api/analytics?shop_id=X` - Get analytics for a shop
- `POST /api/analytics` - Create an analytics event

#### Checkout
- `POST /api/checkout/create-session` - Create a checkout session
- `POST /api/checkout/complete` - Complete a checkout session

## Database Schema

The platform uses SQLite with Prisma ORM. Key models include:

- **User**: User accounts with email and password
- **Shop**: Multi-tenant shops with unique subdomains
- **Product**: Digital products with pricing and categories
- **ApiKey**: API keys for third-party integrations
- **Customer**: Customer records per shop
- **Purchase**: Purchase history and download links
- **Ticket**: Support tickets with replies
- **AnalyticsEvent**: Event tracking for analytics

## Design System

The platform uses a custom design system built on Tailwind CSS with:

- **Color Palette**: Primary (teal), Secondary (blue), Accent (red)
- **Typography**: Dramatic scale contrast (10:1+ ratio)
- **Animations**: Custom easing curves (expo-out, quart-out)
- **Components**: Cards, buttons, inputs with consistent styling
- **Responsive**: Mobile-first design with breakpoints

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Zod for runtime validation
- Prisma for database operations

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

Required environment variables for production:

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-secret"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
RATE_LIMIT_MAX_REQUESTS="100"
RATE_LIMIT_WINDOW_MS="900000"
NODE_ENV="production"
```
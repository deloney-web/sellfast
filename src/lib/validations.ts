import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const createShopSchema = z.object({
  name: z.string().min(1, 'Shop name is required'),
  subdomain: z.string()
    .min(3, 'Subdomain must be at least 3 characters')
    .max(63, 'Subdomain must be less than 63 characters')
    .regex(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().optional(),
})

export const updateShopSchema = z.object({
  name: z.string().min(1, 'Shop name is required').optional(),
  description: z.string().optional(),
  logoUrl: z.string().url().optional(),
  settings: z.record(z.any()).optional(),
})

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  category: z.string().optional(),
  digitalFileUrl: z.string().url().optional(),
})

export const updateProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').optional(),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive').optional(),
  category: z.string().optional(),
  digitalFileUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
})

export const createApiKeySchema = z.object({
  name: z.string().min(1, 'API key name is required'),
  permissions: z.record(z.any()).optional(),
})

export const createTicketSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
})

export const createTicketReplySchema = z.object({
  message: z.string().min(1, 'Message is required'),
})

export const createCheckoutSessionSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerName: z.string().optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type CreateShopInput = z.infer<typeof createShopSchema>
export type UpdateShopInput = z.infer<typeof updateShopSchema>
export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>
export type CreateTicketInput = z.infer<typeof createTicketSchema>
export type CreateTicketReplyInput = z.infer<typeof createTicketReplySchema>
export type CreateCheckoutSessionInput = z.infer<typeof createCheckoutSessionSchema>

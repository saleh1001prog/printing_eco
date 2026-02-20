// 🔒 SECURITY: Rate limiting to prevent brute force and spam attacks

import { NextRequest } from 'next/server'

// Simple in-memory rate limiter (for production, use Redis/Upstash)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

interface RateLimitOptions {
  interval: number // Time window in milliseconds
  uniqueTokenPerInterval: number // Max requests per interval
}

export function rateLimit(options: RateLimitOptions) {
  return {
    check: async (request: NextRequest, limit: number, token: string) => {
      const now = Date.now()
      const tokenData = rateLimitMap.get(token)

      if (!tokenData || now > tokenData.resetTime) {
        // Reset or initialize
        rateLimitMap.set(token, {
          count: 1,
          resetTime: now + options.interval,
        })
        return { success: true }
      }

      if (tokenData.count >= limit) {
        return {
          success: false,
          limit,
          remaining: 0,
          reset: new Date(tokenData.resetTime),
        }
      }

      tokenData.count += 1
      return {
        success: true,
        limit,
        remaining: limit - tokenData.count,
        reset: new Date(tokenData.resetTime),
      }
    },
  }
}

// Create rate limiter instance
// 10 requests per 1 minute window
export const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 unique tokens
})

// Helper to get client identifier (IP or session)
export function getClientIdentifier(request: NextRequest): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIp) {
    return realIp
  }
  
  // Fallback to a default (not ideal but prevents crashes)
  return 'unknown'
}

// Helper function to apply rate limiting to API routes
export async function applyRateLimit(
  request: NextRequest,
  limit: number = 10
): Promise<{ success: boolean; response?: Response }> {
  const identifier = getClientIdentifier(request)
  const result = await limiter.check(request, limit, identifier)

  if (!result.success) {
    return {
      success: false,
      response: new Response(
        JSON.stringify({
          error: 'Too many requests. Please try again later.',
          limit: result.limit,
          remaining: result.remaining,
          reset: result.reset,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': String(result.limit),
            'X-RateLimit-Remaining': String(result.remaining || 0),
            'X-RateLimit-Reset': result.reset?.toISOString() || '',
          },
        }
      ),
    }
  }

  return { success: true }
}

import { NextRequest, NextResponse } from 'next/server'
import { generateKeyPair } from '@/lib/rsa'

/**
 * GET /api/admin/generate-keys
 * 
 * Utility endpoint to generate RSA key pair (for initial setup)
 * This should be disabled or removed in production after setup
 */
export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is disabled in production' },
      { status: 403 }
    )
  }

  try {
    const { publicKey, privateKey } = generateKeyPair()
    
    return NextResponse.json({
      success: true,
      message: 'RSA key pair generated successfully',
      instructions: {
        step1: 'Copy the privateKey and set it as RSA_PRIVATE_KEY in your Vercel environment variables',
        step2: 'Copy the publicKey and embed it in your desktop application for verification',
        step3: 'Delete or disable this endpoint after setup',
      },
      publicKey,
      privateKey,
      // Format for .env file (newlines escaped)
      privateKeyForEnv: privateKey.replace(/\n/g, '\\n'),
    })
  } catch (error) {
    console.error('Key generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate key pair' },
      { status: 500 }
    )
  }
}

import crypto from 'crypto'

/**
 * RSA License Signing Utility
 * 
 * The private key is stored in Vercel environment variables (RSA_PRIVATE_KEY)
 * The public key is embedded in the desktop application for verification
 */

// Get private key from environment
const getPrivateKey = (): string => {
  const privateKey = process.env.RSA_PRIVATE_KEY
  if (!privateKey) {
    throw new Error('RSA_PRIVATE_KEY environment variable is not set')
  }
  // Handle escaped newlines from environment variable
  // Vercel stores \n as literal backslash-n, need to convert to actual newlines
  return privateKey.replace(/\\n/g, '\n')
}

export interface LicenseData {
  hardwareId: string
  activatedAt: string
  expiresAt: string | null // null = perpetual license
  productId: string
  version: string
}

/**
 * Signs license data with RSA private key
 * Returns base64 encoded signature
 */
export function signLicense(licenseData: LicenseData): string {
  const privateKey = getPrivateKey()
  const dataString = JSON.stringify(licenseData)
  
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(dataString)
  sign.end()
  
  const signature = sign.sign(privateKey, 'base64')
  return signature
}

/**
 * Creates a complete signed license response
 */
export function createSignedLicenseResponse(hardwareId: string): {
  licenseData: LicenseData
  signature: string
} {
  const licenseData: LicenseData = {
    hardwareId,
    activatedAt: new Date().toISOString(),
    expiresAt: null, // Perpetual license
    productId: 'inventory-pro',
    version: '1.0.0',
  }
  
  const signature = signLicense(licenseData)
  
  return {
    licenseData,
    signature,
  }
}

/**
 * Generates a new RSA key pair (for initial setup only)
 * Run this once to generate keys, then store private key in Vercel env
 */
export function generateKeyPair(): { publicKey: string; privateKey: string } {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  })
  
  return { publicKey, privateKey }
}

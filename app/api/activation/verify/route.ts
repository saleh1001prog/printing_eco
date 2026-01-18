import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ActivationRequest from '@/models/ActivationRequest'
import { createSignedLicenseResponse } from '@/lib/rsa'

/**
 * POST /api/activation/verify
 * 
 * Called by desktop app when user clicks "Verify Activation"
 * If approved, returns RSA-signed license data
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { hardwareId } = body
    
    if (!hardwareId) {
      return NextResponse.json(
        { success: false, error: 'Missing hardwareId' },
        { status: 400 }
      )
    }
    
    // Find activation request
    const activationRequest = await ActivationRequest.findOne({ hardwareId })
    
    if (!activationRequest) {
      return NextResponse.json({
        success: false,
        error: 'No activation request found. Please submit an activation request first.',
        status: 'not_found',
      })
    }
    
    // Check status
    if (activationRequest.status === 'pending') {
      return NextResponse.json({
        success: false,
        message: 'Your activation request is pending approval. Please wait for admin approval.',
        status: 'pending',
        requestedAt: activationRequest.requestedAt,
      })
    }
    
    if (activationRequest.status === 'rejected') {
      return NextResponse.json({
        success: false,
        message: 'Your activation request was rejected.',
        status: 'rejected',
        reason: activationRequest.rejectionReason || 'No reason provided',
        rejectedAt: activationRequest.rejectedAt,
      })
    }
    
    // Status is 'approved' - generate signed license
    if (activationRequest.status === 'approved') {
      try {
        // Generate RSA-signed license
        const { licenseData, signature } = createSignedLicenseResponse(hardwareId)
        
        // Store signature in database for reference
        if (!activationRequest.licenseSignature) {
          activationRequest.licenseSignature = signature
          await activationRequest.save()
        }
        
        return NextResponse.json({
          success: true,
          message: 'Activation successful!',
          status: 'activated',
          license: {
            data: licenseData,
            signature: signature,
          },
        })
        
      } catch (rsaError) {
        console.error('RSA signing error:', rsaError)
        return NextResponse.json(
          { success: false, error: 'License signing failed. Please contact support.' },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json(
      { success: false, error: 'Unknown activation status' },
      { status: 500 }
    )
    
  } catch (error) {
    console.error('Activation verify error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

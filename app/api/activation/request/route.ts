import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ActivationRequest from '@/models/ActivationRequest'

/**
 * POST /api/activation/request
 * 
 * Called by desktop app when user clicks "Request Activation"
 * Stores the HWID in MongoDB with pending status
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { hardwareId, machineName, userName, email, phone } = body
    
    // Validate required fields
    if (!hardwareId || !machineName || !userName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: hardwareId, machineName, userName' 
        },
        { status: 400 }
      )
    }
    
    // Check if this hardware ID already has a request
    const existingRequest = await ActivationRequest.findOne({ hardwareId })
    
    if (existingRequest) {
      // Return current status
      return NextResponse.json({
        success: true,
        message: 'Activation request already exists',
        status: existingRequest.status,
        requestId: existingRequest._id,
        requestedAt: existingRequest.requestedAt,
      })
    }
    
    // Create new activation request
    const activationRequest = new ActivationRequest({
      hardwareId,
      machineName,
      userName,
      email: email || null,
      phone: phone || null,
      status: 'pending',
      requestedAt: new Date(),
    })
    
    await activationRequest.save()
    
    return NextResponse.json({
      success: true,
      message: 'Activation request submitted successfully',
      status: 'pending',
      requestId: activationRequest._id,
      requestedAt: activationRequest.requestedAt,
    })
    
  } catch (error) {
    console.error('Activation request error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/activation/request?hardwareId=xxx
 * 
 * Check status of an activation request
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const hardwareId = searchParams.get('hardwareId')
    
    if (!hardwareId) {
      return NextResponse.json(
        { success: false, error: 'Missing hardwareId parameter' },
        { status: 400 }
      )
    }
    
    const activationRequest = await ActivationRequest.findOne({ hardwareId })
    
    if (!activationRequest) {
      return NextResponse.json({
        success: false,
        error: 'No activation request found for this hardware ID',
        status: 'not_found',
      })
    }
    
    return NextResponse.json({
      success: true,
      status: activationRequest.status,
      requestedAt: activationRequest.requestedAt,
      approvedAt: activationRequest.approvedAt,
      rejectedAt: activationRequest.rejectedAt,
      rejectionReason: activationRequest.rejectionReason,
    })
    
  } catch (error) {
    console.error('Check activation status error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

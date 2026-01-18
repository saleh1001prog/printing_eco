import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ActivationRequest from '@/models/ActivationRequest'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"

/**
 * GET /api/admin/activations
 * 
 * Get all activation requests (for admin dashboard)
 */
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }


  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // 'pending', 'approved', 'rejected', or null for all

    const query = status ? { status } : {}
    const activations = await ActivationRequest.find(query)
      .sort({ requestedAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      activations,
      count: activations.length,
    })

  } catch (error) {
    console.error('Get activations error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ActivationRequest from '@/models/ActivationRequest'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"

/**
 * PATCH /api/admin/activations/[id]
 * 
 * Update activation status (approve/reject)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()

    const { id } = await params
    const body = await request.json()
    const { status, rejectionReason, notes } = body

    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status. Must be "approved" or "rejected"' },
        { status: 400 }
      )
    }

    const activation = await ActivationRequest.findById(id)

    if (!activation) {
      return NextResponse.json(
        { success: false, error: 'Activation request not found' },
        { status: 404 }
      )
    }

    // Update status
    activation.status = status

    if (status === 'approved') {
      activation.approvedAt = new Date()
    } else if (status === 'rejected') {
      activation.rejectedAt = new Date()
      activation.rejectionReason = rejectionReason || ''
    }

    if (notes) {
      activation.notes = notes
    }

    await activation.save()

    return NextResponse.json({
      success: true,
      message: `Activation ${status} successfully`,
      activation,
    })

  } catch (error) {
    console.error('Update activation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/activations/[id]
 * 
 * Delete an activation request
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()

    const { id } = await params
    const activation = await ActivationRequest.findByIdAndDelete(id)

    if (!activation) {
      return NextResponse.json(
        { success: false, error: 'Activation request not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Activation request deleted successfully',
    })

  } catch (error) {
    console.error('Delete activation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

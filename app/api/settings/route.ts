import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Settings from '@/models/Settings'

// GET - Fetch settings (public)
export async function GET() {
    try {
        await connectDB()

        // Get settings or create default if not exists
        let settings = await Settings.findOne()

        if (!settings) {
            // Create default settings
            settings = await Settings.create({
                email: 'info@softera-dz.com',
                phone: '+213 XXX XXX XXX',
                companyName: 'SOFTERA-DZ',
                companyNameAr: 'حلول برمجية متكاملة',
            })
        }

        return NextResponse.json({
            success: true,
            settings,
        })
    } catch (error) {
        console.error('Error fetching settings:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch settings' },
            { status: 500 }
        )
    }
}

// PUT - Update settings (admin only)
export async function PUT(request: NextRequest) {
    try {
        // 🔒 SECURITY: Check admin authentication
        const { getServerSession } = await import("next-auth/next")
        const { authOptions } = await import("../auth/[...nextauth]/route")
        
        const session = await getServerSession(authOptions)
        if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized: Admin access required' },
                { status: 401 }
            )
        }

        await connectDB()

        const body = await request.json()
        const { email, phone, facebook, instagram, twitter, linkedin, companyName, companyNameAr, address, addressAr } = body

        // Find existing settings or create new
        let settings = await Settings.findOne()

        if (settings) {
            // Update existing settings
            settings = await Settings.findOneAndUpdate(
                {},
                {
                    email,
                    phone,
                    facebook,
                    instagram,
                    twitter,
                    linkedin,
                    companyName,
                    companyNameAr,
                    address,
                    addressAr,
                },
                { new: true }
            )
        } else {
            // Create new settings
            settings = await Settings.create({
                email,
                phone,
                facebook,
                instagram,
                twitter,
                linkedin,
                companyName,
                companyNameAr,
                address,
                addressAr,
            })
        }

        return NextResponse.json({
            success: true,
            settings,
        })
    } catch (error) {
        console.error('Error updating settings:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update settings' },
            { status: 500 }
        )
    }
}

import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
    try {
        // Check admin authentication
        const session = await getServerSession(authOptions)
        if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get('file') as File
        const folder = formData.get('folder') as string || 'products'

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            )
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        const dataURI = `data:${file.type};base64,${base64}`

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: `informatics-solutions/${folder}`,
            resource_type: 'auto',
        })

        return NextResponse.json({
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
        })
    } catch (error: any) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}

// DELETE - Remove image from Cloudinary
export async function DELETE(request: NextRequest) {
    try {
        // Check admin authentication
        const session = await getServerSession(authOptions)
        if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        }

        const { publicId } = await request.json()

        if (!publicId) {
            return NextResponse.json(
                { success: false, error: 'No public ID provided' },
                { status: 400 }
            )
        }

        await cloudinary.uploader.destroy(publicId)

        return NextResponse.json({ success: true, message: 'Image deleted' })
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}

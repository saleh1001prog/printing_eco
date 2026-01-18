import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/models/Product'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

// GET all products (with optional filters)
export async function GET(request: NextRequest) {
    try {
        await dbConnect()

        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const type = searchParams.get('type')
        const featured = searchParams.get('featured')

        const filter: any = {}
        if (status) filter.status = status
        if (type) filter.type = type
        if (featured) filter.featured = featured === 'true'

        const products = await Product.find(filter).sort({ order: 1, createdAt: -1 })

        return NextResponse.json({ success: true, products })
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}

// POST - Create new product (Admin only)
export async function POST(request: NextRequest) {
    try {
        // Check admin authentication
        const session = await getServerSession(authOptions)
        if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()

        const body = await request.json()
        const product = await Product.create(body)

        return NextResponse.json({ success: true, product }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}

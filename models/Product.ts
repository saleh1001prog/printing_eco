import mongoose from 'mongoose'

export interface IProduct {
    _id?: string
    slug: string
    name: string
    nameEn: string
    description: string
    descriptionEn: string
    type: 'Desktop' | 'Web' | 'Mobile' | 'Enterprise'
    shortDescription: string
    shortDescriptionEn: string

    // Hero Section
    heroImage?: string
    heroImageAlt?: string
    badge?: string
    badgeEn?: string

    // Features
    features: Array<{
        icon: string
        title: string
        titleEn: string
        description: string
        descriptionEn: string
        color?: string
    }>

    // Additional Features
    additionalFeatures?: Array<{
        icon: string
        text: string
        textEn: string
    }>

    // Screenshots
    screenshots: Array<{
        url: string
        title: string
        titleEn: string
        description?: string
        descriptionEn?: string
        category?: string
    }>

    // Technologies
    technologies?: Array<{
        name: string
        description: string
        icon?: string
    }>

    // Requirements
    requirements?: string[]

    // Benefits
    benefits?: Array<{
        icon: string
        title: string
        description: string
    }>

    // Download Info
    downloadUrl?: string
    version?: string
    fileSize?: string
    lastUpdate?: string

    // SEO
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string[]

    // Status
    status: 'draft' | 'published'
    featured: boolean
    order: number

    // Timestamps
    createdAt?: Date
    updatedAt?: Date
}

const productSchema = new mongoose.Schema<IProduct>(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
        },
        nameEn: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        descriptionEn: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['Desktop', 'Web', 'Mobile', 'Enterprise'],
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        shortDescriptionEn: {
            type: String,
            required: true,
        },
        heroImage: String,
        heroImageAlt: String,
        badge: String,
        badgeEn: String,
        features: [
            {
                icon: String,
                title: String,
                titleEn: String,
                description: String,
                descriptionEn: String,
                color: String,
            },
        ],
        additionalFeatures: [
            {
                icon: String,
                text: String,
                textEn: String,
            },
        ],
        screenshots: [
            {
                url: String,
                title: String,
                titleEn: String,
                description: String,
                descriptionEn: String,
                category: String,
            },
        ],
        technologies: [
            {
                name: String,
                description: String,
                icon: String,
            },
        ],
        requirements: [String],
        benefits: [
            {
                icon: String,
                title: String,
                description: String,
            },
        ],
        downloadUrl: String,
        version: String,
        fileSize: String,
        lastUpdate: String,
        metaTitle: String,
        metaDescription: String,
        metaKeywords: [String],
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        featured: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

// Index for faster queries
productSchema.index({ status: 1, order: 1 })

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema)

import mongoose from 'mongoose'

export interface ISettings {
    _id?: string
    // Contact Information
    email: string
    phone: string
    // Social Media (optional for future)
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
    // Company Info
    companyName?: string
    companyNameAr?: string
    address?: string
    addressAr?: string
    // Timestamps
    updatedAt?: Date
}

const settingsSchema = new mongoose.Schema<ISettings>(
    {
        email: {
            type: String,
            required: true,
            default: 'info@softera-dz.com',
        },
        phone: {
            type: String,
            required: true,
            default: '+213 XXX XXX XXX',
        },
        facebook: String,
        instagram: String,
        twitter: String,
        linkedin: String,
        companyName: {
            type: String,
            default: 'SOFTERA-DZ',
        },
        companyNameAr: {
            type: String,
            default: 'حلول برمجية متكاملة',
        },
        address: String,
        addressAr: String,
    },
    {
        timestamps: true,
    }
)

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', settingsSchema)

import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IActivationRequest extends Document {
  hardwareId: string
  machineName: string
  userName: string
  email?: string
  phone?: string
  status: 'pending' | 'approved' | 'rejected'
  requestedAt: Date
  approvedAt?: Date
  rejectedAt?: Date
  rejectionReason?: string
  licenseSignature?: string // RSA signed license data
  notes?: string
}

const ActivationRequestSchema = new Schema<IActivationRequest>(
  {
    hardwareId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    machineName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    approvedAt: {
      type: Date,
    },
    rejectedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
    },
    licenseSignature: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Prevent model recompilation in development
const ActivationRequest: Model<IActivationRequest> =
  mongoose.models.ActivationRequest ||
  mongoose.model<IActivationRequest>('ActivationRequest', ActivationRequestSchema)

export default ActivationRequest

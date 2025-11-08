import mongoose, { Document, Schema } from 'mongoose';

export interface INGO extends Document {
  user: mongoose.Types.ObjectId;
  organizationName: string;
  registrationNumber: string;
  organizationType: 'charity' | 'non-profit' | 'community-based' | 'international' | 'faith-based' | 'advocacy';
  focusAreas: string[]; // e.g., ['food security', 'nutrition', 'education']
  yearEstablished: number;
  location: string;
  serviceRegions: string[]; // Areas/regions they serve
  website?: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  bankAccount?: string;
  taxExemptionNumber?: string;
  numberOfStaff?: number;
  numberOfVolunteers?: number;
  annualBudget?: string; // e.g., '< $10k', '$10k-$50k', '$50k-$100k', '$100k+'
  certifications: string[];
  verificationDocuments?: string[];
  isVerified: boolean;
  ngoID: string;
  beneficiariesServed?: number;
  partneredOrganizations: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NGOSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  organizationName: {
    type: String,
    required: true,
    trim: true
  },
  registrationNumber: {
    type: String,
    required: true,
    trim: true
  },
  organizationType: {
    type: String,
    enum: ['charity', 'non-profit', 'community-based', 'international', 'faith-based', 'advocacy'],
    default: 'non-profit'
  },
  focusAreas: [{
    type: String,
    trim: true
  }],
  yearEstablished: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear()
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  serviceRegions: [{
    type: String,
    trim: true
  }],
  website: {
    type: String,
    trim: true
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  contactEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  contactPhone: {
    type: String,
    required: true,
    trim: true
  },
  bankAccount: {
    type: String,
    trim: true
  },
  taxExemptionNumber: {
    type: String,
    trim: true
  },
  numberOfStaff: {
    type: Number,
    min: 0
  },
  numberOfVolunteers: {
    type: Number,
    min: 0
  },
  annualBudget: {
    type: String,
    enum: ['< $10k', '$10k-$50k', '$50k-$100k', '$100k-$500k', '$500k+']
  },
  certifications: [{
    type: String,
    trim: true
  }],
  verificationDocuments: [String],
  isVerified: {
    type: Boolean,
    default: false
  },
  ngoID: {
    type: String,
    unique: true,
    required: true
  },
  beneficiariesServed: {
    type: Number,
    min: 0
  },
  partneredOrganizations: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for efficient queries
NGOSchema.index({ isVerified: 1 });
NGOSchema.index({ location: 1 });
NGOSchema.index({ focusAreas: 1 });
NGOSchema.index({ organizationType: 1 });

export default mongoose.model<INGO>('NGO', NGOSchema);

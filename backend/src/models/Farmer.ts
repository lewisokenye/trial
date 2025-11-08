import mongoose, { Document, Schema } from 'mongoose';

export interface IFarmer extends Document {
  user: mongoose.Types.ObjectId;
  farmName: string;
  farmSize: number; // in acres
  location: string;
  primaryCrops: string[];
  farmingExperience: string;
  farmingType: 'conventional' | 'organic' | 'sustainable' | 'permaculture' | 'hydroponic';
  certifications: string[];
  soilType?: string;
  irrigationMethod?: string;
  equipmentOwned: string[];
  marketingChannels: string[];
  contactNumber?: string;
  bankAccount?: string;
  farmAddress?: string;
  isVerified: boolean;
  verificationDocuments?: string[];
  farmerID: string;
  yieldHistory: Array<{
    crop: string;
    year: number;
    yield: number; // bu/ac
    area: number; // acres
    quality: string;
    revenue: number;
  }>;
  marketListings: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const FarmerSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  farmName: {
    type: String,
    required: true,
    trim: true
  },
  farmSize: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  primaryCrops: [{
    type: String,
    trim: true
  }],
  farmingExperience: {
    type: String,
    required: true,
    enum: ['0-2', '3-5', '6-10', '11-20', '20+']
  },
  farmingType: {
    type: String,
    enum: ['conventional', 'organic', 'sustainable', 'permaculture', 'hydroponic'],
    default: 'conventional'
  },
  certifications: [{
    type: String,
    trim: true
  }],
  soilType: {
    type: String,
    enum: ['clay', 'sandy', 'loam', 'silt', 'mixed']
  },
  irrigationMethod: {
    type: String,
    enum: ['drip', 'sprinkler', 'flood', 'rain-fed', 'mixed']
  },
  equipmentOwned: [{
    type: String,
    trim: true
  }],
  marketingChannels: [{
    type: String,
    trim: true
  }],
  contactNumber: {
    type: String,
    trim: true
  },
  bankAccount: {
    type: String,
    trim: true
  },
  farmAddress: {
    type: String,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDocuments: [String],
  farmerID: {
    type: String,
    unique: true,
    required: true
  },
  yieldHistory: [{
    crop: { type: String, required: true },
    year: { type: Number, required: true },
    yield: { type: Number, required: true, min: 0 },
    area: { type: Number, required: true, min: 0 },
    quality: { type: String, required: true },
    revenue: { type: Number, required: true, min: 0 }
  }],
  marketListings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MarketListing'
  }]
}, {
  timestamps: true
});

// Index for efficient queries
FarmerSchema.index({ isVerified: 1 });
FarmerSchema.index({ location: 1 });
FarmerSchema.index({ primaryCrops: 1 });
FarmerSchema.index({ farmingType: 1 });

export default mongoose.model<IFarmer>('Farmer', FarmerSchema);
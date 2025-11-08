import mongoose, { Document, Schema } from 'mongoose';

export interface IWasteEntry extends Document {
  user: mongoose.Types.ObjectId;
  date: Date;
  foodType: string;
  quantity: number;
  unit: string;
  reason: string;
  cost: number;
  location: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WasteEntrySchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  foodType: {
    type: String,
    required: true,
    enum: ['Fruits & Vegetables', 'Dairy', 'Meat', 'Grains', 'Prepared Food', 'Other']
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true,
    enum: ['lbs', 'kg', 'pieces', 'servings', 'gallons', 'liters', 'packages', 'cans', 'bottles']
  },
  reason: {
    type: String,
    required: true,
    enum: ['Expired', 'Spoiled', 'Over-prepared', 'Leftovers', 'Other']
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  notes: String
}, {
  timestamps: true
});

// Index for efficient queries
WasteEntrySchema.index({ user: 1, date: -1 });
WasteEntrySchema.index({ foodType: 1 });
WasteEntrySchema.index({ date: -1 });

export default mongoose.model<IWasteEntry>('WasteEntry', WasteEntrySchema);
import mongoose, { Document, Schema } from 'mongoose';

export interface IExpiryItem extends Document {
  user: mongoose.Types.ObjectId;
  itemName: string;
  category: string;
  purchaseDate: string;
  expiryDate: string;
  quantity: string;
  location: string;
  status: 'fresh' | 'expiring-soon' | 'expired';
  notificationSent: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExpiryItemSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Pantry Items', 'Frozen', 'Beverages']
  },
  purchaseDate: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    enum: ['Refrigerator', 'Freezer', 'Pantry', 'Counter', 'Cupboard']
  },
  status: {
    type: String,
    enum: ['fresh', 'expiring-soon', 'expired'],
    default: 'fresh'
  },
  notificationSent: {
    type: Boolean,
    default: false
  },
  notes: String
}, {
  timestamps: true
});

// Index for efficient queries
ExpiryItemSchema.index({ user: 1, expiryDate: 1 });
ExpiryItemSchema.index({ user: 1, notificationSent: 1 });

export default mongoose.model<IExpiryItem>('ExpiryItem', ExpiryItemSchema);
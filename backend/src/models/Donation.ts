import mongoose, { Document, Schema } from 'mongoose';

export interface IDonation extends Document {
  donor: mongoose.Types.ObjectId;
  type: 'food' | 'money';
  // Food donation fields
  foodType?: string;
  quantity?: string;
  unit?: string;
  expiryDate?: Date;
  pickupLocation?: string;
  description?: string;
  images?: string[];
  // Money donation fields
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  transactionId?: string;
  // Common fields
  status: 'pending' | 'approved' | 'collected' | 'delivered' | 'cancelled';
  recipient?: mongoose.Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema: Schema = new Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['food', 'money'],
    required: true
  },
  // Food donation fields
  foodType: {
    type: String,
    enum: {
      values: ['prepared-food', 'fresh-produce', 'baked-goods', 'dairy', 'meat', 'pantry-items', 'frozen', 'beverages', 'other'],
      message: '{VALUE} is not a valid food type'
    },
    validate: {
      validator: function(this: IDonation, v: string) {
        // Only validate if donation type is food and value is provided
        if (this.type === 'food') {
          return v && v.length > 0;
        }
        return true; // Skip validation for money donations
      },
      message: 'Food type is required for food donations'
    }
  },
  quantity: String,
  unit: {
    type: String,
    enum: {
      values: ['lbs', 'kg', 'pieces', 'servings', 'gallons', 'liters', 'packages', 'cans', 'bottles'],
      message: '{VALUE} is not a valid unit'
    }
  },
  expiryDate: Date,
  pickupLocation: String,
  description: String,
  images: [String],
  // Money donation fields
  amount: Number,
  currency: {
    type: String,
    default: 'KES'
  },
  paymentMethod: {
    type: String,
    enum: ['paystack', 'bank-transfer', 'Safaricom M-pesa', 'other']
  },
  transactionId: String,
  // Common fields
  status: {
    type: String,
    enum: ['pending', 'approved', 'collected', 'delivered', 'cancelled'],
    default: 'pending'
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: String
}, {
  timestamps: true
});

// Index for efficient queries
DonationSchema.index({ type: 1, status: 1 });
DonationSchema.index({ donor: 1 });
DonationSchema.index({ recipient: 1 });
DonationSchema.index({ createdAt: -1 });

export default mongoose.model<IDonation>('Donation', DonationSchema);
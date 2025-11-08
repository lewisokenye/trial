import mongoose, { Document } from 'mongoose';
export interface IDonation extends Document {
    donor: mongoose.Types.ObjectId;
    type: 'food' | 'money';
    foodType?: string;
    quantity?: string;
    unit?: string;
    expiryDate?: Date;
    pickupLocation?: string;
    description?: string;
    images?: string[];
    amount?: number;
    currency?: string;
    paymentMethod?: string;
    transactionId?: string;
    status: 'pending' | 'approved' | 'collected' | 'delivered' | 'cancelled';
    recipient?: mongoose.Types.ObjectId;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IDonation, {}, {}, {}, mongoose.Document<unknown, {}, IDonation, {}, {}> & IDonation & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Donation.d.ts.map
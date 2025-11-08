import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IExpiryItem, {}, {}, {}, mongoose.Document<unknown, {}, IExpiryItem, {}, {}> & IExpiryItem & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=ExpiryItem.d.ts.map
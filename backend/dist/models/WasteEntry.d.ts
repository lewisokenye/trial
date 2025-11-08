import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IWasteEntry, {}, {}, {}, mongoose.Document<unknown, {}, IWasteEntry, {}, {}> & IWasteEntry & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=WasteEntry.d.ts.map
import mongoose, { Document } from 'mongoose';
export interface IFarmer extends Document {
    user: mongoose.Types.ObjectId;
    farmName: string;
    farmSize: number;
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
        yield: number;
        area: number;
        quality: string;
        revenue: number;
    }>;
    marketListings: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IFarmer, {}, {}, {}, mongoose.Document<unknown, {}, IFarmer, {}, {}> & IFarmer & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Farmer.d.ts.map
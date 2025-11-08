import mongoose, { Document } from 'mongoose';
export interface INGO extends Document {
    user: mongoose.Types.ObjectId;
    organizationName: string;
    registrationNumber: string;
    organizationType: 'charity' | 'non-profit' | 'community-based' | 'international' | 'faith-based' | 'advocacy';
    focusAreas: string[];
    yearEstablished: number;
    location: string;
    serviceRegions: string[];
    website?: string;
    contactPerson: string;
    contactEmail: string;
    contactPhone: string;
    bankAccount?: string;
    taxExemptionNumber?: string;
    numberOfStaff?: number;
    numberOfVolunteers?: number;
    annualBudget?: string;
    certifications: string[];
    verificationDocuments?: string[];
    isVerified: boolean;
    ngoID: string;
    beneficiariesServed?: number;
    partneredOrganizations: string[];
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<INGO, {}, {}, {}, mongoose.Document<unknown, {}, INGO, {}, {}> & INGO & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=NGO.d.ts.map
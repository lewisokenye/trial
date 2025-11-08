import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const getDonations: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getDonation: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createDonation: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateDonation: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteDonation: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAvailableDonations: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createDonationValidation: import("express-validator").ValidationChain[];
export {};
//# sourceMappingURL=donationController.d.ts.map
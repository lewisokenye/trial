import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const getFarmers: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getFarmer: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createFarmer: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateFarmer: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteFarmer: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMyFarmerProfile: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addYieldData: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createFarmerValidation: import("express-validator").ValidationChain[];
export {};
//# sourceMappingURL=farmerController.d.ts.map
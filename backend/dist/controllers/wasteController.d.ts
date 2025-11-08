import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const getWasteEntries: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getWasteEntry: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createWasteEntry: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateWasteEntry: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteWasteEntry: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getWasteAnalytics: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getExpiryItems: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createExpiryItem: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateExpiryItem: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteExpiryItem: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createWasteEntryValidation: import("express-validator").ValidationChain[];
export declare const createExpiryItemValidation: import("express-validator").ValidationChain[];
export {};
//# sourceMappingURL=wasteController.d.ts.map
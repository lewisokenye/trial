import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const analyzeDisease: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAnalysisHistory: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getDiseaseInfo: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getDiseases: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getTreatments: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const analyzeDiseaseValidation: import("express-validator").ValidationChain[];
export {};
//# sourceMappingURL=diseaseController.d.ts.map
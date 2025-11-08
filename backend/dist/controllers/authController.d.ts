import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMe: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateDetails: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updatePassword: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const registerValidation: import("express-validator").ValidationChain[];
export declare const loginValidation: import("express-validator").ValidationChain[];
export {};
//# sourceMappingURL=authController.d.ts.map
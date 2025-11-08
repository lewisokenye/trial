import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const verifyUser: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const unverifyUser: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllUsers: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=adminController.d.ts.map
import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const getDeliveries: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getDelivery: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateDeliveryStatus: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAnalytics: (req: AuthRequest, res: Response) => Promise<void>;
export declare const optimizeRoutes: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getVehicles: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getAlerts: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=supplyChainController.d.ts.map
import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const generateAIMealPlan: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const generateGeminiMealPlan: (req: AuthRequest, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=aiNutritionController.d.ts.map
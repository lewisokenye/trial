import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: any;
}
export declare const generateMealPlan: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getLocalFoods: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getNutritionRecommendations: (req: AuthRequest, res: Response) => Promise<void>;
export declare const calculateNutritionNeeds: (req: AuthRequest, res: Response) => Promise<void>;
export declare const generateMealPlanValidation: import("express-validator").ValidationChain[];
export declare const calculateNeedsValidation: import("express-validator").ValidationChain[];
export {};
//# sourceMappingURL=nutritionController.d.ts.map
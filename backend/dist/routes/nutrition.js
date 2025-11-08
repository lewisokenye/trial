"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nutritionController_1 = require("../controllers/nutritionController");
const aiNutritionController_1 = require("../controllers/aiNutritionController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_1.protect);
// AI-powered meal plan generation
router.post('/ai-meal-plan', aiNutritionController_1.generateAIMealPlan);
// Original endpoints
router.post('/meal-plan', nutritionController_1.generateMealPlanValidation, nutritionController_1.generateMealPlan);
router.get('/local-foods', nutritionController_1.getLocalFoods);
router.get('/recommendations', nutritionController_1.getNutritionRecommendations);
router.post('/calculate-needs', nutritionController_1.calculateNeedsValidation, nutritionController_1.calculateNutritionNeeds);
exports.default = router;
//# sourceMappingURL=nutrition.js.map
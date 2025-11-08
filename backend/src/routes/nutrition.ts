import express from 'express';
import {
  generateMealPlan,
  getLocalFoods,
  getNutritionRecommendations,
  calculateNutritionNeeds,
  generateMealPlanValidation,
  calculateNeedsValidation
} from '../controllers/nutritionController';
import { generateAIMealPlan } from '../controllers/aiNutritionController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(protect);

// AI-powered meal plan generation
router.post('/ai-meal-plan', generateAIMealPlan);

// Original endpoints
router.post('/meal-plan', generateMealPlanValidation, generateMealPlan);
router.get('/local-foods', getLocalFoods);
router.get('/recommendations', getNutritionRecommendations);
router.post('/calculate-needs', calculateNeedsValidation, calculateNutritionNeeds);

export default router;
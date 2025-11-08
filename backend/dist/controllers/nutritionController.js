"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNeedsValidation = exports.generateMealPlanValidation = exports.calculateNutritionNeeds = exports.getNutritionRecommendations = exports.getLocalFoods = exports.generateMealPlan = void 0;
const express_validator_1 = require("express-validator");
// Mock nutrition data - in production, this would come from a nutrition database
const localFoods = [
    { name: 'Spinach', price: 50, season: 'Year-round', nutrition: 'Iron, Vitamin K, Folate' },
    { name: 'Sweet Potatoes', price: 150, season: 'Fall-Winter', nutrition: 'Vitamin A, Fiber, Potassium' },
    { name: 'Lentils', price: 140, season: 'Year-round', nutrition: 'Protein, Fiber, Iron' },
    { name: 'Bananas', price: 20, season: 'Year-round', nutrition: 'Potassium, Vitamin B6' },
    { name: 'Brown Rice', price: 130, season: 'Year-round', nutrition: 'Carbs, B Vitamins, Selenium' },
    { name: 'Chicken Breast', price: 300, season: 'Year-round', nutrition: 'Protein, Niacin, Selenium' },
    { name: 'Broccoli', price: 80, season: 'Spring-Fall', nutrition: 'Vitamin C, Vitamin K, Fiber' },
    { name: 'Apples', price: 60, season: 'Fall', nutrition: 'Fiber, Vitamin C, Antioxidants' }
];
const sampleMealPlan = {
    dailyCalories: 2000,
    dailyCost: 930,
    meals: {
        breakfast: {
            name: 'Oatmeal with Banana and Nuts',
            calories: 350,
            cost: 180,
            ingredients: ['Oats', 'Banana', 'Walnuts', 'Cinnamon'],
            nutrition: 'High fiber, Potassium, Healthy fats'
        },
        lunch: {
            name: 'Lentil and Spinach Curry with Rice',
            calories: 450,
            cost: 200,
            ingredients: ['Red Lentils', 'Spinach', 'Brown Rice', 'Spices'],
            nutrition: 'Protein, Iron, Folate, Complex carbs'
        },
        dinner: {
            name: 'Grilled Chicken with Sweet Potato',
            calories: 500,
            cost: 400,
            ingredients: ['Chicken Breast', 'Sweet Potato', 'Broccoli'],
            nutrition: 'Lean protein, Vitamin A, Vitamin C'
        },
        snacks: {
            name: 'Apple with Peanut Butter',
            calories: 200,
            cost: 150,
            ingredients: ['Apple', 'Natural Peanut Butter'],
            nutrition: 'Fiber, Healthy fats, Protein'
        }
    }
};
// @desc    Generate personalized meal plan
// @route   POST /api/nutrition/meal-plan
// @access  Private
const generateMealPlan = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }
        const { age, weight, height, activityLevel, healthConditions, dietaryRestrictions, budget, location } = req.body;
        // Simple meal plan generation logic - in production, this would use AI/ML
        const mealPlan = {
            ...sampleMealPlan,
            userId: req.user.id,
            generatedAt: new Date(),
            preferences: {
                healthConditions,
                dietaryRestrictions,
                budget,
                location
            }
        };
        res.json({
            success: true,
            data: mealPlan
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.generateMealPlan = generateMealPlan;
// @desc    Get local seasonal foods
// @route   GET /api/nutrition/local-foods
// @access  Private
const getLocalFoods = async (req, res) => {
    try {
        const { location, season, budget } = req.query;
        let filteredFoods = [...localFoods];
        // Filter by budget if specified
        if (budget) {
            const maxBudget = parseFloat(budget);
            filteredFoods = filteredFoods.filter(food => food.price <= maxBudget);
        }
        // Filter by season if specified
        if (season && season !== 'all') {
            filteredFoods = filteredFoods.filter(food => food.season.toLowerCase().includes(season.toLowerCase()) ||
                food.season === 'Year-round');
        }
        res.json({
            success: true,
            count: filteredFoods.length,
            data: filteredFoods
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.getLocalFoods = getLocalFoods;
// @desc    Get nutrition recommendations
// @route   GET /api/nutrition/recommendations
// @access  Private
const getNutritionRecommendations = async (req, res) => {
    try {
        // Mock recommendations - in production, this would be personalized
        const recommendations = {
            general: [
                'Aim for 5-9 servings of fruits and vegetables daily',
                'Choose whole grains over refined grains',
                'Include lean proteins in every meal',
                'Stay hydrated with at least 8 glasses of water daily',
                'Limit processed foods and added sugars'
            ],
            seasonal: [
                'Take advantage of seasonal produce for better nutrition and lower prices',
                'Store seasonal items properly to maintain nutritional value',
                'Try new seasonal recipes to keep meals interesting'
            ],
            budget: [
                'Buy in bulk for staple items like rice and beans',
                'Choose frozen vegetables when fresh are expensive',
                'Plan meals around sales and seasonal availability',
                'Cook larger batches and freeze portions for later'
            ]
        };
        res.json({
            success: true,
            data: recommendations
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.getNutritionRecommendations = getNutritionRecommendations;
// @desc    Calculate nutritional needs
// @route   POST /api/nutrition/calculate-needs
// @access  Private
const calculateNutritionNeeds = async (req, res) => {
    try {
        const { age, weight, height, activityLevel, gender } = req.body;
        // Basic BMR calculation using Mifflin-St Jeor Equation
        // For simplicity, using average values - in production, use proper calculations
        const bmr = gender === 'male' ?
            (10 * weight) + (6.25 * height) - (5 * age) + 5 :
            (10 * weight) + (6.25 * height) - (5 * age) - 161;
        // Activity level multipliers
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            'very-active': 1.9
        };
        const tdee = bmr * (activityMultipliers[activityLevel] || 1.55);
        const nutritionNeeds = {
            calories: Math.round(tdee),
            protein: Math.round(weight * 0.8), // g per kg body weight
            carbs: Math.round((tdee * 0.5) / 4), // 50% of calories from carbs
            fat: Math.round((tdee * 0.3) / 9), // 30% of calories from fat
            fiber: 25, // minimum daily fiber
            water: Math.round(weight * 0.03) // liters per kg body weight
        };
        res.json({
            success: true,
            data: {
                bmr: Math.round(bmr),
                tdee: Math.round(tdee),
                nutritionNeeds
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.calculateNutritionNeeds = calculateNutritionNeeds;
// Validation rules
exports.generateMealPlanValidation = [
    (0, express_validator_1.body)('age').optional().isNumeric().withMessage('Age must be a number'),
    (0, express_validator_1.body)('weight').optional().isNumeric().withMessage('Weight must be a number'),
    (0, express_validator_1.body)('height').optional().isNumeric().withMessage('Height must be a number'),
    (0, express_validator_1.body)('activityLevel').optional().isIn(['sedentary', 'light', 'moderate', 'active', 'very-active']).withMessage('Invalid activity level'),
    (0, express_validator_1.body)('budget').optional().isNumeric().withMessage('Budget must be a number')
];
exports.calculateNeedsValidation = [
    (0, express_validator_1.body)('age').isNumeric().withMessage('Age is required and must be a number'),
    (0, express_validator_1.body)('weight').isNumeric().withMessage('Weight is required and must be a number'),
    (0, express_validator_1.body)('height').isNumeric().withMessage('Height is required and must be a number'),
    (0, express_validator_1.body)('activityLevel').isIn(['sedentary', 'light', 'moderate', 'active', 'very-active']).withMessage('Invalid activity level'),
    (0, express_validator_1.body)('gender').isIn(['male', 'female']).withMessage('Gender must be male or female')
];
//# sourceMappingURL=nutritionController.js.map
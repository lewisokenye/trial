import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface AuthRequest extends Request {
  user?: any;
}

export const generateAIMealPlan = async (req: AuthRequest, res: Response) => {
  try {
    const { age, weight, height, activityLevel, dietaryPreference, healthGoals, allergies, mealsPerDay } = req.body;

    // Validate required fields
    if (!age || !weight || !height || !activityLevel || !dietaryPreference) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: age, weight, height, activityLevel, dietaryPreference'
      });
    }

    // Check if Gemini API key is configured
    console.log('🔑 Checking Gemini API key...');
    console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
    console.log('API Key length:', process.env.GEMINI_API_KEY?.length);
    console.log('API Key starts with:', process.env.GEMINI_API_KEY?.substring(0, 10));
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      console.log('❌ API key validation failed');
      return res.status(500).json({
        success: false,
        message: 'Gemini API key not configured. Please add a valid GEMINI_API_KEY to your .env file. Get one from: https://makersuite.google.com/app/apikey'
      });
    }
    
    console.log('✅ API key validated successfully');

    // Initialize Gemini with the API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('🔧 Gemini client initialized');

    // Build the prompt for Gemini
    const prompt = `You are a professional nutritionist. Generate a detailed, personalized meal plan based on the following information:

**User Profile:**
- Age: ${age} years
- Weight: ${weight} kg
- Height: ${height} cm
- Activity Level: ${activityLevel}
- Dietary Preference: ${dietaryPreference}
${healthGoals ? `- Health Goals: ${healthGoals}` : ''}
${allergies ? `- Allergies/Restrictions: ${allergies}` : ''}
${mealsPerDay ? `- Meals per day: ${mealsPerDay}` : '- Meals per day: 3 main meals + 2 snacks'}

**Requirements:**
1. Calculate daily caloric needs based on BMR and activity level
2. Provide macronutrient breakdown (protein, carbs, fats in grams)
3. Create specific meal suggestions for breakfast, lunch, dinner, and snacks
4. Use locally available foods in Kenya where possible
5. Include portion sizes for each meal
6. Consider the dietary preference strictly (vegetarian, vegan, keto, etc.)
7. Make meals practical and easy to prepare

**Response Format (return as valid JSON):**
{
  "calories": <total daily calories as number>,
  "protein": "<grams>g",
  "carbs": "<grams>g",
  "fats": "<grams>g",
  "breakfast": "<detailed meal description with portions>",
  "lunch": "<detailed meal description with portions>",
  "dinner": "<detailed meal description with portions>",
  "snacks": "<detailed snack suggestions with portions>",
  "hydration": "<water intake recommendation>",
  "tips": ["<nutritional tip 1>", "<tip 2>", "<tip 3>"]
}

Provide ONLY the JSON response, no additional text.`;

    console.log('🤖 Generating AI meal plan for user:', req.user.id);
    console.log('📝 User data:', { age, weight, height, activityLevel, dietaryPreference });

    // Call Google Gemini API with fallback
    let aiResponse;
    const modelsToTry = ['gemini-1.5-flash', 'gemini-pro'];
    let lastError;
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`🔄 Trying Gemini model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const fullPrompt = `You are a professional nutritionist who creates personalized meal plans. Always respond with valid JSON only.\n\n${prompt}`;
        
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        aiResponse = response.text();
        
        console.log(`✅ Gemini API call successful with model: ${modelName}`);
        break; // Success, exit loop
      } catch (geminiError: any) {
        console.error(`❌ Failed with ${modelName}:`, geminiError.message);
        lastError = geminiError;
        // Continue to next model
      }
    }
    
    if (!aiResponse && lastError) {
      console.error('❌ All Gemini models failed:', {
        message: lastError.message,
        stack: lastError.stack
      });
      throw lastError;
    }

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Parse the AI response
    let mealPlan;
    try {
      // Clean up the response - remove markdown code blocks if present
      const cleanedResponse = aiResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      mealPlan = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      throw new Error('Invalid response format from AI');
    }

    console.log('✅ AI meal plan generated successfully');

    res.json({
      success: true,
      data: {
        mealPlan,
        userProfile: {
          age,
          weight,
          height,
          activityLevel,
          dietaryPreference,
          healthGoals,
          allergies
        },
        generatedAt: new Date()
      }
    });

  } catch (error: any) {
    console.error('❌ AI Meal Plan Generation Error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
    
    // Handle Gemini specific errors
    if (error.message?.includes('API key')) {
      return res.status(500).json({
        success: false,
        message: 'Invalid Gemini API key. Please check your configuration at: https://makersuite.google.com/app/apikey'
      });
    }

    if (error.message?.includes('quota') || error.message?.includes('limit')) {
      return res.status(429).json({
        success: false,
        message: 'Gemini API rate limit exceeded. Please try again in a moment.'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate meal plan with Gemini AI',
      details: error.message,
      error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
};

// Alternative: Generate meal plan using Google Gemini (if you prefer)
export const generateGeminiMealPlan = async (req: AuthRequest, res: Response) => {
  // Implementation for Google Gemini API
  // You can add this as an alternative if needed
  res.status(501).json({
    success: false,
    message: 'Gemini integration not yet implemented. Use OpenAI endpoint instead.'
  });
};

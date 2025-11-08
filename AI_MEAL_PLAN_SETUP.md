# AI-Powered Meal Plan Integration Guide

## Overview

Your nutrition planning page now uses **OpenAI's GPT-3.5** to generate personalized meal plans based on user inputs!

## Features ✨

- **AI-Generated Meal Plans** - Personalized nutrition recommendations
- **Smart Calculations** - BMR and calorie needs based on user profile
- **Detailed Macros** - Protein, carbs, and fats breakdown
- **Local Foods** - Prioritizes foods available in Kenya
- **Dietary Preferences** - Supports vegetarian, vegan, keto, paleo, etc.
- **Health Goals** - Weight loss, muscle gain, better energy, etc.
- **Allergy Awareness** - Avoids specified allergens
- **Nutrition Tips** - Bonus health recommendations from AI

## Setup Instructions

### Step 1: Get OpenAI API Key

1. **Go to** [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Sign up** or login to your account
3. **Click** "Create new secret key"
4. **Copy** the API key (starts with `sk-...`)
5. **Important:** Save it somewhere safe - you won't be able to see it again!

**Pricing:** OpenAI offers free credits for new users (~$5). After that, GPT-3.5 costs about $0.002 per request (very affordable).

### Step 2: Configure Backend

1. **Open** `backend/.env`
2. **Replace** `your_openai_api_key_here` with your actual API key:

```bash
OPENAI_API_KEY=sk-proj-abc123...your_actual_key_here
```

3. **Save** the file

### Step 3: Restart Backend

```bash
# Stop the backend (Ctrl+C)
# Then restart:
cd backend
npm run dev
```

**Wait for:**
```
🚀 Server running on port 5000
🍃 MongoDB Connected: localhost
```

### Step 4: Test the Feature

1. **Navigate** to http://localhost:5173/nutrition
2. **Fill in the form:**
   - Age: 25
   - Weight: 70
   - Height: 170
   - Activity Level: Moderate Activity
   - Dietary Preference: Balanced
   - Health Goals: "Weight loss and better energy"
   - Allergies: "Nuts"
3. **Click** "Generate AI Meal Plan" ✨
4. **Wait** ~5-10 seconds for AI to generate
5. **View** your personalized meal plan!

## What You'll Get

### Sample AI Response:

```json
{
  "calories": 1800,
  "protein": "120g",
  "carbs": "180g",
  "fats": "50g",
  "breakfast": "2 scrambled eggs with spinach and tomatoes (250 cal)\n1 slice whole wheat toast (80 cal)\n1 medium banana (105 cal)",
  "lunch": "Grilled chicken breast (200g) with mixed vegetables (400 cal)\nBrown rice (150g, 200 cal)\nSide salad with olive oil dressing (100 cal)",
  "dinner": "Baked tilapia (200g, 250 cal)\nQuinoa (150g, 180 cal)\nSteamed broccoli and carrots (80 cal)",
  "snacks": "Greek yogurt (150g, 120 cal)\nApple with 1 tbsp almond butter - Wait, no nuts! Replace with:\nCarrot sticks with hummus (100 cal)",
  "hydration": "Drink 2.5-3 liters of water daily. Start your day with 500ml of water.",
  "tips": [
    "Eat breakfast within 1 hour of waking to boost metabolism",
    "Include protein in every meal to support weight loss",
    "Avoid sugary drinks and opt for water or herbal tea",
    "Plan your meals in advance to avoid unhealthy choices"
  ]
}
```

## API Endpoints

### Generate AI Meal Plan

**POST** `/api/nutrition/ai-meal-plan`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "age": 25,
  "weight": 70,
  "height": 170,
  "activityLevel": "moderate",
  "dietaryPreference": "balanced",
  "healthGoals": "Weight loss",
  "allergies": "Nuts, Dairy",
  "mealsPerDay": "3"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "mealPlan": { ... },
    "userProfile": { ... },
    "generatedAt": "2024-11-06T00:00:00.000Z"
  }
}
```

## Cost Estimate

**OpenAI GPT-3.5 Pricing:**
- Input: $0.0015 per 1K tokens
- Output: $0.002 per 1K tokens

**Typical meal plan request:**
- ~500 input tokens (user profile + prompt)
- ~800 output tokens (meal plan)
- **Cost per request:** ~$0.002 (less than 1 cent!)

**For 1000 meal plans:** ~$2

## Alternative: Use Google Gemini (Free Alternative)

If you want a free option, you can use Google's Gemini API instead:

1. Get API key from: https://makersuite.google.com/app/apikey
2. Install: `npm install @google/generative-ai`
3. I can help you switch to Gemini if needed!

## Troubleshooting

### Error: "OpenAI API key not configured"

**Solution:**
- Make sure you added the API key to `backend/.env`
- Restart the backend server
- Check there are no extra spaces in the .env file

### Error: "Invalid OpenAI API key"

**Solution:**
- Verify your API key is correct
- Make sure you copied the entire key (starts with `sk-`)
- Check if your OpenAI account has available credits

### Error: "AI service rate limit exceeded"

**Solution:**
- You've hit OpenAI's rate limit
- Wait a few seconds and try again
- Consider upgrading your OpenAI plan if this happens often

### Error: "Failed to parse AI response"

**Solution:**
- This is rare, but AI sometimes returns invalid JSON
- Click the button again to regenerate
- The system will retry automatically

## Best Practices

### For Users:
1. ✅ Be specific with health goals (e.g., "Lose 5kg in 2 months")
2. ✅ List all allergies and restrictions
3. ✅ Provide accurate measurements for best results
4. ✅ Try different dietary preferences to see what works

### For Development:
1. ✅ Never commit your API key to Git
2. ✅ Monitor your OpenAI usage dashboard
3. ✅ Add rate limiting if you expect high traffic
4. ✅ Cache meal plans to reduce API costs
5. ✅ Add user feedback system to improve prompts

## Advanced Features (Optional)

### Want to add more features?

**I can help you implement:**
- 📊 **Save meal plans** to database
- 🔄 **Regenerate** specific meals
- 📱 **Share** meal plans via WhatsApp/Email
- 📅 **Weekly planner** - Generate 7 days at once
- 🛒 **Shopping list** generator from meal plan
- 📈 **Track progress** - Compare meals over time
- 🎯 **Calorie tracker** - Log actual vs planned intake
- 🤖 **Chatbot** - Ask nutrition questions
- 📸 **Food scanner** - Upload food photos for analysis

Just let me know what you'd like!

## Next Steps

1. ✅ Get your OpenAI API key
2. ✅ Add it to `backend/.env`
3. ✅ Restart the backend
4. ✅ Test the nutrition page
5. 🎉 Enjoy AI-powered meal plans!

---

**Status:** ✅ AI Integration Complete!

**Your users can now get personalized, AI-generated meal plans! 🚀**

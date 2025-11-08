import { useState } from 'react';
import { Apple, Utensils, Clock, ChefHat, Sparkles, Loader } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import api from '../services/api';
import { toast } from 'react-toastify';

const Nutrition = () => {
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    dietaryPreference: 'balanced',
    healthGoals: '',
    allergies: '',
    mealsPerDay: '3',
  });

  const generateMealPlan = async () => {
    // Validate form
    if (!formData.age || !formData.weight || !formData.height) {
      toast.error('Please fill in age, weight, and height');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/nutrition/ai-meal-plan', formData);
      setMealPlan(response.data.data.mealPlan);
      toast.success('AI meal plan generated successfully! 🎉');
    } catch (error: any) {
      console.error('Failed to generate meal plan:', error);
      toast.error(
        error.response?.data?.message || 
        'Failed to generate meal plan. Please check if Gemini API key is configured.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nutrition Planning</h1>
        <p className="text-gray-600">Generate personalized meal plans and nutrition recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-primary-600" />
            Your Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="input"
                placeholder="25"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="input"
                  placeholder="70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="input"
                  placeholder="170"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
              <select
                value={formData.activityLevel}
                onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                className="input"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light Activity</option>
                <option value="moderate">Moderate Activity</option>
                <option value="active">Very Active</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preference</label>
              <select
                value={formData.dietaryPreference}
                onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                className="input"
              >
                <option value="balanced">Balanced</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="keto">Keto</option>
                <option value="paleo">Paleo</option>
                <option value="low-carb">Low Carb</option>
                <option value="mediterranean">Mediterranean</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Health Goals (Optional)</label>
              <input
                type="text"
                value={formData.healthGoals}
                onChange={(e) => setFormData({ ...formData, healthGoals: e.target.value })}
                className="input"
                placeholder="e.g., Weight loss, Muscle gain, Better energy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Allergies/Restrictions (Optional)</label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                className="input"
                placeholder="e.g., Nuts, Dairy, Gluten"
              />
            </div>
            <button 
              onClick={generateMealPlan} 
              className="w-full btn-primary flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Generating with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate AI Meal Plan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Meal Plan Results */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Utensils className="w-6 h-6 text-primary-600" />
            Your Meal Plan
          </h2>
          {!mealPlan ? (
            <div className="text-center py-12">
              <Apple className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Fill in your details and generate a meal plan</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Nutrition Stats */}
              <div className="grid grid-cols-4 gap-4 p-4 bg-primary-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Calories</p>
                  <p className="text-lg font-bold text-primary-700">{mealPlan.calories}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Protein</p>
                  <p className="text-lg font-bold text-primary-700">{mealPlan.protein}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Carbs</p>
                  <p className="text-lg font-bold text-primary-700">{mealPlan.carbs}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Fats</p>
                  <p className="text-lg font-bold text-primary-700">{mealPlan.fats}</p>
                </div>
              </div>

              {/* Meals */}
              <div className="space-y-4">
                {[
                  { time: 'Breakfast', meal: mealPlan.breakfast, icon: '🌅' },
                  { time: 'Lunch', meal: mealPlan.lunch, icon: '☀️' },
                  { time: 'Dinner', meal: mealPlan.dinner, icon: '🌙' },
                  { time: 'Snacks', meal: mealPlan.snacks, icon: '🍎' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">{item.time}</span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{item.meal}</p>
                  </div>
                ))}
              </div>

              {/* Hydration */}
              {mealPlan.hydration && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">💧</span>
                    <span className="font-semibold text-gray-900">Hydration</span>
                  </div>
                  <p className="text-gray-700">{mealPlan.hydration}</p>
                </div>
              )}

              {/* Tips */}
              {mealPlan.tips && mealPlan.tips.length > 0 && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Nutrition Tips</span>
                  </div>
                  <ul className="space-y-2">
                    {mealPlan.tips.map((tip: string, idx: number) => (
                      <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Nutrition;

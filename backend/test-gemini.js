// Quick test to see which Gemini models are available
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  console.log('🔑 API Key found:', !!apiKey);
  console.log('🔑 API Key starts with:', apiKey?.substring(0, 10));
  
  if (!apiKey) {
    console.error('❌ No API key found in .env');
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // List available models
  try {
    console.log('\n📋 Listing available models...\n');
    const models = await genAI.listModels();
    
    console.log('Available models:');
    for await (const model of models) {
      console.log(`- ${model.name}`);
      console.log(`  Display Name: ${model.displayName}`);
      console.log(`  Supported Methods: ${model.supportedGenerationMethods?.join(', ')}`);
      console.log('');
    }
  } catch (error) {
    console.error('❌ Error listing models:', error.message);
  }

  // Try different model names
  const modelsToTry = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'models/gemini-pro',
    'models/gemini-1.5-flash'
  ];

  console.log('\n🧪 Testing model names...\n');

  for (const modelName of modelsToTry) {
    try {
      console.log(`Testing: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say "hello" in JSON format: {"message": "hello"}');
      const response = await result.response;
      const text = response.text();
      console.log(`✅ ${modelName} works!`);
      console.log(`   Response: ${text.substring(0, 100)}...\n`);
      break; // Found a working model
    } catch (error) {
      console.log(`❌ ${modelName} failed: ${error.message}\n`);
    }
  }
}

testGemini();

import { useState } from 'react';
import { Bug, Camera, FileText, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';

const Disease = () => {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const analyzeDisease = () => {
    // Mock analysis - in production, this would use image recognition AI
    setAnalysisResult({
      disease: 'Leaf Blight',
      confidence: 87,
      severity: 'Moderate',
      symptoms: ['Brown spots on leaves', 'Wilting', 'Yellowing edges'],
      treatment: [
        'Remove affected leaves immediately',
        'Apply copper-based fungicide',
        'Improve air circulation',
        'Reduce watering frequency',
      ],
      prevention: [
        'Plant resistant varieties',
        'Maintain proper spacing',
        'Avoid overhead watering',
        'Regular monitoring',
      ],
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Disease Analysis</h1>
        <p className="text-gray-600">Identify crop diseases and get treatment recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Camera className="w-6 h-6 text-primary-600" />
            Upload Crop Image
          </h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-500 transition-colors cursor-pointer">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crop Type
              </label>
              <select className="input">
                <option>Select crop type</option>
                <option>Maize</option>
                <option>Wheat</option>
                <option>Rice</option>
                <option>Tomato</option>
                <option>Potato</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                className="input"
                rows={3}
                placeholder="Describe the symptoms you've observed..."
              />
            </div>

            <button onClick={analyzeDisease} className="w-full btn-primary">
              Analyze Disease
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary-600" />
            Analysis Results
          </h2>

          {!analysisResult ? (
            <div className="text-center py-12">
              <Bug className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Upload an image to get disease analysis</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Disease Identification */}
              <div className="p-4 bg-primary-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{analysisResult.disease}</h3>
                    <p className="text-sm text-gray-600">Confidence: {analysisResult.confidence}%</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    analysisResult.severity === 'Severe' ? 'bg-red-100 text-red-800' :
                    analysisResult.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {analysisResult.severity}
                  </span>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Symptoms Detected
                </h4>
                <ul className="space-y-2">
                  {analysisResult.symptoms.map((symptom: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-primary-600 mt-1">•</span>
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Treatment */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Treatment Recommendations</h4>
                <ol className="space-y-2">
                  {analysisResult.treatment.map((step: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="bg-primary-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Prevention */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Prevention Tips</h4>
                <ul className="space-y-2">
                  {analysisResult.prevention.map((tip: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-blue-600 mt-1">✓</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Disease;

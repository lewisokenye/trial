import { Request, Response } from 'express';
import {body, validationResult} from 'express-validator';

interface AuthRequest extends Request {
    user?: any;
}

const diseaseDatabase = {
    'blight': {
    disease: 'Late Blight',
    severity: 'high',
    description: 'Late blight is a destructive disease that affects tomatoes and potatoes, caused by the pathogen Phytophthora infestans.',
    symptoms: [
      'Dark, water-soaked lesions on leaves',
      'White fuzzy growth on leaf undersides',
      'Brown spots on stems and fruits',
      'Rapid wilting and death of plant parts'
    ],
    causes: [
      'High humidity (>90%)',
      'Cool temperatures (60-70°F)',
      'Poor air circulation',
      'Overhead watering',
      'Infected plant debris'
    ],
    treatments: {
      organic: [
        'Apply copper-based fungicides',
        'Use baking soda spray (1 tsp per quart water)',
        'Remove affected plant parts immediately',
        'Improve air circulation around plants'
      ],
      chemical: [
        'Apply chlorothalonil fungicide',
        'Use mancozeb-based treatments',
        'Spray with propamocarb hydrochloride',
        'Apply metalaxyl for severe cases'
      ],
      preventive: [
        'Plant resistant varieties',
        'Ensure proper spacing between plants',
        'Water at soil level, not on leaves',
        'Remove plant debris after harvest',
        'Rotate crops annually'
      ]
    },
    expectedRecovery: '2-3 weeks with proper treatment',
    yieldImpact: 'Can reduce yield by 30-70% if untreated'
  },
  'rust': {
    disease: 'Wheat Rust',
    severity: 'medium',
    description: 'Wheat rust is a fungal disease that affects wheat crops, causing orange-red pustules on leaves and stems.',
    symptoms: [
      'Orange-red pustules on leaves',
      'Yellow spots that turn brown',
      'Premature leaf drop',
      'Weakened stems'
    ],
    causes: [
      'Moderate temperatures (60-70°F)',
      'High humidity',
      'Wind-dispersed spores',
      'Susceptible wheat varieties'
    ],
    treatments: {
      organic: [
        'Apply sulfur-based fungicides',
        'Use neem oil spray',
        'Remove infected plant debris',
        'Encourage beneficial insects'
      ],
      chemical: [
        'Apply triazole fungicides',
        'Use strobilurin-based treatments',
        'Spray with tebuconazole',
        'Apply propiconazole for severe infections'
      ],
      preventive: [
        'Plant rust-resistant varieties',
        'Monitor weather conditions',
        'Apply preventive fungicide sprays',
        'Maintain proper field hygiene'
      ]
    },
    expectedRecovery: '3-4 weeks with treatment',
    yieldImpact: 'Can reduce yield by 20-40% if untreated'
  }
};

export const analyzeDisease = async (req: AuthRequest, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
        }

        const {  image, cropType, location } = req.body;

        await new Promise(resolve => setTimeout(resolve, 3000));

        const diseases = Object.keys(diseaseDatabase);
        const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
        const result = diseaseDatabase[randomDisease as keyof typeof diseaseDatabase];

        const analysis = {
            user: req.user.id,
            image: image,
            cropType,
            location,
            result,
            analyzedAt: new Date()
        };
        res.json({
            success: true,
            data: {
                analysisId: `ANALYSIS-${Date.now()}`,
                ...result,
                cropType,
                location,
                analyzedAt: new Date()
            }
        });
    } catch (error) {
        console.error('Error analyzing disease:', error);
        res.status(500).json({ success: false, message: 'Server error during disease analysis' });
    }
};

export const getAnalysisHistory = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Mock history data - in production, this would come from database
    const mockHistory = [
      {
        id: 'ANALYSIS-001',
        cropType: 'Tomato',
        disease: 'Late Blight',
        confidence: 92.5,
        severity: 'high',
        analyzedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        location: 'Farm A'
      },
      {
        id: 'ANALYSIS-002',
        cropType: 'Wheat',
        disease: 'Wheat Rust',
        confidence: 88.3,
        severity: 'medium',
        analyzedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        location: 'Field B'
      }
    ];

    res.json({
      success: true,
      count: mockHistory.length,
      pagination: {
        page,
        limit,
        total: mockHistory.length,
        pages: Math.ceil(mockHistory.length / limit)
      },
      data: mockHistory
    });
    } catch (error) {
        console.error('Error fetching analysis history:', error);
        res.status(500).json({ success: false, message: 'Server error fetching analysis history' });
    }
};

export const getDiseaseInfo = async (req: AuthRequest, res: Response) => {
  try {
    const { diseaseId } = req.params;

    const disease = diseaseDatabase[diseaseId as keyof typeof diseaseDatabase];

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: 'Disease information not found'
      });
    }

    res.json({
      success: true,
      data: disease
    });
    } catch (error) {
        console.error('Error fetching disease information:', error);
        res.status(500).json({ success: false, message: 'Server error fetching disease information' });
    }
};

export const getDiseases = async (req: AuthRequest, res: Response) => {
  try {
    const diseases = Object.entries(diseaseDatabase).map(([id, data]) => ({
      id,
      name: data.disease,
      severity: data.severity,
      description: data.description
    }));

    res.json({
      success: true,
      count: diseases.length,
      data: diseases
    });
    } catch (error) {
        console.error('Error fetching diseases:', error);
        res.status(500).json({ success: false, message: 'Server error fetching diseases' });
    }
};

export const getTreatments = async (req: AuthRequest, res: Response) => {
  try {
    const { diseaseId } = req.params;
    const { type } = req.query; // organic, chemical, preventive

    const disease = diseaseDatabase[diseaseId as keyof typeof diseaseDatabase];

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: 'Disease not found'
      });
    }

    let treatments = disease.treatments;

    if (type && ['organic', 'chemical', 'preventive'].includes(type as string)) {
      const treatmentType = type as 'organic' | 'chemical' | 'preventive';
      treatments = {
        [treatmentType]: disease.treatments[treatmentType]
      } as any;
    }

    res.json({
      success: true,
      data: {
        disease: disease.disease,
        treatments
      }
    });
    } catch (error) {
        console.error('Error fetching treatments:', error);
        res.status(500).json({ success: false, message: 'Server error fetching treatments' });
    }
};

export const analyzeDiseaseValidation = [
  body('image').notEmpty().withMessage('Image is required'),
  body('cropType').optional().isString().withMessage('Crop type must be a string'),
  body('location').optional().isString().withMessage('Location must be a string')
];

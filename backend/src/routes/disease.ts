import express from 'express';
import {
  analyzeDisease,
  getAnalysisHistory,
  getDiseaseInfo,
  getDiseases,
  getTreatments,
  analyzeDiseaseValidation
} from '../controllers/diseaseController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/analyze', analyzeDiseaseValidation, analyzeDisease);
router.get('/history', getAnalysisHistory);
router.get('/diseases', getDiseases);
router.get('/info/:diseaseId', getDiseaseInfo);
router.get('/treatments/:diseaseId', getTreatments);

export default router;
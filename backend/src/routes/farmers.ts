import express from 'express';
import {
  getFarmers,
  getFarmer,
  createFarmer,
  updateFarmer,
  deleteFarmer,
  getMyFarmerProfile,
  addYieldData,
  createFarmerValidation
} from '../controllers/farmerController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getFarmers)
  .post(createFarmerValidation, createFarmer);

router.route('/:id')
  .get(getFarmer)
  .put(updateFarmer)
  .delete(deleteFarmer);

// Special routes
router.get('/me/profile', getMyFarmerProfile);
router.post('/:id/yields', addYieldData);

export default router;
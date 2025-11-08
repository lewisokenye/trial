import express from 'express';
import {
  getDonations,
  getDonation,
  createDonation,
  updateDonation,
  deleteDonation,
  getAvailableDonations,
  createDonationValidation
} from '../controllers/donationController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getDonations)
  .post(createDonationValidation, createDonation);

router.route('/:id')
  .get(getDonation)
  .put(updateDonation)
  .delete(deleteDonation);

// Special routes
router.get('/available/food', getAvailableDonations);

export default router;
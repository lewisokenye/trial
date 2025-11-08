import express from 'express';
import {
  getWasteEntries,
  getWasteEntry,
  createWasteEntry,
  updateWasteEntry,
  deleteWasteEntry,
  getWasteAnalytics,
  getExpiryItems,
  createExpiryItem,
  updateExpiryItem,
  deleteExpiryItem,
  createWasteEntryValidation,
  createExpiryItemValidation
} from '../controllers/wasteController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Waste entries routes
router.route('/')
  .get(getWasteEntries)
  .post(createWasteEntryValidation, createWasteEntry);

router.route('/:id')
  .get(getWasteEntry)
  .put(updateWasteEntry)
  .delete(deleteWasteEntry);

// Analytics route
router.get('/analytics/overview', getWasteAnalytics);

// Expiry items routes
router.route('/expiry')
  .get(getExpiryItems)
  .post(createExpiryItemValidation, createExpiryItem);

router.route('/expiry/:id')
  .put(updateExpiryItem)
  .delete(deleteExpiryItem);

export default router;
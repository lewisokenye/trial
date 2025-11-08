import express from 'express';
import {
  getDeliveries,
  getDelivery,
  updateDeliveryStatus,
  getAnalytics,
  optimizeRoutes,
  getVehicles,
  getAlerts
} from '../controllers/supplyChainController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/deliveries')
  .get(getDeliveries);

router.route('/deliveries/:id')
  .get(getDelivery);

router.put('/deliveries/:id/status', authorize('admin'), updateDeliveryStatus);

router.get('/analytics', getAnalytics);
router.post('/optimize-routes', authorize('admin'), optimizeRoutes);
router.get('/vehicles', getVehicles);
router.get('/alerts', getAlerts);

export default router;
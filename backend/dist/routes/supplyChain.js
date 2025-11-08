"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supplyChainController_1 = require("../controllers/supplyChainController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_1.protect);
router.route('/deliveries')
    .get(supplyChainController_1.getDeliveries);
router.route('/deliveries/:id')
    .get(supplyChainController_1.getDelivery);
router.put('/deliveries/:id/status', (0, auth_1.authorize)('admin'), supplyChainController_1.updateDeliveryStatus);
router.get('/analytics', supplyChainController_1.getAnalytics);
router.post('/optimize-routes', (0, auth_1.authorize)('admin'), supplyChainController_1.optimizeRoutes);
router.get('/vehicles', supplyChainController_1.getVehicles);
router.get('/alerts', supplyChainController_1.getAlerts);
exports.default = router;
//# sourceMappingURL=supplyChain.js.map
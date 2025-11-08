"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wasteController_1 = require("../controllers/wasteController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_1.protect);
// Waste entries routes
router.route('/')
    .get(wasteController_1.getWasteEntries)
    .post(wasteController_1.createWasteEntryValidation, wasteController_1.createWasteEntry);
router.route('/:id')
    .get(wasteController_1.getWasteEntry)
    .put(wasteController_1.updateWasteEntry)
    .delete(wasteController_1.deleteWasteEntry);
// Analytics route
router.get('/analytics/overview', wasteController_1.getWasteAnalytics);
// Expiry items routes
router.route('/expiry')
    .get(wasteController_1.getExpiryItems)
    .post(wasteController_1.createExpiryItemValidation, wasteController_1.createExpiryItem);
router.route('/expiry/:id')
    .put(wasteController_1.updateExpiryItem)
    .delete(wasteController_1.deleteExpiryItem);
exports.default = router;
//# sourceMappingURL=waste.js.map
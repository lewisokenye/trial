"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const farmerController_1 = require("../controllers/farmerController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_1.protect);
router.route('/')
    .get(farmerController_1.getFarmers)
    .post(farmerController_1.createFarmerValidation, farmerController_1.createFarmer);
router.route('/:id')
    .get(farmerController_1.getFarmer)
    .put(farmerController_1.updateFarmer)
    .delete(farmerController_1.deleteFarmer);
// Special routes
router.get('/me/profile', farmerController_1.getMyFarmerProfile);
router.post('/:id/yields', farmerController_1.addYieldData);
exports.default = router;
//# sourceMappingURL=farmers.js.map
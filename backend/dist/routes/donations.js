"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const donationController_1 = require("../controllers/donationController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_1.protect);
router.route('/')
    .get(donationController_1.getDonations)
    .post(donationController_1.createDonationValidation, donationController_1.createDonation);
router.route('/:id')
    .get(donationController_1.getDonation)
    .put(donationController_1.updateDonation)
    .delete(donationController_1.deleteDonation);
// Special routes
router.get('/available/food', donationController_1.getAvailableDonations);
exports.default = router;
//# sourceMappingURL=donations.js.map
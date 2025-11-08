"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diseaseController_1 = require("../controllers/diseaseController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_1.protect);
router.post('/analyze', diseaseController_1.analyzeDiseaseValidation, diseaseController_1.analyzeDisease);
router.get('/history', diseaseController_1.getAnalysisHistory);
router.get('/diseases', diseaseController_1.getDiseases);
router.get('/info/:diseaseId', diseaseController_1.getDiseaseInfo);
router.get('/treatments/:diseaseId', diseaseController_1.getTreatments);
exports.default = router;
//# sourceMappingURL=disease.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_1.protect);
// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', (0, auth_1.authorize)('admin'), adminController_1.getAllUsers);
// @desc    Verify user (admin only)
// @route   PUT /api/users/:userId/verify
// @access  Private/Admin
router.put('/:userId/verify', (0, auth_1.authorize)('admin'), adminController_1.verifyUser);
// @desc    Unverify user (admin only)
// @route   PUT /api/users/:userId/unverify
// @access  Private/Admin
router.put('/:userId/unverify', (0, auth_1.authorize)('admin'), adminController_1.unverifyUser);
// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        // TODO: Implement get single user
        res.json({ message: 'Get single user endpoint' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        // TODO: Implement update user
        res.json({ message: 'Update user endpoint' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', (0, auth_1.authorize)('admin'), async (req, res) => {
    try {
        // TODO: Implement delete user
        res.json({ message: 'Delete user endpoint' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map
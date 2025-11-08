"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.unverifyUser = exports.verifyUser = void 0;
const User_1 = __importDefault(require("../models/User"));
// Admin can verify users
const verifyUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User_1.default.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            success: true,
            message: 'User verified successfully',
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isVerified: user.isVerified
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.verifyUser = verifyUser;
// Admin can unverify users
const unverifyUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User_1.default.findByIdAndUpdate(userId, { isVerified: false }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            success: true,
            message: 'User verification removed',
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isVerified: user.isVerified
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.unverifyUser = unverifyUser;
// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select('-password');
        res.json({
            success: true,
            count: users.length,
            data: {
                users
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=adminController.js.map
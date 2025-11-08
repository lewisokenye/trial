"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = exports.updatePassword = exports.updateDetails = exports.getMe = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};
const register = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password, role, organization, location } = req.body;
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User_1.default.create({
            name,
            email,
            password,
            role: role || 'user',
            organization,
            location,
        });
        res.status(201).json({
            success: true,
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    organization: user.organization,
                    location: user.location,
                },
                token: generateToken(user._id.toString()),
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.json({
            success: true,
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    organization: user.organization,
                    location: user.location,
                },
                token: generateToken(user._id.toString()),
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user.id);
        res.json({
            success: true,
            data: {
                user: {
                    _id: user?._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    organization: user?.organization,
                    location: user?.location,
                    avatar: user?.avatar,
                    phoneNumber: user?.phoneNumber,
                    isVerified: user?.isVerified
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getMe = getMe;
const updateDetails = async (req, res) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email,
            organization: req.body.organization,
            location: req.body.location,
            phoneNumber: req.body.phoneNumber
        };
        const user = await User_1.default.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true,
        });
        res.json({
            success: true,
            data: {
                user: {
                    _id: user?._id,
                    name: user?.name,
                    email: user?.email,
                    role: user?.role,
                    organization: user?.organization,
                    location: user?.location,
                    avatar: user?.avatar,
                    phoneNumber: user?.phoneNumber,
                    isVerified: user?.isVerified
                }
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateDetails = updateDetails;
const updatePassword = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user.id).select('+password');
        if (!(await user.comparePassword(req.body.currentPassword))) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
        user.password = req.body.newPassword;
        await user.save();
        res.json({
            success: true,
            data: {
                token: generateToken(user._id.toString()),
            },
            message: 'Password updated successfully'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};
exports.updatePassword = updatePassword;
exports.registerValidation = [
    (0, express_validator_1.body)('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Please include a valid email'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('role').optional().isIn(['user', 'ngo', 'donor', 'farmer', 'admin']).withMessage('Invalid role')
];
exports.loginValidation = [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Please include a valid email'),
    (0, express_validator_1.body)('password').exists().withMessage('Password is required')
];
//# sourceMappingURL=authController.js.map
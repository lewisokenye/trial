"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFarmerValidation = exports.addYieldData = exports.getMyFarmerProfile = exports.deleteFarmer = exports.updateFarmer = exports.createFarmer = exports.getFarmer = exports.getFarmers = void 0;
const express_validator_1 = require("express-validator");
const Farmer_1 = __importDefault(require("../models/Farmer"));
const getFarmers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        let query = {};
        // Filter by verification status if specified
        if (req.query.verified === 'true') {
            query.isVerified = true;
        }
        else if (req.query.verified === 'false') {
            query.isVerified = false;
        }
        // Filter by location if specified
        if (req.query.location) {
            query.location = { $regex: req.query.location, $options: 'i' };
        }
        // Filter by crops if specified
        if (req.query.crop) {
            query.primaryCrops = { $in: [req.query.crop] };
        }
        const farmers = await Farmer_1.default.find(query)
            .populate('user', 'name email organization location')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(startIndex);
        const total = await Farmer_1.default.countDocuments(query);
        res.json({
            success: true,
            count: farmers.length,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            },
            data: farmers
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.getFarmers = getFarmers;
// @desc    Get single farmer
// @route   GET /api/farmers/:id
// @access  Private
const getFarmer = async (req, res) => {
    try {
        const farmer = await Farmer_1.default.findById(req.params.id)
            .populate('user', 'name email organization location phoneNumber');
        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: 'Farmer not found'
            });
        }
        res.json({
            success: true,
            data: farmer
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.getFarmer = getFarmer;
// @desc    Create farmer profile
// @route   POST /api/farmers
// @access  Private
const createFarmer = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }
        // Check if user already has a farmer profile
        const existingFarmer = await Farmer_1.default.findOne({ user: req.user.id });
        if (existingFarmer) {
            return res.status(400).json({
                success: false,
                message: 'User already has a farmer profile'
            });
        }
        // Generate farmer ID
        const farmerID = `FARM-${Date.now()}`;
        const farmerData = {
            ...req.body,
            user: req.user.id,
            farmerID,
            isVerified: false
        };
        const farmer = await Farmer_1.default.create(farmerData);
        res.status(201).json({
            success: true,
            data: farmer
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.createFarmer = createFarmer;
// @desc    Update farmer profile
// @route   PUT /api/farmers/:id
// @access  Private
const updateFarmer = async (req, res) => {
    try {
        let farmer = await Farmer_1.default.findById(req.params.id);
        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: 'Farmer not found'
            });
        }
        // Check if user owns the farmer profile or is admin
        if (farmer.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this farmer profile'
            });
        }
        farmer = await Farmer_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.json({
            success: true,
            data: farmer
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.updateFarmer = updateFarmer;
// @desc    Delete farmer profile
// @route   DELETE /api/farmers/:id
// @access  Private
const deleteFarmer = async (req, res) => {
    try {
        const farmer = await Farmer_1.default.findById(req.params.id);
        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: 'Farmer not found'
            });
        }
        // Check if user owns the farmer profile or is admin
        if (farmer.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this farmer profile'
            });
        }
        await farmer.deleteOne();
        res.json({
            success: true,
            message: 'Farmer profile removed'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.deleteFarmer = deleteFarmer;
// @desc    Get current user's farmer profile
// @route   GET /api/farmers/me
// @access  Private
const getMyFarmerProfile = async (req, res) => {
    try {
        const farmer = await Farmer_1.default.findOne({ user: req.user.id })
            .populate('user', 'name email organization location phoneNumber');
        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: 'Farmer profile not found'
            });
        }
        res.json({
            success: true,
            data: farmer
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.getMyFarmerProfile = getMyFarmerProfile;
// @desc    Add yield data to farmer profile
// @route   POST /api/farmers/:id/yields
// @access  Private
const addYieldData = async (req, res) => {
    try {
        const farmer = await Farmer_1.default.findById(req.params.id);
        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: 'Farmer not found'
            });
        }
        // Check if user owns the farmer profile or is admin
        if (farmer.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this farmer profile'
            });
        }
        farmer.yieldHistory.push(req.body);
        await farmer.save();
        res.json({
            success: true,
            data: farmer.yieldHistory
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.addYieldData = addYieldData;
// Validation rules
exports.createFarmerValidation = [
    (0, express_validator_1.body)('farmName').trim().isLength({ min: 3 }).withMessage('Farm name must be at least 3 characters'),
    (0, express_validator_1.body)('farmSize').isNumeric().withMessage('Farm size must be a number'),
    (0, express_validator_1.body)('location').trim().isLength({ min: 2 }).withMessage('Location is required'),
    (0, express_validator_1.body)('farmingExperience').isIn(['0-2', '3-5', '6-10', '11-20', '20+']).withMessage('Invalid farming experience'),
    (0, express_validator_1.body)('farmingType').isIn(['conventional', 'organic', 'sustainable', 'permaculture', 'hydroponic']).withMessage('Invalid farming type')
];
//# sourceMappingURL=farmerController.js.map
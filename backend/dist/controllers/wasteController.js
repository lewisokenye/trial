"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpiryItemValidation = exports.createWasteEntryValidation = exports.deleteExpiryItem = exports.updateExpiryItem = exports.createExpiryItem = exports.getExpiryItems = exports.getWasteAnalytics = exports.deleteWasteEntry = exports.updateWasteEntry = exports.createWasteEntry = exports.getWasteEntry = exports.getWasteEntries = void 0;
const express_validator_1 = require("express-validator");
const WasteEntry_1 = __importDefault(require("../models/WasteEntry"));
const ExpiryItem_1 = __importDefault(require("../models/ExpiryItem"));
// @desc    Get all waste entries for user
// @route   GET /api/waste
// @access  Private
const getWasteEntries = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        let query = { user: req.user._id };
        // Filter by date range if specified
        if (req.query.startDate && req.query.endDate) {
            query.date = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate)
            };
        }
        // Filter by food type if specified
        if (req.query.foodType) {
            query.foodType = req.query.foodType;
        }
        const wasteEntries = await WasteEntry_1.default.find(query)
            .sort({ date: -1 })
            .limit(limit)
            .skip(startIndex);
        const total = await WasteEntry_1.default.countDocuments(query);
        // Calculate totals
        const totalWaste = await WasteEntry_1.default.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    totalQuantity: { $sum: '$quantity' },
                    totalCost: { $sum: '$cost' },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json({
            success: true,
            count: wasteEntries.length,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            },
            summary: totalWaste[0] || { totalQuantity: 0, totalCost: 0, count: 0 },
            data: wasteEntries
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
exports.getWasteEntries = getWasteEntries;
// @desc    Get single waste entry
// @route   GET /api/waste/:id
// @access  Private
const getWasteEntry = async (req, res) => {
    try {
        const wasteEntry = await WasteEntry_1.default.findById(req.params.id);
        if (!wasteEntry) {
            return res.status(404).json({
                success: false,
                message: 'Waste entry not found'
            });
        }
        // Check if user owns the waste entry
        if (wasteEntry.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this waste entry'
            });
        }
        res.json({
            success: true,
            data: wasteEntry
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
exports.getWasteEntry = getWasteEntry;
// @desc    Create new waste entry
// @route   POST /api/waste
// @access  Private
const createWasteEntry = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }
        // Add user to req.body
        req.body.user = req.user._id;
        const wasteEntry = await WasteEntry_1.default.create(req.body);
        res.status(201).json({
            success: true,
            data: wasteEntry
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
exports.createWasteEntry = createWasteEntry;
// @desc    Update waste entry
// @route   PUT /api/waste/:id
// @access  Private
const updateWasteEntry = async (req, res) => {
    try {
        let wasteEntry = await WasteEntry_1.default.findById(req.params.id);
        if (!wasteEntry) {
            return res.status(404).json({
                success: false,
                message: 'Waste entry not found'
            });
        }
        // Check if user owns the waste entry
        if (wasteEntry.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this waste entry'
            });
        }
        wasteEntry = await WasteEntry_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.json({
            success: true,
            data: wasteEntry
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
exports.updateWasteEntry = updateWasteEntry;
// @desc    Delete waste entry
// @route   DELETE /api/waste/:id
// @access  Private
const deleteWasteEntry = async (req, res) => {
    try {
        const wasteEntry = await WasteEntry_1.default.findById(req.params.id);
        if (!wasteEntry) {
            return res.status(404).json({
                success: false,
                message: 'Waste entry not found'
            });
        }
        // Check if user owns the waste entry
        if (wasteEntry.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this waste entry'
            });
        }
        await wasteEntry.deleteOne();
        res.json({
            success: true,
            message: 'Waste entry removed'
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
exports.deleteWasteEntry = deleteWasteEntry;
// @desc    Get waste analytics
// @route   GET /api/waste/analytics
// @access  Private
const getWasteAnalytics = async (req, res) => {
    try {
        const userId = req.user._id;
        const period = req.query.period || 'month';
        // Calculate date range
        const now = new Date();
        let startDate;
        switch (period) {
            case 'week':
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case 'quarter':
                startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
                break;
            case 'year':
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            default:
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }
        const analytics = await WasteEntry_1.default.aggregate([
            {
                $match: {
                    user: userId,
                    date: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        foodType: '$foodType',
                        reason: '$reason'
                    },
                    totalQuantity: { $sum: '$quantity' },
                    totalCost: { $sum: '$cost' },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: '$_id.foodType',
                    reasons: {
                        $push: {
                            reason: '$_id.reason',
                            quantity: '$totalQuantity',
                            cost: '$totalCost',
                            count: '$count'
                        }
                    },
                    totalQuantity: { $sum: '$totalQuantity' },
                    totalCost: { $sum: '$totalCost' },
                    totalEntries: { $sum: '$count' }
                }
            }
        ]);
        res.json({
            success: true,
            period,
            startDate,
            data: analytics
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
exports.getWasteAnalytics = getWasteAnalytics;
// Helper function to calculate expiry status
const calculateExpiryStatus = (expiryDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
        return 'expired';
    }
    else if (diffDays <= 3) {
        return 'expiring-soon';
    }
    else {
        return 'fresh';
    }
};
// @desc    Get all expiry items for user
// @route   GET /api/waste/expiry
// @access  Private
const getExpiryItems = async (req, res) => {
    try {
        console.log('========================================');
        console.log('GET /api/waste/expiry called');
        console.log('User:', req.user);
        console.log('User _id:', req.user?._id);
        console.log('========================================');
        if (!req.user || !req.user._id) {
            console.error('❌ No user found in request');
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }
        const expiryItems = await ExpiryItem_1.default.find({ user: req.user._id })
            .sort({ expiryDate: 1 })
            .lean(); // Use lean() for better performance
        console.log(`✅ Found ${expiryItems.length} raw items from database`);
        // Calculate current status for all items (without saving)
        const itemsWithStatus = expiryItems.map((item) => {
            const currentStatus = calculateExpiryStatus(item.expiryDate);
            return {
                ...item,
                status: currentStatus
            };
        });
        console.log(`✅ Returning ${itemsWithStatus.length} items with calculated status`);
        res.json({
            success: true,
            count: itemsWithStatus.length,
            data: itemsWithStatus
        });
    }
    catch (error) {
        console.error('❌❌❌ Get expiry items error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Error name:', error.name);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};
exports.getExpiryItems = getExpiryItems;
// @desc    Create new expiry item
// @route   POST /api/waste/expiry
// @access  Private
const createExpiryItem = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }
        // Add user to req.body
        req.body.user = req.user._id;
        // Calculate initial status based on expiry date
        if (req.body.expiryDate) {
            req.body.status = calculateExpiryStatus(req.body.expiryDate);
        }
        const expiryItem = await ExpiryItem_1.default.create(req.body);
        console.log('✅ Expiry item created:', {
            itemName: expiryItem.itemName,
            expiryDate: expiryItem.expiryDate,
            status: expiryItem.status
        });
        res.status(201).json({
            success: true,
            data: expiryItem
        });
    }
    catch (error) {
        console.error('❌ Create expiry item error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.createExpiryItem = createExpiryItem;
// @desc    Update expiry item
// @route   PUT /api/waste/expiry/:id
// @access  Private
const updateExpiryItem = async (req, res) => {
    try {
        let expiryItem = await ExpiryItem_1.default.findById(req.params.id);
        if (!expiryItem) {
            return res.status(404).json({
                success: false,
                message: 'Expiry item not found'
            });
        }
        // Check if user owns the expiry item
        if (expiryItem.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this expiry item'
            });
        }
        expiryItem = await ExpiryItem_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.json({
            success: true,
            data: expiryItem
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
exports.updateExpiryItem = updateExpiryItem;
// @desc    Delete expiry item
// @route   DELETE /api/waste/expiry/:id
// @access  Private
const deleteExpiryItem = async (req, res) => {
    try {
        const expiryItem = await ExpiryItem_1.default.findById(req.params.id);
        if (!expiryItem) {
            return res.status(404).json({
                success: false,
                message: 'Expiry item not found'
            });
        }
        // Check if user owns the expiry item
        if (expiryItem.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this expiry item'
            });
        }
        await expiryItem.deleteOne();
        res.json({
            success: true,
            message: 'Expiry item removed'
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
exports.deleteExpiryItem = deleteExpiryItem;
// Validation rules
exports.createWasteEntryValidation = [
    (0, express_validator_1.body)('date').isISO8601().withMessage('Please provide a valid date'),
    (0, express_validator_1.body)('foodType').isIn(['Fruits & Vegetables', 'Dairy', 'Meat', 'Grains', 'Prepared Food', 'Other']).withMessage('Invalid food type'),
    (0, express_validator_1.body)('quantity').isNumeric().withMessage('Quantity must be a number'),
    (0, express_validator_1.body)('unit').isIn(['lbs', 'kg', 'pieces', 'servings', 'gallons', 'liters', 'packages', 'cans', 'bottles']).withMessage('Invalid unit'),
    (0, express_validator_1.body)('reason').isIn(['Expired', 'Spoiled', 'Over-prepared', 'Leftovers', 'Other']).withMessage('Invalid reason'),
    (0, express_validator_1.body)('cost').isNumeric().withMessage('Cost must be a number'),
    (0, express_validator_1.body)('location').trim().isLength({ min: 1 }).withMessage('Location is required')
];
exports.createExpiryItemValidation = [
    (0, express_validator_1.body)('itemName').trim().isLength({ min: 1 }).withMessage('Item name is required'),
    (0, express_validator_1.body)('category').isIn(['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Pantry Items', 'Frozen', 'Beverages']).withMessage('Invalid category'),
    (0, express_validator_1.body)('purchaseDate').isLength({ min: 1 }).withMessage('Purchase date is required'),
    (0, express_validator_1.body)('expiryDate').isLength({ min: 1 }).withMessage('Expiry date is required'),
    (0, express_validator_1.body)('quantity').trim().isLength({ min: 1 }).withMessage('Quantity is required'),
    (0, express_validator_1.body)('location').isIn(['Refrigerator', 'Freezer', 'Pantry', 'Counter', 'Cupboard']).withMessage('Invalid location')
];
//# sourceMappingURL=wasteController.js.map
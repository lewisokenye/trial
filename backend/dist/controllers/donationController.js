"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDonationValidation = exports.getAvailableDonations = exports.deleteDonation = exports.updateDonation = exports.createDonation = exports.getDonation = exports.getDonations = void 0;
const express_validator_1 = require("express-validator");
const Donation_1 = __importDefault(require("../models/Donation"));
const getDonations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        let query = {};
        if (req.query.type) {
            query = { ...query, type: req.query.type };
        }
        if (req.query.status) {
            query = { ...query, status: req.query.status };
        }
        if (req.user.role !== 'admin') {
            query = { ...query, donor: req.user.id };
        }
        const donations = await Donation_1.default.find(query)
            .populate('donor', 'name email organization')
            .populate('recipient', 'name email organization')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(startIndex);
        const total = await Donation_1.default.countDocuments(query);
        res.json({
            success: true,
            count: donations.length,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            },
            data: donations
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
exports.getDonations = getDonations;
const getDonation = async (req, res) => {
    try {
        const donation = await Donation_1.default.findById(req.params.id)
            .populate('donor', 'name email organization')
            .populate('recipient', 'name email organization');
        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }
        // Check if user owns the donation or is admin
        if (donation.donor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this donation'
            });
        }
        res.json({
            success: true,
            data: donation
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
exports.getDonation = getDonation;
const createDonation = async (req, res) => {
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
        req.body.donor = req.user.id;
        console.log('Creating donation with data:', JSON.stringify(req.body, null, 2));
        const donation = await Donation_1.default.create(req.body);
        res.status(201).json({
            success: true,
            data: donation
        });
    }
    catch (error) {
        console.error('Donation creation error:', error);
        console.error('Error message:', error.message);
        console.error('Error name:', error.name);
        if (error.errors) {
            console.error('Validation errors:', JSON.stringify(error.errors, null, 2));
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Server error',
            error: error.name
        });
    }
};
exports.createDonation = createDonation;
const updateDonation = async (req, res) => {
    try {
        let donation = await Donation_1.default.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }
        // Check if user owns the donation or is admin
        if (donation.donor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this donation'
            });
        }
        donation = await Donation_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.json({
            success: true,
            data: donation
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
exports.updateDonation = updateDonation;
const deleteDonation = async (req, res) => {
    try {
        const donation = await Donation_1.default.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }
        // Check if user owns the donation or is admin
        if (donation.donor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this donation'
            });
        }
        await donation.deleteOne();
        res.json({
            success: true,
            message: 'Donation removed'
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
exports.deleteDonation = deleteDonation;
const getAvailableDonations = async (req, res) => {
    try {
        const donations = await Donation_1.default.find({
            status: 'approved',
            type: 'food'
        })
            .populate('donor', 'name email organization location')
            .sort({ createdAt: -1 });
        res.json({
            success: true,
            count: donations.length,
            data: donations
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
exports.getAvailableDonations = getAvailableDonations;
exports.createDonationValidation = [
    (0, express_validator_1.body)('type').isIn(['food', 'money']).withMessage('Type must be food or money'),
    (0, express_validator_1.body)('status').optional().isIn(['pending', 'approved', 'collected', 'delivered', 'cancelled'])
];
//# sourceMappingURL=donationController.js.map
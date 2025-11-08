import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Farmer from '../models/Farmer';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: any;
}

export const getFarmers = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;

    let query: any = {};

    // Filter by verification status if specified
    if (req.query.verified === 'true') {
      query.isVerified = true;
    } else if (req.query.verified === 'false') {
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

    const farmers = await Farmer.find(query)
      .populate('user', 'name email organization location')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await Farmer.countDocuments(query);

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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single farmer
// @route   GET /api/farmers/:id
// @access  Private
export const getFarmer = async (req: AuthRequest, res: Response) => {
  try {
    const farmer = await Farmer.findById(req.params.id)
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create farmer profile
// @route   POST /api/farmers
// @access  Private
export const createFarmer = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Check if user already has a farmer profile
    const existingFarmer = await Farmer.findOne({ user: req.user.id });
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

    const farmer = await Farmer.create(farmerData);

    res.status(201).json({
      success: true,
      data: farmer
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update farmer profile
// @route   PUT /api/farmers/:id
// @access  Private
export const updateFarmer = async (req: AuthRequest, res: Response) => {
  try {
    let farmer = await Farmer.findById(req.params.id);

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

    farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: farmer
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete farmer profile
// @route   DELETE /api/farmers/:id
// @access  Private
export const deleteFarmer = async (req: AuthRequest, res: Response) => {
  try {
    const farmer = await Farmer.findById(req.params.id);

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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get current user's farmer profile
// @route   GET /api/farmers/me
// @access  Private
export const getMyFarmerProfile = async (req: AuthRequest, res: Response) => {
  try {
    const farmer = await Farmer.findOne({ user: req.user.id })
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Add yield data to farmer profile
// @route   POST /api/farmers/:id/yields
// @access  Private
export const addYieldData = async (req: AuthRequest, res: Response) => {
  try {
    const farmer = await Farmer.findById(req.params.id);

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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Validation rules
export const createFarmerValidation = [
  body('farmName').trim().isLength({ min: 3 }).withMessage('Farm name must be at least 3 characters'),
  body('farmSize').isNumeric().withMessage('Farm size must be a number'),
  body('location').trim().isLength({ min: 2 }).withMessage('Location is required'),
  body('farmingExperience').isIn(['0-2', '3-5', '6-10', '11-20', '20+']).withMessage('Invalid farming experience'),
  body('farmingType').isIn(['conventional', 'organic', 'sustainable', 'permaculture', 'hydroponic']).withMessage('Invalid farming type')
];
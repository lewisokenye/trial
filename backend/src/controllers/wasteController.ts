import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import WasteEntry from '../models/WasteEntry';
import ExpiryItem from '../models/ExpiryItem';

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Get all waste entries for user
// @route   GET /api/waste
// @access  Private
export const getWasteEntries = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;

    let query: any = { user: req.user.id };

    // Filter by date range if specified
    if (req.query.startDate && req.query.endDate) {
      query.date = {
        $gte: new Date(req.query.startDate as string),
        $lte: new Date(req.query.endDate as string)
      };
    }

    // Filter by food type if specified
    if (req.query.foodType) {
      query.foodType = req.query.foodType;
    }

    const wasteEntries = await WasteEntry.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .skip(startIndex);

    const total = await WasteEntry.countDocuments(query);

    // Calculate totals
    const totalWaste = await WasteEntry.aggregate([
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single waste entry
// @route   GET /api/waste/:id
// @access  Private
export const getWasteEntry = async (req: AuthRequest, res: Response) => {
  try {
    const wasteEntry = await WasteEntry.findById(req.params.id);

    if (!wasteEntry) {
      return res.status(404).json({
        success: false,
        message: 'Waste entry not found'
      });
    }

    // Check if user owns the waste entry
    if (wasteEntry.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this waste entry'
      });
    }

    res.json({
      success: true,
      data: wasteEntry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new waste entry
// @route   POST /api/waste
// @access  Private
export const createWasteEntry = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Add user to req.body
    req.body.user = req.user.id;

    const wasteEntry = await WasteEntry.create(req.body);

    res.status(201).json({
      success: true,
      data: wasteEntry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update waste entry
// @route   PUT /api/waste/:id
// @access  Private
export const updateWasteEntry = async (req: AuthRequest, res: Response) => {
  try {
    let wasteEntry = await WasteEntry.findById(req.params.id);

    if (!wasteEntry) {
      return res.status(404).json({
        success: false,
        message: 'Waste entry not found'
      });
    }

    // Check if user owns the waste entry
    if (wasteEntry.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this waste entry'
      });
    }

    wasteEntry = await WasteEntry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: wasteEntry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete waste entry
// @route   DELETE /api/waste/:id
// @access  Private
export const deleteWasteEntry = async (req: AuthRequest, res: Response) => {
  try {
    const wasteEntry = await WasteEntry.findById(req.params.id);

    if (!wasteEntry) {
      return res.status(404).json({
        success: false,
        message: 'Waste entry not found'
      });
    }

    // Check if user owns the waste entry
    if (wasteEntry.user.toString() !== req.user.id) {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get waste analytics
// @route   GET /api/waste/analytics
// @access  Private
export const getWasteAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const period = req.query.period || 'month';

    // Calculate date range
    const now = new Date();
    let startDate: Date;

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

    const analytics = await WasteEntry.aggregate([
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};


// @desc    Get all expiry items for user
// @route   GET /api/waste/expiry
// @access  Private
export const getExpiryItems = async (req: AuthRequest, res: Response) => {
  try {
    console.log('Fetching expiry items for user:', req.user.id);
    const expiryItems = await ExpiryItem.find({ user: req.user.id })
      .sort({ expiryDate: 1 });

    console.log(`Found ${expiryItems.length} expiry items`);
    res.json({
      success: true,
      count: expiryItems.length,
      data: expiryItems
    });
  } catch (error: any) {
    console.error('Get expiry items error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Create new expiry item
// @route   POST /api/waste/expiry
// @access  Private
export const createExpiryItem = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Add user to req.body
    req.body.user = req.user.id;

    const expiryItem = await ExpiryItem.create(req.body);

    res.status(201).json({
      success: true,
      data: expiryItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update expiry item
// @route   PUT /api/waste/expiry/:id
// @access  Private
export const updateExpiryItem = async (req: AuthRequest, res: Response) => {
  try {
    let expiryItem = await ExpiryItem.findById(req.params.id);

    if (!expiryItem) {
      return res.status(404).json({
        success: false,
        message: 'Expiry item not found'
      });
    }

    // Check if user owns the expiry item
    if (expiryItem.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this expiry item'
      });
    }

    expiryItem = await ExpiryItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: expiryItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete expiry item
// @route   DELETE /api/waste/expiry/:id
// @access  Private
export const deleteExpiryItem = async (req: AuthRequest, res: Response) => {
  try {
    const expiryItem = await ExpiryItem.findById(req.params.id);

    if (!expiryItem) {
      return res.status(404).json({
        success: false,
        message: 'Expiry item not found'
      });
    }

    // Check if user owns the expiry item
    if (expiryItem.user.toString() !== req.user.id) {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Validation rules
export const createWasteEntryValidation = [
  body('date').isISO8601().withMessage('Please provide a valid date'),
  body('foodType').isIn(['Fruits & Vegetables', 'Dairy', 'Meat', 'Grains', 'Prepared Food', 'Other']).withMessage('Invalid food type'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  body('unit').isIn(['lbs', 'kg', 'pieces', 'servings', 'gallons', 'liters', 'packages', 'cans', 'bottles']).withMessage('Invalid unit'),
  body('reason').isIn(['Expired', 'Spoiled', 'Over-prepared', 'Leftovers', 'Other']).withMessage('Invalid reason'),
  body('cost').isNumeric().withMessage('Cost must be a number'),
  body('location').trim().isLength({ min: 1 }).withMessage('Location is required')
];

export const createExpiryItemValidation = [
  body('itemName').trim().isLength({ min: 1 }).withMessage('Item name is required'),
  body('category').isIn(['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Pantry Items', 'Frozen', 'Beverages']).withMessage('Invalid category'),
  body('purchaseDate').isLength({ min: 1 }).withMessage('Purchase date is required'),
  body('expiryDate').isLength({ min: 1 }).withMessage('Expiry date is required'),
  body('quantity').trim().isLength({ min: 1 }).withMessage('Quantity is required'),
  body('location').isIn(['Refrigerator', 'Freezer', 'Pantry', 'Counter', 'Cupboard']).withMessage('Invalid location')
];
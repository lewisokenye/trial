import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Donation from '../models/Donation';

interface AuthRequest extends Request {
    user?: any;
}

export const getDonations = async (req: AuthRequest, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const startIndex = (page - 1) * limit;

        let query = {};

        if (req.query.type) {
            query = { ...query, type: req.query.type };
        }
        if (req.query.status) {
            query = { ...query, status: req.query.status };
        }
        if (req.user.role !== 'admin') {
            query = { ...query, donor: req.user.id}
        }

        const donations = await Donation.find(query)
          .populate ('donor', 'name email organization')
          .populate ('recipient', 'name email organization')
          .sort ({ createdAt: -1 })
          .limit (limit)
          .skip(startIndex);

          const total = await Donation.countDocuments(query);

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
      } catch (error) {
        console.error(error);
        res.status(500).json({
        success: false,
        message: 'Server error'
        });
    }
};

export const getDonation = async (req: AuthRequest, res: Response) => {
  try {
    const donation = await Donation.findById(req.params.id)
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const createDonation = async (req: AuthRequest, res: Response) => {
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
    req.body.donor = req.user.id;

    // Clean up empty fields for money donations
    if (req.body.type === 'money') {
      delete req.body.foodType;
      delete req.body.quantity;
      delete req.body.unit;
      delete req.body.expiryDate;
      delete req.body.pickupLocation;
    }

    // Clean up empty fields for food donations
    if (req.body.type === 'food') {
      delete req.body.amount;
      delete req.body.paymentMethod;
      delete req.body.transactionId;
    }

    console.log('Creating donation with data:', JSON.stringify(req.body, null, 2));

    const donation = await Donation.create(req.body);

    res.status(201).json({
      success: true,
      data: donation
    });
  } catch (error: any) {
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

export const updateDonation = async (req: AuthRequest, res: Response) => {
  try {
    let donation = await Donation.findById(req.params.id);

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

    donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: donation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const deleteDonation = async (req: AuthRequest, res: Response) => {
  try {
    const donation = await Donation.findById(req.params.id);

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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const getAvailableDonations = async (req: AuthRequest, res: Response) => {
  try {
    const donations = await Donation.find({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const createDonationValidation = [
  body('type').isIn(['food', 'money']).withMessage('Type must be food or money'),
  body('status').optional().isIn(['pending', 'approved', 'collected', 'delivered', 'cancelled'])
];
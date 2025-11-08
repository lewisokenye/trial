import { Request, Response } from 'express';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: any;
}

// Admin can verify users
export const verifyUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.userId;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true }
    );

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
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Admin can unverify users
export const unverifyUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.userId;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { isVerified: false },
      { new: true }
    );

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
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password');

    res.json({
      success: true,
      count: users.length,
      data: {
        users
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

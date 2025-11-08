import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: any;
}

const generateToken = (userId: string): string => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    } as any);
};

export const register = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password, role, organization, location } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role : role || 'user',
            organization,
            location,
        }) as any;
        
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
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password') as any;
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

export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user.id);

        res.json({
            success: true,
            data: {
                user: {
                    _id: user?._id,
                    name: user!.name,
                    email: user!.email,
                    role: user!.role,
                    organization: user?.organization,
                    location: user?.location,
                    avatar: user?.avatar,
                    phoneNumber: user?.phoneNumber,
                    isVerified: user?.isVerified
                }
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateDetails = async (req: AuthRequest, res: Response) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email,
            organization: req.body.organization,
            location: req.body.location,
            phoneNumber: req.body.phoneNumber
        };

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
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
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updatePassword = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select('+password') as any;

        if (!(await user!.comparePassword(req.body.currentPassword))) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        user!.password = req.body.newPassword;
        await user!.save();

        res.json({
            success: true,
            data: {
                token: generateToken(user!._id.toString()),
            },
            message: 'Password updated successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

export const registerValidation = [
    body('name').trim().isLength({ min:2 }).withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['user', 'ngo', 'donor', 'farmer', 'admin']).withMessage('Invalid role')
];

export const loginValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Please include a valid email'),
    body('password').exists().withMessage('Password is required')
];
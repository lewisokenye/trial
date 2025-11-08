import express from 'express';
import { protect, authorize } from '../middleware/auth';
import { getAllUsers, verifyUser, unverifyUser } from '../controllers/adminController';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', authorize('admin'), getAllUsers);

// @desc    Verify user (admin only)
// @route   PUT /api/users/:userId/verify
// @access  Private/Admin
router.put('/:userId/verify', authorize('admin'), verifyUser);

// @desc    Unverify user (admin only)
// @route   PUT /api/users/:userId/unverify
// @access  Private/Admin
router.put('/:userId/unverify', authorize('admin'), unverifyUser);

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    // TODO: Implement get single user
    res.json({ message: 'Get single user endpoint' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    // TODO: Implement update user
    res.json({ message: 'Update user endpoint' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', authorize('admin'), async (req, res) => {
  try {
    // TODO: Implement delete user
    res.json({ message: 'Delete user endpoint' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
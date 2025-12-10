const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin, restrictTo } = require('../middlewares/roleMiddleware');

// Protected routes - All users
router.use(protect); // All routes below require authentication

// Current user profile
router.get('/me', userController.getMyProfile);
router.put('/me', userController.updateMyProfile);

// Admin only routes
router.get('/stats', isAdmin, userController.getUserStats);
router.get('/', isAdmin, userController.getAllUsers);
router.get('/:id', isAdmin, userController.getUser);
router.put('/:id', isAdmin, userController.updateUser);
router.delete('/:id', isAdmin, userController.deleteUser);

module.exports = router;
const { User } = require('../models');
const { Op } = require('sequelize');

// Get all users (Admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, role, status } = req.query;
    
    const offset = (page - 1) * limit;
    
    // Build where clause
    const where = {};
    
    if (search) {
      where[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (role) {
      where.role = role;
    }
    
    if (status === 'active') {
      where.isActive = true;
    } else if (status === 'inactive') {
      where.isActive = false;
    }

    const { count, rows: users } = await User.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['password', 'refreshToken'] }
    });

    res.status(200).json({
      status: 'success',
      data: {
        users,
        pagination: {
          total: count,
          page:  parseInt(page),
          pages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single user
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password', 'refreshToken'] }
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Get current user profile
exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req. user.id, {
      attributes: { exclude: ['password', 'refreshToken'] }
    });

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Update current user profile
exports.updateMyProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;

    // Don't allow updating sensitive fields
    const allowedUpdates = { firstName, lastName, phoneNumber };
    
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    await user.update(allowedUpdates);

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Update user (Admin only)
exports.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, role, isActive, isEmailVerified } = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (role) user.role = role;
    if (typeof isActive !== 'undefined') user.isActive = isActive;
    if (typeof isEmailVerified !== 'undefined') user.isEmailVerified = isEmailVerified;

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data:  { user }
    });
  } catch (error) {
    next(error);
  }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Prevent deleting yourself
    if (user.id === req.user.id) {
      return res.status(400).json({
        status: 'error',
        message: 'You cannot delete your own account'
      });
    }

    await user.destroy();

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get user statistics (Admin only)
exports.getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await User.count();
    const activeUsers = await User. count({ where: { isActive:  true } });
    const adminUsers = await User.count({ where: { role: 'admin' } });
    const lawyerUsers = await User.count({ where: { role: 'lawyer' } });
    const regularUsers = await User.count({ where: { role: 'user' } });
    const verifiedEmails = await User.count({ where: { isEmailVerified: true } });

    res.status(200).json({
      status: 'success',
      data:  {
        totalUsers,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
        adminUsers,
        lawyerUsers,
        regularUsers,
        verifiedEmails,
        unverifiedEmails: totalUsers - verifiedEmails
      }
    });
  } catch (error) {
    next(error);
  }
};
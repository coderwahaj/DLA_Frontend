// const { User } = require('../models');
// const { Op } = require('sequelize');

// // Get all users (Admin only)
// exports.getAllUsers = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 10, search, role, status } = req.query;
    
//     const offset = (page - 1) * limit;
    
//     // Build where clause
//     const where = {};
    
//     if (search) {
//       where[Op.or] = [
//         { firstName: { [Op.iLike]: `%${search}%` } },
//         { lastName: { [Op.iLike]: `%${search}%` } },
//         { email: { [Op.iLike]: `%${search}%` } }
//       ];
//     }
    
//     if (role) {
//       where.role = role;
//     }
    
//     if (status === 'active') {
//       where.isActive = true;
//     } else if (status === 'inactive') {
//       where.isActive = false;
//     }

//     const { count, rows: users } = await User.findAndCountAll({
//       where,
//       limit: parseInt(limit),
//       offset: parseInt(offset),
//       order: [['createdAt', 'DESC']],
//       attributes: { exclude: ['password', 'refreshToken'] }
//     });

//     res.status(200).json({
//       status: 'success',
//       data: {
//         users,
//         pagination: {
//           total: count,
//           page:  parseInt(page),
//           pages: Math.ceil(count / limit)
//         }
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get single user
// exports.getUser = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id, {
//       attributes: { exclude: ['password', 'refreshToken'] }
//     });

//     if (!user) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'User not found'
//       });
//     }

//     res.status(200).json({
//       status: 'success',
//       data: { user }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get current user profile
// exports.getMyProfile = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req. user.id, {
//       attributes: { exclude: ['password', 'refreshToken'] }
//     });

//     res.status(200).json({
//       status: 'success',
//       data: { user }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Update current user profile
// exports.updateMyProfile = async (req, res, next) => {
//   try {
//     const { firstName, lastName, phoneNumber } = req.body;

//     // Don't allow updating sensitive fields
//     const allowedUpdates = { firstName, lastName, phoneNumber };
    
//     const user = await User.findByPk(req.user.id);

//     if (!user) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'User not found'
//       });
//     }

//     await user.update(allowedUpdates);

//     res.status(200).json({
//       status: 'success',
//       message: 'Profile updated successfully',
//       data: { user }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Update user (Admin only)
// exports.updateUser = async (req, res, next) => {
//   try {
//     const { firstName, lastName, email, phoneNumber, role, isActive, isEmailVerified } = req.body;

//     const user = await User.findByPk(req.params.id);

//     if (!user) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'User not found'
//       });
//     }

//     // Update fields
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (role) user.role = role;
//     if (typeof isActive !== 'undefined') user.isActive = isActive;
//     if (typeof isEmailVerified !== 'undefined') user.isEmailVerified = isEmailVerified;

//     await user.save();

//     res.status(200).json({
//       status: 'success',
//       message: 'User updated successfully',
//       data:  { user }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Delete user (Admin only)
// exports.deleteUser = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);

//     if (!user) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'User not found'
//       });
//     }

//     // Prevent deleting yourself
//     if (user.id === req.user.id) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'You cannot delete your own account'
//       });
//     }

//     await user.destroy();

//     res.status(200).json({
//       status: 'success',
//       message: 'User deleted successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get user statistics (Admin only)
// exports.getUserStats = async (req, res, next) => {
//   try {
//     const totalUsers = await User.count();
//     const activeUsers = await User. count({ where: { isActive:  true } });
//     const adminUsers = await User.count({ where: { role: 'admin' } });
//     const lawyerUsers = await User.count({ where: { role: 'lawyer' } });
//     const regularUsers = await User.count({ where: { role: 'user' } });
//     const verifiedEmails = await User.count({ where: { isEmailVerified: true } });

//     res.status(200).json({
//       status: 'success',
//       data:  {
//         totalUsers,
//         activeUsers,
//         inactiveUsers: totalUsers - activeUsers,
//         adminUsers,
//         lawyerUsers,
//         regularUsers,
//         verifiedEmails,
//         unverifiedEmails: totalUsers - verifiedEmails
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };
const userService = require('../services/userService');
const { paginateResponse } = require('../utils/pagination');

/**
 * Get all users with pagination and filters (Admin only)
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page, limit, search, role, status, sortBy, sortOrder } = req.query;

    const result = await userService.getAllUsers({
      page,
      limit,
      search,
      role,
      status,
      sortBy,
      sortOrder
    });

    const response = paginateResponse(
      result.users,
      result.page,
      result.limit,
      result.totalUsers
    );

    // Use your existing response format
    res.status(200).json({
      status: 'success',
      data: {
        users: response.data,
        pagination: response.pagination
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single user by ID (Admin only)
 */
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 */
exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update current user profile
 */
exports. updateMyProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;

    const user = await userService.updateProfile(req.user.id, {
      firstName,
      lastName,
      phoneNumber
    });

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new user (Admin only)
 */
exports.createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData, req.user.id);

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: { user: newUser }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user (Admin only)
 */
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber, role, isActive, isEmailVerified } = req.body;

    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (email !== undefined) updateData.email = email;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isEmailVerified !== undefined) updateData.isEmailVerified = isEmailVerified;

    const updatedUser = await userService.updateUser(id, updateData, req.user.id);

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: { user: updatedUser }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user (Admin only)
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (id === req.user.id) {
      return res.status(400).json({
        status: 'error',
        message: 'You cannot delete your own account'
      });
    }

    const result = await userService.deleteUser(id, req.user.id);

    res.status(200).json({
      status: 'success',
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user status (Admin only)
 */
exports.updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    // Prevent admin from suspending themselves
    if (id === req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'You cannot change your own account status'
      });
    }

    const updatedUser = await userService.updateUserStatus(id, isActive, req.user.id);

    res.status(200).json({
      status: 'success',
      message: `User ${isActive ? 'activated' :  'suspended'} successfully`,
      data: { user: updatedUser }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user role (Admin only)
 */
exports.updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req. body;

    // Prevent admin from changing their own role
    if (id === req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'You cannot change your own role'
      });
    }

    const updatedUser = await userService.updateUserRole(id, role, req.user.id);

    res.status(200).json({
      status: 'success',
      message: 'User role updated successfully',
      data: { user: updatedUser }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user statistics (Admin only)
 */
exports.getUserStats = async (req, res, next) => {
  try {
    const stats = await userService.getUserStats();

    res.status(200).json({
      status: 'success',
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get recent user actions (Admin only)
 */
exports.getRecentActions = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    const actions = await userService. getRecentActions(parseInt(limit));

    res.status(200).json({
      status: 'success',
      data: { actions }
    });
  } catch (error) {
    next(error);
  }
};
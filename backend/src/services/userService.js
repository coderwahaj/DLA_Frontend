// const { User } = require('../models');

// class UserService {
//   async getUserById(id) {
//     const user = await User.findByPk(id);
    
//     if (!user) {
//       throw new Error('User not found');
//     }

//     return user;
//   }

//   async getAllUsers(filters = {}) {
//     const { role, isActive } = filters;
//     const where = {};

//     if (role) where.role = role;
//     if (isActive !== undefined) where.isActive = isActive;

//     return await User.findAll({ where });
//   }

//   async updateUser(id, updateData) {
//     const user = await User.findByPk(id);

//     if (!user) {
//       throw new Error('User not found');
//     }

//     // Don't allow updating certain fields
//     delete updateData.id;
//     delete updateData.email;
//     delete updateData.role;

//     await user.update(updateData);
//     return user;
//   }

//   async deleteUser(id) {
//     const user = await User. findByPk(id);

//     if (!user) {
//       throw new Error('User not found');
//     }

//     // Soft delete by deactivating
//     user.isActive = false;
//     await user.save();

//     return { message: 'User deactivated successfully' };
//   }
// }

// module.exports = new UserService();

const { User, Query, ActivityLog, sequelize } = require('../models');
const { Op } = require('sequelize');
const { getPagination } = require('../utils/pagination');

class UserService {
  /**
   * Get all users with pagination, search, and filters
   */
  async getAllUsers(options = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        search = '',
        role = null,
        status = null,
        sortBy = 'createdAt',
        sortOrder = 'DESC'
      } = options;

      // Build where clause
      const where = {};

      // Search filter
      if (search) {
        where[Op.or] = [
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ];
      }

      // Role filter
      if (role) {
        where.role = role;
      }

      // Status filter
      if (status === 'active') {
        where.isActive = true;
      } else if (status === 'inactive') {
        where.isActive = false;
      }

      // Get pagination details
      const { offset, itemsPerPage } = getPagination(page, limit);

      // Fetch users with count
      const { count, rows } = await User.findAndCountAll({
        where,
        attributes: {
          exclude: ['password', 'refreshToken', 'emailVerificationToken', 'passwordResetToken']
        },
        order: [[sortBy, sortOrder]],
        limit: itemsPerPage,
        offset
      });

      return {
        users: rows,
        totalUsers: count,
        page:  parseInt(page),
        limit: itemsPerPage
      };
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  /**
   * Get single user by ID
   */
  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: {
          exclude: ['password', 'refreshToken', 'emailVerificationToken', 'passwordResetToken']
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Get user stats
      const queryCount = await Query.count({ where: { userId } });
      const lastQuery = await Query.findOne({
        where: { userId },
        order: [['createdAt', 'DESC']],
        attributes: ['createdAt']
      });

      return {
        ... user.toJSON(),
        stats: {
          totalQueries:  queryCount,
          lastQueryDate: lastQuery?. createdAt || null
        }
      };
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  /**
   * Create new user
   */
  async createUser(userData, adminId = null) {
    try {
      // Check if email already exists
      const existingUser = await User.findOne({
        where: { email: userData. email }
      });

      if (existingUser) {
        throw new Error('Email already in use');
      }

      // Create user
      const user = await User.create(userData);

      // Log activity
      await ActivityLog.create({
        userId: adminId,
        eventType: 'User Created',
        severity: 'info',
        details: `New user account created: ${user.email}`
      });

      // Return user without sensitive data
      const { password, refreshToken, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * Update user
   */
  async updateUser(userId, updateData, adminId = null) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Check if email is being changed
      if (updateData.email && updateData.email !== user.email) {
        const existingUser = await User.findOne({
          where: { email: updateData. email }
        });

        if (existingUser) {
          throw new Error('Email already in use');
        }
      }

      // Update user
      await user.update(updateData);

      // Log activity
      if (adminId) {
        await ActivityLog.create({
          userId: adminId,
          eventType: 'User Updated',
          severity: 'info',
          details: `User account updated: ${user.email}`
        });
      }

      // Return updated user without sensitive data
      const { password, refreshToken, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  /**
   * Update profile (by user themselves)
   */
  async updateProfile(userId, updateData) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Only allow specific fields for self-update
      const allowedFields = ['firstName', 'lastName', 'phoneNumber'];
      const filteredData = {};
      
      allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
          filteredData[field] = updateData[field];
        }
      });

      await user.update(filteredData);

      const { password, refreshToken, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    } catch (error) {
      throw new Error(`Error updating profile: ${error.message}`);
    }
  }

  /**
   * Delete user (soft delete)
   */
  async deleteUser(userId, adminId = null) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Soft delete
      await user.update({ isActive: false });

      // Log activity
      if (adminId) {
        await ActivityLog.create({
          userId: adminId,
          eventType: 'User Deleted',
          severity: 'warning',
          details: `User account deactivated: ${user.email}`
        });
      }

      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  /**
   * Update user status (activate/suspend)
   */
  async updateUserStatus(userId, isActive, adminId = null) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error('User not found');
      }

      await user.update({ isActive });

      // Log activity
      if (adminId) {
        await ActivityLog.create({
          userId: adminId,
          eventType:  isActive ? 'User Activated' : 'User Suspended',
          severity: isActive ? 'success' : 'warning',
          details: `User account ${isActive ? 'activated' : 'suspended'}:  ${user.email}`
        });
      }

      const { password, refreshToken, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    } catch (error) {
      throw new Error(`Error updating user status: ${error. message}`);
    }
  }

  /**
   * Update user role
   */
  async updateUserRole(userId, newRole, adminId = null) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error('User not found');
      }

      const oldRole = user.role;
      await user.update({ role: newRole });

      // Log activity
      if (adminId) {
        await ActivityLog.create({
          userId: adminId,
          eventType: 'User Role Changed',
          severity: 'info',
          details: `User role changed from ${oldRole} to ${newRole}: ${user.email}`
        });
      }

      const { password, refreshToken, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    } catch (error) {
      throw new Error(`Error updating user role: ${error. message}`);
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats() {
    try {
      const totalUsers = await User.count();
      const activeUsers = await User.count({ where: { isActive: true } });
      const adminUsers = await User.count({ where: { role: 'admin' } });
      const lawyerUsers = await User.count({ where: { role: 'lawyer' } });
      const regularUsers = await User.count({ where: { role: 'user' } });
      const verifiedEmails = await User.count({ where: { isEmailVerified: true } });

      return {
        totalUsers,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
        adminUsers,
        lawyerUsers,
        regularUsers,
        verifiedEmails,
        unverifiedEmails: totalUsers - verifiedEmails
      };
    } catch (error) {
      throw new Error(`Error fetching user stats: ${error.message}`);
    }
  }

  /**
   * Get recent user actions
   */
  async getRecentActions(limit = 10) {
    try {
      const actions = await ActivityLog.findAll({
        where: {
          eventType: {
            [Op.in]: ['User Created', 'User Updated', 'User Deleted', 'User Activated', 'User Suspended', 'User Role Changed']
          }
        },
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }],
        order:  [['createdAt', 'DESC']],
        limit
      });

      return actions.map(action => ({
        id: action.id,
        eventType: action.eventType,
        details: action.details,
        severity: action.severity,
        timestamp: action.createdAt,
        user: action.user ? {
          id: action.user. id,
          name: `${action.user.firstName} ${action.user.lastName}`,
          email: action.user.email
        } : null
      }));
    } catch (error) {
      throw new Error(`Error fetching recent actions: ${error. message}`);
    }
  }
}

module.exports = new UserService();
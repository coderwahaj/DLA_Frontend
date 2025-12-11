// utils/userFilters.js

/**
 * Check if user is an admin
 * @param {Object} user - User object from API
 * @returns {boolean} - True if user is admin
 */
export const isAdminUser = (user) => {
  // Safety check
  if (!user) return false;

  try {
    // Check by role (handle undefined/null safely)
    const role = user.role?. toLowerCase() || '';
    if (['admin', 'administrator', 'superadmin'].includes(role)) {
      return true;
    }
    
    // Check by email
    const email = user.email?.toLowerCase() || '';
    if (email. includes('admin@')) {
      return true;
    }
    
    // Check by name (handle both full name and first/last name)
    let fullName = '';
    if (user.firstName && user.lastName) {
      fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    } else if (user. name) {
      fullName = user.name.toLowerCase();
    }
    
    if (fullName.includes('admin user') || fullName.trim() === 'admin') {
      return true;
    }
    
    // Check by isAdmin flag
    if (user.isAdmin === true) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking if user is admin:', error);
    return false; // On error, don't filter out the user
  }
};

/**
 * Filter out admin users from user list
 * @param {Array} users - Array of user objects
 * @returns {Array} - Filtered array without admin users
 */
export const filterAdminUsers = (users) => {
  // Safety check - if users is not an array, return empty array
  if (!Array.isArray(users)) {
    console.warn('filterAdminUsers: Expected array but received:', typeof users);
    return [];
  }

  try {
    return users.filter(user => !isAdminUser(user));
  } catch (error) {
    console.error('Error filtering admin users:', error);
    return users; // On error, return original array
  }
};
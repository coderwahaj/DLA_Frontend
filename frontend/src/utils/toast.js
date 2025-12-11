import toast from 'react-hot-toast';

/**
 * Centralized toast notification utility
 * Provides consistent styling and behavior across the app
 */

export const showToast = {
  /**
   * Success toast
   * @param {string} message - Success message to display
   */
  success: (message) => {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
      style:  {
        background: '#10b981',
        color: '#fff',
        fontWeight: '500',
        padding: '16px',
        borderRadius: '8px',
      },
      iconTheme: {
        primary: '#fff',
        secondary:  '#10b981',
      },
    });
  },

  /**
   * Error toast
   * @param {string} message - Error message to display
   */
  error: (message) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#ef4444',
        color: '#fff',
        fontWeight: '500',
        padding: '16px',
        borderRadius: '8px',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#ef4444',
      },
    });
  },

  /**
   * Warning toast
   * @param {string} message - Warning message to display
   */
  warning: (message) => {
    toast(message, {
      duration: 3500,
      position: 'top-right',
      icon: '⚠️',
      style: {
        background:  '#f59e0b',
        color: '#fff',
        fontWeight: '500',
        padding: '16px',
        borderRadius: '8px',
      },
    });
  },

  /**
   * Info toast
   * @param {string} message - Info message to display
   */
  info: (message) => {
    toast(message, {
      duration: 3000,
      position: 'top-right',
      icon: 'ℹ️',
      style: {
        background:  '#3b82f6',
        color: '#fff',
        fontWeight: '500',
        padding: '16px',
        borderRadius: '8px',
      },
    });
  },

  /**
   * Loading toast with promise
   * @param {Promise} promise - Promise to track
   * @param {Object} messages - Messages for different states
   */
  promise: (promise, messages) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Success!',
        error: messages. error || 'Something went wrong',
      },
      {
        style: {
          minWidth: '250px',
          padding: '16px',
          borderRadius: '8px',
        },
        success: {
          duration: 3000,
          style: {
            background: '#10b981',
            color: '#fff',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#ef4444',
            color: '#fff',
          },
        },
      }
    );
  },

  /**
   * Custom toast with custom styling
   * @param {string} message - Message to display
   * @param {Object} options - Custom options
   */
  custom:  (message, options = {}) => {
    toast(message, {
      duration:  3000,
      position: 'top-right',
      ... options,
    });
  },
};

/**
 * Validation error messages
 */
export const validationMessages = {
  // Email validation
  email: {
    required: 'Email is required',
    invalid: 'Please enter a valid email address',
    notFound: 'No account found with this email',
    alreadyExists: 'An account with this email already exists',
  },

  // Password validation
  password: {
    required: 'Password is required',
    tooShort: 'Password must be at least 8 characters',
    tooWeak: 'Password must include uppercase, lowercase, number, and special character',
    incorrect: 'Incorrect password.  Please try again',
    mismatch: 'Passwords do not match',
  },

  // Name validation
  name: {
    required: 'Name is required',
    tooShort: 'Name must be at least 2 characters',
    invalid: 'Please enter a valid name (letters only)',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
  },

  // General
  general: {
    required: 'This field is required',
    networkError: 'Network error. Please check your connection',
    serverError: 'Server error. Please try again later',
    unauthorized:  'You are not authorized to perform this action',
    sessionExpired: 'Your session has expired. Please login again',
  },

  // Auth specific
  auth: {
    loginSuccess: 'Welcome back! Login successful',
    loginFailed: 'Login failed. Please check your credentials',
    signupSuccess: 'Account created successfully! Please verify your email',
    signupFailed: 'Failed to create account. Please try again',
    logoutSuccess: 'Logged out successfully',
    verificationSent: 'Verification email sent. Please check your inbox',
    passwordResetSent: 'Password reset link sent to your email',
    passwordResetSuccess: 'Password reset successful. You can now login',
  },

  // User management
  user: {
    updateSuccess: 'User updated successfully',
    updateFailed: 'Failed to update user',
    deleteSuccess: 'User deleted successfully',
    deleteFailed: 'Failed to delete user',
    suspendSuccess: 'User suspended successfully',
    activateSuccess: 'User activated successfully',
    loadFailed: 'Failed to load users',
  },
};

export default showToast;
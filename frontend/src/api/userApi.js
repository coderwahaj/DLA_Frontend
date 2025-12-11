// import api from './axios';

// export const userApi = {
//   // Current user profile
//   getMyProfile: async () => {
//     const response = await api.get('/users/me');
//     return response.data;
//   },

//   updateMyProfile: async (userData) => {
//     const response = await api.put('/users/me', userData);
//     return response. data;
//   },

//   // Admin:  Get all users
//   getAllUsers:  async (params = {}) => {
//     const response = await api.get('/users', { params });
//     return response. data;
//   },

//   // Admin: Get user by ID
//   getUserById: async (id) => {
//     const response = await api. get(`/users/${id}`);
//     return response.data;
//   },

//   // Admin: Update user
//   updateUser: async (id, userData) => {
//     const response = await api.put(`/users/${id}`, userData);
//     return response.data;
//   },

//   // Admin: Delete user
//   deleteUser: async (id) => {
//     const response = await api.delete(`/users/${id}`);
//     return response.data;
//   },

//   // Admin: Get statistics
//   getUserStats: async () => {
//     const response = await api.get('/users/stats');
//     return response.data;
//   },
// };

// export default userApi;

import api from './axios';

export const userApi = {
  // Current user profile
  getMyProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateMyProfile: async (userData) => {
    const response = await api.put('/users/me', userData);
    return response.data;
  },

  // Admin:  Get all users
  getAllUsers:  async (params = {}) => {
    const response = await api. get('/users', { params });
    return response.data;
  },

  // Admin: Get user by ID
  getUserById: async (id) => {
    const response = await api. get(`/users/${id}`);
    return response.data;
  },

  // Admin: Update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Admin: Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Admin: Get statistics
  getUserStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },

  // ✅ NEW: Update user status (suspend/activate)
  updateUserStatus: async (id, isActive) => {
    const response = await api.patch(`/users/${id}/status`, { isActive });
    return response.data;
  },

  // ✅ NEW:  Update user role
  updateUserRole: async (id, role) => {
    const response = await api.patch(`/users/${id}/role`, { role });
    return response.data;
  },

  // ✅ NEW:  Get recent user actions
  getRecentActions:  async (limit = 10) => {
    const response = await api.get(`/users/recent-actions?limit=${limit}`);
    return response.data;
  },
};

export default userApi;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield, 
  Briefcase,
  Search,
  Filter,
  Edit,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { userApi } from '@/api/userApi';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/utils/errorHandler';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/platform');
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You do not have permission to access this page',
      });
    }
  }, [user, navigate, toast]);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await userApi.getUserStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await userApi.getAllUsers({
          page: currentPage,
          limit: 10,
          search: searchTerm,
          role: roleFilter,
          status:  statusFilter,
        });
        setUsers(response.data.users);
        setTotalPages(response.data.pagination.pages);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: getErrorMessage(error),
        });
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(debounce);
  }, [currentPage, searchTerm, roleFilter, statusFilter, toast]);

  const handleDeleteUser = async (userId) => {
    if (! window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await userApi.deleteUser(userId);
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
      // Refresh users list
      setCurrentPage(1);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Delete Failed',
        description: getErrorMessage(error),
      });
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': 
        return 'bg-red-100 text-red-800';
      case 'lawyer':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (user?. role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
        {/* Page Title */}
        <div className="mb-8">
          <h1 
            className="text-3xl font-bold text-[#44444E]"
            style={{ fontFamily:  'Roboto Mono' }}
          >
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2" style={{ fontFamily: 'Noto Sans' }}>
            Manage users and view system statistics
          </p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Users className="w-6 h-6" />}
              title="Total Users"
              value={stats.totalUsers}
              color="bg-blue-500"
            />
            <StatCard
              icon={<UserCheck className="w-6 h-6" />}
              title="Active Users"
              value={stats.activeUsers}
              color="bg-green-500"
            />
            <StatCard
              icon={<Shield className="w-6 h-6" />}
              title="Admins"
              value={stats. adminUsers}
              color="bg-red-500"
            />
            <StatCard
              icon={<Briefcase className="w-6 h-6" />}
              title="Lawyers"
              value={stats.lawyerUsers}
              color="bg-purple-500"
            />
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md: grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:outline-none"
                style={{ fontFamily: 'Noto Sans' }}
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:outline-none appearance-none"
                style={{ fontFamily: 'Noto Sans' }}
              >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="lawyer">Lawyer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:outline-none appearance-none"
                style={{ fontFamily: 'Noto Sans' }}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#29473E]" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500" style={{ fontFamily: 'Noto Sans' }}>
                No users found
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-[#29473E] rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {user.firstName[0]}{user.lastName[0]}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Noto Sans' }}>
                                {user.firstName} {user.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900" style={{ fontFamily: 'Noto Sans' }}>
                            {user.email}
                          </div>
                          {user.isEmailVerified && (
                            <span className="text-xs text-green-600">✓ Verified</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user. role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ?  'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{ fontFamily: 'Noto Sans' }}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEditModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover: text-red-900"
                            disabled={user.id === user.id}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700" style={{ fontFamily: 'Noto Sans' }}>
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSuccess={() => {
            setShowEditModal(false);
            setSelectedUser(null);
            setCurrentPage(1); // Refresh list
          }}
        />
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: 'Noto Sans' }}>
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Roboto Mono' }}>
          {value}
        </p>
      </div>
      <div className={`${color} p-3 rounded-full text-white`}>
        {icon}
      </div>
    </div>
  </div>
);

// Edit User Modal Component
const EditUserModal = ({ user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName:  user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber || '',
    role: user.role,
    isActive: user. isActive,
    isEmailVerified: user.isEmailVerified,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await userApi.updateUser(user. id, formData);
      toast({
        title: 'Success',
        description: 'User updated successfully',
      });
      onSuccess();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#44444E] mb-4" style={{ fontFamily: 'Roboto Mono' }}>
            Edit User
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" style={{ fontFamily:  'Noto Sans' }}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:outline-none"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1" style={{ fontFamily: 'Noto Sans' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData. lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:outline-none"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" style={{ fontFamily: 'Noto Sans' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus: outline-none"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" style={{ fontFamily: 'Noto Sans' }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:outline-none"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" style={{ fontFamily: 'Noto Sans' }}>
                Role
              </label>
              <select
                name="role"
                value={formData. role}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#29473E] focus:outline-none"
                disabled={isLoading}
              >
                <option value="user">User</option>
                <option value="lawyer">Lawyer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#29473E] border-gray-300 rounded focus:ring-[#29473E]"
                  disabled={isLoading}
                />
                <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Noto Sans' }}>
                  Active
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isEmailVerified"
                  checked={formData.isEmailVerified}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#29473E] border-gray-300 rounded focus:ring-[#29473E]"
                  disabled={isLoading}
                />
                <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'Noto Sans' }}>
                  Email Verified
                </span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#29473E] text-white py-2 rounded-lg hover:bg-[#1f3630] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={isLoading}
                style={{ fontFamily: 'Noto Sans' }}
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? 'Saving.. .' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                disabled={isLoading}
                style={{ fontFamily: 'Noto Sans' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
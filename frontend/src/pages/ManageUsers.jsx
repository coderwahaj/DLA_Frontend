// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination';
// import { userApi } from '@/api/userApi';
// import { toast } from 'react-hot-toast'; // or whatever toast library you use

// const STATUS_STYLES = {
//   Active: 'bg-[#E5E7EB] text-[#2C7A3E] w-[70px] h-[20px] flex items-center justify-center rounded text-xs font-bold',
//   Suspended: 'bg-[#E5E7EB] text-[#D12A2A] w-[70px] h-[20px] flex items-center justify-center rounded text-xs font-bold',
// };

// export const ManageUsers = () => {
//   // State management
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     totalPages: 1,
//     totalItems: 0,
//     hasNext: false,
//     hasPrevious: false
//   });
//   const [recentActions, setRecentActions] = useState([]);

//   // Fetch data on mount and when page changes
//   useEffect(() => {
//     fetchUsers();
//   }, [currentPage]);

//   useEffect(() => {
//     fetchRecentActions();
//   }, []);

//   /**
//    * Fetch users from API
//    */
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await userApi.getAllUsers({
//         page: currentPage,
//         limit:  10,
//         sortBy: 'createdAt',
//         sortOrder: 'DESC'
//       });

//       if (response.status === 'success') {
//         // Transform data to match your UI format
//         const transformedUsers = response.data.users.map(user => ({
//           id: `USR-${user.id. slice(0, 4).toUpperCase()}`,
//           fullId: user.id, // Keep full ID for API calls
//           name: `${user.firstName} ${user.lastName}`,
//           email: user.email,
//           status: user.isActive ? 'Active' : 'Suspended'
//         }));

//         setUsers(transformedUsers);
//         setPagination(response.data.pagination);
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       toast.error('Failed to load users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * Fetch recent actions
//    */
//   const fetchRecentActions = async () => {
//     try {
//       const response = await userApi.getRecentActions(3);
      
//       if (response.status === 'success') {
//         // Transform actions to match your UI format
//         const transformedActions = response.data. actions.map(action => ({
//           user: action.user?. name || 'System',
//           action: action.details,
//           time: formatActionTime(action.timestamp)
//         }));

//         setRecentActions(transformedActions);
//       }
//     } catch (error) {
//       console.error('Error fetching recent actions:', error);
//     }
//   };

//   /**
//    * Handle suspend/activate action
//    */
//   const handleAction = async (action, user) => {
//     try {
//       const newStatus = action === 'activate';
//       const response = await userApi.updateUserStatus(user.fullId, newStatus);

//       if (response.status === 'success') {
//         toast.success(response.message || `User ${action}d successfully`);
//         fetchUsers(); // Refresh user list
//         fetchRecentActions(); // Refresh recent actions
//       }
//     } catch (error) {
//       console.error(`Error ${action}ing user:`, error);
//       toast.error(error.response?.data?.message || `Failed to ${action} user`);
//     }
//   };

//   /**
//    * Format action timestamp
//    */
//   const formatActionTime = (timestamp) => {
//     if (!timestamp) return 'N/A';
    
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);

//     if (diffHours < 24) {
//       return `Today, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
//     } else if (diffDays === 1) {
//       return `Yesterday, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
//     }
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:  '2-digit' });
//   };

//   /**
//    * Get user initials
//    */
//   const getInitials = (name) => {
//     return name
//       .split(' ')
//       .map((n) => n[0])
//       .join('')
//       .toUpperCase();
//   };

//   /**
//    * Handle page change
//    */
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="space-y-6 sm:space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl sm:text-3xl font-bold text-foreground">User Accounts Management</h1>
//         <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage and monitor user accounts across the platform</p>
//       </div>

//       {/* Users Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg sm:text-xl">All Users</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//             </div>
//           ) : (
//             <>
//               <div className="rounded-md border overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead className="min-w-[100px]">User ID</TableHead>
//                       <TableHead className="min-w-[150px]">Name</TableHead>
//                       <TableHead className="min-w-[200px] hidden lg:table-cell">Email</TableHead>
//                       <TableHead className="min-w-[100px]">Status</TableHead>
//                       <TableHead className="text-right min-w-[100px]">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {users. length === 0 ? (
//                       <TableRow>
//                         <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
//                           No users found
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       users.map((user) => (
//                         <TableRow key={user.id}>
//                           <TableCell className="font-medium text-muted-foreground text-sm">{user.id}</TableCell>
//                           <TableCell>
//                             <div className="flex items-center gap-2">
//                               <Avatar className="h-8 w-8 flex-shrink-0">
//                                 <AvatarFallback className="bg-primary/10 text-primary text-xs">
//                                   {getInitials(user.name)}
//                                 </AvatarFallback>
//                               </Avatar>
//                               <span className="font-medium text-sm">{user.name}</span>
//                             </div>
//                           </TableCell>
//                           <TableCell className="text-muted-foreground text-sm hidden lg:table-cell">{user.email}</TableCell>
//                           <TableCell>
//                             <span className={STATUS_STYLES[user.status] || STATUS_STYLES. Suspended}>
//                               {user. status}
//                             </span>
//                           </TableCell>
//                           <TableCell className="text-right">
//                             <Button
//                               size="sm"
//                               className={`text-white h-[20px] px-2 sm:px-3 text-xs ${
//                                 user.status === 'Active' ? 'bg-[#9F0000] hover:bg-[#7A0000]' : 'bg-[#317249] hover:bg-[#275D3A]'
//                               }`}
//                               onClick={() =>
//                                 handleAction(user.status === 'Active' ?  'suspend' : 'activate', user)
//                               }
//                             >
//                               {user.status === 'Active' ? 'Suspend' : 'Activate'}
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     )}
//                   </TableBody>
//                 </Table>
//               </div>

//               {/* Pagination */}
//               {pagination.totalPages > 1 && (
//                 <div className="mt-4">
//                   <Pagination>
//                     <PaginationContent>
//                       <PaginationItem>
//                         <PaginationPrevious
//                           href="#"
//                           className="bg-[#E5E7EB] text-[#000] px-2 h-[28px] rounded hover:bg-[#d1d5db]"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             if (pagination.hasPrevious) {
//                               handlePageChange(currentPage - 1);
//                             }
//                           }}
//                         />
//                       </PaginationItem>

//                       {[...Array(pagination.totalPages)].map((_, index) => (
//                         <PaginationItem key={index + 1}>
//                           <PaginationLink
//                             href="#"
//                             isActive={currentPage === index + 1}
//                             className={currentPage === index + 1 ?  'bg-[#244236] text-white' : ''}
//                             onClick={(e) => {
//                               e.preventDefault();
//                               handlePageChange(index + 1);
//                             }}
//                           >
//                             {index + 1}
//                           </PaginationLink>
//                         </PaginationItem>
//                       ))}

//                       <PaginationItem>
//                         <PaginationNext
//                           href="#"
//                           className="bg-[#E5E7EB] text-[#000] px-2 h-[28px] rounded hover:bg-[#d1d5db]"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             if (pagination.hasNext) {
//                               handlePageChange(currentPage + 1);
//                             }
//                           }}
//                         />
//                       </PaginationItem>
//                     </PaginationContent>
//                   </Pagination>
//                 </div>
//               )}
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Recent Account Actions */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg sm:text-xl">Recent Account Actions</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {recentActions.length === 0 ? (
//             <p className="text-sm text-muted-foreground">No recent actions</p>
//           ) : (
//             <div className="space-y-4">
//               {recentActions. map((action, index) => (
//                 <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
//                   <Avatar className="h-10 w-10 mt-0.5 flex-shrink-0">
//                     <AvatarFallback className="bg-primary/10 text-primary text-xs">
//                       {getInitials(action.user)}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm text-foreground">{action.action}</p>
//                     <p className="text-xs text-muted-foreground mt-1">{action.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ManageUsers;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { userApi } from '@/api/userApi';
import { toast } from 'react-hot-toast';
import { filterAdminUsers } from '@/utils/userFilters'; // Import the filter utility

const STATUS_STYLES = {
  Active: 'bg-[#E5E7EB] text-[#2C7A3E] w-[70px] h-[20px] flex items-center justify-center rounded text-xs font-bold',
  Suspended: 'bg-[#E5E7EB] text-[#D12A2A] w-[70px] h-[20px] flex items-center justify-center rounded text-xs font-bold',
};

export const ManageUsers = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrevious: false
  });
  const [recentActions, setRecentActions] = useState([]);

  // Fetch data on mount and when page changes
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    fetchRecentActions();
  }, []);

  /**
 * Fetch users from API
 */
const fetchUsers = async () => {
  try {
    setLoading(true);
    const response = await userApi.getAllUsers({
      page: currentPage,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'DESC'
    });

    if (response.status === 'success') {
      // Safety check for users array
      const apiUsers = response.data?. users || [];
      
      if (! Array.isArray(apiUsers)) {
        console.error('Expected users array but got:', typeof apiUsers);
        toast.error('Invalid data format received');
        setUsers([]);
        return;
      }

      console.log('Total users from API:', apiUsers.length);
      
      // Filter out admin users BEFORE transformation
      const nonAdminUsers = filterAdminUsers(apiUsers);
      
      console.log('Non-admin users:', nonAdminUsers.length);
      console.log('Admin users filtered:', apiUsers.length - nonAdminUsers.length);
      
      // Transform data to match your UI format
      const transformedUsers = nonAdminUsers.map(user => ({
        id: `USR-${user.id?. slice(0, 4).toUpperCase() || 'XXXX'}`,
        fullId: user.id, // Keep full ID for API calls
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown',
        email: user.email || 'N/A',
        status: user.isActive ? 'Active' : 'Suspended',
        role: user.role // Keep role for reference
      }));

      setUsers(transformedUsers);
      setPagination(response.data?. pagination || pagination);
    } else {
      toast.error('Failed to load users');
      setUsers([]);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    toast.error(error.message || 'Failed to load users');
    setUsers([]);
  } finally {
    setLoading(false);
  }
};
  /**
   * Fetch recent actions
   */
  const fetchRecentActions = async () => {
    try {
      const response = await userApi.getRecentActions(3);
      
      if (response.status === 'success') {
        // Transform actions to match your UI format
        const transformedActions = response.data. actions.map(action => ({
          user: action.user?. name || 'System',
          action: action.details,
          time: formatActionTime(action. timestamp)
        }));

        setRecentActions(transformedActions);
      }
    } catch (error) {
      console.error('Error fetching recent actions:', error);
    }
  };

  /**
   * Handle suspend/activate action
   */
  const handleAction = async (action, user) => {
    try {
      const newStatus = action === 'activate';
      const response = await userApi.updateUserStatus(user.fullId, newStatus);

      if (response.status === 'success') {
        toast.success(response.message || `User ${action}d successfully`);
        fetchUsers(); // Refresh user list
        fetchRecentActions(); // Refresh recent actions
      }
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(error.response?.data?.message || `Failed to ${action} user`);
    }
  };

  /**
   * Format action timestamp
   */
  const formatActionTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 24) {
      return `Today, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:  '2-digit' });
  };

  /**
   * Get user initials
   */
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  /**
   * Handle page change
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">User Accounts Management</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage and monitor user accounts across the platform</p>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[100px]">User ID</TableHead>
                      <TableHead className="min-w-[150px]">Name</TableHead>
                      <TableHead className="min-w-[200px] hidden lg:table-cell">Email</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium text-muted-foreground text-sm">{user.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-sm">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm hidden lg:table-cell">{user.email}</TableCell>
                          <TableCell>
                            <span className={STATUS_STYLES[user.status] || STATUS_STYLES.Suspended}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              className={`text-white h-[20px] px-2 sm:px-3 text-xs ${
                                user.status === 'Active' ? 'bg-[#9F0000] hover:bg-[#7A0000]' : 'bg-[#317249] hover:bg-[#275D3A]'
                              }`}
                              onClick={() =>
                                handleAction(user.status === 'Active' ? 'suspend' : 'activate', user)
                              }
                            >
                              {user.status === 'Active' ? 'Suspend' : 'Activate'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          className="bg-[#E5E7EB] text-[#000] px-2 h-[28px] rounded hover:bg-[#d1d5db]"
                          onClick={(e) => {
                            e.preventDefault();
                            if (pagination.hasPrevious) {
                              handlePageChange(currentPage - 1);
                            }
                          }}
                        />
                      </PaginationItem>

                      {[...Array(pagination.totalPages)].map((_, index) => (
                        <PaginationItem key={index + 1}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === index + 1}
                            className={currentPage === index + 1 ? 'bg-[#244236] text-white' : ''}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(index + 1);
                            }}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          className="bg-[#E5E7EB] text-[#000] px-2 h-[28px] rounded hover:bg-[#d1d5db]"
                          onClick={(e) => {
                            e. preventDefault();
                            if (pagination.hasNext) {
                              handlePageChange(currentPage + 1);
                            }
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Recent Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Recent Account Actions</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent actions</p>
          ) : (
            <div className="space-y-4">
              {recentActions.map((action, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Avatar className="h-10 w-10 mt-0.5 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getInitials(action.user)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{action.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{action.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsers;
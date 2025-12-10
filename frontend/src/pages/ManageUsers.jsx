import React, { useState } from 'react';
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

const mockUsers = [
  { id: 'USR-1254', name: 'Ahmed Khan', email: 'ahmed.khan@email.com', status: 'Active' },
  { id: 'USR-1253', name: 'Fatima Ali', email: 'fatima.ali@legalfirm.com', status: 'Active' },
  { id: 'USR-1252', name: 'Muhammad Usman', email: 'm.usman@email.com', status: 'Suspended' },
  { id: 'USR-1251', name: 'Ayesha Malik', email: 'ayesha.malik@lawfirm.pk', status: 'Active' },
  { id: 'USR-1250', name: 'Bilal Ahmed', email: 'bilal.ahmed@email.com', status: 'Suspended' },
  { id: 'USR-1249', name: 'Saima Zafar', email: 'saima.zafar@legalconsult.pk', status: 'Active' },
];

const mockActions = [
  { user: 'Muhammad Usman', action: 'suspended', time: 'Today, 14:23' },
  { user: 'Saima Zafar', action: 'approved new legal professional account', time: 'Today, 11:05' },
  { user: 'Bilal Ahmed', action: 'reactivated', time: 'Yesterday, 16:42' },
];

const STATUS_STYLES = {
  Active: 'bg-[#E5E7EB] text-[#2C7A3E] w-[70px] h-[20px] flex items-center justify-center rounded text-xs font-bold',
  Suspended: 'bg-[#E5E7EB] text-[#D12A2A] w-[70px] h-[20px] flex items-center justify-center rounded text-xs font-bold',
};

export const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleAction = (action, user) => {
    console.log(`${action} user:`, user);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
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
                {mockUsers.map((user) => (
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
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    className="bg-[#E5E7EB] text-[#000] px-2 h-[28px] rounded hover:bg-[#d1d5db]"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.max(1, prev - 1));
                    }}
                  />
                </PaginationItem>

                {[1, 2, 3].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      className={currentPage === page ? 'bg-[#244236] text-white' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    className="bg-[#E5E7EB] text-[#000] px-2 h-[28px] rounded hover:bg-[#d1d5db]"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => prev + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* Recent Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Recent Account Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActions.map((action, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Avatar className="h-10 w-10 mt-0.5 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {getInitials(action.user)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">Admin</span> {action.action}{' '}
                    <span className="font-medium">{action.user}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{action.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUsers;
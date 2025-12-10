import React from 'react';
import { Menu, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
export const Navbar = ({ onMenuClick }) => {
  const handleLogout = () => {
    console.log('Logout clicked');
  };
  return (
    <nav className="bg-primary border-b border-primary-hover h-16 flex items-center justify-between px-4 sm:px-6 fixed top-0 left-0 right-0 z-20">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-primary-foreground hover: bg-primary-hover"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <img
          src="/logo.png"
          alt="Digital Legal Advisor"
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full p-1"
        />
        <span className="text-primary-foreground font-semibold text-base sm:text-lg hidden sm:inline">
          Digital Legal Advisor
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-primary-foreground hover:bg-primary-hover"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Admin User</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
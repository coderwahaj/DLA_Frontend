import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  Database,
  MessageSquare,
} from 'lucide-react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin-dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Manage Legal Datasets',
    href:  '/manage-datasets',
    icon: Database,
  },
  {
    title: 'User Accounts Management',
    href:  '/user-accounts',
    icon: Users,
  },
  {
    title: 'Feedback Monitoring',
    href:  '/feedback-monitoring',
    icon: MessageSquare,
  },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 bottom-0 w-64 bg-primary border-r border-primary-hover z-40 transition-transform duration-300 ease-in-out overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0'
        )}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-primary-hover">
          <span className="text-primary-foreground font-semibold">Menu</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-hover"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="py-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ?  'bg-primary-foreground/10 text-primary-foreground'
                        : 'text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item. title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};
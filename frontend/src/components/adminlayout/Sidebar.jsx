import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Database,
  MessageSquare,
} from 'lucide-react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin1-dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Manage Legal Datasets',
    href: '/manage-datasets',
    icon: Database,
  },
  {
    title: 'User Accounts Management',
    href: '/user-accounts',
    icon: Users,
  },
  {
    title: 'Feedback Monitoring',
    href: '/feedback-monitoring',
    icon: MessageSquare,
  },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-primary border-r border-primary-hover h-[calc(100vh-4rem)] sticky top-16 hidden md:block overflow-y-auto">
      <nav className="py-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-foreground/10 text-primary-foreground'
                      : 'text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
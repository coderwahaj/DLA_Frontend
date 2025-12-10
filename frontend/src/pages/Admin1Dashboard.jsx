import React from 'react';
import { StatCard } from '@/components/admindashboard/StatCard';
import { ActivityChart } from '@/components/admindashboard/ActivityChart';
import { AlertCard } from '@/components/admindashboard/AlertCard';
import { Users, Activity, Database } from 'lucide-react';

export const Admin1Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,845',
      change: '+12.5% from last month',
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Active Sessions',
      value: '176',
      change: '+8.3% from yesterday',
      icon: Activity,
      trend: 'up',
    },
    {
      title: 'Dataset Usage',
      value: '65.2%',
      change: '-3.1% from last week',
      icon: Database,
      trend: 'down',
    },
  ];

  const alerts = [
    {
      type: 'info',
      title: 'System Update Required',
      description: 'Legal database needs to be updated to include recent regulatory changes.',
      time: '2 hours ago',
    },
    {
      type: 'warning',
      title: 'High User Traffic',
      description: 'System experiencing higher than normal traffic. All services operating normally.',
      time: '5 hours ago',
    },
    {
      type: 'success',
      title: 'Dataset Update Complete',
      description: 'The latest Pakistan tax regulations have been successfully integrated.',
      time: 'Yesterday',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Welcome back, monitor your legal chatbot system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Activity Chart */}
      <ActivityChart />

      {/* System Alerts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">System Alerts & Updates</h2>
          <button className="text-xs sm:text-sm text-primary hover:underline">View all</button>
        </div>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <AlertCard key={index} {...alert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin1Dashboard;
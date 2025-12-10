import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const StatCard = ({ title, value, change, icon: Icon, trend }) => {
  const isPositive = trend === 'up';
  
  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-200">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </p>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold text-foreground">{value}</h3>
          {Icon && (
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
        {change && (
          <div className="flex items-center gap-1 text-sm">
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4 text-success" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-error" />
            )}
            <span
              className={cn(
                'font-medium',
                isPositive ? 'text-success' : 'text-error'
              )}
            >
              {change}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

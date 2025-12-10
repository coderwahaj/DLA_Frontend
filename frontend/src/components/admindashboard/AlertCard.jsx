import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AlertCard = ({ type, title, description, time }) => {
  const config = {
    info: {
      icon: AlertCircle,
      bgColor: 'bg-chart-1/10',
      textColor: 'text-chart-1',
      borderColor: 'border-chart-1/20',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-warning-light',
      textColor: 'text-warning',
      borderColor: 'border-warning/20',
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-success-light',
      textColor: 'text-success',
      borderColor: 'border-success/20',
    },
  };

  const { icon: Icon, bgColor, textColor, borderColor } = config[type] || config.info;

  return (
    <Card className={cn('p-4 border-l-4', bgColor, borderColor)}>
      <div className="flex gap-3">
        <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', textColor)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground">{title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            {time && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

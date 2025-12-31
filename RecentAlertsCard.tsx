
import React from 'react';
import Card from './Card';
import type { Alert } from '../types';

interface RecentAlertsCardProps {
  alerts: Alert[];
}

const SeverityIndicator: React.FC<{ severity: Alert['severity'] }> = ({ severity }) => {
    const icon = {
        Critical: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        ),
        Warning: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        ),
        Info: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
        )
    };
    return icon[severity];
};

const RecentAlertsCard: React.FC<RecentAlertsCardProps> = ({ alerts }) => {
    const criticalCount = alerts.filter(a => a.severity === 'Critical').length;
    const warningCount = alerts.filter(a => a.severity === 'Warning').length;

    const visibleContent = (
        <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Alerts</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">System and security notifications</p>
            <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-3xl font-bold text-red-500">{criticalCount}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Critical</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-yellow-500">{warningCount}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Warning</p>
                </div>
            </div>
        </div>
    );

    const expandedContent = (
        <div className="space-y-3">
            {alerts.slice(0, 5).map(alert => ( // Show latest 5 alerts
                <div key={alert.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 pt-0.5">
                        <SeverityIndicator severity={alert.severity} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-gray-800 dark:text-gray-200">{alert.message}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-500">
                            {alert.source} &middot; {alert.timestamp}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <Card expandedContent={expandedContent}>
            {visibleContent}
        </Card>
    );
};

export default RecentAlertsCard;
import React from 'react';
import { BarChart2, Calendar, Clock, Activity as ActivityIcon } from 'lucide-react';
import { RecentActivity } from '../../types/dashboard';

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>No recent activities found.</p>
        <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Log your first activity
        </button>
      </div>
    );
  }

  // Get the appropriate icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'mood':
        return <BarChart2 size={16} className="text-blue-500" />;
      case 'sleep':
        return <Clock size={16} className="text-purple-500" />;
      case 'exercise':
        return <ActivityIcon size={16} className="text-green-500" />;
      default:
        return <Calendar size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div 
          key={index}
          className="flex items-start p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="mr-4 mt-1">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">{activity.title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-400 dark:text-gray-500">{activity.date}</span>
              {activity.value !== undefined && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700">
                  {activity.value}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {activities.length > 0 && (
        <div className="text-center mt-4">
          <a href="/activity-log" className="text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300">
            View all activities →
          </a>
        </div>
      )}
    </div>
  );
};

export default RecentActivities;
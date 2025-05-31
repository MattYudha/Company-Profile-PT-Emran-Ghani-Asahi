import React from 'react';
import { Activity } from '../../types/dashboard';

interface ActivityChartProps {
  data: Activity[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  // If no data, show placeholder
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-gray-400">
        <p>No activity data available</p>
      </div>
    );
  }

  // Prepare data for chart
  const maxValue = Math.max(...data.map(item => item.value));
  const chartHeight = 150;

  return (
    <div className="relative h-48">
      <div className="flex h-full items-end space-x-2">
        {data.map((item, index) => {
          // Calculate bar height based on value
          const height = (item.value / maxValue) * chartHeight;
          
          // Determine bar color based on activity type
          let barColor;
          switch (item.type) {
            case 'mood':
              barColor = 'bg-blue-500';
              break;
            case 'exercise':
              barColor = 'bg-green-500';
              break;
            case 'sleep':
              barColor = 'bg-purple-500';
              break;
            case 'meditation':
              barColor = 'bg-teal-500';
              break;
            default:
              barColor = 'bg-gray-500';
          }
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className={`w-full rounded-t-sm ${barColor} transition-all duration-300 ease-in-out hover:opacity-80`}
                style={{ height: `${height}px` }}
                title={`${item.type}: ${item.value}`}
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate w-full text-center">
                {item.date}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center mt-4 text-xs space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
          <span>Mood</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span>Exercise</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
          <span>Sleep</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-teal-500 rounded-full mr-1"></div>
          <span>Meditation</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
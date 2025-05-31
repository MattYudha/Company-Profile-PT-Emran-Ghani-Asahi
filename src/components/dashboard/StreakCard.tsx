import React from 'react';
import { Flame } from 'lucide-react';

interface StreakCardProps {
  streak: number;
  longestStreak: number;
}

const StreakCard: React.FC<StreakCardProps> = ({ streak, longestStreak }) => {
  // Generate the days of the week
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Simulate check-ins for the last 7 days based on the streak
  // For demonstration, we'll assume the streak is consecutive days leading up to today
  const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
  const adjustedToday = today === 0 ? 6 : today - 1; // Convert to 0 = Monday, 6 = Sunday
  
  const checkIns = weekdays.map((day, index) => {
    // For simplicity, we'll assume the streak means consecutive days checked in
    // If the index is within the range [adjustedToday - streak + 1, adjustedToday], it's checked in
    // We add 7 to handle negative indices and then take modulo 7
    return {
      day,
      checkedIn: (index <= adjustedToday) && (index > adjustedToday - streak)
    };
  });

  return (
    <div className="flex flex-col">
      {/* Current streak */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold">{streak}</span>
              <span className="text-xs text-gray-500">days</span>
            </div>
          </div>
          <Flame className="absolute -top-2 -right-2 text-orange-500" size={32} />
        </div>
        <div className="ml-6">
          <h4 className="text-lg font-semibold">Current Streak</h4>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {streak === 0 
              ? "Start your streak today!" 
              : streak === 1 
                ? "First day of your streak!" 
                : `You've been consistent for ${streak} days!`}
          </p>
          <p className="text-sm mt-1">
            <span className="font-medium">Longest streak:</span> {longestStreak} days
          </p>
        </div>
      </div>
      
      {/* Weekly check-in visualization */}
      <div className="flex justify-between mt-4">
        {checkIns.map((checkIn, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                ${checkIn.checkedIn 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}`}
            >
              {checkIn.checkedIn ? '✓' : ''}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{checkIn.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakCard;
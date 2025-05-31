import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Calendar, Award } from 'lucide-react';
import { dashboardApi } from '../api/dashboardApi';
import { DashboardData } from '../types/dashboard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import RiskScoreGauge from '../components/dashboard/RiskScoreGauge';
import ActivityChart from '../components/dashboard/ActivityChart';
import StreakCard from '../components/dashboard/StreakCard';
import RecentActivities from '../components/dashboard/RecentActivities';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await dashboardApi.getDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-800 text-center">
        <p>{error}</p>
        <button 
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const riskScoreImproved = dashboardData?.risk_score_current < (dashboardData?.risk_score_previous || 0);

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-400 text-white rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-2">Hello, {user?.full_name || 'there'}!</h1>
        <p className="opacity-90">Here's your wellness summary for today.</p>
      </div>

      {/* Main stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Risk Score Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Risk Score</p>
              <h2 className="text-3xl font-bold mt-1">{dashboardData?.risk_score_current || 0}</h2>
              <div className="flex items-center mt-1">
                {riskScoreImproved ? (
                  <>
                    <TrendingDown className="text-green-500 mr-1\" size={16} />
                    <span className="text-green-500 text-sm">Improved</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="text-red-500 mr-1" size={16} />
                    <span className="text-red-500 text-sm">Increased</span>
                  </>
                )}
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                  from {dashboardData?.risk_score_previous || 0}
                </span>
              </div>
            </div>
            <RiskScoreGauge score={dashboardData?.risk_score_current || 0} />
          </div>
        </div>

        {/* Completed Activities Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Completed Activities</p>
              <h2 className="text-3xl font-bold mt-1">{dashboardData?.completed_activities || 0}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">this week</p>
            </div>
            <Activity className="text-blue-500" size={24} />
          </div>
        </div>

        {/* Current Streak Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Current Streak</p>
              <h2 className="text-3xl font-bold mt-1">{dashboardData?.streak || 0} days</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Keep it up!</p>
            </div>
            <Calendar className="text-purple-500" size={24} />
          </div>
        </div>

        {/* Achievements Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Achievements</p>
              <h2 className="text-3xl font-bold mt-1">{dashboardData?.achievements || 0}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Total earned</p>
            </div>
            <Award className="text-amber-500" size={24} />
          </div>
        </div>
      </div>

      {/* Activity and mood tracking charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Activity History</h3>
          <ActivityChart data={dashboardData?.activity_history || []} />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Current Streak</h3>
          <StreakCard streak={dashboardData?.streak || 0} longestStreak={dashboardData?.longest_streak || 0} />
        </div>
      </div>

      {/* Recent activities */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <RecentActivities activities={dashboardData?.recent_activities || []} />
      </div>
    </div>
  );
};

export default DashboardPage;
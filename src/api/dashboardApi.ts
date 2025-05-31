import { api } from '../services/api';
import { DashboardData } from '../types/dashboard';

export const dashboardApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    try {
      const response = await api.get('/api/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      
      // Offline fallback: Return mock data for demo
      // In production, this would use cached data from IndexedDB/localStorage
      return {
        risk_score_current: 35,
        risk_score_previous: 45,
        completed_activities: 8,
        streak: 5,
        longest_streak: 14,
        achievements: 7,
        activity_history: [
          { date: '2025-05-22', type: 'mood', value: 4 },
          { date: '2025-05-23', type: 'exercise', value: 3 },
          { date: '2025-05-24', type: 'sleep', value: 5 },
          { date: '2025-05-25', type: 'meditation', value: 2 },
          { date: '2025-05-26', type: 'mood', value: 4 },
          { date: '2025-05-27', type: 'exercise', value: 5 },
          { date: '2025-05-28', type: 'sleep', value: 3 }
        ],
        recent_activities: [
          {
            id: '1',
            type: 'mood',
            title: 'Mood Log',
            description: 'Feeling positive today',
            date: '2025-05-28',
            value: 4
          },
          {
            id: '2',
            type: 'exercise',
            title: 'Exercise',
            description: '30 minute walk in the park',
            date: '2025-05-28'
          },
          {
            id: '3',
            type: 'sleep',
            title: 'Sleep Log',
            description: 'Slept well',
            date: '2025-05-27',
            value: 8
          }
        ]
      };
    }
  }
};
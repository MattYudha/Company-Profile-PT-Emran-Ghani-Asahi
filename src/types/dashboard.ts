export interface DashboardData {
  risk_score_current: number;
  risk_score_previous: number;
  completed_activities: number;
  streak: number;
  longest_streak: number;
  achievements: number;
  activity_history: Activity[];
  recent_activities: RecentActivity[];
}

export interface Activity {
  date: string;
  type: string;
  value: number;
}

export interface RecentActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  value?: number;
}
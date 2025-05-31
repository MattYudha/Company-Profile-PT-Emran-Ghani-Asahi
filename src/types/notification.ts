export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  created_at: string;
  link?: string;
}

export type NotificationType = 
  | 'activity_reminder'
  | 'progress_update'
  | 'risk_alert'
  | 'weekly_summary'
  | 'system';

export interface NotificationSettings {
  notify_activity_reminders: boolean;
  notify_progress_updates: boolean;
  notify_risk_alerts: boolean;
  notify_weekly_summary: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
}
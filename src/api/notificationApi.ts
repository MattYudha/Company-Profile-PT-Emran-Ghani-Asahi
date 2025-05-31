import { api } from '../services/api';
import { Notification, NotificationSettings } from '../types/notification';

interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
  totalCount: number;
}

export const notificationApi = {
  getNotifications: async (page = 1, limit = 10): Promise<NotificationsResponse> => {
    try {
      const response = await api.get('/api/notifications', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Get notifications error:', error);
      throw error;
    }
  },
  
  markNotificationAsRead: async (id: string): Promise<void> => {
    try {
      await api.put(`/api/notifications/${id}/read`);
    } catch (error) {
      console.error('Mark notification as read error:', error);
      throw error;
    }
  },
  
  markAllNotificationsAsRead: async (): Promise<void> => {
    try {
      await api.put('/api/notifications/read-all');
    } catch (error) {
      console.error('Mark all notifications as read error:', error);
      throw error;
    }
  },
  
  getNotificationSettings: async (): Promise<NotificationSettings> => {
    try {
      const response = await api.get('/api/notifications/settings');
      return response.data;
    } catch (error) {
      console.error('Get notification settings error:', error);
      throw error;
    }
  },
  
  updateNotificationSettings: async (settings: Partial<NotificationSettings>): Promise<NotificationSettings> => {
    try {
      const response = await api.put('/api/notifications/settings', settings);
      return response.data;
    } catch (error) {
      console.error('Update notification settings error:', error);
      throw error;
    }
  }
};
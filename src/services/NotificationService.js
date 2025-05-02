import axios from "../utils/Axios";

export const NotificationService = {
  // Get all notifications with pagination
  getNotifications: async (page = 1, limit = 20) => {
    try {
      const response = await axios.get(
        `/api/v1/notifications?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  },

  // Get notifications by type
  getNotificationsByType: async (type, page = 1, limit = 20) => {
    try {
      const response = await axios.get(
        `/api/v1/notifications?type=${type}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${type} notifications:`, error);
      throw error;
    }
  },

  // Get unread notifications
  getUnreadNotifications: async (page = 1, limit = 20) => {
    try {
      const response = await axios.get(
        `/api/v1/notifications?read=false&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
      throw error;
    }
  },

  // Get unread notification count
  getUnreadCount: async () => {
    try {
      const response = await axios.get("/api/v1/notifications/unread-count");
      return response.data?.data?.count || 0;
    } catch (error) {
      console.error("Error fetching unread count:", error);
      throw error;
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    try {
      const response = await axios.patch(
        `/api/v1/notifications/${notificationId}/read`
      );
      return response.data;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    try {
      const response = await axios.patch("/api/v1/notifications/read-all");
      return response.data;
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      throw error;
    }
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    try {
      const response = await axios.delete(
        `/api/v1/notifications/${notificationId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
  },
};

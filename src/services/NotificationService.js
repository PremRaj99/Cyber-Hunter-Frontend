/* eslint-disable no-useless-catch */
import axios from "../utils/Axios";

export const NotificationService = {
  /**
   * Get user notifications with optional filters
   * @param {number} page - The page number to fetch
   * @param {number} limit - Number of notifications per page
   * @param {Object} filters - Filter options (type, category, isRead)
   */
  getNotifications: async (page = 1, limit = 10, filters = {}) => {
    try {
      let queryParams = `page=${page}&limit=${limit}`;

      if (filters.type) {
        queryParams += `&type=${filters.type}`;
      }

      if (filters.category) {
        queryParams += `&category=${filters.category}`;
      }

      if (filters.isRead !== undefined) {
        queryParams += `&isRead=${filters.isRead}`;
      }

      const response = await axios.get(`/api/v1/notifications?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mark a notification as read
   * @param {string} notificationId - The ID of the notification to mark as read
   */
  markAsRead: async (notificationId) => {
    try {
      const response = await axios.patch(
        `/api/v1/notifications/${notificationId}/read`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mark all notifications as read
   * @param {Object} filters - Optional filters to apply before marking
   */
  markAllAsRead: async (filters = {}) => {
    try {
      let queryParams = "";

      if (filters.type) {
        queryParams += `type=${filters.type}&`;
      }

      if (filters.category) {
        queryParams += `category=${filters.category}&`;
      }

      const url = queryParams
        ? `/api/v1/notifications/read-all?${queryParams}`
        : `/api/v1/notifications/read-all`;

      const response = await axios.patch(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a notification
   * @param {string} notificationId - The ID of the notification to delete
   */
  deleteNotification: async (notificationId) => {
    try {
      const response = await axios.delete(
        `/api/v1/notifications/${notificationId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete all read notifications
   */
  deleteAllReadNotifications: async () => {
    try {
      const response = await axios.delete("/api/v1/notifications/read");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get notification settings
   */
  getSettings: async () => {
    try {
      const response = await axios.get("/api/v1/user/notification-settings");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update notification settings
   * @param {Object} settings - The settings to update
   */
  updateSettings: async (settings) => {
    try {
      const response = await axios.patch(
        "/api/v1/user/notification-settings",
        settings
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Enable Do Not Disturb mode
   * @param {number} hours - Number of hours to mute notifications
   */
  enableDoNotDisturb: async (hours = 8) => {
    try {
      const response = await axios.post(
        "/api/v1/user/notification-settings/do-not-disturb",
        { hours }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mute all notifications
   */
  muteAll: async () => {
    try {
      const response = await axios.post(
        "/api/v1/user/notification-settings/mute-all"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default NotificationService;

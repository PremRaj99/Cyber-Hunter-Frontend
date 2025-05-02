/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import axios from '../utils/Axios';
import { toast } from 'react-toastify';

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch notifications function that accepts a page number
  const fetchNotifications = useCallback(async (page = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/v1/notifications?page=${page}&limit=10`);
      
      if (page === 1) {
        // If it's the first page, replace existing notifications
        setNotifications(response.data.data.notifications);
      } else {
        // Otherwise append to existing notifications
        setNotifications(prev => [...prev, ...response.data.data.notifications]);
      }
      
      setUnreadCount(response.data.data.unreadCount);
      return response.data;
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications');
      // Don't show toast here as it could be annoying during repeated fetch attempts
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Function to mark a notification as read
  const markAsRead = useCallback(async (notificationId) => {
    try {
      // Find and update the notification in the local state first (optimistic update)
      setNotifications(prev => 
        prev.map(notif => 
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      // Then make the API call
      await axios.patch(`/api/v1/notifications/${notificationId}/read`);
    } catch (err) {
      console.error('Error marking notification as read:', err);
      // Revert the optimistic update if the API call fails
      fetchNotifications(1); // Refresh all notifications
      toast.error('Failed to mark notification as read');
    }
  }, [fetchNotifications]);
  
  // Function to mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      // Optimistic update
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, isRead: true }))
      );
      setUnreadCount(0);
      
      await axios.patch('/api/v1/notifications/read-all');
      toast.success('All notifications marked as read');
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      fetchNotifications(1); // Refresh if failed
      toast.error('Failed to mark all notifications as read');
    }
  }, [fetchNotifications]);
  
  // Function to delete a notification
  const deleteNotification = useCallback(async (notificationId) => {
    try {
      // Optimistic update
      const oldNotifications = [...notifications];
      const wasUnread = notifications.find(n => n._id === notificationId && !n.isRead);
      
      setNotifications(prev => prev.filter(notif => notif._id !== notificationId));
      if (wasUnread) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      
      await axios.delete(`/api/v1/notifications/${notificationId}`);
    } catch (err) {
      console.error('Error deleting notification:', err);
      fetchNotifications(1); // Refresh if failed
      toast.error('Failed to delete notification');
    }
  }, [notifications, fetchNotifications]);
  
  const value = {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
  };
  
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

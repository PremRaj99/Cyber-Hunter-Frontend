/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Trash2, Bell } from "lucide-react";
import axios from "../../../utils/Axios";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchNotifications = async (page = 1, filter = activeFilter) => {
    try {
      setLoading(true);

      let endpoint = `/api/v1/notifications?page=${page}&limit=10`;

      // Apply filters
      if (filter === "unread") {
        endpoint += "&isRead=false";
      }

      const response = await axios.get(endpoint);

      if (response.data && response.data.success) {
        const { notifications, pagination, unreadCount } = response.data.data;

        if (page === 1) {
          setNotifications(notifications);
        } else {
          setNotifications(prev => [...prev, ...notifications]);
        }

        setUnreadCount(unreadCount);
        setHasNextPage(pagination.hasNextPage);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(1, activeFilter);
  }, [activeFilter]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.patch(`/api/v1/notifications/${notificationId}/read`);

      // Update the local state
      setNotifications(prev =>
        prev.map(notif =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        )
      );

      setUnreadCount(prev => Math.max(0, prev - 1));
      toast.success("Notification marked as read");
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to update notification");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axios.patch("/api/v1/notifications/read-all");

      // Update the local state
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, isRead: true }))
      );

      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to update notifications");
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await axios.delete(`/api/v1/notifications/${notificationId}`);

      // Remove from local state
      setNotifications(prev => prev.filter(notif => notif._id !== notificationId));
      toast.success("Notification deleted");
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNotifications(currentPage + 1, activeFilter);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Get the appropriate style and icon based on notification type
  const getNotificationStyles = (type) => {
    switch (type) {
      case "success":
        return { bgColor: "bg-green-500/10", borderColor: "border-green-500/30", iconColor: "text-green-500" };
      case "warning":
        return { bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/30", iconColor: "text-yellow-500" };
      case "error":
        return { bgColor: "bg-red-500/10", borderColor: "border-red-500/30", iconColor: "text-red-500" };
      case "info":
      default:
        return { bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30", iconColor: "text-blue-500" };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">
          Notifications {unreadCount > 0 && <span className="text-sm bg-cyan-600 text-white px-2 py-0.5 rounded-full ml-2">{unreadCount} new</span>}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${unreadCount === 0 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700 text-white'
              }`}
          >
            <Check size={16} />
            <span>Mark all read</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "all", label: "All" },
          { id: "unread", label: "Unread" },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${activeFilter === filter.id
                ? "bg-cyan-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {loading && notifications.length === 0 ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      ) : notifications.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {notifications.map((notification) => {
            const styles = getNotificationStyles(notification.type);

            return (
              <motion.div
                key={notification._id}
                variants={itemVariants}
                className={`relative rounded-xl border ${styles.borderColor} ${styles.bgColor} p-4 ${!notification.isRead ? "ring-1 ring-cyan-500" : ""
                  }`}
              >
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${styles.bgColor} ${styles.iconColor}`}>
                    <Bell size={18} />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className={`font-medium ${!notification.isRead ? "text-white" : "text-gray-300"}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </span>
                    </div>

                    <p className="text-gray-400 mt-1">{notification.message}</p>

                    <div className="mt-3 flex justify-between items-center">
                      {notification.link ? (
                        <Link
                          to={notification.link}
                          className="text-sm text-cyan-400 hover:text-cyan-300"
                        >
                          View Details
                        </Link>
                      ) : (
                        <div></div>
                      )}

                      <div className="flex gap-2">
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification._id)}
                            className="p-1.5 rounded-full hover:bg-gray-700/50"
                            title="Mark as read"
                          >
                            <Check size={16} className="text-green-500" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteNotification(notification._id)}
                          className="p-1.5 rounded-full hover:bg-gray-700/50"
                          title="Delete notification"
                        >
                          <Trash2 size={16} className="text-gray-400 hover:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {!notification.isRead && (
                  <div className="absolute top-0 right-0 w-3 h-3 transform translate-x-1/2 -translate-y-1/2">
                    <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-75"></div>
                    <div className="rounded-full h-3 w-3 bg-cyan-500"></div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="py-20 text-center">
          <div className="inline-flex rounded-full bg-gray-800/50 p-4 mb-4">
            <Bell size={30} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-medium text-white">No notifications</h3>
          <p className="text-gray-400 mt-2">You do&apos;t have any notifications yet</p>
        </div>
      )}

      {/* Load more button */}
      {hasNextPage && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsList;

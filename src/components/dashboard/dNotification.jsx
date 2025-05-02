/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronLeft, Circle, X, CheckCircle, RefreshCw } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import Spinner from '../utils/Spinner';

const NotificationDashboard = () => {
  const {
    notifications,
    fetchNotifications,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    unreadCount
  } = useNotifications();

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Fetch notifications only on the first render and never again automatically
  useEffect(() => {
    if (isFirstLoad) {
      handleManualRefresh();
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  const loadMoreNotifications = () => {
    if (isLoading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);

    fetchNotifications(nextPage)
      .then(response => {
        // Check if there are more notifications to load
        if (response?.data?.pagination?.hasNextPage === false) {
          setHasMore(false);
        }
      });
  };

  // Manual refresh function - this is now the only way to refresh notifications
  const handleManualRefresh = () => {
    fetchNotifications(1);
    setLastRefreshed(new Date());
    setPage(1);
    setHasMore(true);
  };

  // Format time since last refresh
  const getRefreshTime = () => {
    if (!lastRefreshed) return 'Never';

    const now = new Date();
    const diffMs = now - lastRefreshed;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins === 1) return '1 minute ago';
    return `${diffMins} minutes ago`;
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowDetail(true);

    // Mark notification as read if needed, with better error handling
    if (!notification.isRead) {
      markAsRead(notification._id)
        .catch(err => {
          // Error is already logged and handled in the context
          // Just show the notification details anyway
          console.log("Error marking notification as read, showing details anyway");
        });
    }

    // If notification has an action link, handle it
    if (notification.link) {
      // Could navigate programmatically here if needed
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleDeleteNotification = (e, notificationId) => {
    e.stopPropagation(); // Prevent notification selection
    deleteNotification(notificationId);

    // Clear selected notification if it was deleted
    if (selectedNotification && selectedNotification._id === notificationId) {
      setSelectedNotification(null);
    }
  };

  const getTypeStyles = (type) => {
    const styles = {
      update: "bg-cyan-100 text-cyan-600 border-cyan-200",
      success: "bg-emerald-100 text-emerald-600 border-emerald-200",
      reminder: "bg-amber-100 text-amber-600 border-amber-200",
      warning: "bg-orange-100 text-orange-600 border-orange-200",
      error: "bg-red-100 text-red-600 border-red-200",
      info: "bg-blue-100 text-blue-600 border-blue-200"
    };
    return styles[type] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;

    // Less than a minute
    if (diffMs < 60000) {
      return "Just now";
    }

    // Less than an hour
    if (diffMs < 3600000) {
      const minutes = Math.floor(diffMs / 60000);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }

    // Less than a day
    if (diffMs < 86400000) {
      const hours = Math.floor(diffMs / 3600000);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    // Less than a week
    if (diffMs < 604800000) {
      const days = Math.floor(diffMs / 86400000);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    // Format as date
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-[calc(100vh-13rem)] h-full">
      <div className="bg-gray-900 rounded-2xl shadow-lg h-full overflow-hidden border border-gray-200">
        <div className="grid md:grid-cols-[380px_1fr] h-full ">
          {/* Notifications List */}
          <div className={`bg-gray-900 h-full overflow-hidden flex flex-col ${showDetail ? 'hidden md:flex' : ''}`}>
            <div className="p-6 border-b border-r border-gray-200 bg-gray-900">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-brandPrimary">Notifications</h2>
                <div className="flex items-center gap-3">
                  <div className="relative cursor-pointer" onClick={handleMarkAllAsRead}>
                    <CheckCircle className="w-5 h-5 text-brandPrimary" />
                    <span className="sr-only">Mark all as read</span>
                  </div>
                  <div
                    className="relative cursor-pointer"
                    onClick={handleManualRefresh}
                    title="Click to fetch notifications"
                  >
                    <RefreshCw className={`w-5 h-5 text-brandPrimary ${isLoading ? 'animate-spin' : ''}`} />
                  </div>
                  <div className="relative">
                    <Bell className="w-5 h-5 text-brandPrimary" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-brandPrimary rounded-full text-xs flex items-center justify-center text-white px-1">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Last updated: {getRefreshTime()}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-y-auto flex-1 p-4 space-y-3 border-r no-scrollbar"
            >
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Spinner size="md" />
                </div>
              ) : lastRefreshed === null ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                  <Bell className="w-12 h-12 mb-4 text-brandPrimary opacity-50" />
                  <p className="text-lg mb-4">Click refresh to load notifications</p>
                  <button
                    onClick={handleManualRefresh}
                    className="px-4 py-2 bg-brandPrimary text-black rounded-md hover:bg-cyan-400 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh Now</span>
                  </button>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                  <Bell className="w-12 h-12 mb-4 text-brandPrimary opacity-50" />
                  <p className="text-lg">No notifications yet</p>
                </div>
              ) : (
                <>
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification._id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4 rounded-xl bg-gray-900 border-l border-b ${notification.read ? 'border-gray-700' : 'border-brandPrimary'
                        } hover:border-cyan-200 hover:shadow-md cursor-pointer transition-all relative`}
                    >
                      <div className="flex items-start gap-3">
                        {!notification.read && (
                          <Circle className="w-2 h-2 mt-2 fill-brandPrimary text-brandPrimary flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0 pr-6">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="font-medium text-brandPrimary truncate">{notification.title}</h3>
                            <span className="text-sm text-white flex-shrink-0">
                              {formatTime(notification.time || notification.createdAt)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-white line-clamp-2">{notification.message}</p>
                          <div className={`inline-block px-3 py-1 mt-2 rounded-full text-xs font-medium border ${getTypeStyles(notification.type)}`}>
                            {notification.type}
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleDeleteNotification(e, notification._id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {hasMore && (
                    <div className="flex justify-center py-4">
                      <button
                        onClick={loadMoreNotifications}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-400 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        {isLoading ? (
                          <Spinner size="sm" />
                        ) : (
                          <RefreshCw className="w-4 h-4" />
                        )}
                        Load more
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>

          {/* Detail View */}
          <AnimatePresence>
            {(showDetail || selectedNotification) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gray-900 h-full flex flex-col"
              >
                <div className="p-7 border-b border-gray-200 flex items-center justify-between">
                  <button
                    onClick={() => setShowDetail(false)}
                    className="md:hidden flex items-center text-stone-300 hover:text-brandPrimary"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="ml-1">Back</span>
                  </button>
                  <button
                    onClick={() => setSelectedNotification(null)}
                    className="hidden md:flex items-center text-gray-400 hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {selectedNotification ? (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getTypeStyles(selectedNotification.type)}`}>
                        {selectedNotification.type}
                      </div>
                      <h2 className="text-2xl font-semibold text-brandPrimary">
                        {selectedNotification.title}
                      </h2>
                      <p className="text-white leading-relaxed">
                        {selectedNotification.message}
                      </p>
                      {selectedNotification.actionLink && (
                        <div className="pt-4">
                          <a
                            href={selectedNotification.actionLink}
                            className="text-cyan-400 hover:text-cyan-300 underline"
                          >
                            View Details
                          </a>
                        </div>
                      )}
                      <div className="pt-4 text-sm text-white flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Received {formatTime(selectedNotification.time || selectedNotification.createdAt)}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <Bell className="w-12 h-12 mb-4 text-brandPrimary" />
                      <p className="text-lg">Select a notification to view details</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NotificationDashboard;
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check } from "lucide-react";
import axios from "../../../utils/Axios";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const dropdownRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_API_URL || "http://localhost:3000", {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      forceNew: true,
      auth: {
        token: localStorage.getItem("accessToken")
      }
    });

    setSocket(socketInstance);

    const userId = localStorage.getItem("userId");
    if (userId) {
      // Debug connection events
      socketInstance.on("connect", () => {
        console.log("NotificationBell socket connected:", socketInstance.id);
        socketInstance.emit("register", userId);
      });

      socketInstance.on("connect_error", (err) => {
        console.error("NotificationBell socket connection error:", err);
      });

      socketInstance.on("notification", (notification) => {
        // Add the new notification to the list
        setNotifications(prev => [notification, ...prev.slice(0, 9)]);
        setUnreadCount(prev => prev + 1);

        // Show toast notification
        toast.info(
          <div>
            <strong>{notification.title}</strong>
            <p>{notification.message}</p>
          </div>,
          { autoClose: 5000 }
        );
      });
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/v1/notifications?limit=5');

      if (response.data && response.data.success) {
        setNotifications(response.data.data.notifications);
        setUnreadCount(response.data.data.unreadCount);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications when the component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!isOpen) {
      fetchNotifications();
    }
    setIsOpen(!isOpen);
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(`/api/v1/notifications/${notificationId}/read`);

      // Update local state
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await axios.patch('/api/v1/notifications/read-all');

      // Update local state
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-cyan-600 rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-30"
          >
            <div className="p-3 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-white font-medium">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded flex items-center gap-1"
                >
                  <Check size={12} />
                  <span>Mark all as read</span>
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-cyan-500"></div>
                </div>
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-3 border-b border-gray-800 hover:bg-gray-800/50 ${!notification.isRead ? 'bg-gray-800/30' : ''
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-white' : 'text-gray-300'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{notification.message}</p>

                    <div className="mt-2 flex justify-between">
                      {notification.link ? (
                        <Link
                          to={notification.link}
                          className="text-xs text-cyan-400 hover:text-cyan-300"
                          onClick={() => {
                            if (!notification.isRead) markAsRead(notification._id);
                            setIsOpen(false);
                          }}
                        >
                          View Details
                        </Link>
                      ) : (
                        <div></div>
                      )}

                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="text-xs text-gray-400 hover:text-cyan-400"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-400 text-sm">No notifications yet</p>
                </div>
              )}
            </div>

            <div className="p-2 border-t border-gray-700">
              <Link
                to="/dashboard/notifications"
                className="block text-center text-sm text-cyan-400 hover:text-cyan-300 py-1"
                onClick={() => setIsOpen(false)}
              >
                View All Notifications
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;

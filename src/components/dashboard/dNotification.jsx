import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronLeft, Circle, X } from 'lucide-react';

const NotificationDashboard = () => {
  const defaultNotifications = [
    {
      id: 1,
      title: "Project Update",
      message: "New changes have been pushed to your project repository",
      time: "10:30 AM",
      type: "update",
      read: false
    },
    {
      id: 2,
      title: "Task Completed",
      message: "The task 'Update Documentation' has been marked as complete",
      time: "3:00 PM",
      type: "success",
      read: true
    },
    {
      id: 3,
      title: "Meeting Reminder",
      message: "Team standup meeting in 15 minutes",
      time: "8:00 PM",
      type: "reminder",
      read: false
    },
    {
      id: 3,
      title: "Meeting Reminder",
      message: "Team standup meeting in 15 minutes",
      time: "8:00 PM",
      type: "reminder",
      read: false
    },
    {
      id: 3,
      title: "Meeting Reminder",
      message: "Team standup meeting in 15 minutes",
      time: "8:00 PM",
      type: "reminder",
      read: false
    },
    {
      id: 3,
      title: "Meeting Reminder",
      message: "Team standup meeting in 15 minutes",
      time: "8:00 PM",
      type: "reminder",
      read: false
    },
    {
      id: 3,
      title: "Meeting Reminder",
      message: "Team standup meeting in 15 minutes",
      time: "8:00 PM",
      type: "reminder",
      read: false
    },
    {
      id: 3,
      title: "Meeting Reminder",
      message: "Team standup meeting in 15 minutes",
      time: "8:00 PM",
      type: "reminder",
      read: false
    },
  ];

  const [notifications, setNotifications] = useState(defaultNotifications);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const getTypeStyles = (type) => {
    const styles = {
      update: "bg-cyan-100 text-cyan-600 border-cyan-200",
      success: "bg-emerald-100 text-emerald-600 border-emerald-200",
      reminder: "bg-amber-100 text-amber-600 border-amber-200"
    };
    return styles[type] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowDetail(true);
  };

  return (
    <div className="min-h-[calc(100vh-13rem)] h-[50px]">
      <div className="bg-gray-900 rounded-2xl shadow-lg h-full overflow-hidden border border-gray-200">
        <div className="grid md:grid-cols-[380px_1fr] h-full ">
          {/* Notifications List */}
          <div className={`bg-gray-900 h-full overflow-hidden flex flex-col ${showDetail ? 'hidden md:flex' : ''}`}>
            <div className="p-6 border-b border-r border-gray-200 bg-gray-900">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-brandPrimary">Notifications</h2>
                <div className="relative">
                  <Bell className="w-5 h-5 text-brandPrimary" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-brandPrimary rounded-full"></span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-y-auto flex-1 p-4 space-y-3 border-r no-scrollbar"
            >
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => handleNotificationClick(notification)}
                  className="p-4 rounded-xl bg-gray-900 border-l border-b border-brandPrimary hover:border-cyan-200 hover:shadow-md cursor-pointer transition-all "
                >
                  <div className="flex items-start gap-3">
                    {!notification.read && (
                      <Circle className="w-2 h-2 mt-2 fill-brandPrimary text-brandPrimary flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-medium text-brandPrimary truncate">{notification.title}</h3>
                        <span className="text-sm text-white flex-shrink-0">{notification.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-white line-clamp-2">{notification.message}</p>
                      <div className={`inline-block px-3 py-1 mt-2 rounded-full text-xs font-medium border ${getTypeStyles(notification.type)}`}>
                        {notification.type}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                    className="hidden md:flex items-center text-gray-400 hover:text-gray-600"
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
                      <div className="pt-4 text-sm text-white flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Received at {selectedNotification.time}
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
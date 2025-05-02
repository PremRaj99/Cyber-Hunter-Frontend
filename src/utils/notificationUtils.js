/**
 * Format notification time to readable string
 * @param {string|Date} timestamp - The timestamp to format
 * @returns {string} - Formatted time string
 */
export const formatNotificationTime = (timestamp) => {
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

/**
 * Get CSS styles for notification type
 * @param {string} type - Notification type
 * @returns {string} - CSS class names
 */
export const getNotificationTypeStyles = (type) => {
  const styles = {
    update: "bg-cyan-100 text-cyan-600 border-cyan-200",
    success: "bg-emerald-100 text-emerald-600 border-emerald-200",
    reminder: "bg-amber-100 text-amber-600 border-amber-200",
    warning: "bg-orange-100 text-orange-600 border-orange-200",
    error: "bg-red-100 text-red-600 border-red-200",
    info: "bg-blue-100 text-blue-600 border-blue-200",
  };
  return styles[type] || "bg-gray-100 text-gray-600 border-gray-200";
};

/**
 * Get icon for notification type
 * @param {string} type - Notification type
 * @returns {string} - Icon name
 */
export const getNotificationIcon = (type) => {
  const icons = {
    update: "RefreshCw",
    success: "CheckCircle",
    reminder: "Clock",
    warning: "AlertTriangle",
    error: "XCircle",
    info: "Info",
  };
  return icons[type] || "Bell";
};

/**
 * Group notifications by date
 * @param {Array} notifications - Array of notification objects
 * @returns {Object} - Object with date keys and notification arrays
 */
export const groupNotificationsByDate = (notifications) => {
  const groups = {};

  notifications.forEach((notification) => {
    const date = new Date(notification.time || notification.createdAt);
    const dateKey = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).toISOString();

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(notification);
  });

  return groups;
};

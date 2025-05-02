import { io } from "socket.io-client";
import { toast } from "react-toastify";

let socket = null;

/**
 * Initialize the Socket.IO client connection
 * @param {string} accessToken - JWT access token for authentication
 * @returns {object} Socket.IO client instance
 */
export const initializeSocket = (accessToken) => {
  if (!accessToken) {
    console.error("Cannot initialize socket: No access token provided");
    return null;
  }

  try {
    // Close existing connection if any
    if (socket) {
      socket.disconnect();
    }

    const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    // Create new socket connection with auth token
    socket = io(SOCKET_URL, {
      auth: { token: accessToken },
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Socket connection event handlers
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${reason}`);
    });

    return socket;
  } catch (error) {
    console.error("Socket initialization error:", error);
    return null;
  }
};

/**
 * Register user with Socket.IO server for notifications
 * @param {string} userId - User ID to register
 */
export const registerSocketUser = (userId) => {
  if (!socket || !userId) return;

  try {
    socket.emit("register", userId);
    console.log("User registered for socket notifications:", userId);
  } catch (error) {
    console.error("Error registering socket user:", error);
  }
};

/**
 * Set up notification listener
 * @param {Function} onNotification - Callback to handle notifications
 */
export const setupNotificationListener = (onNotification) => {
  if (!socket) return;

  socket.on("notification", (notification) => {
    console.log("Received notification:", notification);

    // Show toast notification
    toast[notification.type || "info"](notification.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Call the callback for custom handling
    if (onNotification && typeof onNotification === "function") {
      onNotification(notification);
    }
  });
};

/**
 * Disconnect the socket when no longer needed
 */
export const disconnectSocket = () => {
  if (!socket) return;

  socket.disconnect();
  socket = null;
  console.log("Socket disconnected and cleared");
};

/**
 * Get the current socket instance
 * @returns {object|null} Socket instance or null if not initialized
 */
export const getSocket = () => socket;

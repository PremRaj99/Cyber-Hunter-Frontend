import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Bell, MessageSquare, Settings, Mail, Globe, Smartphone, Volume2, BellOff, Clock, ToggleLeft as Toggle3 } from 'lucide-react';
import axios from '../../../utils/Axios';
import { toast } from 'react-toastify';
import { io } from "socket.io-client";

function Notification() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundNotifications, setSoundNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationTypes, setNotificationTypes] = useState([
    {
      id: 'all',
      title: 'All Notifications',
      description: 'Receive notifications for all activity',
      icon: <Bell className="w-6 h-6" />,
      enabled: true,
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'Get notified when someone messages you',
      icon: <MessageSquare className="w-6 h-6" />,
      enabled: true,
    },
    {
      id: 'system',
      title: 'System Updates',
      description: 'Important system notifications and updates',
      icon: <Settings className="w-6 h-6" />,
      enabled: true,
    },
  ]);

  // Socket connection for real-time notifications
  useEffect(() => {
    console.log("Initializing socket connection");
    const socketUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    console.log("Socket URL:", socketUrl);

    // Get the authentication token
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No auth token available for socket connection");
      return;
    }

    // Create socket with authentication and configuration
    const socket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      timeout: 20000,
      forceNew: true,
      auth: {
        token: token
      }
    });

    // Connect and register the user with socket
    const connectSocket = () => {
      const userId = localStorage.getItem("userId");

      // Debug connection events
      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);

        // After connection established, register the user
        if (userId) {
          console.log("Registering user:", userId);
          socket.emit("register", userId);
        }
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      socket.on("registered", (response) => {
        console.log("Registration response:", response);
      });

      // Listen for notifications
      socket.on("notification", (notification) => {
        if (notification) {
          // Display notification based on user preferences
          if (soundNotifications) {
            // Play notification sound
            const audio = new Audio('/notification-sound.mp3');
            audio.play().catch(err => console.error("Failed to play notification sound:", err));
          }

          // Show toast notification
          toast.info(
            <div>
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
            </div>,
            {
              autoClose: 5000,
            }
          );
        }
      });
    };

    connectSocket();

    // Clean up on unmount
    return () => {
      console.log("Disconnecting socket");
      socket.disconnect();
    };
  }, [soundNotifications]);

  // Fetch notification settings from backend
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/v1/user/notification-settings');
        const settings = response.data.data;

        // Update state with user's notification settings
        setEmailNotifications(settings.email || true);
        setPushNotifications(settings.push || true);
        setSoundNotifications(settings.sound || true);

        // Update notification types
        const updatedTypes = notificationTypes.map(type => ({
          ...type,
          enabled: settings.types?.[type.id] !== false // Default to true if not specified
        }));

        setNotificationTypes(updatedTypes);
      } catch (error) {
        console.error("Failed to load notification settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotificationSettings();
  }, []);

  // Save changes to notification settings
  const updateNotificationSetting = async (key, value) => {
    try {
      await axios.patch('/api/v1/user/notification-settings', {
        [key]: value
      });
      toast.success("Notification settings updated");
    } catch (error) {
      console.error(`Failed to update ${key} setting:`, error);
      toast.error("Failed to save your notification settings");

      // Revert the UI state change on error
      if (key === 'email') setEmailNotifications(!value);
      if (key === 'push') setPushNotifications(!value);
      if (key === 'sound') setSoundNotifications(!value);
      if (key.startsWith('types.')) {
        const typeId = key.split('.')[1];
        setNotificationTypes(prev =>
          prev.map(type =>
            type.id === typeId ? { ...type, enabled: !value } : type
          )
        );
      }
    }
  };

  // Toggle handlers with backend updates
  const handleEmailToggle = () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    updateNotificationSetting('email', newValue);
  };

  const handlePushToggle = () => {
    const newValue = !pushNotifications;
    setPushNotifications(newValue);
    updateNotificationSetting('push', newValue);
  };

  const handleSoundToggle = () => {
    const newValue = !soundNotifications;
    setSoundNotifications(newValue);
    updateNotificationSetting('sound', newValue);
  };

  const handleTypeToggle = (typeId) => {
    setNotificationTypes(prev =>
      prev.map(type =>
        type.id === typeId ? { ...type, enabled: !type.enabled } : type
      )
    );
    // Find the current type to get its new state
    const type = notificationTypes.find(t => t.id === typeId);
    if (type) {
      updateNotificationSetting(`types.${typeId}`, !type.enabled);
    }
  };

  // Quick actions handlers
  const handleMuteAll = async () => {
    try {
      await axios.post('/api/v1/user/notification-settings/mute-all');
      // Update local state
      setEmailNotifications(false);
      setPushNotifications(false);
      setSoundNotifications(false);
      setNotificationTypes(prev =>
        prev.map(type => ({ ...type, enabled: false }))
      );
      toast.success("All notifications have been muted");
    } catch (error) {
      console.error("Failed to mute all notifications:", error);
      toast.error("Failed to update notification settings");
    }
  };

  const handleDoNotDisturb = async () => {
    try {
      await axios.post('/api/v1/user/notification-settings/do-not-disturb');
      toast.success("Do Not Disturb mode enabled for 8 hours");
    } catch (error) {
      console.error("Failed to enable Do Not Disturb mode:", error);
      toast.error("Failed to update notification settings");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="text-white max-h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="absolute top-20 -left-20 sm:top-40 sm:-left-40 w-60 sm:w-80 h-60 sm:h-80 bg-brandPrimary rounded-full filter blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-72 sm:w-96 h-72 sm:h-96 bg-brandPrimary rounded-full filter blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">Notification Settings</h1>
          <p className="text-sm sm:text-base text-gray-400">Manage how you receive notifications</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:gap-6 lg:gap-8"
        >
          {/* Notification Preferences */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
          >
            {/* Preferences Card */}
            <div className="bg-gray-950/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-cyan-400">Notification Preferences</h2>
              <div className="space-y-4 sm:space-y-6">
                {/* Toggle Items */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brandPrimary/10 rounded-lg shrink-0">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">Email Notifications</p>
                      <p className="text-xs sm:text-sm text-gray-400">Receive notifications via email</p>
                    </div>
                  </div>
                  <button
                    onClick={handleEmailToggle}
                    className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full transition-colors duration-200 ease-in-out relative ${emailNotifications ? 'bg-brandPrimary' : 'bg-gray-600'}`}
                  >
                    <div
                      className={`w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full absolute top-[2px] sm:top-1 transition-transform duration-200 ease-in-out ${emailNotifications ? 'translate-x-[22px] sm:translate-x-7' : 'translate-x-[2px] sm:translate-x-1'}`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brandPrimary/10 rounded-lg shrink-0">
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">Push Notifications</p>
                      <p className="text-xs sm:text-sm text-gray-400">Receive push notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={handlePushToggle}
                    className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full transition-colors duration-200 ease-in-out relative ${pushNotifications ? 'bg-brandPrimary' : 'bg-gray-600'}`}
                  >
                    <div
                      className={`w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full absolute top-[2px] sm:top-1 transition-transform duration-200 ease-in-out ${pushNotifications ? 'translate-x-[22px] sm:translate-x-7' : 'translate-x-[2px] sm:translate-x-1'}`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brandPrimary/10 rounded-lg shrink-0">
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">Sound Notifications</p>
                      <p className="text-xs sm:text-sm text-gray-400">Play sound for notifications</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSoundToggle}
                    className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full transition-colors duration-200 ease-in-out relative ${soundNotifications ? 'bg-brandPrimary' : 'bg-gray-600'}`}
                  >
                    <div
                      className={`w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full absolute top-[2px] sm:top-1 transition-transform duration-200 ease-in-out ${soundNotifications ? 'translate-x-[22px] sm:translate-x-7' : 'translate-x-[2px] sm:translate-x-1'}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gray-950/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-cyan-400">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <button
                  onClick={handleMuteAll}
                  className="p-3 sm:p-4 bg-gray-700/50 rounded-lg hover:bg-opacity-75 transition-colors duration-200 group"
                >
                  <BellOff className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mx-auto mb-1 sm:mb-2 group-hover:text-cyan-300" />
                  <p className="text-xs sm:text-sm font-medium group-hover:text-cyan-300">Mute All</p>
                </button>

                <button
                  onClick={handleDoNotDisturb}
                  className="p-3 sm:p-4 bg-gray-700/50 rounded-lg hover:bg-opacity-75 transition-colors duration-200 group"
                >
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mx-auto mb-1 sm:mb-2 group-hover:text-cyan-300" />
                  <p className="text-xs sm:text-sm font-medium group-hover:text-cyan-300">Do Not Disturb</p>
                </button>

                <button
                  className="p-3 sm:p-4 bg-gray-700/50 rounded-lg hover:bg-opacity-75 transition-colors duration-200 group"
                >
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mx-auto mb-1 sm:mb-2 group-hover:text-cyan-300" />
                  <p className="text-xs sm:text-sm font-medium group-hover:text-cyan-300">Web Notifications</p>
                </button>

                <button
                  className="p-3 sm:p-4 bg-gray-700/50 rounded-lg hover:bg-opacity-75 transition-colors duration-200 group"
                >
                  <Toggle3 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mx-auto mb-1 sm:mb-2 group-hover:text-cyan-300" />
                  <p className="text-xs sm:text-sm font-medium group-hover:text-cyan-300">Custom Settings</p>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Notification Types Card */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-950/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-cyan-400">Notification Types</h2>
            <div className="space-y-3 sm:space-y-4">
              {notificationTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex items-center justify-between p-3 sm:p-4 bg-opacity-50 rounded-lg"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 bg-brandPrimary/10 rounded-lg shrink-0">
                      {React.cloneElement(type.icon, { className: "w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" })}
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">{type.title}</p>
                      <p className="text-xs sm:text-sm text-gray-400">{type.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleTypeToggle(type.id)}
                    className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full transition-colors duration-200 ease-in-out relative ${type.enabled ? 'bg-brandPrimary' : 'bg-gray-600'}`}
                  >
                    <div
                      className={`w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full absolute top-[2px] sm:top-1 transition-transform duration-200 ease-in-out ${type.enabled ? 'translate-x-[22px] sm:translate-x-7' : 'translate-x-[2px] sm:translate-x-1'}`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Notification;
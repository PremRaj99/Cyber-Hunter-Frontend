import { motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import { Bell, MessageSquare, Settings, Mail, Globe, Smartphone, Volume2, BellOff, Clock, ToggleLeft as Toggle3 } from 'lucide-react';

function Notification() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundNotifications, setSoundNotifications] = useState(true);

  const notificationTypes = [
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
  ];

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

  return (
    <div className="text-white max-h-[calc(100vh-10rem)]">
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
                {[
                  {
                    icon: <Mail />,
                    title: "Email Notifications",
                    desc: "Receive notifications via email",
                    state: emailNotifications,
                    setState: setEmailNotifications
                  },
                  {
                    icon: <Smartphone />,
                    title: "Push Notifications",
                    desc: "Receive push notifications",
                    state: pushNotifications,
                    setState: setPushNotifications
                  },
                  {
                    icon: <Volume2 />,
                    title: "Sound Notifications",
                    desc: "Play sound for notifications",
                    state: soundNotifications,
                    setState: setSoundNotifications
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brandPrimary/10 rounded-lg shrink-0">
                        {React.cloneElement(item.icon, { className: "w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" })}
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base">{item.title}</p>
                        <p className="text-xs sm:text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => item.setState(!item.state)}
                      className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full transition-colors duration-200 ease-in-out relative ${item.state ? 'bg-brandPrimary' : 'bg-gray-600'
                        }`}
                    >
                      <div
                        className={`w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full absolute top-[2px] sm:top-1 transition-transform duration-200 ease-in-out ${item.state ? 'translate-x-[22px] sm:translate-x-7' : 'translate-x-[2px] sm:translate-x-1'
                          }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gray-950/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-cyan-400">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {[
                  { icon: <BellOff />, text: "Mute All" },
                  { icon: <Clock />, text: "Do Not Disturb" },
                  { icon: <Globe />, text: "Web Notifications" },
                  { icon: <Toggle3 />, text: "Custom Settings" }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="p-3 sm:p-4 bg-gray-700/50 rounded-lg hover:bg-opacity-75 transition-colors duration-200 group"
                  >
                    {React.cloneElement(action.icon, {
                      className: "w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mx-auto mb-1 sm:mb-2 group-hover:text-cyan-300"
                    })}
                    <p className="text-xs sm:text-sm font-medium group-hover:text-cyan-300">{action.text}</p>
                  </button>
                ))}
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
                    className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full transition-colors duration-200 ease-in-out relative ${type.enabled ? 'bg-brandPrimary' : 'bg-gray-600'
                      }`}
                  >
                    <div
                      className={`w-3.5 sm:w-4 h-3.5 sm:h-4 bg-white rounded-full absolute top-[2px] sm:top-1 transition-transform duration-200 ease-in-out ${type.enabled ? 'translate-x-[22px] sm:translate-x-7' : 'translate-x-[2px] sm:translate-x-1'
                        }`}
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
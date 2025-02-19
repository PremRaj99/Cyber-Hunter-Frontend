import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Smartphone, Lock, Clock, AlertTriangle } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const AccountAccessPage = () => {
  const [activeDevice, setActiveDevice] = useState(null);
  const navigate = useNavigate();

  const recentDevices = [
    {
      id: 1,
      name: "MacBook Pro",
      location: "San Francisco, US",
      lastAccess: "Active now",
      browser: "Chrome",
      ip: "192.168.1.1",
      trusted: true
    },
    {
      id: 2,
      name: "iPhone 13",
      location: "New York, US",
      lastAccess: "2 hours ago",
      browser: "Safari",
      ip: "192.168.1.2",
      trusted: true
    },
    {
      id: 3,
      name: "Windows PC",
      location: "London, UK",
      lastAccess: "Yesterday",
      browser: "Firefox",
      ip: "192.168.1.3",
      trusted: false
    }
  ];

  const loginHistory = [
    {
      date: "Today, 2:30 PM",
      device: "MacBook Pro",
      location: "San Francisco, US",
      status: "success"
    },
    {
      date: "Today, 10:15 AM",
      device: "iPhone 13",
      location: "New York, US",
      status: "success"
    },
    {
      date: "Yesterday, 8:45 PM",
      device: "Unknown Device",
      location: "Beijing, CN",
      status: "failed"
    }
  ];

  return (
    <div className=" text-white p-4 md:p-6 mx-auto max-w-5xl">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </motion.button>
        <div>
        <h1 className="text-2xl md:text-3xl text-center font-bold text-cyan-400 mb-2">Account Access</h1>
          <p className="text-gray-400 text-center">Manage your devices and login security</p>
        </div>
      </motion.div>

      {/* Security Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className=" rounded-xl p-6 mb-8 border border-gray-700"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-cyan-500/10 p-3 rounded-full">
            <Shield className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Security Status</h2>
            <p className="text-gray-400 text-sm">Your account security is good</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <Key className="w-5 h-5 text-cyan-400 mb-2" />
            <h3 className="font-medium mb-1">2FA Enabled</h3>
            <p className="text-sm text-gray-400">Using Authenticator</p>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <Smartphone className="w-5 h-5 text-cyan-400 mb-2" />
            <h3 className="font-medium mb-1">3 Active Devices</h3>
            <p className="text-sm text-gray-400">All trusted</p>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <Lock className="w-5 h-5 text-cyan-400 mb-2" />
            <h3 className="font-medium mb-1">Last Password Change</h3>
            <p className="text-sm text-gray-400">30 days ago</p>
          </div>
        </div>
      </motion.div>

      {/* Active Devices Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Active Devices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentDevices.map((device) => (
            <motion.div
              key={device.id}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900 rounded-lg p-4 border border-gray-700 cursor-pointer"
              onClick={() => setActiveDevice(device)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium">{device.name}</h3>
                {device.trusted && (
                  <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-full">
                    Trusted
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-400 space-y-1">
                <p>{device.location}</p>
                <p>{device.browser}</p>
                <p className="text-xs">{device.lastAccess}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Login History Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Recent Login Activity</h2>
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
          {loginHistory.map((login, index) => (
            <div
              key={index}
              className="p-4 border-b border-gray-700 last:border-0 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${login.status === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  {login.status === 'success' ? (
                    <Clock className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{login.device}</p>
                  <p className="text-sm text-gray-400">{login.location}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{login.date}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Action Button for Mobile */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 md:hidden bg-cyan-500 text-black p-4 rounded-full shadow-lg"
      >
        <Shield className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default AccountAccessPage;
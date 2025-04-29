/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Smartphone, Lock, Clock, AlertTriangle, LogOut, Check, X, Loader } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/Axios';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';

const AccountAccessPage = () => {
  const [activeDevice, setActiveDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);
  const [securityStatus, setSecurityStatus] = useState({
    twoFactorEnabled: false,
    deviceCount: 0,
    lastPasswordChange: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isRevoking, setIsRevoking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    setIsLoading(true);
    try {
      // Add authorization headers to all requests
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      };

      // Fetch devices, login history and security status in parallel
      const [devicesRes, loginsRes, statusRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/security/devices`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/security/logins`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/security/status`, { headers })
      ]);

      setDevices(devicesRes.data.data);
      setLoginHistory(loginsRes.data.data);
      setSecurityStatus(statusRes.data.data);

      // Set current device as active by default
      const currentDevice = devicesRes.data.data.find(device => device.isCurrentDevice);
      if (currentDevice) {
        setActiveDevice(currentDevice);
      }
    } catch (error) {
      toast.error('Failed to load security data');
      console.error('Error fetching security data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrustDevice = async (deviceId, trusted) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/security/device/trust`,
        { deviceId, trusted },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        }
      );

      // Update local state
      setDevices(devices.map(device =>
        device._id === deviceId ? { ...device, trusted } : device
      ));

      toast.success(trusted ? 'Device marked as trusted' : 'Device no longer trusted');
    } catch (error) {
      toast.error('Failed to update device trust status');
    }
  };

  const handleRevokeDevice = async (deviceId) => {
    setIsRevoking(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/security/device/${deviceId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });

      // Remove from local state
      setDevices(devices.filter(device => device._id !== deviceId));
      setIsModalOpen(false);
      toast.success('Device access revoked successfully');

      // If current device was revoked, redirect to login
      if (selectedDevice?.isCurrentDevice) {
        navigate('/auth/login');
      }
    } catch (error) {
      toast.error('Failed to revoke device access');
    } finally {
      setIsRevoking(false);
    }
  };

  const handleLogoutEverywhere = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/security/logout-all`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
      toast.success('Logged out of all devices');
      navigate('/auth/login');
    } catch (error) {
      toast.error('Failed to logout from all devices');
    }
  };

  const openDeviceModal = (device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isToday(date)) {
        return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
      if (isYesterday(date)) {
        return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) +
        ` at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } catch (e) {
      return dateString;
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();
  };

  const getTimeAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      if (Date.now() - date.getTime() < 60000) { // less than 1 minute
        return 'Active now';
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="text-white p-4 md:p-6 mx-auto max-w-5xl">
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

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader className="w-12 h-12 text-brandPrimary" />
          </motion.div>
        </div>
      ) : (
        <>
          {/* Security Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-6 mb-8 border border-gray-700"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-brandPrimary/10 p-3 rounded-full">
                <Shield className="w-6 h-6 text-brandPrimary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Security Status</h2>
                <p className="text-gray-400 text-sm">
                  {securityStatus.twoFactorEnabled
                    ? 'Your account security is good'
                    : 'Consider enabling 2FA for better security'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <Key className={`w-5 h-5 ${securityStatus.twoFactorEnabled ? 'text-cyan-400' : 'text-yellow-500'} mb-2`} />
                <h3 className="font-medium mb-1">
                  {securityStatus.twoFactorEnabled ? '2FA Enabled' : '2FA Disabled'}
                </h3>
                <p className="text-sm text-gray-400">
                  {securityStatus.twoFactorEnabled ? 'Using Authenticator' : 'Not configured'}
                </p>
                {!securityStatus.twoFactorEnabled && (
                  <button
                    onClick={() => navigate('/dashboard/account')}
                    className="mt-2 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    Enable now
                  </button>
                )}
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <Smartphone className="w-5 h-5 text-cyan-400 mb-2" />
                <h3 className="font-medium mb-1">
                  {devices.length} Active {devices.length === 1 ? 'Device' : 'Devices'}
                </h3>
                <p className="text-sm text-gray-400">
                  {devices.filter(d => d.trusted).length} trusted
                </p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <Lock className="w-5 h-5 text-cyan-400 mb-2" />
                <h3 className="font-medium mb-1">Last Password Change</h3>
                <p className="text-sm text-gray-400">
                    {securityStatus.lastPasswordChange ?
                      getTimeAgo(securityStatus.lastPasswordChange)
                    : 'Never changed'}
                <p className="text-xs text-gray-500 mt-1">Change your password regularly for better security</p>
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleLogoutEverywhere}
                className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout from all devices
              </button>
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
            {devices.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No active devices found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {devices.map((device) => (
                  <motion.div
                    key={device._id}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gray-900 rounded-lg p-4 border ${device.isCurrentDevice ? 'border-brandPrimary' : 'border-gray-700'} cursor-pointer relative`}
                    onClick={() => openDeviceModal(device)}
                  >
                    {device.isCurrentDevice && (
                      <span className="absolute -top-2 -right-2 bg-brandPrimary text-black text-xs px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">{device.deviceName}</h3>
                      {device.trusted && (
                        <span className="text-xs bg-brandPrimary/10 text-cyan-400 px-2 py-1 rounded-full">
                          Trusted
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 space-y-1">
                      <p>{device.location}</p>
                      <p>{device.browser} on {device.os}</p>
                      <p className="text-xs">{getTimeAgo(device.lastActive)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Login History Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4">Recent Login Activity</h2>
            {loginHistory.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No login history found</p>
            ) : (
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
                        <p className="font-medium">{login.deviceInfo}</p>
                        <p className="text-sm text-gray-400">{login.location || 'Unknown location'}</p>
                        {login.status === 'failed' && login.reason && (
                          <p className="text-xs text-red-400">{login.reason}</p>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{formatDate(login.timestamp)}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}

      {/* Device Detail Modal */}
      {isModalOpen && selectedDevice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-xl border border-gray-700 p-6 w-full max-w-md relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-4">{selectedDevice.deviceName}</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-400">Browser</p>
                  <p>{selectedDevice.browser}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Operating System</p>
                  <p>{selectedDevice.os}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p>{selectedDevice.location}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">IP Address</p>
                <p>{selectedDevice.ip}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Last Active</p>
                <p>{getTimeAgo(selectedDevice.lastActive)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">First Seen</p>
                <p>{formatDate(selectedDevice.createdAt)}</p>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                {!selectedDevice.isCurrentDevice && (
                  <button
                    onClick={() => handleRevokeDevice(selectedDevice._id)}
                    disabled={isRevoking}
                    className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    {isRevoking ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader className="w-4 h-4" />
                        </motion.div>
                        <span>Revoking...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="w-4 h-4" />
                        <span>Revoke Access</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={() => handleTrustDevice(selectedDevice._id, !selectedDevice.trusted)}
                  className={`w-full ${selectedDevice.trusted ?
                    'bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400' :
                    'bg-green-600/20 hover:bg-green-600/30 text-green-400'
                    } py-2 rounded-lg flex items-center justify-center gap-2`}
                >
                  {selectedDevice.trusted ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>Remove Trust</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Trust This Device</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating Action Button for Mobile */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/dashboard/account-settings')}
        className="fixed bottom-6 right-6 md:hidden bg-brandPrimary text-black p-4 rounded-full shadow-lg"
      >
        <Shield className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default AccountAccessPage;
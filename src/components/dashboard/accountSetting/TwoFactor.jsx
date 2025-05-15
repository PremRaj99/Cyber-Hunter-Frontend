/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Smartphone, Mail, Lock, CheckCircle, XCircle, User, ChevronRight, X } from 'lucide-react';
import axios from '../../../utils/Axios';
import { toast } from 'react-toastify';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02 },
};

const TwoFactor = ({ isOpen, onClose }) => {
  const [activeView, setActiveView] = useState('menu');
  const [isEnabled, setIsEnabled] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch 2FA status on mount
  useEffect(() => {
    if (isOpen) {
      fetchTwoFactorStatus();
    }
  }, [isOpen]);

  // Fetch 2FA status
  const fetchTwoFactorStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/2fa/status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.data.success === false) {
        throw new Error('Failed to fetch 2FA status');
      }

      setIsEnabled(response.data.data.twoFactorEnabled);
      setActiveStep(1);
    } catch (error) {
      toast.error('Failed to fetch 2FA status');
    } finally {
      setLoading(false);
    }
  };

  // Generate 2FA secret and QR code
  const generateSecret = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/2fa/generate`,
        {}, // Empty object as the request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      setQrCodeUrl(response.data.data.qrCodeUrl);
      setSecret(response.data.data.secret);
      setActiveStep(2);
    } catch (error) {
      setError('Failed to generate 2FA secret');
      toast.error('Failed to generate 2FA secret');
    } finally {
      setLoading(false);
    }
  };

  // Enable 2FA - Fix token formatting
  const enableTwoFactor = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6 || !/^\d+$/.test(code)) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/2fa/verify`,
        { token: code.toString() }, // Ensure it's a string
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json', // Explicitly set content type
          },
        }
      );

      if (response.data && response.data.success) {
        setIsEnabled(true);
        setShowSuccessAnimation(true);
        toast.success('Two-Factor Authentication enabled successfully');

        // Close the modal after showing success animation
        setTimeout(() => {
          setShowSuccessAnimation(false);
          setTimeout(() => onClose(), 500);
        }, 2000);
      } else {
        throw new Error(response.data?.message || 'Failed to verify code');
      }
    } catch (error) {
      console.error('2FA verification error:', error);
      setError(error.response?.data?.message || 'Failed to verify code. Please try again.');
      toast.error(error.response?.data?.message || 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  // Disable 2FA - Fix token formatting
  const disableTwoFactor = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6 || !/^\d+$/.test(code)) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/2fa/disable`,
        { token: code.toString() }, // Ensure it's a string
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json', // Explicitly set content type
          },
        }
      );

      if (response.data && response.data.success) {
        setIsEnabled(false);
        setShowSuccessAnimation(true);
        toast.success('Two-Factor Authentication disabled successfully');

        // Close the modal after showing success animation
        setTimeout(() => {
          setShowSuccessAnimation(false);
          setTimeout(() => onClose(), 500);
        }, 2000);
      } else {
        throw new Error(response.data?.message || 'Failed to verify code');
      }
    } catch (error) {
      console.error('2FA disable error:', error);
      setError(error.response?.data?.message || 'Failed to verify code. Please try again.');
      toast.error(error.response?.data?.message || 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  // Handle closing and reset state
  const handleClose = () => {
    onClose();
    setActiveStep(1);
    setVerificationCode(['', '', '', '', '', '']);
    setError('');
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Modify handleCodeChange to only accept digits
  const handleCodeChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Add copy to clipboard functionality
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);

      // Reset copy success message after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          className="inset-0 flex items-center justify-center p-2 z-[9999]"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-900 rounded-xl w-full max-w-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-800 p-6 relative">
              <h2 className="text-xl font-semibold text-cyan-400">Two-Factor Authentication</h2>
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 relative">
              {/* Success Animation */}
              <AnimatePresence>
                {showSuccessAnimation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900 bg-opacity-95 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10
                      }}
                      className="w-20 h-20 mb-4 bg-green-500/10 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold text-cyan-400 mb-2"
                    >
                      {isEnabled ? '2FA Enabled!' : '2FA Disabled'}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-400 text-center max-w-md"
                    >
                      {isEnabled
                        ? 'Your account is now protected with an additional layer of security.'
                        : 'Two-factor authentication has been successfully disabled.'}
                    </motion.p>

                    {/* Pulsing rings animation */}
                    <motion.div
                      className="absolute"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-32 h-32 rounded-full bg-brandPrimary opacity-10"></div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Status Card */}
                <motion.div variants={itemVariants} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {isEnabled ? (
                        <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                      )}
                      <span className="text-lg font-medium">
                        {isEnabled ? '2FA is enabled' : '2FA is disabled'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (isEnabled) {
                          setActiveStep(4); // Go to disable flow
                          setVerificationCode(['', '', '', '', '', '']);
                        } else {
                          generateSecret(); // Start enable flow
                        }
                      }}
                      disabled={loading}
                      className="w-full sm:w-auto px-4 py-2 bg-brandPrimary text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Please wait...' : isEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </button>
                  </div>
                </motion.div>

                {error && (
                  <motion.div variants={itemVariants} className="bg-red-500/20 text-red-300 p-4 rounded-lg">
                    {error}
                  </motion.div>
                )}

                {/* Setup Steps */}
                {activeStep === 1 && !isEnabled && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-medium mb-4 text-cyan-400">About Two-Factor Authentication</h3>
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <p className="text-gray-400 mb-4">
                        Two-factor authentication adds an extra layer of security to your account by requiring a second form of verification in addition to your password.
                      </p>
                      <p className="text-gray-400 mb-4">
                        Once enabled, you&apos;ll need to enter a verification code from your authentication app each time you sign in.
                      </p>
                      <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-900/40 mb-4">
                        <h4 className="text-cyan-300 font-medium mb-2">How it works:</h4>
                        <ol className="list-decimal list-inside text-gray-300 space-y-2">
                          <li>You&apos;ll set up an authentication app on your mobile device</li>
                          <li>When logging in, after entering your password, you&apos;ll be prompted for a code</li>
                          <li>Enter the 6-digit code from your authentication app to complete login</li>
                        </ol>
                      </div>
                      <div className="flex justify-center mt-6">
                        <button
                          onClick={generateSecret}
                          disabled={loading}
                          className="px-6 py-2 bg-brandPrimary text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50"
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* QR Code Step */}
                {activeStep === 2 && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-cyan-400">Scan QR Code</h3>
                    <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-700 flex flex-col items-center">
                      <p className="text-gray-400 mb-3 sm:mb-4 text-center text-sm sm:text-base">
                        Scan this QR code with your authentication app (Google Authenticator, Microsoft Authenticator, Authy, etc.)
                      </p>

                      {qrCodeUrl && (
                        <div className="my-3 sm:my-4 p-3 sm:p-4 bg-white rounded-lg">
                          <img src={qrCodeUrl} alt="QR Code" className="mx-auto w-36 h-36 sm:w-48 sm:h-48" />
                        </div>
                      )}

                      <div className="mt-2 mb-4 w-full max-w-sm">
                        <p className="text-xs sm:text-sm text-gray-500 mb-1 text-center">Or enter this code manually:</p>
                        <div className="relative">
                          <div className="flex items-center">
                            <p className="font-mono text-xs lg:text-xl sm:text-sm text-cyan-400 text-center select-all p-2 pl-3 pr-10 bg-gray-900 rounded-md w-full break-all overflow-x-auto whitespace-pre-wrap">
                              {secret}
                            </p>
                            <button
                              onClick={() => copyToClipboard(secret)}
                              className="absolute right-2 p-1.5 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
                              aria-label="Copy to clipboard"
                            >
                              {copySuccess ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                              )}
                            </button>
                          </div>
                          {copySuccess && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-xs text-green-500 mt-1 text-center"
                            >
                              Copied to clipboard!
                            </motion.p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveStep(3)}
                        className="px-4 sm:px-6 py-2 bg-brandPrimary text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors mt-3 sm:mt-4 text-sm sm:text-base"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Verification Step - Enable */}
                {activeStep === 3 && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-medium mb-4 text-cyan-400">Verify Code</h3>
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <p className="text-gray-400 mb-4 text-center">Enter the 6-digit code from your authentication app</p>
                      <div className="flex justify-center gap-2 flex-wrap">
                        {verificationCode.map((digit, index) => (
                          <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center bg-gray-800 border border-gray-700 rounded-lg text-xl font-bold text-cyan-400 focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary"
                          />
                        ))}
                      </div>
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={enableTwoFactor}
                          disabled={loading}
                          className="px-6 py-2 bg-brandPrimary text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Verifying...' : 'Verify & Enable'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Verification Step - Disable */}
                {activeStep === 4 && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-medium mb-4 text-cyan-400">Disable Two-Factor Authentication</h3>
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <p className="text-gray-400 mb-4 text-center">
                        For security, please enter the 6-digit code from your authentication app to disable 2FA
                      </p>
                      <div className="flex justify-center gap-2 flex-wrap">
                        {verificationCode.map((digit, index) => (
                          <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center bg-gray-800 border border-gray-700 rounded-lg text-xl font-bold text-cyan-400 focus:border-brandPrimary focus:ring-1 focus:ring-brandPrimary"
                          />
                        ))}
                      </div>
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={disableTwoFactor}
                          disabled={loading}
                          className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Verifying...' : 'Disable 2FA'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TwoFactor;
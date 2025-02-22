import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Smartphone, Mail, Lock, CheckCircle, XCircle, User, ChevronRight, X } from 'lucide-react';

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

  // Handle closing and reset state
  const handleClose = () => {
    onClose();
    setActiveStep(1);
    setVerificationCode(['', '', '', '', '', '']);
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
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

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 z-[9999]"
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
            <div className="p-6">
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
                      onClick={() => setIsEnabled(!isEnabled)}
                      className="w-full sm:w-auto px-4 py-2 bg-brandPrimary text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors"
                    >
                      {isEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </button>
                  </div>
                </motion.div>

                {/* Setup Steps */}
                {activeStep === 1 && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-medium mb-4 text-cyan-400">Choose Authentication Method</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        {
                          icon: <Smartphone className="w-6 h-6 text-brandPrimary" />,
                          title: "Authenticator App",
                          desc: "Use an authentication app"
                        },
                        {
                          icon: <Mail className="w-6 h-6 text-brandPrimary" />,
                          title: "Email Authentication",
                          desc: "Receive codes via email"
                        }
                      ].map((method, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveStep(2)}
                          className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-brandPrimary/30 transition-all group"
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="mb-2 group-hover:text-cyan-400">{method.icon}</div>
                            <h4 className="font-medium mb-1 group-hover:text-cyan-400">{method.title}</h4>
                            <p className="text-sm text-gray-400">{method.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Verification Step */}
                {activeStep === 2 && (
                  <motion.div variants={itemVariants}>
                    <h3 className="text-lg font-medium mb-4 text-cyan-400">Verify Code</h3>
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                      <p className="text-gray-400 mb-4 text-center">Enter the 6-digit code</p>
                      <div className="flex justify-center gap-2">
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
                          onClick={() => setActiveStep(3)}
                          className="px-6 py-2 bg-brandPrimary text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Success Step */}
                {activeStep === 3 && (
                  <motion.div variants={itemVariants} className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2 text-cyan-400">2FA Successfully Enabled</h3>
                    <p className="text-gray-400 mb-6">Your account is now more secure.</p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-2 bg-brandPrimary text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors"
                    >
                      Done
                    </button>
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
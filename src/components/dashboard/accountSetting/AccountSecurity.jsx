/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TwoFactor from './TwoFactor';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.005 }
};

const calculateSecurityScore = (user) => {
  let score = 0;
  let messages = [];

  // Basic password check (you can enhance this based on your password requirements)
  if (user?.hasStrongPassword) {
    score += 30;
  } else {
    messages.push("Consider using a stronger password");
  }

  // 2FA check
  if (user?.has2FAEnabled) {
    score += 40;
  } else {
    messages.push("Enable two-factor authentication");
  }

  // Recent login activity check
  if (user?.hasRecentActivity) {
    score += 15;
  }

  // Account verification check
  if (user?.isVerified) {
    score += 15;
  } else {
    messages.push("Verify your account");
  }

  // Determine security level
  let securityLevel;
  if (score >= 90) {
    securityLevel = {
      text: "Excellent",
      color: "green",
      borderColor: "border-green-500/20",
      textColor: "text-green-400",
      bgColor: "bg-green-500"
    };
  } else if (score >= 70) {
    securityLevel = {
      text: "Good",
      color: "blue",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-400",
      bgColor: "bg-blue-500"
    };
  } else if (score >= 40) {
    securityLevel = {
      text: "Fair",
      color: "yellow",
      borderColor: "border-yellow-500/20",
      textColor: "text-yellow-400",
      bgColor: "bg-yellow-500"
    };
  } else {
    securityLevel = {
      text: "Poor",
      color: "red",
      borderColor: "border-red-500/20",
      textColor: "text-red-400",
      bgColor: "bg-red-500"
    };
  }

  return {
    score,
    messages,
    securityLevel
  };
};


const AccountSecurity = ({ accountSecurity }) => {
  const { is2FAModalOpen, setIs2FAModalOpen, isPasswordModalOpen, setIsPasswordModalOpen } = accountSecurity;
  const mockUser = {
    hasStrongPassword: true,
    has2FAEnabled: true,
    hasRecentActivity: true,
    isVerified: true
  };

  const { score, messages, securityLevel } = calculateSecurityScore(mockUser);

  const securityItems = [
    {
      icon: <Lock size={20} />,
      text: 'Password',
      action: () => { }, // Add your account access logic here
      isLink: true,
      link: '/dashboard/profile/changepassword'
    },
    {
      icon: <Shield size={20} />,
      text: 'Two-Factor Authentication',
      action: () => setIs2FAModalOpen(true),
      link: false
    },
    {
      icon: <User size={20} />,
      text: 'Account Access',
      action: () => { }, // Add your account access logic here
      isLink: true,
      link: '/dashboard/profile/account/'
    }
  ];

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`h-full flex flex-col`}
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-cyan-400 mb-6"
        >
          Security Settings
        </motion.h2>

        <motion.ul
          variants={containerVariants}
          className="flex flex-col gap-4"
        >
          {securityItems.map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="w-full"
            >
              {item.isLink ? (
                <Link
                  to={item.link}
                  className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white hover:text-cyan-400 transition-all duration-300 hover:border-brandPrimary/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-brandPrimary/10 rounded-full text-brandPrimary">
                      {item.icon}
                    </div>
                    <span className="text-lg font-medium">{item.text}</span>
                  </div>
                  <ChevronRight className="text-brandPrimary/50" size={18} />
                </Link>
              ) : (
                <button
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white hover:text-cyan-400 transition-all duration-300 hover:border-brandPrimary/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-brandPrimary/10 rounded-full text-brandPrimary">
                      {item.icon}
                    </div>
                    <span className="text-lg font-medium">{item.text}</span>
                  </div>
                  <ChevronRight className="text-brandPrimary/50" size={18} />
                </button>
              )}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          variants={itemVariants}
          className={`mt-8 p-4 bg-gray-900/50 border ${securityLevel.borderColor} rounded-lg`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className={`${securityLevel.textColor} text-lg font-medium`}>
              Security Status - {securityLevel.text}
            </h3>
            <span className={`${securityLevel.textColor} font-medium`}>
              {score}%
            </span>
          </div>

          {messages.length > 0 && (
            <p className="text-white text-sm mb-4">
              Recommendations:
              <ul className="list-disc ml-5 mt-2 space-y-1">
                {messages.map((message, index) => (
                  <li key={index} className="text-gray-400">
                    {message}
                  </li>
                ))}
              </ul>
            </p>
          )}

          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`${securityLevel.bgColor} h-full rounded-full`}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* 2FA Modal */}
      <TwoFactor
        isOpen={is2FAModalOpen}
        onClose={() => setIs2FAModalOpen(false)}
      />
    </>
  );
};

export default AccountSecurity;
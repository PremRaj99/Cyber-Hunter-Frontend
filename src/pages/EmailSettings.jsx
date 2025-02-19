import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, Settings, Send, Lock, Cloud, MailCheck, Zap, ExternalLink } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmailSettings = () => {
  const [activeTab, setActiveTab] = useState('primary');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const navigate = useNavigate();
  const [emailPreferences, setEmailPreferences] = useState({
    marketing: true,
    security: true,
    updates: false,
    newsletter: true,
    promotions: false,
    analytics: true
  });

  // Interactive card data
  const emailCards = [
    {
      type: 'primary',
      email: 'alex.smith@example.com',
      icon: <Mail className="text-cyan-400" />,
      status: 'Verified',
      lastUsed: '2 hours ago'
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const formVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)]  text-white p-4 md:p-8">
      {/* Floating Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute top-20 right-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -5, 5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute bottom-40 left-20 w-40 h-40 bg-cyan-600/10 rounded-full blur-3xl"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto relative z-10"
      >

        {/* Header Section */}
        <motion.div variants={cardVariants} className=" flex text-center mb-12">
          <div className="my-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="p-4 rounded-full bg-gray-800/50 text-gray-400 hover:bg-gray-800/30 hover:text-brandPrimary transition-colors"
          >
            <ArrowLeft size={20} />
            </motion.button>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 mb-4">
              Email Command Center
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Manage your digital communication hub with our intuitive interface
            </p>
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Email Cards Section */}
          <motion.div variants={cardVariants} className="lg:col-span-2">
            <div className="space-y-4">
              {emailCards.map((card, index) => (
                <motion.div
                  key={card.type}
                  whileHover={{ scale: 1.02 }}
                  className="group relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-700" />
                  </div>

                  <div className="relative flex items-start justify-between">
                    <div className="flex-1">

                      <div className="flex items-center gap-3 mb-2">
                        {card.icon}
                        <span className="text-lg font-semibold capitalize">{card.type} Email</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${card.status === 'Verified' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                          {card.status}
                        </span>
                      </div>
                      <p className="text-lg text-gray-300 mb-2">{card.email}</p>
                      <p className="text-sm text-gray-500">Last used: {card.lastUsed}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                      >
                        <Settings size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                      >
                        <Send size={20} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions Panel */}
          <motion.div variants={cardVariants} className="space-y-">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-xl p-4 border border-gray-700">
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <MailCheck />, label: 'Verify' },
                  { icon: <ExternalLink />, label: 'Share' }
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="text-cyan-400 mb-2">{action.icon}</span>
                    <span className="text-sm">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-xl p-6 border mt-6 border-gray-700">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {Object.entries(emailPreferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between group">
                <span className="text-sm capitalize group-hover:text-cyan-400 transition-colors">
                  {key}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setEmailPreferences(prev => ({ ...prev, [key]: !prev[key] }))}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-cyan-500' : 'bg-gray-600'
                    }`}
                >
                  <motion.span
                    layout
                    className={`block w-4 h-4 mx-1 rounded-full bg-gray-900 transition-transform ${value ? 'translate-x-6' : 'translate-x-0'
                      }`}
                  />
                </motion.button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <motion.div
          variants={cardVariants}
          className="mt-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/20 rounded-full">
              <Shield className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-400">Advanced Security</h3>
              <p className="text-gray-400 text-sm mt-1">
                Your email settings are protected with enterprise-grade encryption and real-time threat monitoring.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmailSettings;
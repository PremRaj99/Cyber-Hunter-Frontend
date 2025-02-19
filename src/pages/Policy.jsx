import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Database, Bell, RefreshCw, DatabaseIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Policy = () => {

  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const sections = [
    {
      icon: <Shield className="w-6 h-6 text-cyan-400" />,
      title: "Information We Collect",
      content: "We collect information that you provide directly to us, including but not limited to your name, email address, and any other information you choose to provide."
    },
    {
      icon: <Lock className="w-6 h-6 text-cyan-400" />,
      title: "How We Protect Your Data",
      content: "We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information."
    },
    {
      icon: <Eye className="w-6 h-6 text-cyan-400" />,
      title: "Information Usage",
      content: "The information we collect from you may be used to personalize your experience, improve our website, and send periodic emails."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-cyan-400" />,
      title: "Third-Party Disclosure",
      content: "We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent."
    },
    {
      icon: <Database className="w-6 h-6 text-cyan-400" />,
      title: "Data Storage",
      content: "Your data is stored securely on our servers and is only accessible to authorized personnel. We regularly backup data to prevent loss."
    },
    {
      icon: <Bell className="w-6 h-6 text-cyan-400" />,
      title: "Updates to Policy",
      content: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-cyan-400" />,
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information at any time. Contact us if you wish to exercise any of these rights."
    },
    {
      icon: <DatabaseIcon className="w-6 h-6 text-cyan-400" />,
      title: "Data Storage",
      content: "Your data is stored securely on our servers and is only accessible to authorized personnel. We regularly backup data to prevent loss."
    }
  ];

  return (
    <motion.div
      className=" text-gray-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We value your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information.
          </p>
        </motion.div>

        {/* Last Updated Section */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          <div className="inline-block px-4 py-2 bg-gray-800/60 rounded-full border border-gray-700/50">
            <p className="text-sm text-gray-400">
              Last Updated: <span className="text-cyan-400">February 19, 2025</span>
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-700/50 rounded-lg">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
        >
          <div className="bg-gray-800/60 rounded-xl p-8 border border-gray-700/50 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
              Questions About Our Privacy Policy?
            </h2>
            <p className="text-gray-400 mb-6">
              If you have any questions about our privacy policy, please don't hesitate to contact us.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Policy;
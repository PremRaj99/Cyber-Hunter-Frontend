/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Mail, User, Shield, CreditCard, Bell, HelpCircle, ChevronLeft } from "lucide-react";
import { FiMenu, FiX } from "react-icons/fi";
import AccountBillingSection from './accountSetting/AccountBillingSection';
import HelpSupport from './accountSetting/HelpSupport';
import AccountSecurity from "./accountSetting/AccountSecurity";
import Notification from "./accountSetting/Notification";

const DAccountSetting = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // All available setting sections
  const sections = [
    { id: "profile", icon: <User size={20} />, title: "Profile" },
    { id: "security", icon: <Shield size={20} />, title: "Security" },
    { id: "billing", icon: <CreditCard size={20} />, title: "Billing" },
    { id: "notifications", icon: <Bell size={20} />, title: "Notifications" },
    { id: "help", icon: <HelpCircle size={20} />, title: "Help" },
  ];

  // Main animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };


  // Sidebar animation variants
  const sidebarVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  // Render content based on active section
  const renderContent = (is2FAModalOpen, isPasswordModalOpen, setIsPasswordModalOpen, setIs2FAModalOpen) => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "security":
        return <SecuritySection accountSecurity={{ is2FAModalOpen, isPasswordModalOpen, setIsPasswordModalOpen, setIs2FAModalOpen }} />;
      case "billing":
        return <BillingSection />;
      case "notifications":
        return <NotificationsSection />;
      case "help":
        return <HelpSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className={`text-white`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br z-0"></div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        className="absolute top-40 -left-40 w-80 h-80 bg-brandPrimary rounded-full filter blur-3xl z-0 opacity-15"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-brandPrimary rounded-full filter blur-3xl z-0 opacity-10"
      ></motion.div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        {/* Back Button */}
        <div className="flex items-center justify-between w-full mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="text-cyan-400 hover:text-cyan-300 transition-colors border-2 border-cyan-400 p-1.5 rounded-full flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-cyan-400"
            >
              Account <span className="hidden md:inline">Security</span>
            </motion.h1>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-gray-800 text-cyan-400 hover:bg-gray-700 transition-colors"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Sidebar */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="absolute inset-0 rounded-lg z-50 md:hidden bg-black bg-opacity-100"
              >
                <div className="flex flex-col h-full p-6">
                  <div className="flex justify-end items-center mb-8">
                    <button
                      onClick={toggleMenu}
                      className="p-2 rounded-lg bg-gray-800 text-cyan-400 hover:bg-gray-700 transition-colors"
                    >
                      <FiX size={12} />
                    </button>
                  </div>

                  <nav className="flex-1">
                    <ul className="space-y-2">
                      {sections.map((section) => (
                        <motion.li
                          key={section.id}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <button
                            onClick={() => {
                              setActiveSection(section.id);
                              setIsMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeSection === section.id
                              ? "bg-brandPrimary bg-opacity-20 text-cyan-400"
                              : "hover:bg-gray-800"
                              } transition-colors`}
                          >
                            <span className={activeSection === section.id ? "text-cyan-400" : "text-gray-400"}>
                              {section.icon}
                            </span>
                            <span>{section.title}</span>
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block w-64 shrink-0"
          >
            <div className="sticky top-8 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-xl">
              <nav>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <motion.li
                      key={section.id}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg ${activeSection === section.id
                          ? "bg-brandPrimary bg-opacity-20 text-cyan-400"
                          : "hover:bg-gray-700"
                          } transition-colors`}
                      >
                        <span className={activeSection === section.id ? "text-cyan-400" : "text-gray-400"}>
                          {section.icon}
                        </span>
                        <span>{section.title}</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-1"
          >
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl min-h-[calc(100vh-13rem)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="h-full"
                >
                  {renderContent(is2FAModalOpen, isPasswordModalOpen, setIsPasswordModalOpen, setIs2FAModalOpen)}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Profile Section Component
const ProfileSection = () => {
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-full flex flex-col"
    >
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-bold text-cyan-400 mb-6"
      >
        Profile Settings
      </motion.h2>

      <motion.ul
        variants={containerVariants}
        className="flex flex-col gap-4"
      >
        {[
          { icon: <User size={20} />, text: 'Personal Information', link: '/dashboard/profile/setting' },
          { icon: <Mail size={20} />, text: 'Email Settings', link: '/dashboard/email' },
        ].map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="w-full"
          >
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
          </motion.li>
        ))}
      </motion.ul>

     
    </motion.div>
  );
};

// Security Section Component
const SecuritySection = ({ accountSecurity }) => {
  const { is2FAModalOpen, isPasswordModalOpen, setIsPasswordModalOpen, setIs2FAModalOpen } = accountSecurity;
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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`h-full flex flex-col ${isPasswordModalOpen || is2FAModalOpen ? "" : ""}`}
    >
      <AccountSecurity accountSecurity={accountSecurity} />
    </motion.div>
  );
};

// Billing Section Component
const BillingSection = () => {
  return (
    <div className="h-full flex flex-col">
      <AccountBillingSection />
    </div>
  );
};

// Notifications Section Component
const NotificationsSection = () => {
  return (
    <div className="h-full flex flex-col">
      <Notification />
    </div>
  );
};

// Help Section Component
const HelpSection = () => {
  return (
    <div className="h-full flex flex-col">
      <HelpSupport />
    </div>
  );
};

export default DAccountSetting;
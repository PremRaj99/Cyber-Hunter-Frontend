import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Mail, Lock, User, Shield, CreditCard, Bell, HelpCircle } from "lucide-react";
import { FiMenu, FiX } from "react-icons/fi";

const DAccountSetting = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Container and item animation variants
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
  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "security":
        return <SecuritySection />;
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
    <div className="min-h-screen text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br z-0"></div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        className="absolute top-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full filter blur-3xl z-0 opacity-15"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl z-0 opacity-10"
      ></motion.div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-cyan-400"
          >
            Account Settings
          </motion.h1>

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
                className="fixed inset-0 z-50 md:hidden bg-gray-900 bg-opacity-95"
              >
                <div className="flex flex-col h-full p-6">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-cyan-400">Navigation</h2>
                    <button
                      onClick={toggleMenu}
                      className="p-2 rounded-lg bg-gray-800 text-cyan-400 hover:bg-gray-700 transition-colors"
                    >
                      <FiX size={24} />
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
                                ? "bg-cyan-500 bg-opacity-20 text-cyan-400"
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
              <h2 className="text-lg font-semibold text-cyan-400 mb-4 pl-3">Navigation</h2>
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
                            ? "bg-cyan-500 bg-opacity-20 text-cyan-400"
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
                  {renderContent()}
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

      <div className="mb-8">
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
        >
          <div className="w-20 h-20 bg-gray-700 rounded-full overflow-hidden flex-shrink-0 border-2 border-cyan-500/30">
            <img
              src="/api/placeholder/200/200"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium">John Doe</h3>
            <p className="text-gray-400 text-sm">john.doe@example.com</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 transition-colors"
            >
              Change Photo
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.ul
        variants={containerVariants}
        className="flex flex-col gap-4"
      >
        {[
          { icon: <User size={20} />, text: 'Personal Information', link: '/' },
          { icon: <Mail size={20} />, text: 'Email Settings', link: '/' },
          { icon: <Bell size={20} />, text: 'Notification Preferences', link: '/' }
        ].map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="w-full"
          >
            <Link
              to={item.link}
              className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white hover:text-cyan-400 transition-all duration-300 hover:border-cyan-500/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-cyan-500/10 rounded-full text-cyan-500">
                  {item.icon}
                </div>
                <span className="text-lg font-medium">{item.text}</span>
              </div>
              <ChevronRight className="text-cyan-500/50" size={18} />
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        variants={itemVariants}
        className="mt-auto pt-6 flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-cyan-500 text-black font-medium rounded-lg shadow-lg hover:bg-cyan-400 transition-colors"
        >
          Save Changes
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// Security Section Component
const SecuritySection = () => {
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
        Security Settings
      </motion.h2>

      <motion.ul
        variants={containerVariants}
        className="flex flex-col gap-4"
      >
        {[
          { icon: <Lock size={20} />, text: 'Change Password', link: '/' },
          { icon: <Shield size={20} />, text: 'Two-Factor Authentication', link: '/' },
          { icon: <User size={20} />, text: 'Account Access', link: '/' }
        ].map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="w-full"
          >
            <Link
              to={item.link}
              className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white hover:text-cyan-400 transition-all duration-300 hover:border-cyan-500/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-cyan-500/10 rounded-full text-cyan-500">
                  {item.icon}
                </div>
                <span className="text-lg font-medium">{item.text}</span>
              </div>
              <ChevronRight className="text-cyan-500/50" size={18} />
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        variants={itemVariants}
        className="mt-8 p-4 bg-gray-900/50 border border-yellow-500/20 rounded-lg"
      >
        <h3 className="text-yellow-400 text-lg font-medium mb-2">Security Status</h3>
        <p className="text-gray-300 text-sm mb-4">Your account security is good, but we recommend enabling two-factor authentication for improved protection.</p>
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
          <div className="bg-yellow-500 h-full rounded-full" style={{ width: '70%' }}></div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-auto pt-6 flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-cyan-500 text-black font-medium rounded-lg shadow-lg hover:bg-cyan-400 transition-colors"
        >
          Save Changes
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// Billing Section Component
const BillingSection = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Billing Settings</h2>
      <p className="text-gray-400">Your billing information and subscription details will appear here.</p>
    </div>
  );
};

// Notifications Section Component
const NotificationsSection = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Notification Settings</h2>
      <p className="text-gray-400">Your notification preferences will appear here.</p>
    </div>
  );
};

// Help Section Component
const HelpSection = () => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Help & Support</h2>
      <p className="text-gray-400">Support resources and documentation will appear here.</p>
    </div>
  );
};

export default DAccountSetting;
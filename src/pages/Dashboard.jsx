/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/dashboard/Sidebar";
import DTeam from "../components/dashboard/dTeam";
import DPersonal from "../components/dashboard/dPersonal";
import DContact from "../components/dashboard/dContact";
import DLeaderBoard from "../components/dashboard/dLeaderBorad";
import DNotification from "../components/dashboard/dNotification";
import DSetting from "../components/dashboard/dSetting";
import { X } from "lucide-react";

export default function Dashboard() {
  // States
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem("dashboardSection");
    return savedSection || "team";
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.title = "Cyber Hunter | Dashboard";
  }, []);

  // Effect for document title
  useEffect(() => {
    const sectionTitle = getSectionTitle();
    document.title = `Cyber Hunter | ${sectionTitle}`;
  }, [activeSection]);

  // Effect for local storage
  useEffect(() => {
    localStorage.setItem("dashboardSection", activeSection);
  }, [activeSection]);

  // Effect for handling window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsMobileSidebarOpen(false);
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "team": return <DTeam />;
      case "personal": return <DPersonal />;
      case "leaderboard": return <DLeaderBoard />;
      case "notification": return <DNotification />;
      case "contact": return <DContact />;
      case "settings": return <DSetting />;
      default: return null;
    }
  };

  // Get section title
  const getSectionTitle = () => {
    switch (activeSection) {
      case "team": return "Team Dashboard";
      case "personal": return "Personal Dashboard";
      case "leaderboard": return "Leaderboard";
      case "notification": return "Notifications";
      case "contact": return "Contacts";
      case "settings": return "Settings";
      default: return "Dashboard";
    }
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.02 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  };

  // Sidebar variants
  const sidebarVariants = {
    closed: {
      x: "-100%",
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      }
    },
    open: {
      x: 0,
      boxShadow: "10px 0px 50px rgba(0,0,0,0.5)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      }
    },
  };

  // Search animation variants
  const searchVariants = {
    closed: {
      width: "40px",
      opacity: 0.7,
    },
    open: {
      width: "100%",
      opacity: 1,
    }
  };

  return (
    <div className={`transition-colors duration-300 ${isDarkMode ? '' : 'bg-gray-50 text-gray-900'}`}>
      {/* Background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Dynamic background based on theme */}
        {isDarkMode ? (
          <>
            <div className="absolute top-40 w-full h-full from-slate-900 via-brandPrimary to-brandPrimary opacity-30"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-20 -left-40 w-96 h-96 bg-brandPrimary rounded-full blur-3xl opacity-10"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.1, scale: 1.1 }}
              transition={{ duration: 10, delay: 1, repeat: Infinity, repeatType: "reverse" }}
              className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.15),transparent_60%)]"
            ></motion.div>
          </>
        ) : (
          <>
            <div className="absolute top-0 w-full h-full bg-[linear-gradient(to_right,_#f0f9ff,_#e0f2fe,_#bae6fd,_#e0f2fe,_#f0f9ff)] opacity-40"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-indigo-400"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.05, scale: 1 }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-20 -left-40 w-96 h-96 bg-sky-400 rounded-full blur-3xl"
            ></motion.div>
          </>
        )}
      </div>

      <div className="relative z-10 w-full max-h-[calc(100vh-8rem)] mx-auto px-4 md:px-6 lg:px-8 py-4 lg:py-6">
        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed inset-0 z-50 lg:hidden"
            >
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setIsMobileSidebarOpen(false)}
              ></div>
              <div
                className={`absolute inset-y-0 left-0 w-3/4 max-w-sm ${isDarkMode ? 'bg-gray-900 border-r border-gray-800' : 'bg-white border-r border-gray-200'} shadow-2xl`}
              >
                <div className={`flex justify-between items-center px-6 py-5 ${isDarkMode ? 'border-b border-gray-800' : 'border-b border-gray-200'}`}>
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
                    Dashboard
                  </h2>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'} transition-colors`}
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-6">
                  <Sidebar
                    onSectionChange={handleSectionChange}
                    activeSection={activeSection}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex gap-8 lg:gap-6">
          {/* Desktop Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block w-1/4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className={`top-6 ${isDarkMode ? 'bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700' : 'bg-white backdrop-blur-lg border border-gray-200'} rounded-2xl p-5 shadow-xl overflow-hidden`}
            >
              <Sidebar
                onSectionChange={handleSectionChange}
                activeSection={activeSection}
                isDarkMode={isDarkMode}
              />

              {/* Stats card at bottom of sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700' : 'bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-100'}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    Weekly Progress
                  </h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${isDarkMode ? 'bg-cyan-900 bg-opacity-50 text-cyan-300' : 'bg-indigo-100 text-indigo-600'}`}>
                    +12%
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Tasks</span>
                      <span className={isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}>78%</span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div className={`h-full rounded-full ${isDarkMode ? 'bg-brandPrimary' : 'bg-indigo-500'}`} style={{ width: '78%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Hours</span>
                      <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>62%</span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div className={`h-full rounded-full ${isDarkMode ? 'bg-purple-500' : 'bg-purple-500'}`} style={{ width: '62%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 w-3/5 min-h-[calc(100vh-12rem)]"
          >
            <div className={`relative ${isDarkMode ? 'bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700' : 'bg-white backdrop-blur-lg border border-gray-200'} rounded-2xl shadow-xl overflow-hidden mb-6`}>
              {/* Content background decoration */}
              {isDarkMode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.1, scale: 1 }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute -bottom-20 -right-20 w-80 h-80 bg-brandPrimary rounded-full blur-3xl opacity-15 pointer-events-none"
                ></motion.div>
              )}

              {/* Tab navigation for mobile */}
              <div className="lg:hidden px-4 pt-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className={`flex overflow-x-auto py-2 gap-2 no-scrollbar`}
                >
                  {['team', 'personal', 'leaderboard', 'notification', 'contact', 'settings'].map((section) => (
                    <button
                      key={section}
                      onClick={() => handleSectionChange(section)}
                      className={`whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${activeSection === section
                        ? isDarkMode
                          ? 'bg-brandPrimary bg-opacity-20 text-cyan-400 border border-brandPrimary border-opacity-30'
                          : 'bg-indigo-100 text-indigo-600 border border-indigo-200'
                        : isDarkMode
                          ? 'text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-gray-200'
                          : 'text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  ))}
                </motion.div>
              </div>

              {/* Actual content with animations */}
              <div className="relative z-10 p-2 gap-4 md:p-6 lg:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="min-h-[calc(100vh-14rem)]"
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
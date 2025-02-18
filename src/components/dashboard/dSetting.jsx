import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsPersonCircle } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

const DSetting = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.12,
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
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const settingsActions = [
    {
      icon: <BsPersonCircle size={24} />,
      text: "Profile Settings",
      description: "Manage your personal information and preferences",
      path: "/dashboard/profile/setting",
      color: "from-blue-500 to-cyan-400",
      textColor: "text-blue-100",
      iconBg: "bg-blue-400 bg-opacity-20"
    },
    {
      icon: <MdGroups size={24} />,
      text: "Team Settings",
      description: "Configure team permissions and collaborations",
      path: "/dashboard/team/teamsetting",
      color: "from-purple-500 to-indigo-500",
      textColor: "text-purple-100",
      iconBg: "bg-purple-400 bg-opacity-20"
    },
    {
      icon: <FiSettings size={24} />,
      text: "Account Settings",
      description: "Update your account and security preferences",
      path: "/dashboard/account",
      color: "from-green-500 to-emerald-400",
      textColor: "text-green-100",
      iconBg: "bg-green-400 bg-opacity-20"
    }
  ];

  return (
    <div className="p-1 sm:p-4 min-h-[calc(100vh-13rem)]">
      <motion.div
        className="w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          className="mb-8"
        >
          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-white">
            Settings Dashboard
          </h1>

          <div className="flex items-center">
            <div className="h-1 w-16 bg-cyan-400 rounded-full"></div>
            <p className="ml-4 text-sm text-gray-400">
              Customize your experience and preferences
            </p>
          </div>
        </motion.div>

        {/* Settings Stats Summary */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 text-gray-300"
        >
          {[
            { label: "Last Updated", value: "2 days ago" },
            { label: "Security Level", value: "High" },
            { label: "Connected Apps", value: "5" }
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-gray-800 bg-opacity-50 border border-gray-700"
            >
              <h3 className="text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Settings Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
        >
          {settingsActions.map((action, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl overflow-hidden bg-gray-800 bg-opacity-50 border-gray-700"
            >
              {/* Card gradient background */}
              <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-tr ${action.color} opacity-10`}></div>

              <Link
                to={action.path}
                className="block p-6 h-full relative z-10"
              >
                <div className="flex flex-col">
                  {/* Icon Container */}
                  <div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-full ${action.iconBg}`}>
                    <span className={`${action.textColor.replace('100', '500')}`}>
                      {action.icon}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="flex-grow">
                    <h2 className="text-xl text-white font-semibold">
                      {action.text}
                    </h2>
                    <p className="text-sm mt-2 text-gray-400">
                      {action.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex justify-end">
                    <motion.span
                      whileHover={{ x: 5 }}
                      className={`text-sm ${action.textColor.replace('100', '300')}`}
                    >
                      Configure →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DSetting;
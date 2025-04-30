/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const DPersonal = () => {

  const [projects, setProjects] = useState([]);
  const [projectCount, setProjectCount] = useState(0);

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/project`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setProjects(response.data);
        setProjectCount(response.data.length); // Set the project count
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // Personal action cards data
  const personalActions = [
    {
      icon: <AddCircleRoundedIcon fontSize="medium" />,
      text: "Add Project",
      description: "Create a new personal project",
      path: "/dashboard/project/add",
      color: "from-blue-500 to-cyan-400",
      textColor: "text-blue-100",
      iconBg: "bg-blue-400 bg-opacity-20"
    },
    {
      icon: <VisibilityOutlinedIcon fontSize="medium" />,
      text: "View Projects",
      description: "Browse your existing projects",
      path: "/dashboard/project/view",
      color: "from-purple-500 to-indigo-500",
      textColor: "text-purple-100",
      iconBg: "bg-purple-400 bg-opacity-20"
    },
    {
      icon: <VerifiedOutlinedIcon fontSize="medium" style={{ color: "#06db62" }} />,
      text: "Verify Achievements",
      description: "Track your personal accomplishments",
      path: "/dashboard/profile/personalachivement",
      color: "from-green-500 to-emerald-400",
      textColor: "text-green-100",
      iconBg: "bg-green-400 bg-opacity-20"
    },
    {
      icon: <ChatBubbleIcon fontSize="medium" />,
      text: "Comment",
      description: "Engage with project discussions",
      path: "/comment",
      color: "from-amber-500 to-orange-400",
      textColor: "text-amber-100",
      iconBg: "bg-amber-400 bg-opacity-20"
    },
    {
      icon: <SearchIcon fontSize="medium" />,
      text: "Browse Teams",
      description: "Find teams to join and collaborate",
      path: "/dashboard/team/browse",
      color: "from-pink-500 to-rose-400",
      textColor: "text-pink-100",
      iconBg: "bg-pink-400 bg-opacity-20"
    },
    {
      icon: <SettingsIcon fontSize="medium" />,
      text: "Personal Management",
      description: "Configure personal settings",
      path: "/teamManagement",
      color: "from-slate-600 to-slate-500",
      textColor: "text-slate-100",
      iconBg: "bg-slate-400 bg-opacity-20"
    },
  ];

  return (
    <div className="p-1 sm:p-4 m-h-[calc(100vh-8rem)]">
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
            Personal Dashboard
          </h1>

          <div className="flex items-center">
            <div className="h-1 w-16 bg-cyan-400 rounded-full"></div>
            <p className="ml-4 text-sm text-gray-400">
              Manage your personal projects and achievements
            </p>
          </div>
        </motion.div>

        {/* Personal Stats Summary */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 text-white"
        >
          {[
            { label: "Active Projects", value: projectCount.toString() },
            { label: "Completed Tasks", value: "47" },
            { label: "Achievements", value: "16" },
            { label: "Pending Tasks", value: "12" }
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

        {/* Action Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
        >
          {personalActions.map((action, index) => (
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
                      View →
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

export default DPersonal;
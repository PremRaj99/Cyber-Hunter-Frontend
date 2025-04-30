/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { GiTeamIdea } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeamRequestsPopUp from "../../components/Team/TeamRequestsPopUp";
import { TeamService } from "../../services/TeamService";

// You can create a theme context in your app, or pass isDarkMode as a prop
const DTeam = ({ isDarkMode = true }) => {
  const [projects, setProjects] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [teamMembers, setTeamMembers] = useState([]);
  const [memberCount, setMemberCount] = useState(0);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [pendingRequests, setPendingRequests] = useState(0);

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

  // Add new team action for browsing teams
  const teamActions = [
    {
      icon: <GiTeamIdea size={24} />,
      text: "View Team",
      description: "View Your Team Page",
      path: "/dashboard/team",
      color: "from-amber-500 to-orange-400",
      textColor: "text-amber-100",
      iconBg: "bg-amber-400 bg-opacity-20"
    },
    {
      icon: <AddCircleRoundedIcon fontSize="medium" />,
      text: "Add Project",
      description: "Create a new team project",
      path: "/dashboard/team/addproject",
      color: "from-blue-500 to-cyan-400",
      textColor: "text-blue-100",
      iconBg: "bg-blue-400 bg-opacity-20"
    },
    {
      icon: <VisibilityOutlinedIcon fontSize="medium" />,
      text: "View Projects",
      description: "Browse existing projects",
      path: "/dashboard/team/viewproject",
      color: "from-purple-500 to-indigo-500",
      textColor: "text-purple-100",
      iconBg: "bg-purple-400 bg-opacity-20"
    },
    {
      icon: <VerifiedOutlinedIcon fontSize="medium" style={{ color: "#06db62" }} />,
      text: "Verify Achievements",
      description: "Validate team accomplishments",
      path: "/dashboard/achievement",
      color: "from-green-500 to-emerald-400",
      textColor: "text-green-100",
      iconBg: "bg-green-400 bg-opacity-20"
    },
    {
      icon: <SearchIcon fontSize="medium" />,
      text: "Browse Teams",
      description: "Find and join new teams",
      path: "/dashboard/team/browse",
      color: "from-rose-500 to-pink-500",
      textColor: "text-rose-100",
      iconBg: "bg-rose-400 bg-opacity-20"
    },
    {
      icon: <SettingsIcon fontSize="medium" />,
      text: "Team Management",
      description: "Configure team settings",
      path: "/dashboard/team/teamsetting",
      color: "from-slate-600 to-slate-500",
      textColor: "text-slate-100",
      iconBg: "bg-slate-400 bg-opacity-20"
    },
  ];

  const [teamId, setTeamId] = useState(null);
  const [fetchingUserData, setFetchingUserData] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setFetchingUserData(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });

        if (response.data && response.data.data && response.data.data.teamId) {
          setTeamId(response.data.data.teamId);
        } else {
          toast.error("You don't belong to any team. Please join or create a team first.");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to get your team information");
      } finally {
        setFetchingUserData(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      if (!teamId) return;

      try {
        setIsLoading(true);

        // Fetch team projects
        const projectsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/project/team/${teamId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (projectsResponse.data && projectsResponse.data.data) {
          setProjects(projectsResponse.data.data);
          setProjectCount(projectsResponse.data.data.length);
        }

        // Fetch team details with members
        const teamResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/team/${teamId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (teamResponse.data && teamResponse.data.data) {
          setTeamMembers(teamResponse.data.data.TeamMembers || []);
          setMemberCount(teamResponse.data.data.TeamMembers?.length || 0);
        }

        // Check for pending join requests if user is team leader
        try {
          const joinRequestsResponse = await TeamService.getTeamJoinRequests(teamId);
          if (joinRequestsResponse && joinRequestsResponse.data) {
            const pendingCount = joinRequestsResponse.data.filter(req => req.status === "pending").length;
            setPendingRequests(pendingCount);
          }
        } catch (error) {
          // Silently fail - user might not be team leader
          console.log("Not a team leader or error fetching requests");
        }

      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  return (
    <div className="p-1 sm:p-4 md:p-8">
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
          <h1 className={`text-xl sm:text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Team Dashboard
          </h1>

          <div className="flex items-center">
            <div className={`h-1 w-16 ${isDarkMode ? 'bg-cyan-400' : 'bg-indigo-500'} rounded-full`}></div>
            <p className={`ml-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage and collaborate with your team members effectively
            </p>
          </div>
        </motion.div>

        {/* Team Stats Summary */}
        <motion.div
          variants={itemVariants}
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 ${isDarkMode ? 'text-white' : 'text-gray-600'
            }`}
        >
          {[
            { label: "Active Projects", value: projectCount },
            { label: "Team Members", value: memberCount },
            { label: "Pending Requests", value: pendingRequests },
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white'
                } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
            >
              <h3 className="text-sm font-medium mb-1">{stat.label}</h3>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}>{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Action Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
        >
          {teamActions.map((action, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: isDarkMode ?
                  "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" :
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative rounded-xl overflow-hidden bg-gray-800 bg-opacity-50 border-gray-700`}
            >
              {/* Card gradient background */}
              <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-tr ${action.color} opacity-10`}></div>

              {action.onClick ? (
                // Clickable div for modal-triggering actions
                <div
                  onClick={action.onClick}
                  className="block p-6 h-full relative z-10 cursor-pointer"
                >
                  <div className="flex flex-col">
                    {/* Icon Container */}
                    <div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-full ${action.iconBg} relative`}>
                      <span className={`${action.textColor.replace('100', '500')}`}>
                        {action.icon}
                      </span>
                      {action.badge && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {action.badge}
                        </span>
                      )}
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
                        className={`text-sm ${isDarkMode ? action.textColor.replace('100', '300') : action.textColor.replace('100', '600')}`}
                      >
                        View →
                      </motion.span>
                    </div>
                  </div>
                </div>
              ) : (
                // Regular link for navigation actions
                <Link
                  to={action.path}
                  className="block p-6 h-full relative z-10"
                >
                  <div className="flex flex-col">
                    {/* Icon Container */}
                    <div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-full ${action.iconBg} relative`}>
                      <span className={`${action.textColor.replace('100', '500')}`}>
                        {action.icon}
                      </span>
                      {action.badge && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {action.badge}
                        </span>
                      )}
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
                        className={`text-sm ${isDarkMode ? action.textColor.replace('100', '300') : action.textColor.replace('100', '600')}`}
                      >
                        View →
                      </motion.span>
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Team Request Modal */}
      <TeamRequestsPopUp isOpen={showRequestsModal} onClose={() => setShowRequestsModal(false)} />
    </div>
  );
};

export default DTeam;
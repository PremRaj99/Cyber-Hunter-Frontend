/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitterSquare, FaInstagram } from "react-icons/fa";
import axios from "../../utils/Axios";
import { useNavigate } from "react-router-dom";

const TeamProfileSection = ({ teamMembers = [], teamId: propTeamId }) => {
  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState([]);
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userRes = await axios.get("/api/v1/user/me");
        if (userRes.data && userRes.data.data) {
          setUser(userRes.data.data);
        } else {
          setError("Failed to load user data.");
        }
      } catch (error) {
        setError("Failed to load user data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  // Fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);

        // Get user's teams
        const teamRes = await axios.get(`/api/v1/team/`);
        console.log("Team API response in ProfileSection:", teamRes.data);

        if (teamRes.data && teamRes.data.success && teamRes.data.data) {
          // Based on your API response, data is an array - let's grab the first team
          const teamData = Array.isArray(teamRes.data.data) ? teamRes.data.data[0] : teamRes.data.data;

          if (!teamData) {
            setError("No team found.");
            setIsLoading(false);
            return;
          }

          // Store the basic team data
          setTeamData(teamData);

          // Now fetch detailed team member information directly using the specific endpoint
          try {
            const detailedTeamRes = await axios.get(`/api/v1/team/${teamData._id}/members-detail`);
            console.log("Detailed team data:", detailedTeamRes.data);

            if (detailedTeamRes.data && detailedTeamRes.data.success && detailedTeamRes.data.data) {
              const enhancedTeamData = detailedTeamRes.data.data;

              // Also update the team data with any additional information
              setTeamData(enhancedTeamData);

              // Format the members data according to our UI needs based on the API response structure
              if (enhancedTeamData.TeamMembers && enhancedTeamData.TeamMembers.length > 0) {
                const formattedMembers = enhancedTeamData.TeamMembers.map(member => {
                  // Get name from userDetailData and profilePicture from userData
                  const name = member.userDetailData?.name ||
                    member.userData?.email?.split('@')[0] ||
                    "Team Member";

                  return {
                    id: member.userId,
                    name: name, // Use name from userDetailData
                    email: member.userData?.email || "",
                    role: member.role || "Member",
                    points: member.points || 0,
                    status: member.status || "Active",
                    skills: member.skills || [],
                    avatar: member.userData?.profilePicture || // Use profilePicture from userData
                      `https://avatar.iran.liara.run/username?username=${encodeURIComponent(name)}`,
                    social: member.social || {},
                    individualPoints: member.individualData?.point || 0
                  };
                });

                setMembers(formattedMembers);
              }
            }
          } catch (memberError) {
            console.error("Error fetching detailed member data:", memberError);
            // Fallback to existing approach
            if (teamData.TeamMembers && teamData.TeamMembers.length > 0) {
              const memberDetails = await Promise.all(
                teamData.TeamMembers.map(async (member) => {
                  try {
                    // If we already have the full user object
                    if (member.userId && typeof member.userId === 'object' && member.userId._id) {
                      return {
                        id: member.userId._id,
                        name: member.userId.name || "Team Member",
                        email: member.userId.email || "",
                        role: member.role || "Member",
                        points: member.points || 0,
                        status: member.status || "Active",
                        skills: member.skills || [],
                        avatar: member.userId.profilePicture ||
                          `https://avatar.iran.liara.run/username?username=${encodeURIComponent(member.userId.name || "User")}`,
                        social: member.social || {}
                      };
                    }

                    // If we only have userId as a string reference
                    const userResponse = await axios.get(`/api/v1/user/${member.userId}`);
                    const userData = userResponse.data.data || {};

                    return {
                      id: member.userId,
                      name: userData.name || "Team Member",
                      email: userData.email || "",
                      role: member.role || "Member",
                      points: member.points || 0,
                      status: member.status || "Active",
                      skills: member.skills || [],
                      avatar: userData.profilePicture ||
                        `https://avatar.iran.liara.run/username?username=${encodeURIComponent(userData.name || "User")}`,
                      social: member.social || {}
                    };
                  } catch (error) {
                    console.error("Error fetching member details:", error);
                    return {
                      id: member.userId,
                      name: "Team Member",
                      role: member.role || "Member",
                      points: member.points || 0,
                      status: member.status || "Active",
                      skills: member.skills || [],
                      avatar: `https://avatar.iran.liara.run/username?username=User`,
                      social: member.social || {}
                    };
                  }
                })
              );

              setMembers(memberDetails);
            }
          }
        } else {
          setError("Failed to load team data.");
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
        setError("Failed to load team data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, [user]);

  console.log("member details", members);

  // Function to render social icons
  const SocialIcon = ({ platform, url }) => {
    if (!url) return null;

    let Icon;
    switch (platform) {
      case 'github':
        Icon = FaGithub;
        break;
      case 'linkedin':
        Icon = FaLinkedin;
        break;
      case 'twitter':
        Icon = FaTwitterSquare;
        break;
      case 'instagram':
        Icon = FaInstagram;
        break;
      default:
        return null;
    }

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-200 transition-colors"
      >
        <Icon />
      </a>
    );
  };

  // Animation variants
  const tabVariants = {
    inactive: { opacity: 0.7, y: 0 },
    active: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        <p className="text-gray-400 mt-4">Loading team information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-red-400">
        <p className="text-xl">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <p className="text-xl mb-4 text-gray-300">You are not part of any team yet.</p>
        <button
          onClick={() => navigate("/dashboard/team/create")}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500"
        >
          Create or Join a Team
        </button>
      </div>
    );
  }

  // Update the member card to display bio from individualData
  const MemberCard = ({ member }) => {
    return (
      <motion.div
        key={member.id}
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="relative bg-gray-800/40 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm group"
      >
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://avatar.iran.liara.run/username?username=User";
              }}
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-medium">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <span className="text-cyan-400 font-semibold mr-1">{member.points}</span>
                  <span className="text-xs text-gray-400">team pts</span>
                </div>
                {member.individualPoints > 0 && (
                  <div className="flex items-center mt-1">
                    <span className="text-green-400 font-semibold mr-1">{member.individualPoints}</span>
                    <span className="text-xs text-gray-400">indiv. pts</span>
                  </div>
                )}
                <span className={`mt-1 text-xs px-2 py-0.5 rounded-full ${member.status.toLowerCase() === "active"
                  ? "bg-green-400/10 text-green-400"
                  : "bg-yellow-400/10 text-yellow-400"
                  }`}>
                  {member.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {member.bio && (
          <div className="mt-3 text-gray-300 text-sm border-l-2 border-cyan-500 pl-2">
            <p className="line-clamp-3 hover:line-clamp-none transition-all duration-300">
              {member.bio}
            </p>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Team Header with Logo and Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 border-b border-gray-700/50 bg-gray-800/30 rounded-lg mb-4 shadow-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full shadow-lg overflow-hidden">
              {teamData.TeamLogo ? (
                <img
                  src={teamData.TeamLogo}
                  alt={teamData.TeamName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://static.vecteezy.com/system/resources/thumbnails/013/927/838/small_2x/company-and-team-illustration-in-minimal-style-png.png";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-brandPrimary to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {teamData.TeamName ? teamData.TeamName.substring(0, 2).toUpperCase() : "TS"}
                  </span>
                </div>
              )}
            </div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent"
            >
              {teamData?.TeamName}
            </motion.h2>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex border-b border-gray-700/50"
      >
        <button
          onClick={() => setActiveTab("members")}
          className={`flex-1 py-3 font-medium text-sm transition-colors duration-300 ${activeTab === "members"
            ? "text-cyan-400 border-b-2 border-cyan-400"
            : "text-gray-400 hover:text-gray-200"
            }`}
        >
          Team Members
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex-1 py-3 font-medium text-sm transition-colors duration-300 ${activeTab === "stats"
            ? "text-cyan-400 border-b-2 border-cyan-400"
            : "text-gray-400 hover:text-gray-200"
            }`}
        >
          About
        </button>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {activeTab === "members" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {members.length > 0 ? members.map((member) => (
              <MemberCard key={member.id} member={member} />
            )) : (
              <div className="text-center py-6 text-gray-400">
                No team members found. Add members to your team!
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "stats" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Team Overview Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Team Description</h3>
              <p className="text-gray-400">{teamData?.TeamDescription || "No description available."}</p>
            </div>

            {/* Tech Stack Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {teamData.techStack && teamData.techStack.length > 0 ? (
                  teamData.techStack.map((tech, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-700/50 text-cyan-400 px-4 py-2 rounded-lg text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {tech}
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-400">No tech stack defined</p>
                )}
              </div>
            </div>

            {/* Interests Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Interests</h3>
              <div className="flex flex-wrap gap-3">
                {teamData.interests && teamData.interests.length > 0 ? (
                  teamData.interests.map((interest, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-700/50 text-cyan-400 px-4 py-2 rounded-lg text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {interest}
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-400">No interests defined</p>
                )}
              </div>
            </div>

            {/* Activity Stats */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Activity</h3>
              <div className="space-y-3">
                {['Commit Frequency', 'Code Reviews', 'Task Completion', 'Meeting Attendance'].map((metric, index) => (
                  <div key={index} className="bg-gray-700/30 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white">{metric}</span>
                      <span className="text-sm text-cyan-400 font-medium">{90 - index * 8}%</span>
                    </div>
                    <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${90 - index * 8}%` }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        className="bg-cyan-400 h-full rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Projects</h3>
              <div className="grid grid-cols-2 gap-3">
                {[

                  { label: 'Total', value: teamData?.projectId?.length || '0' },
                  { label: 'Completed', value: '0' },
                  { label: 'Success Rate', value: '0%' },
                  { label: 'Avg. Score', value: '0/5' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                    className="bg-gray-700/30 p-4 rounded-lg flex flex-col items-center justify-center text-center"
                  >
                    <span className="text-sm text-gray-400">{stat.label}</span>
                    <span className="text-xl font-bold text-cyan-400 mt-1">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer with Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-4 border-t border-gray-700/50 flex justify-end items-center"
      >
      </motion.div>
    </div>
  );
};

export default TeamProfileSection;
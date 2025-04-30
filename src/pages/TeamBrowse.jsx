/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, Zap } from "lucide-react";
import { toast } from "react-toastify";
import axios from "../utils/Axios";
import JoinRequestModal from "../components/Team/JoinRequestModal";
import TeamRequestsPopUp from "../components/Team/TeamRequestsPopUp";
import leadUserDemo from "../assets/leaduserdemo.png";
import CreateTeamPopUp from "../components/Team/CreateTeamPopUp";
import { FaPlus } from "react-icons/fa";

export default function TeamBrowse() {
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamLogo, setTeamLogo] = useState(null);
  const [filters, setFilters] = useState({
    techStack: [],
    hasMembersSlots: false,
  });

  // Fetch teams with pagination
  useEffect(() => {
    const fetchTeams = async () => {
      if (!hasMore || (page > 1 && isLoading)) return;

      try {
        setIsLoading(true);
        const response = await axios.get(`/api/v1/team/all?page=${page}&limit=10`);

        if (response.data && response.data.success) {
          const fetchedTeams = response.data.data.map(team => ({
            id: team._id,
            name: team.TeamName,
            description: team.TeamDescription || "No description available",
            logo: team.TeamLogo || leadUserDemo,
            score: team.points || 0,
            memberCount: team.TeamMembers?.length || 0,
            techStack: team.techStack || [],
            interests: team.interests || [],
            raw: team // Store the raw team data
          }));

          setTeams(prev => page === 1 ? fetchedTeams : [...prev, ...fetchedTeams]);
          setHasMore(fetchedTeams.length === 10); // If we got less than requested, no more pages
        } else {
          if (page === 1) setTeams([]);
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        if (page === 1) {
          setTeams([]);
          toast.error("Failed to load teams. Please try again.");
        }
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [page, hasMore]);

  // Filter teams based on search query and filters
  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      // Search by name, description, and tech stack
      const matchesSearch =
        !searchQuery ||
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (team.description && team.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        team.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter by member slots
      const hasSlots = !filters.hasMembersSlots || team.memberCount < 5;

      // Filter by selected tech stack (if any)
      const matchesTechStack =
        filters.techStack.length === 0 ||
        filters.techStack.some(tech =>
          team.techStack.some(teamTech =>
            teamTech.toLowerCase().includes(tech.toLowerCase())
          )
        );

      return matchesSearch && hasSlots && matchesTechStack;
    });
  }, [teams, searchQuery, filters]);

  const handleJoinClick = (team) => {
    setSelectedTeam(team.raw);
    setShowJoinModal(true);
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Define handleCreateTeam function
  const handleCreateTeam = async (e, formData, teamMembers) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation check for team name
      if (!formData.get("TeamName")) {
        toast.error("Team name is required");
        setIsLoading(false);
        return;
      }

      // Step 1: Create the team first
      const response = await axios.post("/api/v1/team", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        const newTeamId = response.data.data._id;
        toast.success("Team created successfully!");

        // Step 2: Send invitations to team members if any were selected
        if (teamMembers && teamMembers.length > 0) {
          // Using the sendTeamInvitation endpoint
          const invitePromises = teamMembers.map(async (memberEmail) => {
            try {
              // First get the user ID from email
              const userSearchResponse = await axios.get(`/api/v1/user/search?q=${encodeURIComponent(memberEmail)}`);
              const users = userSearchResponse.data?.data || [];
              const userToInvite = users.find(u => u.email === memberEmail);

              if (userToInvite) {
                // Send invite using backend endpoint
                await axios.post(`/api/v1/team/${newTeamId}/invite`, {
                  userId: userToInvite._id,
                  message: `You've been invited to join ${formData.get("TeamName")}!`
                });
              } else {
                console.warn(`User with email ${memberEmail} not found`);
              }
            } catch (err) {
              console.error(`Failed to invite member: ${memberEmail}`, err);
            }
          });

          await Promise.allSettled(invitePromises);
          toast.info(`Sent invitations to ${teamMembers.length} team members`);
        }

        // Reset UI state
        setIsFormVisible(false);
        setNewTeamName("");
        setTeamDescription("");
        setTeamLogo(null);

        // Refresh teams list
        setPage(1);
        setHasMore(true);
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error(error.response?.data?.message || "Failed to create team");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Browse Teams</h1>
            <p className="text-gray-400 mt-2">
              Join an existing team or create your own
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setIsFormVisible(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r bg-cyan-400 text-black font-medium transition-colors cursor-pointer flex items-center space-x-2 hover:bg-black hover:text-cyan-400 hover:border gap-2 hover:border-cyan-400"
            >
              <FaPlus size={18} />
              Create Team
            </button>

            <button
              onClick={() => setShowRequestsModal(true)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 flex items-center gap-2"
            >
              <Users size={18} />
              Your Requests
            </button>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-grow relative">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search teams by name, description, or tech stack..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasMembersSlots}
                  onChange={() => setFilters({ ...filters, hasMembersSlots: !filters.hasMembersSlots })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-300">Has spots</span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Team List */}
        {isLoading && teams.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
          </div>
        ) : filteredTeams.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {filteredTeams.map(team => (
              <motion.div
                key={team.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-md"
              >
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-700">
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-full h-full object-cover"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = leadUserDemo;
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h2 className="text-xl font-bold text-white">{team.name}</h2>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <div className="px-3 py-1 bg-gray-700 rounded-full text-sm text-cyan-400 flex items-center gap-1">
                          <Zap size={14} />
                          {team.score} pts
                        </div>
                        <div className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                          {team.memberCount}/5 members
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400 mt-2 mb-4">
                      {team.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {team.techStack.slice(0, 5).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700 text-sm text-cyan-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {team.techStack.length > 5 && (
                        <span className="px-2 py-1 bg-gray-700 text-sm text-cyan-300 rounded-full">
                          +{team.techStack.length - 5} more
                        </span>
                      )}
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleJoinClick(team)}
                        disabled={team.memberCount >= 5}
                        className={`px-3 py-2 rounded-lg font-medium ${team.memberCount >= 5
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-cyan-500 text-black border border-cyan-400 hover:bg-black hover:text-cyan-500"
                          }`}
                      >
                        {team.memberCount >= 5 ? "Team Full" : "Join Team"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center py-8">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Users size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-white">No teams found</h3>
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Join Request Modal */}
      <JoinRequestModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        team={selectedTeam}
      />

      {/* View Requests Modal */}
      <TeamRequestsPopUp
        isOpen={showRequestsModal}
        onClose={() => setShowRequestsModal(false)}
      />

      {/* Create Team PopUp */}
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-lg bg-gray-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto my-4 shadow-xl"
            >
              <div className="max-h-[calc(90vh-2rem)] overflow-y-auto no-scrollbar">
                <CreateTeamPopUp
                  newTeamName={newTeamName}
                  setNewTeamName={setNewTeamName}
                  teamDescription={teamDescription}
                  setTeamDescription={setTeamDescription}
                  setTeamLogo={setTeamLogo}
                  setIsFormVisible={setIsFormVisible}
                  handleCreateTeam={handleCreateTeam}
                  isLoading={isLoading}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

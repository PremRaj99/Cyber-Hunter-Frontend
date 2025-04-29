

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "../../utils/Axios"
import leadUserDemo from "../../assets/leaduserdemo.png"
import CreateTeamPopUp from "./CreateTeamPopUp"

export default function CreateTeamItem() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [newTeamName, setNewTeamName] = useState("")
  const [teamDescription, setTeamDescription] = useState("")
  const [teamLogo, setTeamLogo] = useState(null)
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [userStatus, setUserStatus] = useState(null) // To check if user already has a team
  const navigate = useNavigate()

  // Check user's team status
  useEffect(() => {
    const checkUserTeamStatus = async () => {
      try {
        const response = await axios.get("/api/v1/user/me")
        if (response.data?.success && response.data?.data) {
          if (response.data.data.teamId) {
            setUserStatus('hasTeam')
            toast.info("You already belong to a team")
          } else {
            setUserStatus('noTeam')
          }
        }
      } catch (error) {
        console.error("Error checking user team status:", error)
        setUserStatus('error')
      }
    }

    checkUserTeamStatus()
  }, [])

  // Fetch available teams with pagination
  useEffect(() => {
    const fetchAvailableTeams = async () => {
      if (!hasMore || isLoading) return

      setIsLoading(true)
      try {
        // Use the available-teams endpoint with pagination
        const response = await axios.get(`/api/v1/team/all?page=${page}&limit=10`)

        if (response.data.success) {
          // Transform the data to match our UI needs
          const fetchedTeams = response.data.data.map(team => ({
            id: team._id,
            name: team.TeamName,
            score: team.points || 0,
            icon: team.TeamLogo || leadUserDemo,
            description: team.TeamDescription || "No description available",
            memberCount: team.TeamMembers?.length || 0,
            techStack: team.techStack || [],
          }));

          // If no more teams or fewer than requested, no more pages available
          if (fetchedTeams.length === 0 || fetchedTeams.length < 10) {
            setHasMore(false)
          }

          // Update teams state - replace on first page, append on subsequent pages
          setTeams(prevTeams => page === 1 ? fetchedTeams : [...prevTeams, ...fetchedTeams])
        } else {
          // API call was successful but no data returned
          if (page === 1) {
            setTeams([])
          }
          setHasMore(false)
          toast.info("No teams are currently available")
        }
      } catch (error) {
        console.error("Error fetching teams:", error)
        if (page === 1) {
          setTeams([])
          toast.error("Failed to fetch teams. Please try again later.")
        }
        setHasMore(false)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailableTeams()
  }, [page])

  // Load more teams on scroll
  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1)
    }
  }

  // Filtered teams based on search query
  const filteredTeams = useMemo(() => {
    return teams.filter((team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.description && team.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (team.techStack && team.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())))
    )
  }, [searchQuery, teams])

  // Handle team join
  const handleJoinTeam = async (teamId) => {
    try {
      setIsLoading(true)
      const response = await axios.post(`/api/v1/team/${teamId}/join-request`)
      if (response.data.success) {
        toast.success(response.data.message || "Join request submitted successfully!")

        // If user was directly added to team (no approval required)
        if (response.data.data?.directJoin) {
          toast.info("You've been added to the team!")
          navigate("/dashboard/team")
        } else {
          // Refresh team list to show updated join status
          setPage(1)
          setHasMore(true)
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to join team"
      toast.error(errorMsg)
      console.error("Join team error:", error)

      // Handle specific error cases
      if (error.response?.status === 409) {
        toast.info("You have already requested to join this team")
      } else if (error.response?.status === 403) {
        toast.error("You are already part of a team")
        navigate("/dashboard/team")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle team creation
  const handleCreateTeam = async (e, formData) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(`Form Data: `, formData);

    try {
      // Make sure teamLogo is added to formData if it exists
      if (teamLogo) {
        formData.append("TeamLogo", teamLogo);
      }

      // Debug logging to verify formData contents
      console.log("Form data entries:");
      for (const pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // Make sure we have a team name
      if (!formData.get("TeamName")) {
        toast.error("Team name is required");
        setIsLoading(false);
        return;
      }

      const response = await axios.post("/api/v1/team", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Team created successfully!");
        setIsFormVisible(false);
        // Reset form fields
        setNewTeamName("");
        setTeamDescription("");
        setTeamLogo(null);

        // Refresh teams list if needed
        // fetchTeams();
      }
    } catch (error) {
      console.error("Error creating team:", error);

      // More detailed error logging
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }

      toast.error(error.response?.data?.message || "Failed to create team");
    } finally {
      setIsLoading(false);
    }
  }

  // Display empty state when no teams are available
  const EmptyTeamState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <svg
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h3 className="text-xl text-white font-medium mb-2">No teams available</h3>
      <p className="text-gray-400 mb-6 max-w-md">
        There are no teams available to join at this time. Why not create your own team?
      </p>
    </motion.div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-8 flex sm:flex-row items-center mt-4 justify-between">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">
            <span className="text-cyan-400">Team</span>
            <span className="text-white"> Selection</span>
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-white hover:text-cyan-400"
          >
            Skip
            <span className="ml-2">→</span>
          </button>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative mb-6"
        >
          <input
            type="text"
            placeholder="Search For Team by Entering Team name, tech stack, or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-cyan-400/30 bg-transparent px-12 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-0"
          />
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </motion.div>

        {/* Create Team Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <button
            onClick={() => setIsFormVisible(true)}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-full bg-white px-6 py-2 text-black transition-transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading && teams.length === 0 ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <span className="text-2xl">+</span>
                Create your team
              </>
            )}
          </button>
        </motion.div>

        {/* Team List */}
        <AnimatePresence>
          {isLoading && teams.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center py-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            </motion.div>
          ) : filteredTeams.length > 0 ? (
            <div className="space-y-4">
              {filteredTeams.map((team) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between rounded-lg bg-gray-800 p-4 sm:p-5"
                  whileHover={{
                    scale: 1.02,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      mass: 0.5,
                    },
                  }}
                >
                  {/* Team Info Section - Left Side */}
                  <div className="flex items-start w-full md:w-auto mb-4 md:mb-0">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 overflow-hidden rounded-full mr-4">
                      <img
                        src={team.icon || leadUserDemo}
                        alt={`${team.name} icon`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = leadUserDemo;
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-lg text-white font-semibold line-clamp-1">{team.name}</span>
                      {team.description && (
                        <p className="text-sm text-gray-400 mt-1 max-w-xs sm:max-w-sm">
                          {team.description.length > 60
                            ? `${team.description.slice(0, 60)}...`
                            : team.description}
                        </p>
                      )}
                      {team.techStack && team.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                          {team.techStack.slice(0, 2).map((tech, index) => (
                            <span key={index} className="text-xs bg-gray-700 rounded-full px-2 py-0.5 text-cyan-300">
                              {tech}
                            </span>
                          ))}
                          {team.techStack.length > 2 && (
                            <span className="text-xs bg-gray-700 rounded-full px-2 py-0.5 text-cyan-300">
                              +{team.techStack.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Section - Right Side */}
                  <div className="flex flex-row justify-between md:justify-end items-center w-full md:w-auto gap-3 md:gap-5">
                    <div className="flex flex-row md:flex-col items-center gap-3 md:gap-0">
                      <div className="bg-gray-700/30 px-2 py-1 rounded-md flex items-center">
                        <span className="text-xs sm:text-sm text-cyan-300 font-medium">Score: {team.score}</span>
                      </div>
                      <div className=" px-2 py-1 rounded-md">
                        <span className="text-xs sm:text-sm text-cyan-300">{team.memberCount}/5 members</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleJoinTeam(team.id)}
                      disabled={isLoading}
                      className="rounded bg-cyan-400 px-4 sm:px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:border hover:border-cyan-400 hover:text-cyan-400 disabled:opacity-50"
                    >
                      {isLoading ? "..." : "JOIN"}
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center py-4">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="py-2 px-4 bg-gray-800 text-cyan-400 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      "Load More Teams"
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Show empty state when no teams are found
            <EmptyTeamState />
          )}
        </AnimatePresence>

        {/* Create Team Form Pop-up */}
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
    </motion.div>
  )
}


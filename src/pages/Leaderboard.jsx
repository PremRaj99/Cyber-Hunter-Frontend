import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";
import { FaSyncAlt } from "react-icons/fa";
import axios from "axios";
import LeaderboardList from "../components/leaderboard/LeaderboardList";
import LeaderboardTop3 from "../components/leaderboard/LeaderboardTop3";
import LeaderboardToggle from "../components/leaderboard/LeaderboardToggle";
import leaduserdemo from "../assets/leaduserdemo.png";

export default function Leaderboard() {
  // States for UI
  const [activeTab, setActiveTab] = useState("INDIVIDUAL");
  const [openDropdown, setOpenDropdown] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedOptions, setSelectedOptions] = useState({});

  // States for data and loading
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState({ individual: [], team: [] });
  const [topThree, setTopThree] = useState({ individual: [], team: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [availableFilters, setAvailableFilters] = useState({
    techStacks: [],
    languages: [],
    tags: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const initializationAttempted = useRef(false);

  // UseEffect to handle document title
  useEffect(() => {
    document.title = "Cyber Hunter | Leaderboard";
  }, []);

  // Function to initialize leaderboard data
  const initializeLeaderboard = async () => {
    if (initializationAttempted.current || isInitializing) return;

    try {
      setIsInitializing(true);
      initializationAttempted.current = true;

      const token = localStorage.getItem("accessToken");
      if (!token) return;

      // Add force=true parameter to allow non-admin initialization if no data exists
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/leaderboard/initialize?force=true`,
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data && response.data.success) {
        console.log("Leaderboard initialized successfully");
        // Wait a moment for backend to process the data before refreshing
        setTimeout(() => fetchLeaderboardData(), 1500);
      }
    } catch (error) {
      console.error("Error initializing leaderboard:", error);

      // Handle 403 Forbidden error specifically
      if (error.response && error.response.status === 403) {
        console.log("Waiting for admin to initialize the leaderboard data");
        // No need to show error to user as this is an automatic operation
      }
    } finally {
      setIsInitializing(false);
    }
  };

  // Modified refreshLeaderboard function to prevent getting stuck
  const refreshLeaderboard = async () => {
    try {
      setIsRefreshing(true);
      setError(null);

      const token = localStorage.getItem("accessToken");
      if (!token) return;

      // First refresh the leaderboard to add any missing entries
      const refreshResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/leaderboard/refresh`,
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (refreshResponse.data && refreshResponse.data.success) {
        console.log("Leaderboard refreshed successfully:", refreshResponse.data.data);

        // Now update the rankings to ensure all entries have proper ranking
        try {
          const rankResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/v1/leaderboard/update-rankings`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (rankResponse.data && rankResponse.data.success) {
            console.log("Rankings updated successfully:", rankResponse.data);
          }
        } catch (rankError) {
          console.error("Error updating rankings:", rankError);
        }

        // Show success message if new entries were added
        const newUsers = refreshResponse.data.data.registeredUsers || 0;
        const newTeams = refreshResponse.data.data.registeredTeams || 0;

        if (newUsers > 0 || newTeams > 0) {
          setError(`Added ${newUsers} new users and ${newTeams} new teams to the leaderboard!`);
          setTimeout(() => setError(null), 5000);
        }
      }

      // Simpler approach: Just reload current tab data with a cache buster
      await fetchCurrentTabData(true);

    } catch (error) {
      console.error("Error refreshing leaderboard:", error);

      if (error.response && error.response.status === 403) {
        setError("You don't have permission to refresh the leaderboard. Please contact an administrator.");
      } else {
        setError("Failed to refresh leaderboard. Please try again later.");
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  // New helper function to fetch just the current tab's data
  const fetchCurrentTabData = async (forceRefresh = false) => {
    const type = activeTab.toLowerCase();

    try {
      // Build query parameters
      const params = new URLSearchParams({
        type: type,
        page: currentPage,
        limit: 20
      });

      // Add search query if provided
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      // Add filters if selected
      if (selectedOptions[0]) {
        params.append('techStack', selectedOptions[0]);
      }

      if (selectedOptions[1]) {
        params.append('language', selectedOptions[1]);
      }

      if (selectedOptions[2]) {
        params.append('tag', selectedOptions[2]);
      }

      // Add cache buster if force refreshing
      if (forceRefresh) {
        params.append('_t', Date.now());
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/leaderboard?${params.toString()}`);

      if (response.data && response.data.success) {
        // Format the data to match our component's expected structure
        const formattedData = (response.data.data.results || []).map(item => {
          const profilePicture = item.profilePicture || item.teamLogo || leaduserdemo;

          return {
            rank: item.rank,
            id: item.userId || item.teamId,
            name: item.name || "Anonymous",
            email: item.email || null,
            points: item.points,
            techStack: item.techStack || "Not specified",
            language: item.language,
            members: item.members,
            profilePicture: profilePicture
          };
        });

        // Save the formatted data for the requested type
        setLeaderboardData(prev => ({
          ...prev,
          [type]: formattedData
        }));

        // Handle top three data
        if (response.data.data.topThree && response.data.data.topThree.length > 0) {
          const formattedTopThree = response.data.data.topThree.map(item => {
            const profilePicture = item.profilePicture || item.teamLogo || leaduserdemo;

            return {
              rank: item.rank,
              id: item.userId || item.teamId,
              name: item.name || "Anonymous",
              email: item.email || null,
              points: item.points,
              techStack: item.techStack || "Not specified",
              language: item.language,
              members: item.members,
              profilePicture: profilePicture
            };
          });

          setTopThree(prev => ({
            ...prev,
            [type]: formattedTopThree
          }));
        } else if (formattedData.length >= 3) {
          setTopThree(prev => ({
            ...prev,
            [type]: formattedData.slice(0, 3)
          }));
        }

        // Set pagination details
        setTotalPages(response.data.data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error(`Error fetching ${type} leaderboard data:`, error);
      setError("Failed to load leaderboard data. Please try again later.");
    }
  };

  // Original fetchLeaderboardData can be kept simpler
  const fetchLeaderboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await fetchCurrentTabData();
    } catch (error) {
      console.error("Error in fetchLeaderboardData:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch leaderboard filters (tech stacks, languages, tags)
  useEffect(() => {
    const fetchLeaderboardFilters = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/leaderboard/filters`);

        if (response.data && response.data.success) {
          setAvailableFilters({
            techStacks: response.data.data.techStacks || [],
            languages: response.data.data.languages || [],
            tags: response.data.data.tags || []
          });
        }
      } catch (error) {
        console.error("Error fetching leaderboard filters:", error);
      }
    };

    fetchLeaderboardFilters();
  }, []);

  // Use the fetchLeaderboardData function in useEffect
  useEffect(() => {
    fetchLeaderboardData(activeTab.toLowerCase());
  }, [activeTab, selectedOptions, searchQuery, currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle option select for dropdown filters
  const handleOptionSelect = (dropdownIndex, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [dropdownIndex]: option,
    }));
    // Reset to first page when filter changes
    setCurrentPage(1);
  };

  // Clear all filters and reset state
  const clearAllFilters = () => {
    setSelectedOptions({});
    setSearchQuery("");
    setCurrentPage(1);
    setOpenDropdown(null);
    setError(null);
    setIsLoading(true);
    setLeaderboardData({ individual: [], team: [] });
    setTopThree({ individual: [], team: [] });
    setTotalPages(1);
    setActiveTab("INDIVIDUAL");
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Reset to first page when search changes
    setCurrentPage(1);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset page and filters when changing tabs
    setCurrentPage(1);
    setSelectedOptions({});
    setSearchQuery("");
  };

  // Format dropdown options from API data
  const dropdowns = [
    {
      label: "Select Tech Stack",
      options: availableFilters.techStacks.length > 0 ?
        availableFilters.techStacks : ["Loading..."],
    },
    {
      label: "Select Language",
      options: availableFilters.languages.length > 0 ?
        availableFilters.languages : ["Loading..."],
    },
    {
      label: "Select Tag",
      options: availableFilters.tags.length > 0 ?
        availableFilters.tags : ["Loading..."],
    },
  ];

  // Current data based on active tab
  const currentData = activeTab === "INDIVIDUAL"
    ? leaderboardData.individual
    : leaderboardData.team;

  // Current top three based on active tab
  const currentTopThree = activeTab === "INDIVIDUAL"
    ? topThree.individual
    : topThree.team;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full p-4"
    >
      <main ref={ref} className="max-w-6xl mx-auto">
        {/* Title and Refresh Button */}
        <div className="flex justify-between items-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-semibold text-cyan-400 text-center"
          >
            <span className="border-b-2 border-cyan-400">LEADERBOARD</span>
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={refreshLeaderboard}
            disabled={isRefreshing || isLoading}
            className="flex items-center gap-2 px-3 py-3 rounded-full text-cyan-400 hover:bg-cyan-950 transition-colors"
            title="Refresh leaderboard data"
          >
            <FaSyncAlt className={`${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        {/* Show initializing or refreshing message */}
        {(isInitializing || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gray-800/80 rounded-full">
              <svg className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-cyan-400 text-sm font-medium">
                {isInitializing ? "Initializing leaderboard data..." : "Refreshing leaderboard data..."}
              </span>
            </div>
          </motion.div>
        )}

        {/* Error message with improved styling if applicable */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${error.includes("Added") ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
              <span className="text-sm font-medium">{error}</span>
            </div>
          </motion.div>
        )}

        {/* Top 3 Teams/Individuals */}
        {isLoading && (!currentTopThree || currentTopThree.length < 3) ? (
          <motion.div className="grid grid-cols-3 gap-4 mt-16 md:gap-8 mb-8 md:mb-12 relative">
            {[1, 2, 3].map((position) => (
              <div key={position} className="flex flex-col items-center relative w-[100px] mx-auto">
                {/* Skeleton for crown */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full md:w-40">
                  <div className="w-[120px] h-[120px] rounded-full bg-gray-700 animate-pulse mb-[11px] ml-[0.4px] md:mt-12 md:w-full md:h-full mt-8"></div>
                </div>

                {/* Skeleton for avatar */}
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-700 rounded-full mb-2 md:mb-4 relative z-0 animate-pulse"></div>

                {/* Skeletons for text */}
                <div className="w-16 h-4 bg-gray-700 rounded animate-pulse mt-2"></div>
                <div className="w-12 h-3 bg-gray-700 rounded animate-pulse mt-2"></div>
              </div>
            ))}
          </motion.div>
        ) : (
          <LeaderboardTop3
            activeTab={activeTab}
            individualData={topThree.individual || []}
            teamData={topThree.team || []}
            isInView={isInView}
          />
        )}

        <hr className="m-10" />

        {/* Toggle Buttons */}
        <LeaderboardToggle
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isInView={isInView}
        />

        {/* Filters and List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 md:gap-12"
        >
          {/* Left Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            {/* Search */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 bg-white bg-opacity-10 rounded-lg text-white 
                placeholder-stone-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </motion.div>

            {/* Dropdowns */}
            {dropdowns.map((dropdown, index) => (
              <motion.div
                key={dropdown.label}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <div
                  onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                  className={`w-full px-4 py-2 bg-white bg-opacity-10 rounded-lg 
                  text-white flex items-center justify-between cursor-pointer 
                  focus:outline-none focus:ring-2 focus:ring-cyan-400 
                  ${availableFilters.techStacks.length === 0 && 'opacity-75 cursor-not-allowed'}`}
                >
                  {selectedOptions[index] || dropdown.label}
                  <motion.div
                    animate={{ rotate: openDropdown === index ? 180 : 0 }}
                  >
                    <FaAngleDown className="ml-2 w-4 h-4" />
                  </motion.div>
                </div>
                {openDropdown === index && dropdown.options.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 w-full mt-1 bg-gray-900 bg-opacity-800 rounded-lg shadow-lg max-h-48 overflow-y-auto no-scrollbar"
                  >
                    {dropdown.options.map((option) => (
                      <motion.div
                        key={option}
                        onClick={() => {
                          handleOptionSelect(index, option);
                          setOpenDropdown(null);
                        }}
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          scale: 1.02,
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 cursor-pointer 
                        text-white transition-all hover:border-2  duration-200 ease-in-out"
                      >
                        {option}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
            {/* Clear All Filters Button - Make sure it's visible with proper margin */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllFilters}
              className="w-full mt-6 px-1 py-2 rounded-xl bg-gradient-to-r bg-cyan-400 text-black font-medium transition-colors cursor-pointer flex items-center justify-center space-x-2 hover:bg-black hover:text-cyan-400 hover:border hover:border-cyan-400"
            >
              Clear All Filters
            </motion.button>
          </div>

          {/* Leaderboard List Container */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1 h-[500px] overflow-y-auto bg-white/5 rounded-lg no-scrollbar"
          >
            {isLoading ? (
              // Skeleton loading for the list
              <div className="h-full p-4 space-y-4">
                {[...Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 
                    bg-gray-700 bg-opacity-30 rounded-lg animate-pulse"
                  >
                    <div className="w-4 md:w-8 h-4 bg-gray-600 rounded"></div>
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-600 rounded-full"></div>
                    <div className="flex-1 h-4 bg-gray-600 rounded"></div>
                    <div className="w-16 h-4 bg-gray-600 rounded"></div>
                  </div>
                ))}
              </div>
            ) : error && !error.includes("Added") ? (
              // Error state (only show if it's not a success message)
              <div className="h-full flex flex-col items-center justify-center p-4">
                <p className="text-red-400 mb-2">{error}</p>
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    setSelectedOptions({});
                    setSearchQuery("");
                    fetchLeaderboardData();
                  }}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500"
                >
                  Retry
                </button>
              </div>
            ) : currentData.length === 0 ? (
              // Empty state
              <div className="h-full flex flex-col items-center justify-center p-4">
                <p className="text-gray-400 mb-2">No leaderboard data found</p>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search criteria</p>
                <button
                  onClick={refreshLeaderboard}
                  disabled={isRefreshing}
                  className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 flex items-center gap-2"
                >
                  <FaSyncAlt className={`${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh Leaderboard
                </button>
              </div>
            ) : (
              // Data loaded successfully
              <LeaderboardList data={currentData} />
            )}
          </motion.div>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-6 gap-2"
          >
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-cyan-400 hover:bg-gray-700"
                }`}
            >
              Prev
            </button>

            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageToShow = totalPages <= 5
                  ? i + 1
                  : currentPage <= 3
                    ? i + 1
                    : currentPage >= totalPages - 2
                      ? totalPages - 4 + i
                      : currentPage - 2 + i;

                return (
                  <button
                    key={pageToShow}
                    onClick={() => setCurrentPage(pageToShow)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${pageToShow === currentPage
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                  >
                    {pageToShow}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-1 text-gray-400">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center justify-center"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-cyan-400 hover:bg-gray-700"
                }`}
            >
              Next
            </button>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
}
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "../../utils/Axios";

const TeamExcellence = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teamDescription, setTeamDescription] = useState("");

  // Fetch team skills and description
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true);
        // Fetch team data to get team skills and description
        const response = await axios.get("/api/v1/team/");

        if (response.data && response.data.success) {
          const teamData = Array.isArray(response.data.data)
            ? response.data.data[0]
            : response.data.data;

          // Get team description
          setTeamDescription(teamData?.TeamDescription || "No team description available.");

          // Process and categorize skills
        } else {
          // Use fallback data if API call fails
          setTeamDescription("Team description is currently unavailable.");
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
        setTeamDescription("Unable to load team description at this moment.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-gray-800/40 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Team Description</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
        </div>
      ) : (
        <>
          {/* Team Description Section */}
          <div className="mb-6 bg-gray-700/20 p-4 rounded-lg">
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {teamDescription}
            </p>
          </div>            
        </>
      )}
    </motion.div>
  );
};

export default TeamExcellence;

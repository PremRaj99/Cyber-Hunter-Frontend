/* eslint-disable react-hooks/rules-of-hooks */
// import React from 'react'
import { useState } from "react";
import { motion } from "framer-motion";
import { FaSyncAlt } from "react-icons/fa"; // Changed from FaSync to FaSyncAlt
import LeaderboardMain from "../../pages/Leaderboard";
import axios from "axios";

const dLeaderBorad = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState(null);

  // Simplified function to manually refresh leaderboard rankings
  const refreshLeaderboardRankings = async () => {
    try {
      setIsRefreshing(true);
      setRefreshMessage("Updating leaderboard rankings...");

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setRefreshMessage("Authentication required");
        return;
      }

      // Update the rankings
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
        setRefreshMessage("Leaderboard rankings updated successfully");

        // Simply set a success message rather than reloading
        setTimeout(() => {
          setRefreshMessage(null);
          // Trigger a refresh in child components via state change
          setIsRefreshing(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error refreshing leaderboard:", error);
      setRefreshMessage(error.response?.data?.message || "Failed to update rankings");
      setTimeout(() => setRefreshMessage(null), 3000);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="dLeaderBoardContainer max-h-[calc(100vh-12rem)] mb-10 no-scrollbar">
      {/* Admin Controls */}
      <div className="flex justify-end mb-4 px-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refreshLeaderboardRankings}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-cyan-400 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FaSyncAlt className={`${isRefreshing ? 'animate-spin' : ''}`} /> {/* Changed to FaSyncAlt */}
          <span>Update Rankings</span>
        </motion.button>
      </div>

      {/* Refresh message */}
      {refreshMessage && (
        <div className="mb-4 px-4">
          <div className={`p-2 rounded-lg ${refreshMessage.includes("success") ? "bg-green-900/30 text-green-400" : "bg-blue-900/30 text-blue-400"} text-sm`}>
            {refreshMessage}
          </div>
        </div>
      )}

      <LeaderboardMain />
    </div>
  );
};

export default dLeaderBorad;



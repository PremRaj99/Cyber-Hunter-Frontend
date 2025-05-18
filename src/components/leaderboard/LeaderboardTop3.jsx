/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import leaduserdemo from "../../assets/leaduserdemo.png";
import { default as goldCrown } from "../../assets/goldCrown.svg";
import { default as silverCrown } from "../../assets/silverCrown.svg";
import { default as bronzeCrown } from "../../assets/bronzeCrown.svg";

export default function LeaderboardTop3({ activeTab, individualData, teamData, isInView }) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
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
      },
    },
  };

  // Ensure we have data for all 3 top positions
  const hasEnoughData =
    activeTab === "INDIVIDUAL"
      ? individualData && individualData.length >= 3
      : teamData && teamData.length >= 3;

  if (!hasEnoughData) {
    return null;
  }

  // Get current data based on tab
  const currentData = activeTab === "INDIVIDUAL" ? individualData : teamData;

  // Arrange positions in the UI order: 2nd, 1st, 3rd
  const positions = [2, 1, 3];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 relative"
    >
      {positions.map((position, index) => {
        // Get the appropriate crown and colors based on position
        let crownSrc = "";
        let namecol = "";
        let pointcol = "";

        if (position === 2) {
          crownSrc = silverCrown;
          namecol = "text-silver-400";
          pointcol = "text-silver-400";
        } else if (position === 1) {
          crownSrc = goldCrown;
          namecol = "text-[#ffd700]";
          pointcol = "text-[#ffd700]";
        } else {
          crownSrc = bronzeCrown;
          namecol = "text-[#cd7f32]";
          pointcol = "text-[#cd7f32]";
        }

        // Get the appropriate data for this position (array is 0-indexed)
        const positionData = currentData[position - 1];

        return (
          <motion.div
            key={`top-${position}`}
            variants={itemVariants}
            className="flex flex-col items-center relative w-[100px] mx-auto"
          >
            {/* Crown SVG */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full md:w-40">
              <img
                src={crownSrc}
                alt={`${position}${position === 1 ? "st" : position === 2 ? "nd" : "rd"} place crown`}
                className="w-[120px] h-[120px] mb-[11px] ml-[0.4px] md:mt-12 md:w-full md:h-full object-cover mt-8"
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-16 h-16 md:w-24 md:h-24 bg-indigo-800 rounded-full mb-2 md:mb-4 relative z-0 overflow-hidden"
            >
              <img
                src={positionData.profilePicture || leaduserdemo}
                alt={positionData.name || "User"}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = leaduserdemo;
                }}
              />
            </motion.div>

            <p className={`text-white text-sm md:text-base text-center mt-2 ${namecol}`}>
              {positionData.name || "User"}
            </p>

            <p className={`text-gray-400 text-xs md:text-sm ${pointcol}`}>
              {positionData.points || 0} Points
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

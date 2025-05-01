/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const TeamAchievements = ({ isMobile = false }) => {
  // Animation variants
  const hoverScale = {
    scale: 1.05,
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-gray-800/40 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50"
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-white">
          {isMobile ? "Achievements" : "Team Achievements"}
        </h2>
      </div>
      <div
        className={`flex overflow-x-auto no-scrollbar gap-${isMobile ? '4' : '6'} pb-2`}
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {["gold", "green", "purple", "silver", "orange", "cyan"].map((color, index) => (
          <motion.div
            key={index}
            whileHover={hoverScale}
            className={`flex-shrink-0 w-${isMobile ? '14' : '16'} h-${isMobile ? '14' : '16'} rounded-full border-2 ${color === "gold"
                ? "border-yellow-400 bg-yellow-400/10"
                : color === "green"
                  ? "border-green-400 bg-green-400/10"
                  : color === "purple"
                    ? "border-purple-400 bg-purple-400/10"
                    : color === "silver"
                      ? "border-gray-400 bg-gray-400/10"
                      : color === "orange"
                        ? "border-orange-400 bg-orange-400/10"
                        : "border-cyan-400 bg-cyan-400/10"
              } flex items-center justify-center relative group`}
          >
            <div className={`w-${isMobile ? '10' : '12'} h-${isMobile ? '10' : '12'} rounded-full bg-gray-700/50 flex items-center justify-center`}>
              <span className={`text-${isMobile ? 'xs' : 'sm'} font-bold ${color === "gold" ? "text-yellow-400" :
                  color === "green" ? "text-green-400" :
                    color === "purple" ? "text-purple-400" :
                      color === "silver" ? "text-gray-400" :
                        color === "orange" ? "text-orange-400" :
                          "text-cyan-400"
                }`}>{index + 1}</span>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap">
              {color.charAt(0).toUpperCase() + color.slice(1)} Badge
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamAchievements;

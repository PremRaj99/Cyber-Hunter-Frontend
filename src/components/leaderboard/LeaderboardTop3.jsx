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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 relative"
    >
      {[2, 1, 3].map((rank) => {
        let crownSrc = "";
        let namecol = "";
        let pointcol = "";
        if (rank === 2) {
          crownSrc = silverCrown;
          namecol = "text-silver-400";
          pointcol = "text-silver-400";
        } else if (rank === 1) {
          crownSrc = goldCrown;
          namecol = "text-[#ffd700]";
          pointcol = "text-[#ffd700]";
        } else {
          crownSrc = bronzeCrown;
          namecol = "text-[#cd7f32]";
          pointcol = "text-[#cd7f32]";
        }

        return (
          <motion.div
            key={rank}
            variants={itemVariants}
            className="flex flex-col items-center relative w-[100px] mx-auto"
          >
            {/* Crown SVG */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full md:w-40">
              <img
                src={crownSrc}
                alt={`${rank}${rank === 1 ? "st" : rank === 2 ? "nd" : "rd"} place crown`}
                className="w-[120px] h-[120px] mb-[11px] ml-[0.4px] md:mt-12 md:w-full md:h-full object-cover mt-8"
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-16 h-16 md:w-24 md:h-24 bg-indigo-800 rounded-full mb-2 md:mb-4 relative z-0"
            >
              <img
                src={leaduserdemo}
                alt="Team Logo"
                className={`w-full h-full rounded-full`}
              />
            </motion.div>
            <p
              className={`text-white text-sm md:text-base text-center mt-2 ${namecol}`}
            >
              {activeTab === "INDIVIDUAL"
                ? individualData[rank - 1].name
                : teamData[rank - 1].name}
            </p>
            <p className={`text-gray-400 text-xs md:text-sm ${pointcol}`}>
              {activeTab === "INDIVIDUAL"
                ? `${individualData[rank - 1].points} Points`
                : `${teamData[rank - 1].points} Points`}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

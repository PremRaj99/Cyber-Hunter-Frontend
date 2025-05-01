/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export default function LeaderboardToggle({ activeTab, setActiveTab, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-center mb-8 border-2 border-cyan-400 rounded-full md:mx-40 overflow-hidden mx-18 transition-all ease-in duration-300"
    >
      <button
        onClick={() => setActiveTab("INDIVIDUAL")}
        className={`flex-1 px-8 md:px-8 py-2 font-bold transition-colors 
        ${activeTab === "INDIVIDUAL"
            ? "bg-cyan-400 text-black"
            : "bg-transparent text-white hover:bg-white/10"
          }`}
      >
        INDIVIDUAL
      </button>
      <button
        onClick={() => setActiveTab("TEAM")}
        className={`flex-1 px-8 md:px-10 py-2 md:py-2 font-bold transition-colors 
        ${activeTab === "TEAM"
            ? "bg-cyan-400 text-black"
            : "bg-transparent text-white hover:bg-white/10"
          }`}
      >
        TEAM
      </button>
    </motion.div>
  );
}

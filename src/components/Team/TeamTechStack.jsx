/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const TeamTechStack = ({ technologies = [], containerVariants }) => {
  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const hoverScale = {
    scale: 1.05,
  };

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="rounded-xl bg-gray-800/40 shadow-lg backdrop-blur-sm border border-gray-700/50 p-4 h-[715px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Tech Stack</h2>
      </div>
      <div className="max-h-[700px] overflow-y-auto pr-2 no-scrollbar">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={hoverScale}
              className="aspect-square bg-gray-700/30 rounded-xl flex items-center justify-center text-sm relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-brandPrimary/0 group-hover:bg-brandPrimary/10 transition-all duration-300"></div>
              <span className="relative z-10 font-medium">{tech}</span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brandPrimary to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamTechStack;
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import TechStack from "../Common/TechStackItem";

const TechStackSection = ({ isLoading, tech, containerVariants, itemVariants }) => {
  return (
    <motion.div
      className="max-h-[700px] overflow-y-auto no-scrollbar rounded-xl bg-gray-800/60 border border-gray-700/50 backdrop-blur-lg"
      variants={itemVariants}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : tech && tech.length > 0 ? (
        <motion.div
          className="flex items-center gap-8"
          variants={containerVariants}
        >
          <TechStack techstack={tech} />
        </motion.div>
      ) : (
        <NoTechStackMessage itemVariants={itemVariants} />
      )}
    </motion.div>
  );
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-[300px]">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
  </div>
);

const NoTechStackMessage = ({ itemVariants }) => (
  <motion.div
    className="flex flex-col items-center justify-center h-[200px]"
    variants={itemVariants}
  >
    <svg
      className="w-12 h-12 text-gray-500 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
    <p className="text-gray-400 text-center mb-2">
      No technologies found
    </p>
    <p className="text-gray-500 text-sm text-center">
      Add some technologies to showcase your skills
    </p>
  </motion.div>
);

export default TechStackSection;

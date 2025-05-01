import { motion } from "framer-motion";

const TeamProjectHeader = () => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-3xl md:text-4xl font-bold text-white text-center mb-20"
    >
      <div className="border-b-4 border-brandPrimary w-max mx-auto pb-2">
        <span className="text-brandPrimary">Add </span>
        Project
      </div>
      <div className="text-lg text-gray-400 mt-2">
        <h5>
          Showcase your Experience and Skills by adding a new project
        </h5>
      </div>
    </motion.h1>
  );
};

export default TeamProjectHeader;

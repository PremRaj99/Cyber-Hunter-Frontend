// import React from 'react';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { FaCode, FaTags } from "react-icons/fa";

const TechStackCard = ({ project }) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-brandPrimary/20 rounded-full p-3">
          <FaCode className="text-cyan-400 text-xl" />
        </div>
        <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.techStack?.map((tech, index) => (
          <motion.div
            key={tech._id || `tech-${index}`}
            className="bg-gray-700/70 text-cyan-400 px-4 py-2 rounded-full text-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            {tech.content}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-6">
        <div className="bg-brandPrimary/20 rounded-full p-3 items-center">
          <FaTags className="text-cyan-400 text-xl" />
        </div>
        <h3 className="text-2xl font-semibold text-white mt-6 mb-6">Languages</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.language?.map((lang, index) => (
          <motion.div
            key={`lang-${index}`}
            className="bg-gray-700/70 text-cyan-400 px-4 py-2 rounded-full text-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            #{lang.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

TechStackCard.propTypes = {
  project: PropTypes.object.isRequired,
};

export default TechStackCard;

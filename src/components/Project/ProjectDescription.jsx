// import React from 'react';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import ImageSlider from "./ImageSlider";

const ProjectDescription = ({ project, className }) => {
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className={className}
    >
      <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 mb-8 border border-gray-700/50 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-brandPrimary/20 rounded-full p-3">
            <FaCode className="text-cyan-400 text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-white">Project Description</h2>
        </div>
        <p className="text-white leading-relaxed">
          {project.projectDescription}
        </p>
      </div>

      <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Project Screenshots</h2>
        <ImageSlider images={project.projectImage || []} />
      </div>
    </motion.div>
  );
};

ProjectDescription.propTypes = {
  project: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default ProjectDescription;

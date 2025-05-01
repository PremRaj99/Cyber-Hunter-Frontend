// import React from 'react';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaTags,
  FaCalendarAlt,
} from "react-icons/fa";

const ProjectHero = ({ project, formatCreatedAt }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800/100 to-transparent z-10" />
      <img
        src={project.projectThumbnail}
        alt={project.projectName}
        className="w-full h-[60vh] object-cover object-center"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            {project.projectName}
          </h1>
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaTags className="text-cyan-400" />
              <span className="text-white">
                Points: <span className="text-cyan-400 font-semibold">{project.point}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaCalendarAlt className="text-cyan-400" />
              <span className="text-white text-sm">{formatCreatedAt(project.createdAt)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {project.gitHubLink && (
              <motion.a
                href={project.gitHubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800/70 hover:bg-gray-700/90 backdrop-blur-sm px-6 py-3 rounded-full text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGithub className="text-xl" />
                View on GitHub
              </motion.a>
            )}

            {project.liveLink && (
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-cyan-600/90 hover:bg-cyan-700 backdrop-blur-sm px-6 py-3 rounded-full text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaExternalLinkAlt />
                Live Demo
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

ProjectHero.propTypes = {
  project: PropTypes.object.isRequired,
  formatCreatedAt: PropTypes.func.isRequired,
};

export default ProjectHero;

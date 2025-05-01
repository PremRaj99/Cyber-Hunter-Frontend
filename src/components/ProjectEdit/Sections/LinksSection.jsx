import { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { ProjectEditContext } from '../../../pages/EditProject';
import { TeamProjectEditContext } from '../../../pages/EditTeamProject';

const LinksSection = () => {
  // Try to get context from either ProjectEditContext or TeamProjectEditContext
  const projectContext = useContext(ProjectEditContext);
  const teamProjectContext = useContext(TeamProjectEditContext);

  // Use whichever context is available
  const context = projectContext || teamProjectContext;

  // If no context is available, show error
  if (!context) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        <p className="text-red-400">Error: Context not available. Make sure this component is used within a ProjectEditContext or TeamProjectEditContext provider.</p>
      </div>
    );
  }

  const { project, handleInputChange } = context;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Project Links</h2>

      <div className="space-y-6">
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            <FaGithub className="text-xl" />
            GitHub Repository URL
          </label>
          <input
            type="url"
            value={project.gitHubLink || ""}
            onChange={(e) => handleInputChange(e, "gitHubLink")}
            placeholder="https://github.com/username/repo"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-white"
          />
        </div>

        <div className="group">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            <FaExternalLinkAlt className="text-xl text-red-500" />
            Live Project URL
          </label>
          <input
            type="url"
            value={project.liveLink || ""}
            onChange={(e) => handleInputChange(e, "liveLink")}
            placeholder="https://your-project-url.com"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-white"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LinksSection;

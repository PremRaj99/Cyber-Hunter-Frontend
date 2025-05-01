import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ProjectEditContext } from '../../../pages/EditProject';
import { TeamProjectEditContext } from '../../../pages/EditTeamProject';

const DescriptionSection = () => {
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
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Project Description</h2>

      <div className="group">
        <label className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
          Description
        </label>
        <textarea
          value={project.projectDescription}
          onChange={(e) => handleInputChange(e, "projectDescription")}
          rows="8"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-white resize-none no-scrollbar"
          placeholder="Describe your project in detail..."
        ></textarea>
      </div>
    </motion.div>
  );
};

export default DescriptionSection;

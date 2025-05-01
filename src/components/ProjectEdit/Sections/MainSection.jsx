import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ProjectEditContext } from '../../../pages/EditProject';
import { TeamProjectEditContext } from '../../../pages/EditTeamProject';

const MainSection = () => {
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

  const { project, projectUser, formatCreatedAt, handleInputChange } = context;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Project Details</h2>

      <div className="space-y-6">
        <div className="group">
          <label className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            Project Name
          </label>
          <input
            type="text"
            value={project.projectName}
            onChange={(e) => handleInputChange(e, "projectName")}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-xl font-semibold text-white"
          />
        </div>

        <div className="group">
          <label className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            Project Points
          </label>
          <div className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-green-500 font-semibold">
            {project.point || 0}
          </div>
        </div>

        <div>
          <p className="text-white text-sm">
            Created at: {formatCreatedAt(project.createdAt)}
          </p>
        </div>

        {projectUser && (
          <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4">
            <img
              src={projectUser.profilePicture || "default-profile-picture-url"}
              className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
              alt={projectUser.name}
              draggable={false}
            />
            <div>
              <h4 className="text-xl font-semibold text-cyan-400">{projectUser.name}</h4>
              <p className="text-white text-sm">{projectUser.username}</p>
              <p className="text-gray-400 text-xs">
                {`${projectUser.course} ${projectUser.branch} ${projectUser.session}`}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MainSection;

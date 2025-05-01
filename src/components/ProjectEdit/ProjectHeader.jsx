import { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft } from 'react-icons/fa';
import { ProjectEditContext } from '../../pages/EditProject';
import { TeamProjectEditContext } from '../../pages/EditTeamProject';

export default function ProjectHeader() {
  // Try both contexts
  const projectContext = useContext(ProjectEditContext);
  const teamContext = useContext(TeamProjectEditContext);

  // Use whichever context is available
  const context = projectContext || teamContext;

  if (!context) {
    return (
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Edit Project</h1>
      </div>
    );
  }

  const { navigate, project } = context;
  const isTeamProject = !!teamContext;

  return (
    <div className="mb-8 flex items-center gap-4">
      <motion.button
        onClick={() => navigate(isTeamProject ? `/dashboard/team/viewproject` : '/dashboard')}
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Go back"
      >
        <FaChevronLeft size={16} />
      </motion.button>

      <h1 className="text-3xl font-bold text-white">
        Edit {isTeamProject ? 'Team ' : ''}Project
        {project && (
          <span className="text-cyan-400 ml-2">
            {project.projectName}
          </span>
        )}
      </h1>
    </div>
  );
}

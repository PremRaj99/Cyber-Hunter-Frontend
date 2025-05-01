// import React from 'react';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
// import { FaCode, FaTags } from "react-icons/fa";
import CreatorCard from './CreatorCard';
import TechStackCard from './TechStackCard';
import ProjectStatsCard from './ProjectStatsCard';

const ProjectSidebar = ({ project, projectUser, formatCreatedAt }) => {
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="flex flex-col gap-8"
    >
      {/* Creator card */}
      {projectUser && <CreatorCard user={projectUser} />}

      {/* Tech stack card */}
      <TechStackCard project={project} />

      {/* Stats card */}
      <ProjectStatsCard
        project={project}
        formatCreatedAt={formatCreatedAt}
      />
    </motion.div>
  );
};

ProjectSidebar.propTypes = {
  project: PropTypes.object.isRequired,
  projectUser: PropTypes.object,
  formatCreatedAt: PropTypes.func.isRequired,
};

export default ProjectSidebar;

// import React from 'react';
import PropTypes from 'prop-types';

const ProjectStatsCard = ({ project, formatCreatedAt }) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Project Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700/60 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">Points</p>
          <p className="text-2xl font-bold text-cyan-400">{project.point}</p>
        </div>
        <div className="bg-gray-700/60 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">Screenshots</p>
          <p className="text-2xl font-bold text-cyan-400">{project.projectImage?.length || 0}</p>
        </div>
        <div className="bg-gray-700/60 rounded-xl p-4 col-span-2">
          <p className="text-gray-400 text-sm mb-1">Created</p>
          <p className="text-xl font-semibold text-white">{formatCreatedAt(project.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

ProjectStatsCard.propTypes = {
  project: PropTypes.object.isRequired,
  formatCreatedAt: PropTypes.func.isRequired,
};

export default ProjectStatsCard;

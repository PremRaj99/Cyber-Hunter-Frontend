/* eslint-disable react/prop-types */
// import React from 'react';

const NoTeamDisplay = ({ onCreateTeam }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <p className="text-xl mb-4 text-gray-300">You are not part of any team yet.</p>
        <button
          onClick={onCreateTeam}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 inline-block"
        >
          Create or Join a Team
        </button>
      </div>
    </div>
  );
};

export default NoTeamDisplay;

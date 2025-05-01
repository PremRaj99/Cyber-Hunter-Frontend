// import React from 'react';
import PropTypes from 'prop-types';

const CreatorCard = ({ user }) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Creator</h2>
      <div className="flex items-center gap-4">
        <img
          src={user.profilePicture || "/default-avatar.png"}
          className="w-20 h-20 rounded-full object-cover border-2 border-cyan-400 shadow-lg"
          alt={user.name}
          draggable={false}
        />
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{user.name}</h3>
          <p className="text-cyan-400">@{user.username}</p>
          <p className="text-gray-400 text-sm mt-2">
            {`${user.course} ${user.branch}`}
          </p>
          <p className="text-gray-400 text-sm">
            {`${user.session} • ${user.qId}`}
          </p>
        </div>
      </div>
    </div>
  );
};

CreatorCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default CreatorCard;

import React, { useState } from 'react';

export default function CreateTeamPopUp({ newTeamName, setNewTeamName, setIsFormVisible, handleCreateTeam, teamLeader, setTeamLeader, member1, setMember1, member2, setMember4, setTeamLogo }) {

  const [teamDescription, setTeamDescription] = useState("");

  return (
      <div onSubmit={handleCreateTeam}>
        <div className="mb-4">
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-300 mb-2">
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="teamDescription" className="block text-sm font-medium text-gray-300 mb-2">
            Team Description
          </label>
          <textarea
            id="teamDescription"
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="teamLeader" className="block text-sm font-medium text-gray-300 mb-2">
            Team Leader
          </label>
          <input
            type="text"
            id="teamLeader"
            value={teamLeader}
            onChange={(e) => setTeamLeader(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="member1" className="block text-sm font-medium text-gray-300 mb-2">
            Member 1
          </label>
          <input
            type="text"
            id="member1"
            value={member1}
            onChange={(e) => setMember1(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="member4" className="block text-sm font-medium text-gray-300 mb-2">
            Member 2
          </label>
          <input
            type="text"
            id="member4"
            value={member2}
            onChange={(e) => setMember4(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="teamLogo" className="block text-sm font-medium text-gray-300 mb-2">
            Upload Team Logo (Optional)
          </label>
          <input
            type="file"
            id="teamLogo"
            onChange={(e) => setTeamLogo(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsFormVisible(false)}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-400 text-black rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
          >
            Create Team
          </button>
        </div>
      </div>
  );
}

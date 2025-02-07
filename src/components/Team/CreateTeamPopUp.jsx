import React, { useState } from 'react';

export default function CreateTeamPopUp({ newTeamName, setNewTeamName, setIsFormVisible, handleCreateTeam, teamLeader, setTeamLeader, member1, setMember1, member2, setMember4, setTeamLogo }) {
  const [fileName, setFileName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
  };

  return (
    <>
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
      <div className="mb-6">
        <label
          htmlFor="teamLogo"
          className="block text-sm font-medium text-gray-200 mb-2"
        >
          Upload Team Logo <span className="text-gray-400">(Optional)</span>
        </label>
        <div className="relative group">
          <input
            type="file"
            id="teamLogo"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="flex items-center justify-center px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 group-hover:bg-gray-700 group-hover:border-cyan-400 transition duration-300">
            <span className="text-sm">{ fileName || "choose file" }</span>
          </div>
        </div>
      </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsFormVisible(false)}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white focus:outline-none bg-black rounded-md font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-400 text-black rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 font-semibold transition duration-300"
          > 
            Create Team
          </button>
        </div>
    </>
  );
}

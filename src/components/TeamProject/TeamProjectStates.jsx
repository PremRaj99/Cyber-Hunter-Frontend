/* eslint-disable react/prop-types */
// import React from "react";

export const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-gray-300">Loading your team information...</p>
  </div>
);

export const NoTeamState = ({ navigate }) => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 max-w-md">
      <h2 className="text-2xl font-bold text-red-400 mb-4">No Team Found</h2>
      <p className="text-gray-300 mb-6">
        You need to be part of a team to create a team project. Please join or create a team first.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          Back to Dashboard
        </button>
        <button
          onClick={() => navigate("/dashboard/team/create")}
          className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500"
        >
          Create/Join Team
        </button>
      </div>
    </div>
  </div>
);

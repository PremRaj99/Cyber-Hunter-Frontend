import React from 'react';
import Preloader from "../Common/Preloader";

export const LoadingState = () => {
  return <Preloader />;
};

export const ErrorState = ({ error, navigate }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-800/50 rounded-lg p-8 max-w-md text-center">
        <h2 className="text-2xl text-red-400 mb-4">Error</h2>
        <p className="text-gray-300 mb-6">{error || "Project not found"}</p>
        <button
          onClick={() => navigate("/dashboard/team")}
          className="px-6 py-2 bg-brandPrimary text-black rounded-lg hover:bg-transparent hover:text-brandPrimary hover:border hover:border-brandPrimary transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

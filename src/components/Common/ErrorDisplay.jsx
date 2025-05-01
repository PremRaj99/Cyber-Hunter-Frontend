/* eslint-disable react/prop-types */
// import React from 'react';

const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-red-400 text-center">
        <p className="text-xl mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-cyan-800 text-white rounded-lg hover:bg-cyan-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;

// import React from 'react';
import PropTypes from 'prop-types';

const ProjectNotFound = ({ navigate }) => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-black p-4">
      {/* Main container */}
      <div className="relative w-full max-w-lg mx-auto">
        {/* Decorative elements */}
        <div className="absolute -top-20 left-1/2 w-32 h-32 bg-cyan-500 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-20 right-1/2 w-32 h-32 bg-cyan-500 rounded-full opacity-20 blur-xl"></div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-300 opacity-50 blur-lg transform -rotate-1"></div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-cyan-500 to-cyan-300 opacity-50 blur-lg transform rotate-1"></div>

        {/* Content card */}
        <div className="relative bg-black border border-cyan-500/30 rounded-2xl shadow-2xl p-8 overflow-hidden">
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#0e7490_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

          {/* 404 background text */}
          <div className="absolute -right-4 -top-6 text-9xl font-black text-cyan-500 opacity-10">404</div>

          {/* Main content */}
          <div className="relative">
            <div className="flex items-center mb-2">
              <div className="h-px w-8 bg-cyan-500 mr-4"></div>
              <span className="text-cyan-500 uppercase text-sm tracking-widest">Error</span>
            </div>

            <h2 className="text-5xl font-extrabold text-white mb-2">
              Project <span className="text-cyan-400">Not Found</span>
            </h2>

            <div className="h-1 w-20 bg-cyan-500 rounded-full mt-2 mb-6"></div>

            <p className="text-gray-400 mb-8">
              The project you&apos;re looking for doesn&apos;t exist or has been moved to another dimension.
            </p>

            {/* Back button with cyan hover effect */}
            <button
              onClick={() => navigate(-1)}
              className="group relative flex items-center bg-black text-cyan-400 border border-cyan-500/50 rounded-lg px-6 py-3 overflow-hidden transition-all duration-300 hover:bg-cyan-500 hover:text-black focus:outline-none"
            >
              <span className="absolute inset-0 w-0 bg-cyan-500 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative flex items-center font-medium">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Home
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectNotFound.propTypes = {
  navigate: PropTypes.func.isRequired
};

export default ProjectNotFound;

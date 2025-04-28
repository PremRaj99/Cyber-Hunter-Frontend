/* eslint-disable no-unused-vars */
import React from 'react';

export default function ServiceCard({ service, key }) {
  return (
    <div className="w-full sm:max-w-sm p-2 sm:p-4">
      <div
        className="relative overflow-hidden bg-black border-cyan-500 border-2 rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 group"
        key={key}
      >
        {/* Glowing accent in the corner */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-500/30 transition-all duration-300"></div>
        
        {/* Content container with gradient overlay */}
        <div className="relative z-10 p-5 sm:p-6">
          {/* Icon with glowing effect */}
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-5 border border-cyan-500/50 shadow-inner shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <svg
              className="w-6 h-6 text-cyan-500 group-hover:text-cyan-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          
          {/* Title with hover effect */}
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-cyan-500 group-hover:text-cyan-400 transition-colors duration-300">
            {service.title}
          </h3>
          
          {/* Description with improved contrast */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {service.description}
          </p>
          
          {/* Subtle divider line */}
          <div className="h-px w-1/4 bg-gradient-to-r from-cyan-500/0 via-cyan-500/70 to-cyan-500/0 my-4"></div>
          
          {/* Learn more link */}
          <div className="pt-2">
            <span className="inline-flex items-center text-sm text-cyan-500 group-hover:text-cyan-400 transition-all duration-300 cursor-pointer">
              Learn more
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
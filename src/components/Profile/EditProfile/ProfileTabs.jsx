/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex mb-6 border-b border-gray-700">
      <button
        type="button"
        onClick={() => setActiveTab("basic")}
        className={`px-4 py-2 ${
          activeTab === "basic"
            ? "text-cyan-400 border-b-2 border-cyan-400"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Basic Info
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("education")}
        className={`px-4 py-2 ${
          activeTab === "education"
            ? "text-cyan-400 border-b-2 border-cyan-400"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Education
      </button>
      <button
        type="button"
        onClick={() => setActiveTab("social")}
        className={`px-4 py-2 ${
          activeTab === "social"
            ? "text-cyan-400 border-b-2 border-cyan-400"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Social
      </button>
    </div>
  );
};

export default ProfileTabs;

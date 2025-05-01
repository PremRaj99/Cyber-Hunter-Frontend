/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("individual");
  const [selectedFilters, setSelectedFilters] = useState({});

  const individualData = [
    {
      rank: 1,
      name: "John Doe",
      points: 1250,
      techStack: "React",
      language: "JavaScript",
    },
    {
      rank: 2,
      name: "Jane Smith",
      points: 1180,
      techStack: "Vue",
      language: "TypeScript",
    },
    {
      rank: 3,
      name: "Alex Johnson",
      points: 1100,
      techStack: "Angular",
      language: "Python",
    },
    {
      rank: 4,
      name: "Sam Williams",
      points: 1050,
      techStack: "Svelte",
      language: "Go",
    },
    {
      rank: 5,
      name: "Emily Brown",
      points: 1000,
      techStack: "React Native",
      language: "Kotlin",
    },
    {
      rank: 6,
      name: "Michael Lee",
      points: 950,
      techStack: "Flutter",
      language: "Dart",
    },
    {
      rank: 7,
      name: "Sarah Kim",
      points: 900,
      techStack: "Node.js",
      language: "TypeScript",
    },
    {
      rank: 8,
      name: "Sarah Kim",
      points: 900,
      techStack: "Node.js",
      language: "TypeScript",
    },
    {
      rank: 9,
      name: "Sarah Kim",
      points: 900,
      techStack: "Node.js",
      language: "TypeScript",
    },
  ];

  const teamData = [
    {
      rank: 1,
      name: "Tech Titans",
      points: 3500,
      techStack: "Full Stack",
      members: 5,
    },
    {
      rank: 2,
      name: "Code Crushers",
      points: 3250,
      techStack: "Backend",
      members: 4,
    },
    {
      rank: 3,
      name: "Byte Breakers",
      points: 3100,
      techStack: "Frontend",
      members: 6,
    },
    {
      rank: 4,
      name: "Algo Architects",
      points: 2950,
      techStack: "ML",
      members: 3,
    },
    {
      rank: 5,
      name: "Cloud Coders",
      points: 2800,
      techStack: "Cloud",
      members: 4,
    },
    {
      rank: 6,
      name: "Data Dynamos",
      points: 2650,
      techStack: "Data Science",
      members: 5,
    },
    {
      rank: 7,
      name: "Web Warriors",
      points: 2500,
      techStack: "Web Dev",
      members: 6,
    },
    {
      rank: 8,
      name: "Mobile Mavericks",
      points: 2350,
      techStack: "Mobile",
      members: 3,
    },
    {
      rank: 9,
      name: "Security Sentinels",
      points: 2200,
      techStack: "Cybersecurity",
      members: 4,
    },
    {
      rank: 10,
      name: "AI Innovators",
      points: 2050,
      techStack: "AI/ML",
      members: 5,
    },
  ];

  // Dropdown options
  const dropdowns = [
    {
      label: "Select Tech Stack",
      options: ["React", "Vue", "Angular", "Svelte", "Node.js"],
    },
    {
      label: "Select Language",
      options: ["JavaScript", "TypeScript", "Python", "Go", "Rust"],
    },
    {
      label: "Select Tag",
      options: ["Open Source", "Machine Learning", "Web Dev", "Mobile App"],
    },
  ];

  // Render leaderboard content
  const renderLeaderboard = () => {
    const data = activeTab === "individual" ? individualData : teamData;

    return (
      <div className="mt-6">
        <table className="min-w-full">
          {/* Table content would go here */}
          <thead>
            <tr>
              {/* Table headers */}
            </tr>
          </thead>
          <tbody>
            {/* Table rows */}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Leaderboard</h1>

      {/* Tab switching */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'individual' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('individual')}
        >
          Individual
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'team' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveTab('team')}
        >
          Team
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {dropdowns.map((dropdown, index) => (
          <div key={index} className="relative">
            {/* Dropdown UI */}
          </div>
        ))}
      </div>

      {/* Leaderboard table */}
      {renderLeaderboard()}
    </div>
  );
}
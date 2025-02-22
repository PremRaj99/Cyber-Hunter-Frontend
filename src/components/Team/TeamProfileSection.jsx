import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitterSquare, FaInstagram } from "react-icons/fa";

const TeamProfileSection = () => {
  const [activeTab, setActiveTab] = useState("members");

  const teamMembers = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Frontend Developer",
      avatar: "https://i.pravatar.cc/150?img=21",
      status: "Active",
      points: 850,
      skills: ["React", "Tailwind CSS", "TypeScript"],
      social: {
        github: "https://github.com/alexrivera",
        linkedin: "https://linkedin.com/in/alexrivera",
        twitter: "https://twitter.com/alexrivera",
      }
    },
    {
      id: 2,
      name: "Taylor Wong",
      role: "Backend Developer",
      avatar: "https://i.pravatar.cc/150?img=22",
      status: "Active",
      points: 720,
      skills: ["Node.js", "Express", "MongoDB"],
      social: {
        github: "https://github.com/taylorwong",
        linkedin: "https://linkedin.com/in/taylorwong",
      }
    },
    {
      id: 3,
      name: "Jamie Chen",
      role: "UI/UX Designer",
      avatar: "https://i.pravatar.cc/150?img=23",
      status: "Away",
      points: 690,
      skills: ["Figma", "Adobe XD", "Sketch"],
      social: {
        github: "https://github.com/jamiechen",
        dribbble: "https://dribbble.com/jamiechen",
        instagram: "https://instagram.com/jamiechen",
      }
    },
    {
      id: 4,
      name: "Jordan Smith",
      role: "Project Manager",
      avatar: "https://i.pravatar.cc/150?img=24",
      status: "Active",
      points: 910,
      skills: ["Agile", "Scrum", "Jira"],
      social: {
        linkedin: "https://linkedin.com/in/jordansmith",
        twitter: "https://twitter.com/jordansmith",
      }
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const SocialIcon = ({ platform, url }) => {
    if (!url) return null;

    const iconMap = {
      github: <FaGithub />,
      linkedin: <FaLinkedin />,
      twitter: <FaTwitterSquare />,
      instagram: <FaInstagram />,
      dribbble: <FaGithub />, // Using GitHub as fallback for unsupported icons
    };

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
      >
        {iconMap[platform] || <FaGithub />}
      </a>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Team Header with Logo and Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 border-b border-gray-700/50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-24 h-24 bg-gradient-to-br from-brandPrimary to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">TS</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">TeamSync</h2>
              <p className="text-gray-400 text-sm">Developer Team</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-cyan-400 font-semibold text-lg">{teamMembers.reduce((total, member) => total + member.points, 0)} pts</span>
            <span className="text-xs text-gray-400">Total Points</span>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex border-b border-gray-700/50"
      >
        <button
          onClick={() => setActiveTab("members")}
          className={`flex-1 py-3 font-medium text-sm transition-colors duration-300 ${activeTab === "members"
            ? "text-cyan-400 border-b-2 border-cyan-400"
            : "text-gray-400 hover:text-gray-200"
            }`}
        >
          Team Members
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex-1 py-3 font-medium text-sm transition-colors duration-300 ${activeTab === "stats"
            ? "text-cyan-400 border-b-2 border-cyan-400"
            : "text-gray-400 hover:text-gray-200"
            }`}
        >
          Team Stats
        </button>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {activeTab === "members" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative bg-gray-800/40 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm group"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{member.name}</h3>
                        <p className="text-gray-400 text-sm">{member.role}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-cyan-400 font-semibold">{member.points} pts</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${member.status === "Active"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-yellow-400/10 text-yellow-400"
                          }`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded content on hover/focus (for desktop) or tap (for mobile) */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-700/50 overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {member.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-3 text-lg">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <SocialIcon key={platform} platform={platform} url={url} />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "stats" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Activity Stats */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Activity</h3>
              <div className="space-y-3">
                {['Commit Frequency', 'Code Reviews', 'Task Completion', 'Meeting Attendance'].map((metric, index) => (
                  <div key={index} className="bg-gray-700/30 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white">{metric}</span>
                      <span className="text-sm text-cyan-400 font-medium">{90 - index * 8}%</span>
                    </div>
                    <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${90 - index * 8}%` }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        className="bg-cyan-400 h-full rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Projects</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total', value: '7' },
                  { label: 'Completed', value: '4' },
                  { label: 'Success Rate', value: '85%' },
                  { label: 'Avg. Score', value: '4.2/5' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                    className="bg-gray-700/30 p-4 rounded-lg flex flex-col items-center justify-center text-center"
                  >
                    <span className="text-sm text-gray-400">{stat.label}</span>
                    <span className="text-xl font-bold text-cyan-400 mt-1">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer with Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-4 border-t border-gray-700/50 flex justify-end items-center"
      >
        <button className="px-4 py-1.5 bg-brandPrimary hover:bg-cyan-600 text-black  text-sm rounded-lg transition-colors duration-300">
          Message Team
        </button>
      </motion.div>
    </div>
  );
};

export default TeamProfileSection;
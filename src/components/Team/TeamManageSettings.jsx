import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Check, Plus, Trash2, GitBranch, Users, Code, GanttChart, Award, Save } from 'lucide-react';
import AddTeamMember from './AddTeamMember';
import TeamTechStack from './TeamTechStack';
import { Upload } from 'lucide-react';
import { RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamManageSettings = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Frontend Developer', image: '/api/placeholder/100/100' },
    { id: 2, name: 'Jane Smith', role: 'Backend Developer', image: '/api/placeholder/100/100' }
  ]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamName: 'Dream Team',
    description: 'A passionate group of developers crafting innovative solutions.',
    techStack: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    interests: ['Web Development', 'AI/ML', 'Cloud Computing'],
    achievements: [
      { title: 'Best Team 2024', date: '2024-01' },
      { title: 'Innovation Award', date: '2023-12' }
    ],
    projects: [
      { name: 'Project Alpha', status: 'In Progress', completion: 75 },
      { name: 'Project Beta', status: 'Planning', completion: 25 }
    ]
  });

  const tabs = [
    { id: 'overview', icon: Users, label: 'Overview' },
    { id: 'members', icon: GitBranch, label: 'Members' },
    { id: 'tech', icon: Code, label: 'Tech Stack' },
    { id: 'projects', icon: GanttChart, label: 'Projects' },
    { id: 'achievements', icon: Award, label: 'Achievements' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const handleImageEnter = () => {
    setFormData({ ...formData, isHoveringImage: true });
  };

  const handleImageLeave = () => {
    setFormData({ ...formData, isHoveringImage: false });
  };

  const removeImage = () => {
    setFormData({ ...formData, teamImage: null });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-1 gap-6"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className=" rounded-2xl border border-gray-800 p-8 w-full  shadow-xl "
            >
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-white mb-8"
              >
                Basic Information
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Upload Section */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-3"
                >
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Team Logo
                  </label>
                  <div className="flex flex-col items-center space-y-4">
                    <div
                      className="relative rounded-xl overflow-hidden group"
                      onMouseEnter={handleImageEnter}
                      onMouseLeave={handleImageLeave}
                    >
                      {formData.teamImage ? (
                        <>
                          <img
                            src={formData.teamImage}
                            alt="Team logo preview"
                            className="w-full aspect-square object-cover rounded-xl"
                          />
                          <motion.div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: formData.isHoveringImage ? 1 : 0 }}
                          >
                            <div className="flex gap-3">
                              <button className="p-2 bg-cyan-500 rounded-full text-black hover:bg-cyan-400 transition-colors">
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={removeImage}
                                className="p-2 bg-gray-700 rounded-full text-white hover:bg-red-500 hover:text-white transition-colors"
                              >
                                <X size={18} />
                              </button>
                            </div>
                            <p className="text-white text-sm mt-3">Change team logo</p>
                          </motion.div>
                        </>
                      ) : (
                        <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-full aspect-square flex flex-col items-center justify-center hover:border-cyan-500/50 hover:bg-gray-800/70 transition-colors group">
                          <div className="bg-gray-700 p-4 rounded-full mb-3 group-hover:bg-cyan-500/20 transition-colors">
                            <Upload size={24} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                          </div>
                          <p className="text-gray-400 text-sm font-medium group-hover:text-cyan-400 transition-colors">
                            Upload team logo
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            PNG, JPG or SVG (max. 2MB)
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="file-upload" className="cursor-pointer w-full">
                        <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors flex items-center justify-center gap-2">
                          <RefreshCw size={16} className="group-hover:rotate-180 transition-transform" />
                          <span>{formData.teamImage ? 'Change Image' : 'Select Image'}</span>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </motion.div>

                {/* Form Fields */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors">
                      Team Name
                    </label>
                    <input
                      type="text"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white"
                      placeholder="Enter team name..."
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors">
                      Description
                    </label>
                    <textarea
                      rows="5"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none text-white"
                      placeholder="Describe your team..."
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <h3 className="text-lg font-medium text-cyan-400 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-white">{teamMembers.length}</div>
                  <div className="text-sm text-gray-400">Team Members</div>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-white">{formData.projects.length}</div>
                  <div className="text-sm text-gray-400">Active Projects</div>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-white">{formData.techStack.length}</div>
                  <div className="text-sm text-gray-400">Technologies</div>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-white">{formData.achievements.length}</div>
                  <div className="text-sm text-gray-400">Achievements</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case 'members':
        return (
          <motion.div
            variants={containerVariants}
            className=" lg:grid-cols-3 gap-6"
          >
            <AddTeamMember />
          </motion.div>
        );
      case 'tech':
        return (
          <motion.div variants={containerVariants} className="space-y-6">
            <TeamTechStack formData={formData} setFormData={setFormData} />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" text-white p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="bg-gray-800/40 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-brandPrimary">Edit Team Profile</h1>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                onClick={() => navigate(-1)}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors flex items-center gap-2"
                onClick={() => setIsLoading(!isLoading)}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'bg-gray-700/50 text-gray-400 border border-gray-700 hover:bg-gray-700'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon size={18} />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamManageSettings;
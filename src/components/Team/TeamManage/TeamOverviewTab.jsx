import { motion } from 'framer-motion';
import { X, Edit, Upload, RefreshCw } from 'lucide-react';
import { useContext } from 'react';
import { TeamContext } from '../../../context/TeamContext';

const TeamOverviewTab = () => {
  const {
    formData,
    setFormData,
    isTeamLeader,
    imagePreview,
    handleImageEnter,
    handleImageLeave,
    removeImage,
    handleImageChange,
    teamMembers
  } = useContext(TeamContext);

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

  return (
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-1 gap-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="rounded-2xl border border-gray-800 p-8 w-full shadow-xl"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-white mb-8"
        >
          Basic Information
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Upload Section - Only enabled for team leaders */}
          <motion.div
            variants={itemVariants}
            className="space-y-3"
          >
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Team Logo
            </label>
            <div className="flex flex-col items-center space-y-4">
              <div
                className={`w-36 relative rounded-xl overflow-hidden group ${!isTeamLeader ? 'pointer-events-none opacity-90' : ''}`}
                onMouseEnter={isTeamLeader ? handleImageEnter : undefined}
                onMouseLeave={isTeamLeader ? handleImageLeave : undefined}
              >
                {(imagePreview || formData.teamImage) ? (
                  <>
                    <img
                      src={imagePreview || formData.teamImage}
                      alt="Team logo preview"
                      className="w-full aspect-square object-cover"
                    />
                    {isTeamLeader && (
                      <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: formData.isHoveringImage ? 1 : 0 }}
                      >
                        <div className="flex gap-3">
                          <label className="p-2 bg-cyan-400 rounded-full text-black hover:bg-cyan-300 transition-colors cursor-pointer">
                            <Edit size={18} />
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </label>
                          <button
                            onClick={removeImage}
                            className="p-2 bg-gray-700 rounded-full text-white hover:bg-red-500 hover:text-white transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        <p className="text-white text-sm mt-3">Change team logo</p>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <div className={`bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-full aspect-square flex flex-col items-center justify-center ${isTeamLeader ? 'hover:border-cyan-400/50 hover:bg-gray-800/70' : ''} transition-colors group`}>
                    <div className={`bg-gray-700 p-4 rounded-full mb-3 ${isTeamLeader ? 'group-hover:bg-cyan-400/20' : ''} transition-colors`}>
                      <Upload size={24} className={`text-gray-400 ${isTeamLeader ? 'group-hover:text-cyan-400' : ''} transition-colors`} />
                    </div>
                    <p className={`text-gray-400 text-sm font-medium ${isTeamLeader ? 'group-hover:text-cyan-400' : ''} transition-colors`}>
                      {isTeamLeader ? 'Upload team logo' : 'No team logo'}
                    </p>
                    {isTeamLeader && (
                      <p className="text-gray-500 text-xs mt-1">
                        PNG, JPG or SVG (max. 2MB)
                      </p>
                    )}
                  </div>
                )}
              </div>

              {isTeamLeader && (
                <div>
                  <label htmlFor="file-upload" className="cursor-pointer w-full">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-colors flex items-center justify-center gap-2">
                      <RefreshCw size={16} className="group-hover:rotate-180 transition-transform" />
                      <span>{(imagePreview || formData.teamImage) ? 'Change Image' : 'Select Image'}</span>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={!isTeamLeader}
                    />
                  </label>
                </div>
              )}
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
                onChange={(e) => isTeamLeader && setFormData({ ...formData, teamName: e.target.value })}
                className={`px-4 py-2 bg-gray-800 rounded-md border border-gray-700 focus:border-cyan-400 text-white w-full ${!isTeamLeader ? 'cursor-not-allowed opacity-90' : ''}`}
                disabled={!isTeamLeader}
                placeholder="Team name"
                readOnly={!isTeamLeader}
              />
            </div>
            <div className="group">
              <label className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors">
                Description
              </label>
              <textarea
                rows="5"
                value={formData.description}
                onChange={(e) => isTeamLeader && setFormData({ ...formData, description: e.target.value })}
                className={`w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 resize-none text-white ${!isTeamLeader ? 'cursor-not-allowed opacity-90' : ''}`}
                placeholder="Describe your team..."
                disabled={!isTeamLeader}
                readOnly={!isTeamLeader}
              />
            </div>
            {/* Add read-only indicators for non-leaders */}
            {!isTeamLeader && (
              <div className="text-sm text-gray-500 mt-2">
                Only team leaders can edit team settings.
              </div>
            )}
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
};

export default TeamOverviewTab;

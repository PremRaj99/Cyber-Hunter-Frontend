/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitBranch, Users, Code, GanttChart, Award, Save, Edit } from 'lucide-react';
import AddTeamMember from './AddTeamMember';
import TeamTechStack from './TeamTechStack';
import { Upload } from 'lucide-react';
import { RefreshCw } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../utils/Axios';
import { TeamService } from '../../services/TeamService';

const TeamManageSettings = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { teamId: paramTeamId } = useParams();
  const [teamId, setTeamId] = useState(paramTeamId || null);
  const [formData, setFormData] = useState({
    teamName: '',
    description: '',
    teamImage: '',
    techStack: [],
    interests: [],
    achievements: [],
    projects: [],
    isHoveringImage: false,
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState(null);
  const [userStatus, setUserStatus] = useState('loading');

  // Check user's team status and get teamId
  useEffect(() => {
    const checkUserTeamStatus = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get("/api/v1/user/me");

        if (response.data?.success && response.data?.data) {
          if (response.data.data.teamId) {
            const userTeamId = response.data.data.teamId;
            setUserStatus('hasTeam');

            // If no teamId in params, use the one from user data
            if (!paramTeamId) {
              setTeamId(userTeamId);
              console.log("Setting teamId from user data:", userTeamId);
            }

            // Now that we have a teamId, fetch team data
            await fetchTeamData(paramTeamId || userTeamId);
          } else {
            setUserStatus('noTeam');
            setIsFetching(false);
            toast.error("You don't belong to any team. Please create or join a team first.");
            navigate("/dashboard/team/create");
          }
        } else {
          setUserStatus('error');
          setIsFetching(false);
          setError("Failed to load user data");
        }
      } catch (error) {
        console.error("Error checking user team status:", error);
        setUserStatus('error');
        setIsFetching(false);
        setError("Error loading user data. Please try again later.");
      }
    };

    checkUserTeamStatus();
  }, [navigate, paramTeamId]);

  // Fetch team data from API
  const fetchTeamData = async (id) => {
    if (!id) {
      setIsFetching(false);
      setError("No team ID available");
      return;
    }

    try {
      // Use direct API call with axios instead of TeamService
      const response = await axios.get(`/api/v1/team/${id}`);
      const { data } = response;

      if (data.success) {
        const teamData = data.data;

        setFormData({
          teamName: teamData.TeamName || '',
          description: teamData.TeamDescription || '',
          teamImage: teamData.TeamLogo || '',
          techStack: teamData.techStack || [],
          interests: teamData.interests || [],
          achievements: teamData.achievementId || [],
          projects: teamData.projectId || [],
          isHoveringImage: false,
        });

        // Format team members data
        if (teamData.TeamMembers && teamData.TeamMembers.length > 0) {
          const formattedMembers = teamData.TeamMembers.map(member => ({
            id: member.userId?._id || member.userId,
            name: member.userId?.name || 'Unknown User',
            role: member.role || 'Member',
            image: member.userId?.profilePicture || '/api/placeholder/100/100',
            status: member.status || 'Active',
            points: member.points || 0
          }));

          setTeamMembers(formattedMembers);
        }
      } else {
        toast.error("Failed to fetch team data");
        setError("Could not load team data");
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
      toast.error(error.response?.data?.message || "Failed to fetch team data");
      setError("Error loading team data. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleImageEnter = () => {
    setFormData({ ...formData, isHoveringImage: true });
  };

  const handleImageLeave = () => {
    setFormData({ ...formData, isHoveringImage: false });
  };

  const removeImage = () => {
    setFormData({ ...formData, teamImage: null });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB max
        toast.error("Image size should be less than 2MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!teamId) {
      toast.error("No team ID available");
      return;
    }

    setIsLoading(true);
    try {
      // Create FormData for multipart/form-data submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('TeamName', formData.teamName);
      formDataToSubmit.append('TeamDescription', formData.description);

      // Add team logo if there's a new file
      if (imageFile) {
        formDataToSubmit.append('TeamLogo', imageFile);
      }

      // Add tech stack
      if (formData.techStack && formData.techStack.length > 0) {
        formData.techStack.forEach(tech => {
          formDataToSubmit.append('techStack', tech);
        });
      }

      // Add interests
      if (formData.interests && formData.interests.length > 0) {
        formData.interests.forEach(interest => {
          formDataToSubmit.append('interests', interest);
        });
      }

      // Make API call to update team
      const response = await TeamService.updateTeam(teamId, formDataToSubmit);

      if (response.success) {
        toast.success("Team updated successfully");
      } else {
        toast.error("Failed to update team");
      }
    } catch (error) {
      console.error("Error updating team:", error);
      toast.error(error.response?.data?.message || "Failed to update team");
    } finally {
      setIsLoading(false);
    }
  };

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
                      className="w-36 relative rounded-xl overflow-hidden group"
                      onMouseEnter={handleImageEnter}
                      onMouseLeave={handleImageLeave}
                    >
                      {(imagePreview || formData.teamImage) ? (
                        <>
                          <img
                            src={imagePreview || formData.teamImage}
                            alt="Team logo preview"
                            className="w-full aspect-square object-cover"
                          />
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
                        </>
                      ) : (
                        <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-full aspect-square flex flex-col items-center justify-center hover:border-cyan-400/50 hover:bg-gray-800/70 transition-colors group">
                          <div className="bg-gray-700 p-4 rounded-full mb-3 group-hover:bg-cyan-400/20 transition-colors">
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
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 text-white"
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
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 resize-none text-white"
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
            className="lg:grid-cols-3 gap-6"
          >
            <AddTeamMember teamId={teamId} teamMembers={teamMembers} setTeamMembers={setTeamMembers} />
          </motion.div>
        );
      case 'tech':
        return (
          <motion.div variants={containerVariants} className="space-y-6">
            <TeamTechStack formData={formData} setFormData={setFormData} teamId={teamId} />
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <h3 className="text-xl text-red-500 mb-4">{error}</h3>
        <button
          className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (userStatus === 'noTeam') {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <h3 className="text-xl text-yellow-500 mb-4">You don&apos;t belong to any team</h3>
        <button
          className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500"
          onClick={() => navigate('/dashboard/team/create')}
        >
          Create or Join a Team
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="bg-gray-800/40 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">Edit Team Profile</h1>
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
                className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors flex items-center gap-2"
                onClick={handleSubmit}
                disabled={isLoading}
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
                  ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50'
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
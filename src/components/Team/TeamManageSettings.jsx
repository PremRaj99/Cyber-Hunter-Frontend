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
  const [isTeamLeader, setIsTeamLeader] = useState(false);

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

  // Enhanced processTeamData function to fetch detailed member data
  const processTeamData = async (team) => {
    // Update form data with team details
    setFormData({
      teamName: team.TeamName || '',
      description: team.TeamDescription || '',
      teamImage: team.TeamLogo || '',
      techStack: team.techStack || [],
      interests: team.interests || [],
      achievements: team.achievementId || [],
      projects: team.projectId || [],
      isHoveringImage: formData.isHoveringImage || false,
    });

    // Try to fetch enhanced member data from members-detail endpoint
    try {
      const membersDetailResponse = await axios.get(`/api/v1/team/${team._id}/members-detail`);

      if (membersDetailResponse.data && membersDetailResponse.data.success && membersDetailResponse.data.data) {
        console.log("Members detail response:", membersDetailResponse.data);

        // Process the enhanced member data
        const enhancedMembers = membersDetailResponse.data.data.TeamMembers.map(member => {
          return {
            id: member._id,
            userId: member.userId,
            name: member.userDetailData?.name ||
              (member.userData?.email ? member.userData.email.split('@')[0] : 'Unknown User'),
            email: member.userData?.email || '',
            profilePicture: member.userData?.profilePicture || '',
            image: member.userData?.profilePicture ||
              `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                member.userDetailData?.name ||
                (member.userData?.email ? member.userData.email.split('@')[0] : 'Unknown User')
              )}`,
            phoneNumber: member.phoneNumber || '',
            skills: member.skills || [],
            social: member.social || {},
            points: member.points || 0,
            role: member.role || 'Member',
            status: member.status || 'Active',
          };
        });

        setTeamMembers(enhancedMembers);
        return; // Exit early if we successfully got member details
      }
    } catch (detailError) {
      console.error("Error fetching detailed team members:", detailError);
      // Don't show error to user, continue with fallback basic member info
    }

    // Fallback: Use basic team member data if members-detail fails
    if (team.TeamMembers && team.TeamMembers.length > 0) {
      const formattedMembers = team.TeamMembers.map(member => {
        let name = 'Unknown User';
        let image = null;

        if (typeof member.userId === 'object') {
          // Try to get name from populated user object
          if (member.userId.name) {
            name = member.userId.name;
          } else if (member.userId.email) {
            name = member.userId.email;
          }

          // Try to get profile image
          image = member.userId.profilePicture || null;
        }

        return {
          id: typeof member.userId === 'object' ? member.userId._id : member.userId,
          userId: typeof member.userId === 'object' ? member.userId._id : member.userId,
          name,
          role: member.role || 'Member',
          image: image || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(name)}`,
          status: member.status || 'Active',
          points: member.points || 0
        };
      });

      setTeamMembers(formattedMembers);
    }
  };

  // Modified useEffect to call the async processTeamData
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsFetching(true);
        setError(null);

        // Check if we have a team ID from params
        if (paramTeamId) {
          try {
            const teamResponse = await TeamService.getTeamById(paramTeamId);

            if (teamResponse.success) {
              // Save team ID
              setTeamId(paramTeamId);

              // Get user data to check permissions
              const userResponse = await axios.get('/api/v1/user/me');

              if (userResponse.data && userResponse.data.data) {
                const currentUserId = userResponse.data.data._id;
                const team = teamResponse.data;

                // Check if user is team leader
                const isLeader = team.TeamCreaterId &&
                  currentUserId &&
                  (typeof team.TeamCreaterId === 'object'
                    ? team.TeamCreaterId._id.toString() === currentUserId.toString()
                    : team.TeamCreaterId.toString() === currentUserId.toString());

                setIsTeamLeader(isLeader);
                console.log("User is team leader:", isLeader);

                // Check if user is part of the team
                const isMember = team.TeamMembers.some(member => {
                  const memberId = typeof member.userId === 'object'
                    ? member.userId._id
                    : member.userId;
                  return memberId.toString() === currentUserId.toString();
                });

                if (isLeader || isMember) {
                  // User has access to this team - use async processTeamData
                  await processTeamData(team);
                  setUserStatus('hasTeam');
                } else {
                  // User is not part of this team
                  setError("You don't have permission to access this team's settings");
                  setUserStatus('noPermission');
                }
              } else {
                throw new Error("Failed to get user data");
              }
            } else {
              throw new Error("Team data not available");
            }
          } catch (error) {
            console.error("Error loading team:", error);

            if (error.isNotFound || error.status === 404) {
              setError("The team you're looking for doesn't exist");
              setUserStatus('teamNotFound');
            } else {
              setError("Failed to load team data. Please try again later.");
              setUserStatus('error');
            }
          }
        }
        // No team ID in params, check user's team
        else {
          const userResponse = await axios.get('/api/v1/user/me');

          if (userResponse.data && userResponse.data.data) {
            if (userResponse.data.data.teamId) {
              const userTeamId = userResponse.data.data.teamId;
              setTeamId(userTeamId);

              // Fetch team data
              try {
                const teamResponse = await TeamService.getTeamById(userTeamId);

                if (teamResponse.success) {
                  const team = teamResponse.data;

                  // Check if user is team leader
                  const isLeader = team.TeamCreaterId &&
                    userResponse.data.data._id &&
                    (typeof team.TeamCreaterId === 'object'
                      ? team.TeamCreaterId._id.toString() === userResponse.data.data._id.toString()
                      : team.TeamCreaterId.toString() === userResponse.data.data._id.toString());

                  setIsTeamLeader(isLeader);
                  console.log("User is team leader:", isLeader);

                  // Process team data - use async processTeamData
                  await processTeamData(team);
                  setUserStatus('hasTeam');
                } else {
                  throw new Error("Team data not available");
                }
              } catch (error) {
                console.error("Error loading user's team:", error);
                setError("Failed to load your team data");
                setUserStatus('error');
              }
            } else {
              // User doesn't have a team
              setUserStatus('noTeam');
              setError("You don't belong to any team");
            }
          } else {
            setError("Failed to load user data");
            setUserStatus('error');
          }
        }
      } catch (error) {
        console.error("Team settings error:", error);
        setError("Error loading team data");
        setUserStatus('error');
      } finally {
        setIsFetching(false);
      }
    };

    fetchTeamData();
  }, [paramTeamId, navigate]);

  // Modified handleSubmit to call the async processTeamData when refreshing
  const handleSubmit = async () => {
    if (!teamId) {
      toast.error("No team ID available");
      return;
    }

    // Prevent non-leaders from updating
    if (!isTeamLeader) {
      toast.error("Only team leaders can update team settings");
      return;
    }

    setIsLoading(true);
    try {
      // Proceed with update
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('TeamName', formData.teamName);
      formDataToSubmit.append('TeamDescription', formData.description);

      // Add team logo if there's a new file
      if (imageFile) {
        formDataToSubmit.append('TeamLogo', imageFile);
      }

      // Add tech stack
      if (formData.techStack && formData.techStack.length > 0) {
        formData.techStack.forEach((tech, index) => {
          formDataToSubmit.append(`techStack[${index}]`, tech);
        });
      }

      // Add interests
      if (formData.interests && formData.interests.length > 0) {
        formData.interests.forEach((interest, index) => {
          formDataToSubmit.append(`interests[${index}]`, interest);
        });
      }

      // Use TeamService for the update
      const response = await TeamService.updateTeam(teamId, formDataToSubmit);

      if (response && response.success) {
        toast.success("Team updated successfully");

        // Refresh team data after successful update
        const refreshResponse = await TeamService.getTeamById(teamId);
        if (refreshResponse && refreshResponse.success) {
          const team = refreshResponse.data;
          await updateTeamData(team);
        }
      } else {
        toast.error(response?.message || "Failed to update team");
      }
    } catch (error) {
      console.error("Error updating team:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(error.response.data?.message || "Failed to update team");
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to process team data for reuse in handleSubmit
  const updateTeamData = (team) => {
    // Update form data with team details
    setFormData({
      teamName: team.TeamName || '',
      description: team.TeamDescription || '',
      teamImage: team.TeamLogo || '',
      techStack: team.techStack || [],
      interests: team.interests || [],
      achievements: team.achievementId || [],
      projects: team.projectId || [],
      isHoveringImage: formData.isHoveringImage, // Keep the hover state
    });

    // Format team members
    if (team.TeamMembers && team.TeamMembers.length > 0) {
      const formattedMembers = team.TeamMembers.map(member => {
        let name = 'Unknown User';
        let image = null;

        if (typeof member.userId === 'object') {
          // Try to get name from populated user object
          if (member.userId.name) {
            name = member.userId.name;
          } else if (member.userId.email) {
            name = member.userId.email;
          }

          // Try to get profile image
          image = member.userId.profilePicture || null;
        }

        return {
          id: typeof member.userId === 'object' ? member.userId._id : member.userId,
          name,
          role: member.role || 'Member',
          image: image || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(name)}`,
          status: member.status || 'Active',
          points: member.points || 0
        };
      });

      setTeamMembers(formattedMembers);
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

      case 'members':
        return (
          <motion.div
            variants={containerVariants}
            className="lg:grid-cols-3 gap-6"
          >
            <AddTeamMember
              teamId={teamId}
              teamMembers={teamMembers}
              setTeamMembers={setTeamMembers}
              isTeamLeader={isTeamLeader}
            />
          </motion.div>
        );
      case 'tech':
        return (
          <motion.div variants={containerVariants} className="space-y-6">
            <TeamTechStack
              formData={formData}
              setFormData={setFormData}
              teamId={teamId}
              isTeamLeader={isTeamLeader}
            />
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
          className="px-6 py-3 rounded-xl bg-gradient-to-r bg-cyan-400 text-black font-medium transition-colors cursor-pointer flex items-center space-x-2 hover:bg-black hover:text-cyan-400 hover:border hover:border-cyan-400"
          onClick={() => navigate('/dashboard/team/create')}
        >
          Create or Join a Team
        </button>
      </div>
    );
  }

  if (userStatus === 'noTeam') {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <h3 className="text-xl text-yellow-500 mb-4">You don&apos;t belong to any team</h3>
        <button
          className="px-6 py-3 rounded-xl bg-gradient-to-r bg-cyan-400 text-black font-medium transition-colors cursor-pointer flex items-center space-x-2 hover:bg-black hover:text-cyan-400 hover:border hover:border-cyan-400"
          onClick={() => navigate('/dashboard/team/create')}
        >
          Create or Join a Team
        </button>
      </div>
    );
  }

  if (userStatus === 'noPermission' || userStatus === 'teamNotFound') {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <h3 className="text-xl text-red-500 mb-4">
          {userStatus === 'noPermission'
            ? "You don't have permission to view this team's settings"
            : "Team not found"}
        </h3>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500"
            onClick={() => navigate('/dashboard/team')}
          >
            My Team Dashboard
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
            onClick={() => navigate('/dashboard/team/create')}
          >
            Browse Teams
          </button>
        </div>
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
              {isTeamLeader ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r bg-cyan-400 text-black font-medium transition-colors cursor-pointer flex items-center space-x-2 hover:bg-black hover:text-cyan-400 hover:border hover:border-cyan-400"
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
              ) : (
                <button
                  onClick={() => navigate("/dashboard/team")}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                >
                  Back to Dashboard
                </button>
              )}
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
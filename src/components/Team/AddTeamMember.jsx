/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Trash2, Plus, X, Upload, Check, ChevronRight } from 'lucide-react';
import axios from '../../utils/Axios';
import { toast } from 'react-toastify';

const AddTeamMember = ({ teamId, teamMembers: propTeamMembers, setTeamMembers: setParentTeamMembers, isTeamLeader = false }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    image: '/api/placeholder/400/400'
  });
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { ease: 'easeOut' } }
  };

  const drawerVariants = {
    closed: {
      x: '100%',
      boxShadow: '0 0 0 rgba(0, 240, 255, 0)'
    },
    open: {
      x: 0,
      boxShadow: '-8px 0 30px rgba(0, 240, 255, 0.15)',
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  // Define fetchTeamMembers outside useEffect so it can be called anywhere in the component
  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);
      try {
        // Use the more detailed members-detail endpoint
        const response = await axios.get(`/api/v1/team/${teamId}/members-detail`);

        if (response.data && response.data.success && response.data.data) {
          console.log("Team members detail response:", response.data);

          // Process the enhanced member data from members-detail endpoint
          const members = response.data.data.TeamMembers.map(member => {
            return {
        // Function content has been moved outside the useEffect scope
              role: member.role || "Member",
              phoneNumber: member.phoneNumber || '',
              skills: member.skills || [],
              social: member.social || {},
              points: member.points || 0,
              image: member.userData?.profilePicture ||
                `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                  member.userDetailData?.name ||
                  (member.userData?.email ? member.userData.email.split('@')[0] : 'Unknown User')
                )}`,
              status: member.status || "Active"
            };
          });

          setTeamMembers(members);
          if (setParentTeamMembers) {
            setParentTeamMembers(members);
          }
          return; // Exit early if we got data from members-detail
        }
      } catch (detailError) {
        console.error("Error fetching detailed team members:", detailError);
        // Fallback to regular team endpoint if members-detail fails
      }

      // Fallback: use the regular team endpoint if members-detail failed or returned no data
      const response = await axios.get(`/api/v1/team/${teamId}`);
      if (response.data && response.data.success) {
        const members = response.data.data.TeamMembers.map(member => {
          const userData = typeof member.userId === 'object' ? member.userId : { _id: member.userId };
          return {
            id: member._id || member.id,
            userId: typeof userData === 'object' ? userData._id : userData,
            name: member.name ||
              (typeof userData === 'object' ? userData.name || userData.email?.split('@')[0] : "Team Member"),
            email: member.email || (typeof userData === 'object' ? userData.email : ""),
            role: member.role || "Member",
            phoneNumber: typeof userData === 'object' ? userData.phoneNumber : "",
            image: member.profilePicture ||
              (typeof userData === 'object' ? userData.profilePicture : null) ||
              `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                member.name ||
                (typeof userData === 'object' ? userData.name || userData.email?.split('@')[0] : "User")
              )}`,
            status: member.status || "Active"
          };
        });

        setTeamMembers(members);
        if (setParentTeamMembers) {
          setParentTeamMembers(members);
        }
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast.error("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  };

  // Combined useEffect that calls fetchTeamMembers when needed
  useEffect(() => {
    if (propTeamMembers && propTeamMembers.length > 0) {
      // Format team members from props
      setTeamMembers(propTeamMembers.map(member => ({
        id: member.id || member._id,
        name: member.name,
        role: member.role,
        image: member.avatar || member.image || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(member.name)}`
      })));
      setIsLoading(false);
    } else {
      fetchTeamMembers();
    }
  }, [propTeamMembers, teamId, setParentTeamMembers]);
  

  console.log("teamMembers", teamMembers);
  console.log("teamMembers", teamMembers);

  // Search for users to add to the team
  const handleSearch = async (value) => {
    setSearchTerm(value);
    if (value.length < 2) return;

    try {
      setIsSearching(true);
      const response = await axios.get(`/api/v1/user/search?q=${encodeURIComponent(value)}`);
      if (response.data && response.data.success) {
        // Filter out already selected members
        const existingUserIds = teamMembers.map(m => m.userId);
        const filteredResults = response.data.data.filter(
          user => !existingUserIds.includes(user._id)
        );
        setSearchResults(filteredResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching users:", error);
      toast.error("Failed to search for users");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Select a user from search results
  const selectUserFromSearch = (user) => {
    setNewMember({
      name: user.name || user.email?.split('@')[0] || "Team Member",
      role: 'Member',
      image: user.profilePicture || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(user.name || user.email || "User")}`,
      userId: user._id
    });
    setSearchResults([]);
    setSearchTerm('');
    nextStep();
  };

  // Add new member to the team
  const handleAddMember = async () => {
    if (!newMember.name.trim() || !newMember.userId) {
      toast.error("Please select a valid user");
      return;
    }

    try {
      const response = await axios.post(`/api/v1/team/${teamId}/members`, {
        userId: newMember.userId
      });

      if (response.data && response.data.success) {
        // Add the new member to state
        const newMemberWithId = {
          id: Date.now(), // Temporary ID until we re-fetch
          userId: newMember.userId,
          name: newMember.name,
          role: newMember.role,
          image: newMember.image
        };

        const updatedMembers = [...teamMembers, newMemberWithId];
        setTeamMembers(updatedMembers);

        // Update parent state if prop was passed
        if (setParentTeamMembers) {
          setParentTeamMembers(updatedMembers);
        }

        toast.success(`${newMember.name} added to the team!`);

        // Re-fetch to get the correct data structure
        fetchTeamMembers();
      } else {
        toast.error(response.data?.message || "Failed to add member");
      }
    } catch (error) {
      console.error("Error adding team member:", error);
      toast.error(error.response?.data?.message || "Failed to add team member");
    } finally {
      // Reset form
      setNewMember({
        name: '',
        role: '',
        image: '/api/placeholder/400/400'
      });
      setDrawerOpen(false);
      setStep(1);
    }
  };

  // Remove a team member
  const handleRemoveMember = async (memberId, userId) => {
    if (!isTeamLeader) {
      toast.warning("Only team leaders can remove members");
      return;
    }

    try {
      const response = await axios.delete(`/api/v1/team/${teamId}/members/${userId}`);

      if (response.data && response.data.success) {
        const updatedMembers = teamMembers.filter(member =>
          member.id.toString() !== memberId.toString() &&
          member.userId.toString() !== userId.toString()
        );
        setTeamMembers(updatedMembers);

        // Update parent state if prop was passed
        if (setParentTeamMembers) {
          setParentTeamMembers(updatedMembers);
        }

        toast.success("Member removed successfully");
      } else {
        toast.error(response.data?.message || "Failed to remove member");
      }
    } catch (error) {
      console.error("Error removing team member:", error);
      toast.error(error.response?.data?.message || "Failed to remove member");
    }
  };

  const nextStep = () => {
    if (step === 1 && !newMember.name.trim()) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      setStep(1);
      setNewMember({
        name: '',
        role: '',
        image: '/api/placeholder/400/400'
      });
      setSearchResults([]);
      setSearchTerm('');
    }, 300);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header with add button */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Our Team</h2>
            <p className="text-gray-400">Meet the talented individuals behind our success</p>
          </div>

          {/* Only show Add button for team leaders */}
          {isTeamLeader && (
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 bg-cyan-400 text-black px-4 py-2 rounded-lg hover:bg-cyan-300 transition-colors group"
            >
              <span className="font-medium">Add Member</span>
              <div className="bg-black/20 rounded-full p-1">
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              </div>
            </button>
          )}
        </div>

        {/* Team Members Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 group transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/20"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(member.name)}`;
                  }}
                />
                {isTeamLeader && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                    <button className="p-2 bg-cyan-400 rounded-full text-black hover:bg-cyan-300 transition-colors">
                      <Camera size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-cyan-400 mb-4">{member.role}</p>

                {/* Only show delete button for team leaders */}
                {isTeamLeader && (
                  <div className="flex justify-end mt-6">
                    <button
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => handleRemoveMember(member.id, member.userId)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add Member Drawer - Only accessible to team leaders */}
      <AnimatePresence>
        {drawerOpen && isTeamLeader && (
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-md bg-gray-900 border-l border-gray-800 shadow-xl z-50 flex flex-col"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h3 className="text-2xl font-bold text-white">Add Team Member</h3>
              <button
                onClick={closeDrawer}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Steps progress */}
            <div className="px-6 pt-6">
              <div className="flex items-center mb-8">
                {[1, 2, 3].map((number) => (
                  <React.Fragment key={number}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= number ? 'bg-cyan-400 text-black' : 'bg-gray-800 text-gray-400'
                        } ${step === number ? 'ring-4 ring-cyan-400/20' : ''}`}
                    >
                      {step > number ? <Check size={16} /> : number}
                    </div>
                    {number < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded ${step > number ? 'bg-cyan-400' : 'bg-gray-800'
                          }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Step content */}
            <div className="flex-grow overflow-y-auto px-6">
              <AnimatePresence custom={step > 1 ? 1 : -1}>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h4 className="text-xl text-white font-medium mb-4">Find Team Member</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-2 text-sm">Search by Email or Name</label>
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => handleSearch(e.target.value)}
                          className="w-full bg-gray-800 border-b-2 border-gray-700 focus:border-cyan-400 px-4 py-3 rounded text-white focus:outline-none transition-colors"
                          placeholder="Enter email or name"
                        />
                      </div>

                      {/* Search Results */}
                      {isSearching && (
                        <div className="flex justify-center py-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-cyan-400"></div>
                        </div>
                      )}

                      {!isSearching && searchResults.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-400 mb-2">Search Results</h5>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {searchResults.map(user => (
                              <div
                                key={user._id}
                                onClick={() => selectUserFromSearch(user)}
                                className="flex items-center p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                              >
                                <img
                                  src={user.profilePicture || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(user.name || user.email)}`}
                                  className="w-10 h-10 rounded-full"
                                  alt={user.name}
                                />
                                <div className="ml-3">
                                  <p className="text-white">{user.name || user.email?.split('@')[0]}</p>
                                  <p className="text-gray-400 text-xs">{user.email}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {!isSearching && searchTerm && searchResults.length === 0 && (
                        <p className="text-gray-400 text-center py-2">No users found matching your search</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h4 className="text-xl text-white font-medium mb-4">Confirm Role</h4>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={newMember.image}
                          alt={newMember.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white font-medium">{newMember.name}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2 text-sm">Team Role</label>
                        <select
                          value={newMember.role}
                          onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                          className="w-full bg-gray-800 border-b-2 border-gray-700 focus:border-cyan-400 px-4 py-3 rounded text-white focus:outline-none transition-colors"
                        >
                          <option value="Member">Member</option>
                          <option value="Developer">Developer</option>
                          <option value="Designer">Designer</option>
                          <option value="QA Engineer">QA Engineer</option>
                          <option value="Project Manager">Project Manager</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h4 className="text-xl text-white font-medium mb-4">Review & Confirm</h4>

                    <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img
                            src={newMember.image}
                            alt={newMember.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="text-white text-lg">{newMember.name}</h5>
                          <p className="text-cyan-400">{newMember.role}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400">
                      Please review the information above. Once confirmed, the new team member will be added to your team.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom navigation */}
            <div className="p-6 border-t border-gray-800 flex justify-between">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Back
                </button>
              ) : (
                <button
                  onClick={closeDrawer}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}

              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors flex items-center gap-2"
                  disabled={step === 1 && !newMember.userId}
                >
                  <span>Next Step</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleAddMember}
                  className="px-8 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-medium"
                >
                  Add to Team
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddTeamMember;
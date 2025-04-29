import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Trash2, Plus, X, Upload, Check, ChevronRight, Search, UserPlus } from 'lucide-react';
import axios from '../../utils/Axios';
import { toast } from 'react-toastify';

const AddTeamMember = ({ teamId, teamMembers = [], setTeamMembers }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    image: '/api/placeholder/400/400'
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load team members if they aren't already loaded
  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!teamId || teamMembers.length > 0) return;
      
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/v1/team/${teamId}`);
        if (response.data.success) {
          const members = response.data.data.TeamMembers.map(member => ({
            id: member.userId._id || member._id,
            name: member.userId.name || 'Unknown User',
            role: member.role || 'Member',
            image: member.userId.profilePicture || '/api/placeholder/400/400',
            status: member.status,
            skills: member.skills || []
          }));
          setTeamMembers(members);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
        toast.error('Failed to load team members');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, [teamId, teamMembers.length, setTeamMembers]);

  // Handle clicks outside the search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search users by name or email
  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        setIsSearching(true);
        const response = await axios.get(`/api/v1/user/search?q=${searchQuery}`);
        if (response.data.success) {
          // Filter out already team members
          const existingMemberIds = teamMembers.map(member => member.id);
          const filteredResults = response.data.data.filter(
            user => !existingMemberIds.includes(user._id)
          );
          setSearchResults(filteredResults);
        }
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimeout = setTimeout(searchUsers, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, teamMembers]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB max
        toast.error("Image size should be less than 2MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        setNewMember({...newMember, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setNewMember({
      ...newMember,
      name: user.name,
      image: user.profilePicture || `/api/placeholder/400/400?name=${encodeURIComponent(user.name)}`
    });
    setSearchQuery('');
    setSearchResults([]);
    setSearchFocused(false);
    // Move to next step after selecting user
    nextStep();
  };

  const handleAddMember = async () => {
    if (!selectedUser || !newMember.role.trim() || !teamId) {
      toast.error('Please select a user and provide a role');
      return;
    }

    try {
      setIsLoading(true);
      
      const payload = {
        userId: selectedUser._id,
        role: newMember.role,
        skills: [], // Could be expanded to add skills
      };

      const response = await axios.post(`/api/v1/team/${teamId}/members`, payload);
      
      if (response.data.success) {
        // Add new member to the team members list
        const newTeamMember = {
          id: selectedUser._id,
          name: selectedUser.name,
          role: newMember.role,
          image: selectedUser.profilePicture || newMember.image,
          status: 'Active',
          skills: []
        };
        
        setTeamMembers([...teamMembers, newTeamMember]);
        toast.success('Team member added successfully');
        
        // Reset form state
        setNewMember({
          name: '',
          role: '',
          image: '/api/placeholder/400/400'
        });
        setSelectedUser(null);
        setProfileImage(null);
        setStep(1);
        setDrawerOpen(false);
      }
    } catch (error) {
      console.error('Error adding team member:', error);
      const errorMsg = error.response?.data?.message || 'Failed to add team member';
      toast.error(errorMsg);
      
      // If trying to add a member who already has a team
      if (error.response?.status === 409) {
        toast.error('This user already belongs to a team');
      }
      // If team already has max members
      else if (error.response?.data?.message?.includes('maximum')) {
        toast.error('Your team already has the maximum number of members (5)');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!teamId || !memberId) return;

    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/v1/team/${teamId}/members/${memberId}`);
      
      if (response.data.success) {
        const updatedMembers = teamMembers.filter(member => member.id !== memberId);
        setTeamMembers(updatedMembers);
        toast.success('Team member removed successfully');
      }
    } catch (error) {
      console.error('Error removing team member:', error);
      toast.error(error.response?.data?.message || 'Failed to remove team member');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !selectedUser) return;
    if (step === 2 && !newMember.role.trim()) return;
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
      setSelectedUser(null);
      setProfileImage(null);
    }, 300);
  };

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

  return (
    <div className="p-8">
      {/* Header with add button */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Team Members</h2>
            <p className="text-gray-400">Manage your team members and their roles</p>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 bg-cyan-400 text-black px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors group"
            disabled={isLoading || teamMembers.length >= 5}
          >
            <span className="font-medium">Add Member</span>
            <div className="bg-black/20 rounded-full p-1">
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
            </div>
          </button>
        </div>

        {/* Team Members Grid */}
        {isLoading && teamMembers.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {teamMembers.length > 0 ? teamMembers.map((member) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                    <button className="p-2 bg-cyan-400 rounded-full text-black hover:bg-cyan-300 transition-colors">
                      <Camera size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-cyan-400 mb-4">{member.role}</p>
                  <div className="flex justify-end mt-6">
                    <button 
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => handleRemoveMember(member.id)}
                      disabled={isLoading}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center p-10 bg-gray-800/30 rounded-xl border border-gray-700/50">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <UserPlus size={48} className="text-gray-500" />
                  <p className="text-gray-400">No team members yet. Add your first team member!</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Add Member Drawer */}
      <AnimatePresence>
        {drawerOpen && (
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
                    <h4 className="text-xl text-white font-medium mb-4">Select Team Member</h4>
                    <div className="space-y-4">
                      {/* User Search Input */}
                      <div className="relative">
                        <div className="flex items-center w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md">
                          <Search size={18} className="text-gray-400 mr-2" />
                          <input
                            type="text"
                            ref={searchInputRef}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            placeholder="Search users by name or email"
                            className="bg-transparent text-white w-full focus:outline-none"
                          />
                          {isSearching && (
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-cyan-400"></div>
                          )}
                        </div>

                        {/* Search Results Dropdown */}
                        {searchFocused && searchResults.length > 0 && (
                          <div
                            ref={dropdownRef}
                            className="absolute z-50 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
                          >
                            {searchResults.map(user => (
                              <div
                                key={user._id}
                                onClick={() => selectUser(user)}
                                className="flex items-center px-3 py-2 hover:bg-gray-700 cursor-pointer group"
                              >
                                <div className="flex-shrink-0">
                                  <img
                                    src={user.profilePicture || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(user.name)}`}
                                    alt={user.name}
                                    className="h-8 w-8 rounded-full"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(user.name)}`;
                                    }}
                                  />
                                </div>
                                <div className="ml-3 flex-1">
                                  <p className="text-sm font-medium text-white">{user.name}</p>
                                  <p className="text-xs text-gray-400">{user.email || ''}</p>
                                </div>
                                <button
                                  type="button"
                                  className="flex-shrink-0 p-1.5 rounded-full bg-cyan-400 text-black group-hover:bg-cyan-300"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    selectUser(user);
                                  }}
                                >
                                  <UserPlus size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {searchQuery && searchFocused && searchResults.length === 0 && !isSearching && (
                          <div className="absolute z-50 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg p-3">
                            <p className="text-gray-400 text-center">No users found</p>
                          </div>
                        )}
                      </div>

                      <div className="text-sm text-gray-400 mt-4">
                        <p>Search for a user by name or email to add them to your team.</p>
                        <p className="mt-2">Note: Users can only be members of one team at a time.</p>
                      </div>
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
                    <h4 className="text-xl text-white font-medium mb-4">Assign Role</h4>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={newMember.image}
                            alt={newMember.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(newMember.name)}`;
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-white font-medium">{newMember.name}</p>
                          {selectedUser && selectedUser.email && (
                            <p className="text-gray-400 text-sm">{selectedUser.email}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2 text-sm">Team Role</label>
                        <input
                          type="text"
                          value={newMember.role}
                          onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                          className="w-full bg-gray-800 border-b-2 border-gray-700 focus:border-cyan-400 px-4 py-3 rounded text-white focus:outline-none transition-colors"
                          placeholder="e.g. Developer, Designer, Project Manager"
                        />
                        <p className="text-gray-500 text-xs mt-2">
                          This role will be displayed on the team member's profile and will help define their responsibilities.
                        </p>
                      </div>

                      <div className="mt-6">
                        <label className="block text-gray-400 mb-2 text-sm">Suggested Roles</label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Developer", "Designer", "Project Manager", "QA Engineer", "DevOps Engineer", "Product Owner"].map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => setNewMember({ ...newMember, role })}
                              className="px-3 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-cyan-400 rounded-md text-sm transition-colors"
                            >
                              {role}
                            </button>
                          ))}
                        </div>
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
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(newMember.name)}`;
                            }}
                          />
                        </div>
                        <div>
                          <h5 className="text-white text-lg">{newMember.name}</h5>
                          <p className="text-cyan-400">{newMember.role}</p>
                          {selectedUser && selectedUser.email && (
                            <p className="text-gray-400 text-xs mt-1">{selectedUser.email}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400">
                      Please review the information above. This user will be added to your team with the specified role.
                    </p>
                    
                    <div className="text-gray-500 text-sm border-t border-gray-700 pt-4 mt-4">
                      <p>Note: Team members can view and contribute to all team projects and participate in team activities.</p>
                    </div>
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
                  className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                    (step === 1 && !selectedUser) || (step === 2 && !newMember.role.trim())
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-cyan-400 text-black hover:bg-cyan-500'
                  }`}
                  disabled={(step === 1 && !selectedUser) || (step === 2 && !newMember.role.trim())}
                >
                  <span>Next Step</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  onClick={handleAddMember}
                  className="px-8 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>Add to Team</>
                  )}
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
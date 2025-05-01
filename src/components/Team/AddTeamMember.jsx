/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import axios from '../../utils/Axios';
import { toast } from 'react-toastify';

import TeamMembersList from './TeamMembers/TeamMembersList';
import AddMemberDrawer from './TeamMembers/AddMemberDrawer';

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

  // Define fetchTeamMembers outside useEffect so it can be called anywhere in the component
  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);
      try {
        // Use the more detailed members-detail endpoint for better data structure
        const response = await axios.get(`/api/v1/team/${teamId}/members-detail`);

        if (response.data && response.data.success && response.data.data) {
          console.log("Team members detail response:", response.data);

          // Process the enhanced member data from members-detail endpoint
          const members = response.data.data.TeamMembers.map(member => {
            return {
              id: member._id,
              userId: member.userId,
              name: member.userDetailData?.name ||
                (member.userData?.email ? member.userData.email.split('@')[0] : 'Unknown User'),
              email: member.userData?.email || '',
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
    setStep(2); // Move to next step
  };

  // Add new member to the team
  const handleAddMember = async () => {
    if (!newMember.name.trim() || !newMember.userId) {
      toast.error("Please select a valid user");
      return;
    }

    try {
      // Call the addTeamMember endpoint from your controller
      const response = await axios.put(`/api/v1/team/${teamId}/members`, {
        userId: newMember.userId
      });

      if (response.data && response.data.success) {
        toast.success(`${newMember.name} added to the team!`);

        // Re-fetch to get the correctly formatted data structure with all required fields
        await fetchTeamMembers();
      } else {
        toast.error(response.data?.message || "Failed to add member");
      }
    } catch (error) {
      console.error("Error adding team member:", error);

      // More detailed error messaging based on backend response
      if (error.response?.status === 400) {
        toast.error("Team is full or member invalid");
      } else if (error.response?.status === 409) {
        toast.error("User is already a member of this team");
      } else {
        toast.error(error.response?.data?.message || "Failed to add team member");
      }
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
      // Find the member in our list to ensure we have the correct ID
      const memberToRemove = teamMembers.find(m =>
        m.id === memberId ||
        (m.userId && (m.userId === userId ||
          (typeof m.userId === 'object' && m.userId?._id === userId)))
      );

      if (!memberToRemove) {
        console.error("Cannot find member in team members array:", teamMembers);
        toast.error("Cannot identify member to remove");
        return;
      }

      // Get the userId, ensuring it's a string
      const userIdToRemove = typeof memberToRemove.userId === 'object'
        ? memberToRemove.userId._id
        : memberToRemove.userId;

      if (!userIdToRemove) {
        console.error("Invalid user ID:", memberToRemove);
        toast.error("Invalid member ID");
        return;
      }

      // Make the API call with the confirmed userId
      const response = await axios.delete(`/api/v1/team/${teamId}/members/${userIdToRemove}`);

      if (response.data && response.data.success) {
        toast.success("Team member removed successfully");

        // Re-fetch team members to ensure data consistency
        await fetchTeamMembers();
      } else {
        toast.error(response.data?.message || "Failed to remove member");
      }
    } catch (error) {
      console.error("Error removing team member:", error);

      if (error.response?.status === 400) {
        console.error("400 error details:", error.response.data);
        toast.error("Cannot remove: Invalid user ID or permission issue");
      } else if (error.response?.status === 403) {
        toast.error("You are not authorized to remove team members");
      } else {
        toast.error(error.response?.data?.message || "Failed to remove member");
      }
    }
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
              className="px-3 py-2 rounded-xl bg-gradient-to-r bg-cyan-400 text-black font-medium transition-colors cursor-pointer flex items-center space-x-2 hover:bg-black hover:text-cyan-400 hover:border hover:border-cyan-400"
            >
              <span className="font-medium">Add Member</span>
              <div className="bg-black/20 rounded-full p-1">
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              </div>
            </button>
          )}
        </div>

        {/* Team Members Grid */}
        <TeamMembersList
          teamMembers={teamMembers}
          isTeamLeader={isTeamLeader}
          onRemoveMember={handleRemoveMember}
        />
      </div>

      {/* Add Member Drawer Component */}
      <AddMemberDrawer
        isOpen={drawerOpen && isTeamLeader}
        onClose={closeDrawer}
        step={step}
        setStep={setStep}
        newMember={newMember}
        setNewMember={setNewMember}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResults={searchResults}
        isSearching={isSearching}
        handleSearch={handleSearch}
        onSelectUser={selectUserFromSearch}
        onAddMember={handleAddMember}
      />
    </div>
  );
};

export default AddTeamMember;
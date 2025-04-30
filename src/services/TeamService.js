import axios from "../utils/Axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/team`;

export const TeamService = {
  // Get all teams for the current user
  getUserTeams: async () => {
    try {
      const response = await axios.get(`${API_URL}/user-teams`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user teams:", error);
      throw error;
    }
  },

  // Get a specific team by ID
  getTeamById: async (teamId) => {
    try {
      // Validate team ID format
      if (!teamId || !/^[0-9a-fA-F]{24}$/.test(teamId)) {
        throw new Error("Invalid team ID format");
      }

      const response = await axios.get(`${API_URL}/${teamId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching team ${teamId}:`, error);

      // Enhance error object with more useful information
      const enhancedError = new Error(
        error.response?.data?.message || "Failed to fetch team details"
      );

      enhancedError.status = error.response?.status;
      enhancedError.isNotFound = error.response?.status === 404;

      throw enhancedError;
    }
  },

  // Create a new team
  createTeam: async (teamData) => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("TeamName", teamData.teamName);
      formData.append("TeamDescription", teamData.description);

      // Append team logo if exists
      if (teamData.teamLogo) {
        formData.append("TeamLogo", teamData.teamLogo);
      }

      // Append arrays if they exist
      if (teamData.techStack && teamData.techStack.length > 0) {
        teamData.techStack.forEach((tech, index) => {
          formData.append(`techStack[${index}]`, tech);
        });
      }

      if (teamData.interests && teamData.interests.length > 0) {
        teamData.interests.forEach((interest, index) => {
          formData.append(`interests[${index}]`, interest);
        });
      }

      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  },

  // Update team details
  updateTeam: async (teamId, teamData) => {
    try {
      console.log("Updating team:", teamId);
      console.log("Team data:", Object.fromEntries(teamData.entries()));

      const response = await axios.put(`${API_URL}/${teamId}`, teamData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error(`Error updating team ${teamId}:`, error);
      console.error("Error details:", error.response?.data);

      // Enhanced error with more details
      const enhancedError = new Error(
        error.response?.data?.message || "Failed to update team"
      );
      enhancedError.status = error.response?.status || 500;
      enhancedError.data = error.response?.data || {};

      throw enhancedError;
    }
  },

  // Add a member to a team
  addTeamMember: async (teamId, userData) => {
    try {
      const response = await axios.post(
        `${API_URL}/${teamId}/members`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error(`Error adding member to team ${teamId}:`, error);
      throw error;
    }
  },

  // Remove a member from a team
  removeTeamMember: async (teamId, memberId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/${teamId}/members/${memberId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error removing member from team ${teamId}:`, error);
      throw error;
    }
  },

  // Get team chat messages
  getTeamMessages: async (teamId, channelName = "general") => {
    try {
      const response = await axios.get(
        `${API_URL}/${teamId}/chat/${channelName}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching messages for team ${teamId}:`, error);
      throw error;
    }
  },

  // Send a message in team chat
  sendTeamMessage: async (teamId, message, channelName = "general") => {
    try {
      const response = await axios.post(
        `${API_URL}/${teamId}/chat/${channelName}`,
        message
      );
      return response.data;
    } catch (error) {
      console.error(`Error sending message to team ${teamId}:`, error);
      throw error;
    }
  },

  // Get team projects
  getTeamProjects: async (teamId) => {
    try {
      const response = await axios.get(`${API_URL}/${teamId}/projects`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching projects for team ${teamId}:`, error);
      throw error;
    }
  },

  // Get user's join requests (both sent by the user)
  getUserJoinRequests: async () => {
    try {
      const response = await axios.get(`${API_URL}/my-join-requests`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user join requests:", error);
      throw error;
    }
  },

  // Get join requests for a team (team leader only)
  getTeamJoinRequests: async (teamId) => {
    try {
      // Keep consistent with the component's direct API call
      const response = await axios.get(`/api/v1/team/${teamId}/join-requests`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching join requests for team ${teamId}:`, error);

      const enhancedError = new Error(
        error.response?.data?.message || "Failed to fetch join requests"
      );
      enhancedError.status = error.response?.status || 500;
      enhancedError.data = error.response?.data || {};

      throw enhancedError;
    }
  },

  // Send a join request to a team
  sendJoinRequest: async (teamId, message = "") => {
    try {
      const response = await axios.post(`/api/v1/team/${teamId}/join-request`, {
        message,
      });
      return response.data;
    } catch (error) {
      console.error(`Error sending join request to team ${teamId}:`, error);

      const enhancedError = new Error(
        error.response?.data?.message || "Failed to send join request"
      );
      enhancedError.status = error.response?.status || 500;
      enhancedError.data = error.response?.data || {};

      throw enhancedError;
    }
  },

  // Cancel a join request
  cancelJoinRequest: async (teamId) => {
    try {
      const response = await axios.delete(
        `/api/v1/team/${teamId}/join-request`
      );
      return response.data;
    } catch (error) {
      console.error(`Error cancelling join request for team ${teamId}:`, error);

      const enhancedError = new Error(
        error.response?.data?.message || "Failed to cancel join request"
      );
      enhancedError.status = error.response?.status || 500;
      enhancedError.data = error.response?.data || {};

      throw enhancedError;
    }
  },

  // Respond to a join request (accept/reject)
  respondToJoinRequest: async (teamId, requestId, accept) => {
    try {
      const response = await axios.put(
        `${API_URL}/${teamId}/join-request/${requestId}`,
        {
          status: accept ? "accepted" : "rejected",
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error responding to join request ${requestId}:`, error);
      const enhancedError = new Error(
        error.response?.data?.message || "Failed to respond to join request"
      );
      enhancedError.status = error.response?.status || 500;
      enhancedError.data = error.response?.data || {};

      throw enhancedError;
    }
  },

  // Send invitation to a user to join team (team leader only)
  sendTeamInvitation: async (teamId, userId, message = "") => {
    try {
      const response = await axios.post(`/api/v1/team/${teamId}/invite`, {
        userId,
        message,
      });
      return response.data;
    } catch (error) {
      console.error(`Error sending team invitation to user ${userId}:`, error);

      const enhancedError = new Error(
        error.response?.data?.message || "Failed to send team invitation"
      );
      enhancedError.status = error.response?.status || 500;
      enhancedError.data = error.response?.data || {};

      throw enhancedError;
    }
  },

  // Get team invitations (team leader only)
  getTeamInvitations: async (teamId) => {
    try {
      const response = await axios.get(`/api/v1/team/${teamId}/invitations`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching team invitations for team ${teamId}:`,
        error
      );

      const enhancedError = new Error(
        error.response?.data?.message || "Failed to fetch team invitations"
      );
      enhancedError.status = error.response?.status || 500;
      enhancedError.data = error.response?.data || {};

      throw enhancedError;
    }
  },

  // Search for users to invite
  searchPotentialMembers: async (query) => {
    try {
      const response = await axios.get(
        `/api/v1/user/search?q=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching for potential team members:", error);

      const enhancedError = new Error(
        error.response?.data?.message || "Failed to search for users"
      );
      enhancedError.status = error.response?.status || 500;
      enhancedError.data = error.response?.data || {};

      throw enhancedError;
    }
  },
};

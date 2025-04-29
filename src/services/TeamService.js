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
      const response = await axios.get(`${API_URL}/${teamId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching team ${teamId}:`, error);
      throw error;
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
      const formData = new FormData();

      // Append text fields
      if (teamData.teamName) formData.append("TeamName", teamData.teamName);
      if (teamData.description)
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

      const response = await axios.put(`${API_URL}/${teamId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating team ${teamId}:`, error);
      throw error;
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
};

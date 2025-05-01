import { createContext } from "react";

// Create context for sharing state between components
export const TeamContext = createContext({
  activeTab: "overview",
  setActiveTab: () => {},
  isLoading: false,
  teamId: null,
  formData: {
    teamName: "",
    description: "",
    teamImage: "",
    techStack: [],
    interests: [],
    achievements: [],
    projects: [],
    isHoveringImage: false,
  },
  setFormData: () => {},
  teamMembers: [],
  setTeamMembers: () => {},
  isTeamLeader: false,
  handleSubmit: () => {},
  imageFile: null,
  imagePreview: null,
  handleImageChange: () => {},
  handleImageEnter: () => {},
  handleImageLeave: () => {},
  removeImage: () => {},
  navigate: () => {},
});

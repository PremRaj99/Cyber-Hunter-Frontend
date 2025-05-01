/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import { FaChevronLeft } from "react-icons/fa";
import Preloader from "../components/Common/Preloader";
import { toast } from "react-toastify";

// Import component files
import ProjectHeader from "../components/ProjectEdit/ProjectHeader";
import ProjectSidebar from "../components/ProjectEdit/ProjectSidebar";
import ProjectContent from "../components/ProjectEdit/ProjectContent";
import { LoadingState, ErrorState } from "../components/ProjectEdit/ProjectStates";

// Create context for sharing state between components
export const TeamProjectEditContext = createContext();

export default function EditTeamProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [projectUser, setProjectUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("main");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [error, setError] = useState(null);
  const [techInput, setTechInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  const formatCreatedAt = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy, hh:mm a');
    } catch (error) {
      return dateString;
    }
  };

  useEffect(() => {
    document.title = "Edit Project";
    const fetchProjectAndUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the individual project endpoint (not the team projects endpoint)
        const projectRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/project/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          }
        );

        console.log("Project data:", projectRes.data);

        // Check the structure of the response
        if (projectRes.data && projectRes.data.project) {
          setProject(projectRes.data.project);
          setProjectUser(projectRes.data.userDetail);
          setThumbnailPreview(projectRes.data.project.projectThumbnail);

          // Set selected tech stack and languages for MultiSelectInput
          setSelectedTechStack(
            (projectRes.data.project.techStack || []).map(t =>
              t.tagId ? t : { tagId: t._id || t, content: t.content || t }
            )
          );
          setSelectedLanguages(
            (projectRes.data.project.language || []).map(l =>
              l.tagId ? l : { tagId: l._id || l, content: l.content || l }
            )
          );
        } else {
          // If the structure is different, try to handle it
          const projectData = projectRes.data;
          setProject(projectData);
          setThumbnailPreview(projectData.projectThumbnail);

          // Set selected tech stack and languages for MultiSelectInput
          setSelectedTechStack(
            (projectData.techStack || []).map(t =>
              t.tagId ? t : { tagId: t._id || t, content: t.content || t }
            )
          );
          setSelectedLanguages(
            (projectData.language || []).map(l =>
              l.tagId ? l : { tagId: l._id || l, content: l.content || l }
            )
          );
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response?.data?.message || "Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndUser();
  }, [id]);

  const handleInputChange = (e, field) => {
    setProject({ ...project, [field]: e.target.value });
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProject({ ...project, newThumbnail: file });
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImageAdd = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImagePreviews = filesArray.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setNewImages([...newImages, ...newImagePreviews]);
    }
  };

  const handleRemoveImage = (index, isNew = false) => {
    if (isNew) {
      const updatedNewImages = [...newImages];
      updatedNewImages.splice(index, 1);
      setNewImages(updatedNewImages);
    } else {
      const updatedImages = [...project.projectImage];
      updatedImages.splice(index, 1);
      setProject({ ...project, projectImage: updatedImages });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Handle thumbnail upload if changed
      let thumbnailUrl = project.projectThumbnail;
      if (project.newThumbnail) {
        const formData = new FormData();
        formData.append("image", project.newThumbnail);
        const thumbnailRes = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/upload/project-thumbnail`,
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
        );
        thumbnailUrl = thumbnailRes.data.url;
      }

      // Handle new images upload
      let allProjectImages = [...project.projectImage];
      if (newImages.length > 0) {
        const imagePromises = newImages.map(async (image) => {
          const formData = new FormData();
          formData.append("image", image.file);
          const imageRes = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/v1/upload/project-image`,
            formData,
            { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
          );
          return imageRes.data.url;
        });
        const uploadedImageUrls = await Promise.all(imagePromises);
        allProjectImages = [...allProjectImages, ...uploadedImageUrls.map(url => ({ url }))];
      }

      // get project id in console 
      console.log("Project ID:", id);
      console.log("Project Data:", project);

      // Prepare clean project object for update
      const updatedProject = {
        projectName: project.projectName,
        projectDescription: project.projectDescription,
        projectThumbnail: thumbnailUrl,
        projectImage: allProjectImages.map(img => typeof img === "string" ? img : img.url),
        techStack: selectedTechStack.map(t => t.tagId),
        language: selectedLanguages.map(l => l.tagId),
        gitHubLink: project.gitHubLink,
        liveLink: project.liveLink,
      };

      // Try PATCH instead of PUT
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/project/${id}`,
        updatedProject,
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
      );

      toast.success("Project updated successfully!");
      navigate(`/dashboard/project/${id}`);
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  // Show loading or error states
  if (loading) return <LoadingState />;
  if (error || !project) return <ErrorState error={error} navigate={navigate} />;

  // Create context value to share with all child components
  const contextValue = {
    id,
    navigate,
    project,
    setProject,
    projectUser,
    loading,
    saving,
    setSaving,
    activeSection,
    setActiveSection,
    thumbnailPreview,
    setThumbnailPreview,
    newImages,
    setNewImages,
    selectedTechStack,
    setSelectedTechStack,
    selectedLanguages,
    setSelectedLanguages,
    error,
    formatCreatedAt,
    handleInputChange,
    handleThumbnailChange,
    handleImageAdd,
    handleRemoveImage,
    handleSave,
    techInput,
    setTechInput,
    languageInput,
    setLanguageInput
  };

  return (
    <TeamProjectEditContext.Provider value={contextValue}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-8 bg-gradient-to-br to-gray-800 min-h-screen"
      >
        {/* Header with back button */}
        <ProjectHeader />

        {/* Main content */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left sidebar */}
          <ProjectSidebar />

          {/* Main edit area */}
          <ProjectContent />
        </div>
      </motion.div>
    </TeamProjectEditContext.Provider>
  );
}
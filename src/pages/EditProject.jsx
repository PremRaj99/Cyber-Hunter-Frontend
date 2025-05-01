/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import { toast } from "react-toastify";
import Preloader from "../components/Common/Preloader";

// Import our components
import ProjectHeader from "../components/ProjectEdit/ProjectHeader";
import ProjectSidebar from "../components/ProjectEdit/ProjectSidebar";
import ProjectContent from "../components/ProjectEdit/ProjectContent";

// Create context to share state between components
export const ProjectEditContext = createContext();

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [projectUser, setProjectUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("main");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [techInput, setTechInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [error, setError] = useState(null);

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
    fetchProjectAndUser();
  }, [id]);

  const fetchProjectAndUser = async () => {
    try {
      const projectRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/project/${id}`
      );
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load project data");
      setLoading(false);
    }
  };

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

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/project/${id}`,
        updatedProject,
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
      );

      toast.success("Project updated successfully!");
      navigate(`/dashboard/project/${id}`);
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project changes");
      setSaving(false);
    }
  };

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-400 text-xl mb-4">{error}</div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-brandPrimary text-black rounded-lg"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Create the context value to share with child components
  const contextValue = {
    id,
    project,
    projectUser,
    formatCreatedAt,
    activeSection,
    setActiveSection,
    handleInputChange,
    thumbnailPreview,
    handleThumbnailChange,
    newImages,
    handleImageAdd,
    handleRemoveImage,
    saving,
    setSaving,
    handleSave,
    navigate,
    selectedTechStack,
    setSelectedTechStack,
    selectedLanguages,
    setSelectedLanguages,
    techInput,
    setTechInput,
    languageInput,
    setLanguageInput
  };

  return (
    <ProjectEditContext.Provider value={contextValue}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-8 bg-gradient-to-br to-gray-800 min-h-screen"
      >
        <ProjectHeader />

        <div className="grid md:grid-cols-12 gap-8">
          <ProjectSidebar />
          <ProjectContent />
        </div>
      </motion.div>
    </ProjectEditContext.Provider>
  );
}
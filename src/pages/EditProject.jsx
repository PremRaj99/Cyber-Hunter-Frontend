import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import {
  FaSave,
  FaTrash,
  FaExternalLinkAlt,
  FaGithub,
  FaTags,
  FaCode,
  FaImages,
  FaPlusCircle,
  FaCamera,
  FaChevronLeft,
} from "react-icons/fa";
import Preloader from "../components/Common/Preloader";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

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
        const projectRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/project/${id}`
        );
        setProject(projectRes.data.project);
        setProjectUser(projectRes.data.userDetail);
        setThumbnailPreview(projectRes.data.project.projectThumbnail);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const handleAddTech = () => {
    if (techInput.trim()) {
      const newTech = { content: techInput.trim() };
      setProject({
        ...project,
        techStack: [...(project.techStack || []), newTech]
      });
      setTechInput("");
    }
  };

  const handleAddLanguage = () => {
    if (languageInput.trim()) {
      const newLanguage = { content: languageInput.trim() };
      setProject({
        ...project,
        language: [...(project.language || []), newLanguage]
      });
      setLanguageInput("");
    }
  };

  const handleRemoveTech = (index) => {
    const updatedTechStack = [...project.techStack];
    updatedTechStack.splice(index, 1);
    setProject({ ...project, techStack: updatedTechStack });
  };

  const handleRemoveLanguage = (index) => {
    const updatedLanguage = [...project.language];
    updatedLanguage.splice(index, 1);
    setProject({ ...project, language: updatedLanguage });
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

      // Update project
      const updatedProject = {
        ...project,
        projectThumbnail: thumbnailUrl,
        projectImage: allProjectImages,
      };
      delete updatedProject.newThumbnail;

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/project/${id}`,
        updatedProject,
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
      );

      toast.success("Project updated successfully!");

      navigate(`/dashboard/project/${id}`);
    } catch (error) {
      console.error("Error saving project:", error);
      setSaving(false);
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 bg-gradient-to-br to-gray-800 min-h-screen"
    >
      {/* Header with back button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 flex items-center gap-4"
      >
        <button
          onClick={() => navigate(`/dashboard/project/view`)}
          className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600 transition-colors text-white"
          aria-label="Go back"
        >
          <FaChevronLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-cyan-400">Edit Project</h1>
      </motion.div>

      {/* Main content */}
      <div className="grid md:grid-cols-12 gap-8">
        {/* Left sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-3"
        >
          <div className="sticky top-8 bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            <nav className="space-y-2">
              {["main", "description", "media", "tech", "links"].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${activeSection === section
                    ? "bg-brandPrimary/30 text-cyan-400 border-l-4 border-cyan-400 pl-2"
                    : "hover:bg-gray-700/50 text-white"
                    }`}
                >
                  {section === "main" && <FaCode />}
                  {section === "description" && <FaTags />}
                  {section === "media" && <FaImages />}
                  {section === "tech" && <FaCode />}
                  {section === "links" && <FaExternalLinkAlt />}
                  <span className="capitalize">{section}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <motion.button
                onClick={handleSave}
                disabled={saving}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-brandPrimary to-blue-500 text-white font-medium ${saving ? "opacity-70" : "hover:shadow-lg hover:scale-105"
                  } transition-all duration-300`}
                whileHover={{ scale: saving ? 1 : 1.05 }}
                whileTap={{ scale: saving ? 1 : 0.95 }}
              >
                {saving ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FaSave size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </motion.button>

              <button
                onClick={() => navigate(`/dashboard/project/view/${id}`)}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-600 text-white hover:bg-gray-700 transition-all duration-300"
              >
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main edit area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-9"
        >
          <AnimatePresence mode="wait">
            {/* Main section */}
            {activeSection === "main" && (
              <motion.div
                key="main"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">Project Details</h2>

                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={project.projectName}
                      onChange={(e) => handleInputChange(e, "projectName")}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-xl font-semibold text-white"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      Project Points
                    </label>
                    <div
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-green-500 font-semibold"
                    >
                      {project.point || 0}
                    </div>
                  </div>

                  <div>
                    <p className="text-white text-sm">
                      Created at: {formatCreatedAt(project.createdAt)}
                    </p>
                  </div>

                  {projectUser && (
                    <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4">
                      <img
                        src={projectUser.profilePicture || "default-profile-picture-url"}
                        className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                        alt={projectUser.name}
                        draggable={false}
                      />
                      <div>
                        <h4 className="text-xl font-semibold text-cyan-400">{projectUser.name}</h4>
                        <p className="text-white text-sm">{projectUser.username}</p>
                        <p className="text-gray-400 text-xs">
                          {`${projectUser.course} ${projectUser.branch} ${projectUser.session}`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Description section */}
            {activeSection === "description" && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">Project Description</h2>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    Description
                  </label>
                  <textarea
                    value={project.projectDescription}
                    onChange={(e) => handleInputChange(e, "projectDescription")}
                    rows="8"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-white resize-none no-scrollbar"
                    placeholder="Describe your project in detail..."
                  ></textarea>
                </div>
              </motion.div>
            )}

            {/* Media section */}
            {activeSection === "media" && (
              <motion.div
                key="media"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">Project Media</h2>

                {/* Thumbnail */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Project Thumbnail</h3>
                  <div className="relative group">
                    <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg bg-gray-700/50">
                      {thumbnailPreview ? (
                        <img
                          src={thumbnailPreview}
                          alt="Project Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400">No thumbnail</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <label
                          htmlFor="thumbnail-upload"
                          className="cursor-pointer bg-brandPrimary hover:bg-cyan-600 text-white p-3 rounded-full transition-all duration-300 transform group-hover:scale-110"
                        >
                          <FaCamera size={20} />
                        </label>
                      </div>
                    </div>
                    <input
                      type="file"
                      id="thumbnail-upload"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Project Images */}
                <div>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Project Screenshots</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Existing images */}
                    {project.projectImage && project.projectImage.map((image, index) => (
                      <div key={`existing-${index}`} className="relative group rounded-xl overflow-hidden bg-gray-700/50 aspect-video">
                        <img
                          src={image}
                          alt={`Project screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full transition-all duration-300"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* New images */}
                    {newImages.map((image, index) => (
                      <div key={`new-${index}`} className="relative group rounded-xl overflow-hidden bg-gray-700/50 aspect-video">
                        <img
                          src={image.preview}
                          alt={`New project screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                          <button
                            onClick={() => handleRemoveImage(index, true)}
                            className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full transition-all duration-300"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Add new image button */}
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer group flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl aspect-video hover:bg-gray-700/30 transition-all duration-300"
                    >
                      <FaPlusCircle size={24} className="text-gray-400 group-hover:text-cyan-400 mb-2 transition-colors duration-300" />
                      <span className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors duration-300">Add Screenshot</span>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageAdd}
                        className="hidden"
                        multiple
                      />
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tech Stack section */}
            {activeSection === "tech" && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">Tech Stack & Languages</h2>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Technologies Used</h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.map((tech, index) => (
                      <motion.div
                        key={tech._id || index}
                        className="bg-brandPrimary/20 text-cyan-400 px-3 py-1 rounded-lg text-sm flex items-center gap-2 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech.content}
                        <button
                          onClick={() => handleRemoveTech(index)}
                          className="text-cyan-400 hover:text-red-400 transition-colors duration-300"
                        >
                          <IoMdClose size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddTech()}
                      placeholder="Add technology..."
                      className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-white"
                    />
                    <button
                      onClick={handleAddTech}
                      className="bg-brandPrimary hover:bg-cyan-600 text-white p-2 rounded-lg transition-all duration-300"
                    >
                      <FaPlusCircle size={20} />
                    </button>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Programming Languages</h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.language?.map((lang, index) => (
                      <motion.div
                        key={`lang-${index}`}
                        className="bg-brandPrimary/20 text-cyan-400 px-3 py-1 rounded-lg text-sm flex items-center gap-2 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        #{lang.content}
                        <button
                          onClick={() => handleRemoveLanguage(index)}
                          className="text-cyan-400 hover:text-red-400 transition-colors duration-300"
                        >
                          <IoMdClose size={16} />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={languageInput}
                      onChange={(e) => setLanguageInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddLanguage()}
                      placeholder="Add language..."
                      className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-white"
                    />
                    <button
                      onClick={handleAddLanguage}
                      className="bg-brandPrimary hover:bg-cyan-600 text-white p-2 rounded-lg transition-all duration-300"
                    >
                      <FaPlusCircle size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Links section */}
            {activeSection === "links" && (
              <motion.div
                key="links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-cyan-400 mb-6">Project Links</h2>

                <div className="space-y-6">
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      <FaGithub className="text-xl" />
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={project.gitHubLink || ""}
                      onChange={(e) => handleInputChange(e, "gitHubLink")}
                      placeholder="https://github.com/username/repo"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-white"
                    />
                  </div>

                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      <FaExternalLinkAlt className="text-xl text-red-500" />
                      Live Project URL
                    </label>
                    <input
                      type="url"
                      value={project.liveLink || ""}
                      onChange={(e) => handleInputChange(e, "liveLink")}
                      placeholder="https://your-project-url.com"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-white"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
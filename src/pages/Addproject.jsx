import { useState, useRef, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Import new component files
import ProjectHeader from "../components/Project/ProjectHeader";
import ProjectStepNav from "../components/Project/ProjectStepNav";
import ProjectStepContent from "../components/Project/ProjectStepContent";
import ProjectNavButtons from "../components/Project/ProjectNavButtons";
import ProjectProgressIndicator from "../components/Project/ProjectProgressIndicator";

// Create context for sharing state across components
export const ProjectContext = createContext();

const ProjectUpload = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [screenshotPreviews, setScreenshotPreviews] = useState([]);
  const thumbnailRef = useRef(null);
  const screenshotsRef = useRef(null);

  const [project, setProject] = useState({
    projectName: "",
    projectDescription: "",
    techStack: [],
    projectThumbnail: null,
    projectImage: [],
    language: [],
    gitHubLink: "",
    liveLink: "",
  });

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
      setProject({ ...project, projectThumbnail: file });
    }
  };

  const handleScreenshotsChange = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setScreenshotPreviews(previews);
    setProject({ ...project, projectImage: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const gitHubLinkRegex = new RegExp(
      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+/
    );
    const liveLinkRegex = new RegExp(
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+/
    );

    try {
      // Validate required fields
      if (
        !project.projectName ||
        !project.projectDescription ||
        !project.projectThumbnail ||
        !project.techStack.length ||
        !project.language.length
      ) {
        toast.error(
          "Please fill in all required fields including tech stack, skills, and languages"
        );
        return setLoading(false);
      }

      // github and live link validation using regex
      if (project.gitHubLink && !gitHubLinkRegex.test(project.gitHubLink)) {
        toast.error("Invalid GitHub link");
        return setLoading(false);
      }

      if (project.liveLink && !liveLinkRegex.test(project.liveLink)) {
        toast.error("Invalid Live link");
        return setLoading(false);
      }

      const formData = new FormData();

      // Append basic text fields
      formData.append("projectName", project.projectName);
      formData.append("projectDescription", project.projectDescription);
      formData.append("gitHubLink", project.gitHubLink || "");
      formData.append("liveLink", project.liveLink || "");

      // Format and append arrays similar to interest handling
      const techStackIds = project.techStack.map((item) => item.tagId);
      techStackIds.forEach((id, index) => {
        formData.append(`techStack[${index}]`, id);
      });

      const languageIds = project.language.map((item) => item.tagId);
      languageIds.forEach((id, index) => {
        formData.append(`language[${index}]`, id);
      });

      // Debug logging
      console.log("Tech Stack IDs being sent:", techStackIds);
      console.log("Language IDs being sent:", languageIds);

      // Append files
      if (project.projectThumbnail) {
        formData.append("projectThumbnail", project.projectThumbnail);
      }

      project.projectImage.forEach((image) => {
        formData.append("projectImage", image);
      });

      // Log all form data entries
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/project`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data) {
        setProject({
          projectName: "",
          projectDescription: "",
          techStack: [],
          projectThumbnail: null,
          projectImage: [],
          language: [],
          gitHubLink: "",
          liveLink: "",
        });
        setThumbnailPreview("");
        setScreenshotPreviews([]);
        toast.success("Project added successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Error submitting project");
    } finally {
      setLoading(false);
    }
  };

  // Pass shared state and functions to all children via context
  const contextValue = {
    currentStep,
    setCurrentStep,
    loading,
    project,
    setProject,
    thumbnailPreview,
    screenshotPreviews,
    thumbnailRef,
    screenshotsRef,
    handleThumbnailChange,
    handleScreenshotsChange,
    handleSubmit,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      <div className="bg-gradient-to-br p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <ProjectHeader />

          <div className="relative">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 md:p-12 relative">
              <ProjectStepNav />

              {/* Content */}
              <ProjectStepContent />

              {/* Navigation */}
              <ProjectNavButtons />
            </div>
          </div>

          {/* Progress indicator */}
          <ProjectProgressIndicator />
        </div>
      </div>
    </ProjectContext.Provider>
  );
};

export default ProjectUpload;
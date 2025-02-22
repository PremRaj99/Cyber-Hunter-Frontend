import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Github,
  Globe,
  Upload,
  Code2,
  FileCode2,
  Camera,
  X,
  Plus,
  ChevronRight,
  Images
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MultiSelectInput from "../Input/MultiSelectInput";

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
    const previews = files.map(file => URL.createObjectURL(file));
    setScreenshotPreviews(previews);
    setProject({ ...project, projectImage: files });
  };

  const handleTechStackChange = (tech) => {
    if (!project.techStack.includes(tech)) {
      setProject({ ...project, techStack: [...project.techStack, tech] });
    }
  };

  const handleLanguageChange = (lang) => {
    if (!project.language.includes(lang)) {
      setProject({ ...project, language: [...project.language, lang] });
    }
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
        toast.error("Please fill in all required fields including tech stack, skills, and languages");
        return setLoading(false);
      }

      // github and live link validationu using regex
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
      const techStackIds = project.techStack.map(item => item.tagId);
      techStackIds.forEach((id, index) => {
        formData.append(`techStack[${index}]`, id);
      });

      const languageIds = project.language.map(item => item.tagId);
      languageIds.forEach((id, index) => {
        formData.append(`language[${index}]`, id);
      });

      // Debug logging
      console.log('Tech Stack IDs being sent:', techStackIds);
      console.log('Language IDs being sent:', languageIds);

      // Append files
      if (project.projectThumbnail) {
        formData.append("projectThumbnail", project.projectThumbnail);
      }

      project.projectImage.forEach((image) => {
        formData.append("projectImage", image);
      });

      // Log all form data entries
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
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
      console.log(err)
      toast.error(err.response?.data?.message || "Error submitting project");
    } finally {
      setLoading(false);
    }
  };


  const steps = [
    {
      title: "Project Info",
      icon: <Rocket className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Project Name</label>
            <input
              type="text"
              value={project.projectName}
              onChange={(e) => setProject({ ...project, projectName: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-brandPrimary text-white "
              placeholder="Enter project name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
            <textarea
              value={project.projectDescription}
              onChange={(e) => setProject({ ...project, projectDescription: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-brandPrimary text-white h-52 no-scrollbar"
              placeholder="Describe your project"
            />
          </div>
        </div>
      )
    },
    {
      title: "Media Upload",
      icon: <Camera className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-4">
              Thumbnail <span className="text-yellow-400"> {"( Maximum Size 4mb. Jpg, jpeg, png )"}</span>
            </label>
            <div
              onClick={() => thumbnailRef.current?.click()}
              className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-brandPrimary transition-colors"
            >
              {thumbnailPreview ? (
                <img src={thumbnailPreview} alt="Thumbnail" className="max-h-48 mx-auto rounded-lg" />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-400">Click to upload thumbnail</p>
                </div>
              )}
              <input
                type="file"
                ref={thumbnailRef}
                onChange={handleThumbnailChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-4">
              Screenshots&nbsp; <span className="text-yellow-400"> {"( you Can only Upload 5 Screenshots. Jpg, jpeg, png )"}</span>
            </label>

            <div
              onClick={() => screenshotsRef.current?.click()}
              className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-brandPrimary transition-colors"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {screenshotPreviews.map((preview, index) => (
                  <img key={index} src={preview} alt={`Screenshot ${index + 1}`} className="rounded-lg" />
                ))}
                <div className="flex flex-col items-center justify-center min-h-[100px] bg-gray-800/50 rounded-lg">
                  <Plus className="w-8 h-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-400">Add more</p>
                </div>
              </div>
              <input
                type="file"
                ref={screenshotsRef}
                onChange={handleScreenshotsChange}
                accept="image/*"
                multiple
                className="hidden"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Tech Stack",
      icon: <Code2 className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-4">Technologies</label>
            <div className="flex flex-wrap gap-2">

              <MultiSelectInput
                placeholder="Search and select Tech Stack"
                fieldName="techStack"
                apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/techStack`}
                onTagsChange={(tags) => setProject({ ...project, techStack: tags })}
                value={project.techStack}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-4">Languages</label>
            <div className="flex flex-wrap gap-2">
              <MultiSelectInput
                placeholder="Search and select Languages"
                fieldName="language"
                apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/language`}
                onTagsChange={(tags) => setProject({ ...project, language: tags })}
                value={project.language}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Links",
      icon: <Globe className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">GitHub Repository</label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={project.gitHubLink}
                onChange={(e) => setProject({ ...project, gitHubLink: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-brandPrimary text-white"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Live Demo</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={project.liveLink}
                onChange={(e) => setProject({ ...project, liveLink: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:ring-2 focus:ring-brandPrimary text-white"
                placeholder="https://your-project.com"
              />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className=" bg-gradient-to-br  p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-20"
        >
          <div className="border-b-4 border-brandPrimary w-max mx-auto pb-2">
            <span className="text-brandPrimary">Add </span>
            Project
          </div>
          <div className="text-lg text-gray-400 mt-2">
            <h5>
              Showcase your Experience and Skills by adding a new project
            </h5>
          </div>
        </motion.h1>
        <div className="relative">

          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 md:p-12 relative">
            <div className="flex justify-between mb-12 relative ">
              {steps.map((step, index) => (
                <motion.button
                  key={index}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: currentStep === index + 1 ? 1.1 : 1 }}
                  className={`flex flex-col items-center space-y-2 ${currentStep === index + 1 ? "text-cyan-400" :
                    currentStep > index + 1 ? "text-green-400" : "text-gray-500"
                    }`}
                  onClick={() => setCurrentStep(index + 1)}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentStep === index + 1 ? "bg-brandPrimary/20 ring-2 ring-cyan-400" :
                    currentStep > index + 1 ? "bg-green-500/20 ring-2 ring-green-400" : "bg-gray-800"
                    }`}>
                    {step.icon}
                  </div>
                  <span className="text-sm font-medium hidden md:block">{step.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait" >
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-xl"
              >
                {steps[currentStep - 1].content}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 ">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                className="px-6 py-3 text-white hover:text-brandPrimary hover:border-brandPrimary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 rounded-lg border border-gray-700 "
                disabled={currentStep === 1}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                Back
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-3 font-semibold bg-brandPrimary hover:bg-black hover:border hover:border-brandPrimary hover:text-brandPrimary text-black rounded-lg flex items-center gap-2 transition-colors"
                >
                  Next Step
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-3 bg-brandPrimary text-black hover:text-brandPrimary hover:border hover:border-brandPrimary hover:bg-black font-semibold rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black hover:border-brandPrimary border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      Upload Project
                      <Upload className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Step {currentStep} of {steps.length}
        </div>

      </div>
    </div>
  );
};

export default ProjectUpload;
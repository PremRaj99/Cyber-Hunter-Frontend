import { useState, useRef } from "react";
import { motion } from "framer-motion";
import MultiSelectInput from "../Input/MultiSelectInput";
import axios from "axios";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineDescription,
} from "react-icons/md";
import { FaGithub, FaImage, FaImages, FaAsterisk } from "react-icons/fa6";
import { FaEye, FaSearch } from "react-icons/fa";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { toast } from "react-toastify";
import LoadingButton from "../Common/LoadingButton";
import { useNavigate } from "react-router-dom";

export default function Projectpage() {
  const [error, setError] = useState("");
  const [interest, setInterest] = useState([]);
  const navigate = useNavigate();
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState([]);
  const [project, setProject] = useState({
    projectName: "",
    projectDescription: "",
    techStack: [],
    projectThumbnail: null,
    projectImage: [],
    skills: [],
    language: [],
    gitHubLink: "",
    liveLink: "",
  });

  const thumbnailInputRef = useRef(null);
  const screenshotsInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProject({ ...project, projectThumbnail: file });
    }
  };

  const handleScreenshotsChange = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setScreenshotPreview(previews);
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
          skills: [],
          language: [],
          gitHubLink: "",
          liveLink: "",
        });
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

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-black to-cyan-950">
      <main className="mx-auto max-w-4xl px-4 py-8">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold text-cyan-400 text-center mb-20 md:mb-24"
        >
          <span className="border-b-2 border-cyan-400">ADD PROJECT </span>
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex ">
              <label
                htmlFor="project-name"
                className="flex items-middle text-l gap-2 font-medium text-white "
              >
                <span>
                  <MdOutlineDriveFileRenameOutline className="text-brandPrimary text-2xl items-baseline" />
                </span>
                Project Name
                <span className="text-sm text-red-600">
                  <FaAsterisk />
                </span>
              </label>
            </div>
            <Input
              placeholder={"Project Name"}
              value={project.projectName}
              type={"text"}
              width={"full"}
              onChange={(e) =>
                setProject({ ...project, projectName: e.target.value })
              }
            />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label
              htmlFor="description"
              className="flex items-middle text-l gap-2 font-medium text-white"
            >
              <span>
                <MdOutlineDescription className="text-brandPrimary text-2xl items-baseline" />
              </span>
              Description{" "}
              <span className="text-sm text-red-600">
                <FaAsterisk />
              </span>
            </label>
            <textarea
              id="description"
              rows={6}
              value={project.projectDescription}
              onChange={(e) =>
                setProject({ ...project, projectDescription: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-cyan-400/50 bg-black/50 px-4 py-2 text-white shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition duration-300 hover:border-cyan-300"
              placeholder="Project Description"
              required
            />
          </motion.div>

          {/* Thumbnail */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full"
          >
            <label
              htmlFor="thumbnail"
              className="flex items-center space-x-2 text-base font-medium text-white"
            >
              <FaImage className="text-brandPrimary text-xl" />
              <span>Thumbnail</span>
              <FaAsterisk className="text-red-600 text-xs" />
            </label>
            <div className="mt-2 flex items-center space-x-4">
              <input
                type="file"
                ref={thumbnailInputRef}
                className="hidden"
                onChange={handleThumbnailChange}
                accept="image/*"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => thumbnailInputRef.current.click()}
                className="w-auto px-4"
                rounded={"lg"}
              >
                Upload Thumbnail
              </Button>
              {thumbnailPreview && (
                <div className="relative">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="h-20 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            {error && (
              <p className="mt-2 text-xs text-red-500">
                {error}
              </p>
            )}
          </motion.div>

          {/* Project Screenshots */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full"
          >
            <label
              htmlFor="screenshots"
              className="flex items-center space-x-2 text-base font-medium text-white"
            >
              <FaImages className="text-brandPrimary text-xl" />
              <span>Project Screenshots</span>
              <FaAsterisk className="text-red-600 text-xs" />
            </label>
            <div className="mt-2 flex items-center space-x-4">
              <input
                type="file"
                ref={screenshotsInputRef}
                className="hidden"
                onChange={handleScreenshotsChange}
                accept="image/*"
                multiple
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => screenshotsInputRef.current.click()}
                className="w-auto px-4"
                rounded="lg"
              >
                Upload Screenshots
              </Button>
              {screenshotPreview.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {screenshotPreview.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Screenshot Preview ${index + 1}`}
                      className="h-20 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
            </div>
            {error && (
              <p className="mt-2 text-xs text-red-500">
                {error}
              </p>
            )}
          </motion.div>

          {/* Tech Stacks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label
              htmlFor="Tech-Stack"
              className="flex items-middle text-l gap-2 font-medium text-white"
            >
              <span>
                <FaSearch className="text-brandPrimary text-2xl items-baseline" />
              </span>
              Tech Stack
              <span className="text-sm text-red-600">
                <FaAsterisk />
              </span>
            </label>
            <div className="relative mt-1">
              <MultiSelectInput
                placeholder="Search and select Tech Stack"
                fieldName="techStack"
                apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/techStack`}
                onTagsChange={(tags) => setProject({ ...project, techStack: tags })}
                value={project.techStack}
              />
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-2"
          >
            <label
              htmlFor="languages"
              className="flex items-middle text-l gap-2 font-medium text-white"
            >
              <span>
                <FaSearch className="text-brandPrimary text-2xl items-baseline" />
              </span>
              Languages
              <span className="text-sm text-red-600">
                <FaAsterisk />
              </span>
            </label>
            <div className="relative">
              <MultiSelectInput
                placeholder="Search and select Languages"
                fieldName="language"
                apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/language`}
                onTagsChange={(tags) => setProject({ ...project, language: tags })}
                value={project.language}
              />
            </div>
          </motion.div>

          {/* Github Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="space-y-2">
              <label
                htmlFor="github-link"
                className="flex items-middle text-l gap-2 font-medium text-white"
              >
                <span>
                  <FaGithub className="text-brandPrimary text-2xl items-baseline" />
                </span>
                Github Link{" "}
                <span className="text-sm text-red-600">
                  <FaAsterisk />
                </span>
              </label>
              <div>
                <div className="text-xs text-white mb-1">
                  Format :&nbsp;  
                  <span className="text-gray-400">
                     https://github.com/username/repo-name
                  </span>
                </div>
              </div>
              <Input
                onChange={(e) =>
                  setProject({ ...project, gitHubLink: e.target.value })
                }
                width={"full"}
              />
            </div>
          </motion.div>

          {/* Live Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="space-y-2">
              <label
                htmlFor="live-link"
                className="flex items-middle text-l gap-2 font-medium text-white"
              >
                <span>
                  <FaEye className="text-brandPrimary text-2xl items-baseline" />
                </span>
                Live Link
              </label>
              <div>
                <div className="text-xs text-white mb-1">
                  Format :&nbsp;  
                  <span className="text-gray-400">
                     https://example.com
                  </span>
                </div>
              </div>
              <Input
                onChange={(e) =>
                  setProject({ ...project, liveLink: e.target.value })
                }
                width={"full"}
              />
            </div>
          </motion.div>

          {/* Note Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-cyber mb-2 text-brandPrimary">NOTE :</h3>
              <ul className="text-white space-y-1 list-disc list-inside">
                <li>Your Project will be Approved Within 24 hrs</li>
                <li>Copied projects can lead you to getting banned.</li>
              </ul>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex justify-center w-full "
          >
            <LoadingButton loading={loading} onClick={handleSubmit} />
          </motion.div>
        </form>
      </main>
    </div>
  );
}

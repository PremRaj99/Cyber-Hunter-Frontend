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

export default function Projectpage() {
  const [error, setError] = useState("");
  const [interest, setInterest] = useState([]);
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
    setError("");

    try {
      // Validate required fields
      if (!project.projectName || !project.projectDescription || !project.projectThumbnail) {
        setError("Please fill in all required fields");
        return;
      }

      const formData = new FormData();

      // Append basic text fields
      formData.append("projectName", project.projectName);
      formData.append("projectDescription", project.projectDescription);
      formData.append("gitHubLink", project.gitHubLink);
      formData.append("liveLink", project.liveLink);

      // Append arrays as JSON strings
      formData.append("techStack", JSON.stringify(project.techStack));
      formData.append("skills", JSON.stringify(project.skills));
      formData.append("language", JSON.stringify(project.language));

      // Append files
      if (project.projectThumbnail) {
        formData.append("projectThumbnail", project.projectThumbnail);
      }

      project.projectImage.forEach((image, index) => {
        formData.append(`projectImage`, image);
      });

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
        // Reset form or redirect
        alert("Project added successfully!");
        // You might want to redirect here
      }
    } catch (err) {
      console.error("Error submitting project:", err);
      setError(err.response?.data?.message || "Error submitting project");
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
          >
            <label
              htmlFor="thumbnail"
              className="flex items-middle text-l gap-2 font-medium text-white"
            >
              <span>
                <FaImage className="text-brandPrimary text-2xl items-baseline" />
              </span>
              Thumbnail
              <span className="text-sm text-red-600">
                <FaAsterisk />
              </span>
            </label>
            <div className="mt-1 flex gap-4">
              <input
                type="file"
                ref={thumbnailInputRef}
                style={{ display: "none" }}
                onChange={handleThumbnailChange}
                accept="image/*"
              />
              <Button
                type="button"
                onClick={() => thumbnailInputRef.current.click()}
              >
                Upload Thumbnail
              </Button>
              {thumbnailPreview && (
                <div className="mt-2">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="max-w-[200px] max-h-[200px] rounded-md"
                  />
                </div>
              )}
              {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
          </motion.div>

          {/* Project Screenshots */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label
              htmlFor="screenshots"
              className="flex items-middle text-l gap-2 font-medium text-white"
            >
              <span>
                <FaImages className="text-brandPrimary text-2xl items-baseline" />
              </span>
              Project Screenshots
              <span className="text-sm text-red-600">
                <FaAsterisk />
              </span>
            </label>
            <div className="mt-1 flex gap-4">
              <input
                type="file"
                ref={screenshotsInputRef}
                style={{ display: "none" }}
                onChange={handleScreenshotsChange}
                accept="image/*"
                multiple
              />
              <Button
                type="button"
                onClick={() => screenshotsInputRef.current.click()}
              >
                Upload Screenshots
              </Button>
              {screenshotPreview.length > 0 && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {screenshotPreview.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Screenshot Preview ${index + 1}`}
                      className="max-w-[200px] max-h-[200px] rounded-md"
                    />
                  ))}
                </div>
              )}
              {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
          </motion.div>

          {/* Skills Required */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label
              htmlFor="skills-required"
              className="flex items-middle text-l gap-2 font-medium text-white"
            >
              <span>
                <FaSearch className="text-brandPrimary text-2xl items-baseline" />
              </span>
              Skills Required
              <span className="text-sm text-red-600">
                <FaAsterisk />
              </span>
            </label>
            <div className="relative mt-1 ">
              <MultiSelectInput
                placeholder="Search and select Skills"
                fieldName="skills"
                apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/interest`}
                onTagsChange={setInterest}
              />
            </div>
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
                fieldName="Tech Stack"
                apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/interest`}
                onTagsChange={setInterest}
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
                fieldName="Languages"
                apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/interest`}
                onTagsChange={setInterest}
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
            <Button
              type={"submit"}
              rounded={"md"}
              width={"full"}
              onClick={handleSubmit}
            >
              Add Project
            </Button>
          </motion.div>
        </form>
      </main>
    </div>
  );
}
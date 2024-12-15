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
import ProjectImageUpload from "../Common/ProjectImageUpload";

export default function Projectpage() {
  const [interest, setInterest] = useState([]);
  const [error, setError] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [project, setProject] = useState({
    projectName: "",
    description: "",
    techStack: "",
    thumbnail: null,
    screenshots: [],
    skills: [],
    languages: [],
    githubLink: "",
    liveLink: "",
  });

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(project);
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/project`, project).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  };

  const fileInputRef = useRef(null);

  // Predefined skills and tech stacks (you can expand these)

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];

  //   // Validate file size and type
  //   if (file) {
  //     const validTypes = ["image/jpeg", "image/png", "image/jpg"];
  //     const maxSize = 2 * 1024 * 1024; // 2MB

  //     if (!validTypes.includes(file.type)) {
  //       setError("Only JPG, PNG, and JPEG files are supported");
  //       return;
  //     }

  //     if (file.size > maxSize) {
  //       setError("File size should not exceed 2MB");
  //       return;
  //     }

  //     // Create preview
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setThumbnailPreview(reader.result);
  //       setProject({ ...project, thumbnail: file });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleFileLoadEnd = (file, result) => {
  //   setProject((prevProject) => ({
  //     ...prevProject,
  //     screenshots: [...prevProject.screenshots, { file, preview: result }],
  //   }));
  // };

  // const ScreenshotFileChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   // Validate file size and type
  //   const validTypes = ["image/jpeg", "image/png", "image/jpg"];
  //   const maxSize = 5 * 1024 * 1024; // 5MB

  //   const validFiles = files.filter((file) => {
  //     if (!validTypes.includes(file.type)) {
  //       setError("Only JPG, PNG, and JPEG files are supported");
  //       return false;
  //     }

  //     if (file.size > maxSize) {
  //       setError("File size should not exceed 5MB");
  //       return false;
  //     }

  //     return true;
  //   });

  //   if (validFiles.length > 0) {
  //         validFiles.forEach((file) => {
  //           const reader = new FileReader();
  //           reader.onloadend = () => handleFileLoadEnd(file, reader.result);
  //           reader.readAsDataURL(file);
  //         });
    
  //     const handleFileLoadEnd = (file, result) => {
  //       setProject((prevProject) => ({
  //         ...prevProject,
  //         screenshots: [...prevProject.screenshots, { file, preview: result }],
  //       }));
  //     };
  //   }
  // };
    

  // Here you would typically send the data to a backend
  // console.log("Form Submitted:", formData);


  const triggerFileInput = () => {
    fileInputRef.current.click();
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
            <input
              type="text"
              id="live-link"
              value={project.projectName}
              onChange={(e) =>
                setProject({ ...project, projectName: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-cyan-400/50 bg-black/50 px-4 py-2 text-white shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition duration-300 hover:border-cyan-300"
              placeholder="Enter your Project Name"
              required
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
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
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
              htmlFor="skills-required"
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
              <div className="flex justify-start mb-6">
                <ProjectImageUpload
                  project={project}
                  setProject={setProject}
                  error={error}
                  setError={setError}
                  thumbnailPreview={thumbnailPreview}
                  setThumbnailPreview={setThumbnailPreview}
                />
              </div>
              {/* <motion.button
                type="button"
                onClick={triggerFileInput}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 rounded-md border border-cyan-400/50 bg-black/50 px-4 py-2 text-cyan-400 hover:bg-cyan-400/10 transition duration-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span>click here</span>
              </motion.button> */}
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label
              htmlFor="skills-required"
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
              {/* <input
                type="file"
                ref={fileInputRef}
                onChange={ScreenshotFileChange}
                accept=".jpg,.jpeg,.png"
                className="hidden"
              /> */}
              <motion.button
                type="button"
                onClick={triggerFileInput}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 rounded-md border border-cyan-400/50 bg-black/50 px-4 py-2 text-cyan-400 hover:bg-cyan-400/10 transition duration-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span>click here</span>
              </motion.button>
              {project.thumbnailPreview && (
                <div className="mt-2">
                  <img
                    src={project.thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="max-w-[200px] max-h-[200px] rounded-md"
                  />
                </div>
              )}
              {project.thumbnailError && (
                <p className="mt-1 text-xs text-red-500">
                  {project.thumbnailError}
                </p>
              )}
              <p className="mt-1 text-xs text-red-500">
                • Do not upload the image more than 5mb
                <br />• only Jpg,png,jpeg supported
              </p>
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

          {/* Submit Button */}

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
                fieldName="Langugaes"
                apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/interest`}
                onTagsChange={setInterest}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-cyber"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
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
              <input
                type="text"
                id="github-link"
                value={project.githubLink}
                onChange={(e) =>
                  setProject({ ...project, githubLink: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-cyan-400/50 bg-black/50 px-4 py-2 text-white shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition duration-300 hover:border-cyan-300"
                placeholder="Enter your Project Name"
                required
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
              <input
                type="text"
                id="live-link"
                value={project.liveLink}
                onChange={(e) =>
                  setProject({ ...project, liveLink: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-cyan-400/50 bg-black/50 px-4 py-2 text-white shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition duration-300 hover:border-cyan-300"
                placeholder="Enter your Project Name"
                required
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
          >
            <button
              type="submit"
              className="w-full rounded-md  bg-cyan-400 py-2 text-black font-semibold hover:bg-black transition duration-300 hover:border-2 hover:border-brandPrimary hover:text-brandPrimary"
            >
              Add Project
            </button>
          </motion.div>
        </form>
      </main>
    </div>
  );
}

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import MultiSelectInput from "../MultiSelectInput";
import {
  MdOutlineDriveFileRenameOutline,
  MdOutlineDescription,
} from "react-icons/md";
import { FaGithub, FaImage, FaImages } from "react-icons/fa6";
import { FaEye, FaSearch } from "react-icons/fa";

export default function Projectpage() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  // const [multiSelectInput, setMultiSelectInput] = useState([]);
  // const [selectedTechStack, setSelectedTechStack] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailError, setThumbnailError] = useState("");

  const fileInputRef = useRef(null);

  // Predefined skills and tech stacks (you can expand these)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnailError("");

    // Validate file size and type
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(file.type)) {
        setThumbnailError("Only JPG, PNG, and JPEG files are supported");
        return;
      }

      if (file.size > maxSize) {
        setThumbnailError("File size should not exceed 2MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(file);
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const ScreenshotFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnailError("");

    // Validate file size and type
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setThumbnailError("Only JPG, PNG, and JPEG files are supported");
        return;
      }

      if (file.size > maxSize) {
        setThumbnailError("File size should not exceed 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(file);
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect form data
    const formData = {
      projectName,
      description,
      techStack: "",
      thumbnail,
    };

    // Here you would typically send the data to a backend
    console.log("Form Submitted:", formData);
  };

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
          <span className="border-b-2 border-cyan-400">ADD PROJECT</span>
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
                className="flex items-middle text-l gap-2 font-medium text-white  "
              >
                <span>
                  <MdOutlineDriveFileRenameOutline className="text-brandPrimary text-2xl items-baseline" />
                </span>
                Project Name
              </label>
            </div>
            <input
              type="text"
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
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
              Description
            </label>
            <textarea
              id="description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            <label className="flex items-middle text-l gap-2 font-medium text-white">
              <span>
                <FaImage className="text-brandPrimary text-2xl items-baseline" />
              </span>
              Thumbnail
            </label>
            <div className="mt-1 flex gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png"
                className="hidden"
              />
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
              {thumbnailPreview && (
                <div className="mt-2">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="max-w-[200px] max-h-[200px] rounded-md"
                  />
                </div>
              )}
              {thumbnailError && (
                <p className="mt-1 text-xs text-red-500">{thumbnailError}</p>
              )}
              <p className="mt-1 text-xs text-red-500">
                • Do not upload the image more than 2mb
                <br />• only Jpg,png,jpeg supported
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label className="flex items-middle text-l gap-2 font-medium text-white">
              <span>
                <FaImages className="text-brandPrimary text-2xl items-baseline" />
              </span>
              Project Screenshots
            </label>
            <div className="mt-1 flex gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={ScreenshotFileChange}
                accept=".jpg,.jpeg,.png"
                className="hidden"
              />
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
              {thumbnailPreview && (
                <div className="mt-2">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="max-w-[200px] max-h-[200px] rounded-md"
                  />
                </div>
              )}
              {thumbnailError && (
                <p className="mt-1 text-xs text-red-500">{thumbnailError}</p>
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
            <label className="flex items-middle text-l gap-2 font-medium text-white">
              <span>
                <FaSearch className="text-brandPrimary text-2xl items-baseline" />
              </span>
              Skills Required
            </label>
            <div className="relative mt-1 ">
              <MultiSelectInput
                fieldName="Skills"
                apiEndpoint="/api/tag"
                onTagsChange={() => {}}
              />
            </div>
          </motion.div>

          {/* Tech Stacks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label className="flex items-middle text-l gap-2 font-medium text-white">
              <span>
                <FaSearch className="text-brandPrimary text-2xl items-baseline" />
              </span>
              Thumbnail
            </label>
            <div className="relative mt-1">
              <MultiSelectInput
                fieldName="Tech stack"
                apiEndpoint="/api/tag"
                onTagsChange={() => {}}
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
            <label className="flex items-middle text-l gap-2 font-medium text-white">
              <span>
                <FaSearch className="text-brandPrimary text-2xl items-baseline" />
              </span>
              Languages
            </label>
            <div className="relative">
              <MultiSelectInput />
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
              <label className="flex items-middle text-l gap-2 font-medium text-white">
                <span>
                  <FaGithub className="text-brandPrimary text-2xl items-baseline" />
                </span>
                Github Link
              </label>
              <input
                type="text"
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
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
              <label className="flex items-middle text-l gap-2 font-medium text-white">
                <span>
                  <FaEye className="text-brandPrimary text-2xl items-baseline" />
                </span>
                Live Link
              </label>
              <input
                type="text"
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
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

/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const SocialLinksTab = ({
  activeTab,
  formData,
  handleInputChange,
  containerVariants,
  itemVariants
}) => {
  return (
    <motion.div
      className={`space-y-6 ${activeTab !== "social" && "hidden"}`}
      variants={containerVariants}
      initial="hidden"
      animate={activeTab === "social" ? "visible" : "hidden"}
    >
      <div className="grid grid-cols-1 gap-6">
        <motion.div className="group" variants={itemVariants}>
          <label className="flex items-center text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            <FaGithub className="mr-2" /> GitHub
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              https://github.com/
            </span>
            <input
              type="text"
              name="socialLinks.github"
              value={formData.socialLinks?.github || ""}
              onChange={handleInputChange}
              placeholder="username"
              className="w-full pl-[160px] px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
            />
          </div>
        </motion.div>

        <motion.div className="group" variants={itemVariants}>
          <label className="flex items-center text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            <FaLinkedin className="mr-2" /> LinkedIn
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              https://linkedin.com/in/
            </span>
            <input
              type="text"
              name="socialLinks.linkedin"
              value={formData.socialLinks?.linkedin || ""}
              onChange={handleInputChange}
              placeholder="username"
              className="w-full pl-[180px] px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
            />
          </div>
        </motion.div>

        <motion.div className="group" variants={itemVariants}>
          <label className="flex items-center text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            <FaTwitter className="mr-2" /> Twitter
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              https://twitter.com/
            </span>
            <input
              type="text"
              name="socialLinks.twitter"
              value={formData.socialLinks?.twitter || ""}
              onChange={handleInputChange}
              placeholder="username"
              className="w-full pl-[170px] px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
            />
          </div>
        </motion.div>

        <motion.div className="group" variants={itemVariants}>
          <label className="flex items-center text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            <FaInstagram className="mr-2" /> Instagram
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              https://instagram.com/
            </span>
            <input
              type="text"
              name="socialLinks.instagram"
              value={formData.socialLinks?.instagram || ""}
              onChange={handleInputChange}
              placeholder="username"
              className="w-full pl-[180px] px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SocialLinksTab;

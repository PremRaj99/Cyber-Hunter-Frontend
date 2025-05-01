import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const SocialLinksTab = ({
  activeTab,
  formData,
  handleInputChange,
  containerVariants,
  itemVariants
}) => {
  const socialLinks = [
    {
      name: "github",
      icon: <FaGithub size={24} />,
      label: "GitHub Profile",
      placeholder: "https://github.com/username"
    },
    {
      name: "linkedin",
      icon: <FaLinkedin size={24} />,
      label: "LinkedIn Profile",
      placeholder: "https://linkedin.com/in/username"
    },
    {
      name: "twitter",
      icon: <FaTwitter size={24} />,
      label: "Twitter Profile",
      placeholder: "https://twitter.com/username"
    },
    {
      name: "instagram",
      icon: <FaInstagram size={24} />,
      label: "Instagram Profile",
      placeholder: "https://instagram.com/username"
    },
  ];

  return (
    <motion.div
      className={`space-y-6 ${activeTab !== "social" && "hidden"}`}
      variants={containerVariants}
      initial="hidden"
      animate={activeTab === "social" ? "visible" : "hidden"}
    >
      <div className="space-y-6">
        {socialLinks.map((social) => (
          <motion.div
            key={social.name}
            className="group flex items-center gap-3"
            variants={itemVariants}
          >
            <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
              {social.icon}
            </span>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                {social.label}
              </label>
              <input
                type="url"
                name={`socialLinks.${social.name}`}
                value={formData.socialLinks[social.name]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                placeholder={social.placeholder}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialLinksTab;

import { motion } from "framer-motion";
import PropTypes from "prop-types";
import googleIcon from "../../assets/google_icon.png";
import githubIcon from "../../assets/github_icon.png";
import xIcon from "../../assets/x_icon.png";
import linkIcon from "../../assets/linkedin_icon.png";

const SocialIcons = ({ itemVariants }) => {
  const socialIcons = [
    { icon: googleIcon, alt: "Google", url: "#", color: "#DB4437" },
    { icon: githubIcon, alt: "GitHub", url: "#", color: "#333" },
    { icon: xIcon, alt: "X", url: "#", color: "#ffffff" },
    { icon: linkIcon, alt: "LinkedIn", url: "#", color: "#0077B5" },
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-wrap justify-center lg:justify-start gap-3"
    >
      {socialIcons.map((social, index) => (
        <motion.a
          key={social.alt}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className="absolute -inset-2 rounded-lg blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"
            style={{ backgroundColor: social.color }}
          />
          <motion.div className="relative flex items-center justify-center w-12 h-12 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden z-10">
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-b from-white via-transparent to-transparent"
              initial={{ y: "100%" }}
              whileHover={{ y: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <img
              src={social.icon}
              alt={social.alt}
              title={social.alt}
              className="h-6 w-6 object-contain filter drop-shadow"
            />
          </motion.div>
          <motion.span
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: social.color }}
          >
            {social.alt}
          </motion.span>
        </motion.a>
      ))}
    </motion.div>
  );
};

SocialIcons.propTypes = {
  itemVariants: PropTypes.object.isRequired,
};

export default SocialIcons;

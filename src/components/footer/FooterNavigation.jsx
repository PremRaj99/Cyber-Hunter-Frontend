import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FooterNavigation = ({ itemVariants }) => {
  const quickLinks = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/leaderboard", label: "Leaderboard", icon: "🏆" },
    { to: "/event", label: "Events", icon: "📅" },
    { to: "/about", label: "About", icon: "ℹ️" },
    { to: "/contact", label: "Contact", icon: "📞" },
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="lg:col-span-3 flex flex-col items-center lg:items-start"
    >
      <div className="relative mb-8">
        <motion.h3
          className="text-xl font-bold relative"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span className="relative z-10 font-mono tracking-widest text-cyan-400">
            NAVIGATION
          </motion.span>
        </motion.h3>
        <motion.div
          className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          animate={{
            opacity: [0.4, 1, 0.4],
            width: ["30%", "100%", "30%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <ul className="space-y-3 w-full">
        {quickLinks.map((link, index) => (
          <motion.li
            key={link.to}
            variants={itemVariants}
            custom={index}
            whileHover={{ x: 5 }}
            className="relative"
          >
            <Link to={link.to} className="group block">
              <motion.div className="relative overflow-hidden  rounded-lg p-3 flex items-center  transition-all duration-300">
                <span className="text-lg mr-3 text-cyan-500 transition-colors group-hover:text-cyan-400">
                  {link.icon}
                </span>
                <span className="text-gray-400 font-medium group-hover:text-cyan-300 transition-colors">
                  {link.label}
                </span>
                <motion.span
                  className="absolute right-3 opacity-0 group-hover:opacity-100 text-cyan-500"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  →
                </motion.span>
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

FooterNavigation.propTypes = {
  itemVariants: PropTypes.object.isRequired,
};

export default FooterNavigation;

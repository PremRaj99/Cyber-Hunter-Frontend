import { motion } from "framer-motion";
import PropTypes from "prop-types";

const FooterCopyright = ({ isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="relative border-t border-gray-800/50 py-8"
    >
      {/* Animated Light Bar */}
      <motion.div
        className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <motion.p
          className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left"
          whileHover={{ color: "#22d3ee" }}
        >
          <motion.span
            className="inline-block"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-cyan-500 font-bold">©</span>
          </motion.span>{" "}
          Copyrights 2024 |{" "}
          <motion.span
            className="relative text-cyan-500 hover:underline cursor-pointer font-medium"
            whileHover={{ color: "#fff" }}
          >
            Cyber Hunter
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-px bg-cyan-500"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.span>{" "}
          | All Rights Reserved
        </motion.p>

        <div className="flex space-x-8">
          {["Terms & Conditions", "Privacy Policy", "Support"].map(
            (item) => (
              <motion.a
                key={item}
                whileHover={{ scale: 1.05, color: "#22d3ee" }}
                href={item === "Privacy Policy" ? "/policy" : "#"}
                className="relative text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px w-full bg-cyan-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};

FooterCopyright.propTypes = {
  isInView: PropTypes.bool.isRequired,
};

export default FooterCopyright;

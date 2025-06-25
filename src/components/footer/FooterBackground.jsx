import { motion } from "framer-motion";
import PropTypes from "prop-types";

const FooterBackground = ({ hoverPoint }) => {
  return (
    <>
      {/* Interactive Background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${hoverPoint.x * 100}% ${hoverPoint.y * 100
            }%, rgba(8,145,178,0.2) 0%, rgba(0,0,0,0) 70%)`,
          transition: "background 0.3s ease-out",
        }}
      />

      {/* Animated Mesh Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(6,182,212,0.3)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient Edge */}
      <div className="relative">
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Interactive Corner Decorations */}
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32"
        initial={{ opacity: 0.3 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 100L100 0V100H0Z" fill="url(#cornerGradient)" />
          <defs>
            <linearGradient
              id="cornerGradient"
              x1="0"
              y1="100"
              x2="100"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0891b2" stopOpacity="0.3" />
              <stop offset="1" stopColor="#0e7490" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-32 h-32"
        initial={{ opacity: 0.3 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 2.5,
        }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H100L0 100V0Z" fill="url(#cornerGradient2)" />
          <defs>
            <linearGradient
              id="cornerGradient2"
              x1="100"
              y1="0"
              x2="0"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0891b2" stopOpacity="0.3" />
              <stop offset="1" stopColor="#0e7490" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </>
  );
};

FooterBackground.propTypes = {
  hoverPoint: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default FooterBackground;

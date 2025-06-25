import { motion } from "framer-motion";
import PropTypes from "prop-types";
import logo2 from "../../assets/logo2.png";
import SocialIcons from "./SocialIcons";

const FooterBranding = ({ itemVariants }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6"
    >
      <div className="relative group">
        <motion.div
          className="absolute -inset-1 rounded-full opacity-70 blur-lg group-hover:opacity-100 transition duration-700"
          style={{
            background: `conic-gradient(from ${Date.now() / 50
              }deg, #0891b2, #22d3ee, #0891b2)`,
          }}
          animate={{
            filter: ["blur(10px)", "blur(15px)", "blur(10px)"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="relative p-2 z-10"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.div
            className="rounded-full overflow-hidden p-2"
            whileHover={{ rotate: 10 }}
          >
            <img
              src={logo2}
              alt="Cyber Hunter Logo"
              className="w-36 h-36 object-contain"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="text-center lg:text-left"
        variants={itemVariants}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-extrabold mb-2"
          style={{
            WebkitTextStroke: "1px rgba(8,145,178,0.3)",
          }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600">
            CYBER HUNTER
          </span>
          <span className="text-[#00D8FF] font-medium">
            {"  "} X {"  "}{" "}
          </span>{" "}
          <span className="text-[#EC268F]">Qunatum</span>{" "}
          <span className="text-[#fff]">University</span>
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-xs"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          Join the elite squad of digital defenders. Where hacking meets
          innovation.
        </motion.p>
      </motion.div>

      <SocialIcons itemVariants={itemVariants} />
    </motion.div>
  );
};

FooterBranding.propTypes = {
  itemVariants: PropTypes.object.isRequired,
};

export default FooterBranding;

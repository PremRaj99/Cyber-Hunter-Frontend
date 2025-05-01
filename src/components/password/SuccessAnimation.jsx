/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { Sparkles } from "lucide-react";

const SuccessAnimation = ({ navigate }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10"
    >
      {/* Success Animation */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <motion.div
          animate={{
            y: [-100, 0],
            scale: [0.5, 1],
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
        >
          <FaRocket className="w-12 h-12 text-cyan-400 mx-auto" />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute inset-0 bg-brandPrimary rounded-full blur-2xl opacity-20"
        />
      </div>

      <h3 className="text-2xl font-bold mb-4">Password Updated</h3>
      <p className="text-gray-400 mb-6">
        Use Your New Password for login
        <br />
      </p>
      <motion.button
        onClick={() => navigate("/auth/login")}
        className="bg-brandPrimary text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-black hover:text-brandPrimary transition-colors duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Back to Login
      </motion.button>

      {/* Particle Effects */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
            y: [-20, 20],
            x: [-20, 20],
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
          }}
          className="absolute"
          style={{
            left: `${50 + (Math.random() - 0.5) * 40}%`,
            top: `${50 + (Math.random() - 0.5) * 40}%`,
          }}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SuccessAnimation;

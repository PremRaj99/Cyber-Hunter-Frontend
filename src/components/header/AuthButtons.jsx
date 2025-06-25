import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TbLogin, TbSignRight } from "react-icons/tb";

export default function AuthButtons() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center gap-4">
      <motion.button
        className="group relative hidden md:flex items-center gap-2 px-6 py-2 rounded-full overflow-hidden border border-[#00D8FF]-4/30 hover:border-[#00D8FF] transition-colors duration-300"
        onClick={() => navigate("/auth/login?mode=signup")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background gradient effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#00D8FF]/0 via-[#00D8FF]/10 to-[#00D8FF]/0"
          animate={{
            x: ["100%", "-100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
        />

        {/* Icon and text */}
        <TbSignRight className="text-[#00D8FF] group-hover:scale-110 transition-transform duration-300" />
        <span className="text-white font-bold relative">
          Sign Up
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00D8FF] group-hover:w-full transition-all duration-300" />
        </span>

        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-[#00D8FF]/10 blur-md" />
        </div>
      </motion.button>

      <motion.button
        className="group relative  items-center gap-2 md:px-6 md:py-2 hidden md:flex rounded-full overflow-hidden mr-4  transition-colors duration-300 border border-[#00D8FF]-4/30 hover:border-[#00D8FF]"
        onClick={() => navigate("/auth/login")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background particles */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(0,216,255,0.4) 0%, transparent 10%)",
              "radial-gradient(circle at 80% 80%, rgba(0,216,255,0.4) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Icon and text */}
        <TbLogin className="text-brandPrimary group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-white font-bold relative">
          Login
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brandPrimary group-hover:w-full transition-all duration-300" />
        </span>

        {/* Shine effect */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
      </motion.button>
    </div>
  );
}

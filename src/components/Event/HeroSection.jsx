import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ heroRef, heroInView }) {
  const navigate = useNavigate();

  return (
    <motion.section
      ref={heroRef}
      className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 pt-20 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating accent shapes */}
      <motion.div
        className="absolute top-1/4 left-10 w-12 h-12 border-2 border-cyan-500/30 rounded-lg"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          y: [0, -10, 0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-8 h-8 bg-cyan-500/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1, 0.8, 1],
          y: [0, 15, 0, -15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Hero content */}
        <motion.div
          className="order-2 lg:order-1 text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="mb-6 inline-block overflow-hidden"
            initial={{ width: 0 }}
            animate={heroInView ? { width: "auto" } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-sm font-bold py-1 px-3 rounded-full bg-cyan-500/20 text-cyan-500 tracking-wide">
              EVENT MANAGEMENT PLATFORM
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="block">Organize Events</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-500">With Confidence</span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-300 mb-10 max-w-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The all-in-one platform that makes event planning seamless,
            from registration to post-event analytics.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.button
              className="group relative px-8 py-3 rounded-lg overflow-hidden font-bold text-black bg-cyan-500 transition-all duration-300 hover:cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/organizer/login")}
            >
              <span className="relative z-10">Create Your Event</span>
            </motion.button>

            <motion.button
              className="group relative px-8 py-3 rounded-lg overflow-hidden font-medium border border-white/20 hover:border-cyan-500/50 transition-all duration-300"
              onClick={() => navigate("/event")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 group-hover:text-cyan-500 transition-colors duration-300">Explore Events</span>
              <span className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          className="order-1 lg:order-2 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            {/* Glowing outline */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/50 to-blue-500/50 opacity-75 blur-lg"></div>

            {/* Dashboard image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black">
              <motion.div
                className="w-full aspect-video overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://i.ibb.co/Dfm1NMpb/Screenshot-2025-02-21-164657.png"
                  alt="Event Management Dashboard"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </motion.div>

              {/* Floating UI elements */}
              <motion.div
                className="absolute top-6 right-6 p-3 bg-black/80 backdrop-blur-md rounded-lg border border-white/10"
                initial={{ y: 20, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs font-medium">Live Event</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-6 left-6 p-3 bg-black/80 backdrop-blur-md rounded-lg border border-white/10"
                initial={{ y: 20, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                  <span className="text-xs font-medium">3.5K+ Attendees</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
          opacity: [0.3, 1, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs mb-2 tracking-widest">SCROLL</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </motion.div>
    </motion.section>
  );
}

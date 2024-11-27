// import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Mock data - you can replace this with your actual data source
const descriptionData = {
  title: "Description:",
  subheading: "Subheading: Lorem Ipsum",
  bulletPoints: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  ],
};

export default function EventDescription() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  const handleRegister = () => {
    console.log("Register button clicked");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8 bg-black p-4 md:p-8"
    >
      <motion.div
        style={{ scale, opacity }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Description Title */}
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-cyan-400 text-2xl md:text-3xl font-bold"
        >
          {descriptionData.title}
        </motion.h2>

        {/* Subheading */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white text-sm md:text-xl"
        >
          {descriptionData.subheading}
        </motion.div>

        {/* Bullet Points */}
        <ul className="space-y-4 text-white">
          {descriptionData.bulletPoints.map((point, index) => (
            <motion.li
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.1, // Staggered animation
              }}
              className="flex items-start gap-2">
              <div className="h-2 w-2 mt-2 rounded-full bg-brandPrimary flex-shrink-0"></div>
              <span className="text-sm md:text-base leading-relaxed">
                {point}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Register Button */}
        <div className="flex justify-center items-center w-full ">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            onClick={handleRegister}
            className="px-6 py-2 bg-brandPrimary text-black font-bold hover:bg-black hover:text-brandPrimary hover:border hover:border-brandPrimary transition-colors duration-300 rounded-md text-sm md:text-base"
          >
            Register
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

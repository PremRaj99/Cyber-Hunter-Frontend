import React, { useState } from "react";
import { motion } from "framer-motion";
import TeamProfileSection from "./TeamProfileSection";

export default function TeamDashPage() {
  const [activeCategory, setActiveCategory] = useState("Frontend");

  const technologies = [
    "Java", "HTML", "JS", "React", "Node.js", "MongoDB", "CSS", "Next.js",
    "Solidity", "Python", "Django", "Flask", "C++", "C#", "Unity", "AI",
    "ML", "Firebase", "AWS", "Azure", "GCP", "DevOps", "Blockchain", "Cyber Security",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const hoverScale = {
    scale: 1.01,
    transition: { duration: 0.2 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" text-white p-4 md:p-6 bg-gradient-to-br "
    >
      {/* Badges - Top section for mobile, moved for better mobile UX */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800/30 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50 mb-6 lg:hidden"
      >
        <h2 className="text-lg font-semibold mb-3 text-cyan-400">Achievements</h2>
        <div
          className="flex overflow-x-auto no-scrollbar gap-4 pb-2"
        >
          {["gold", "green", "purple", "silver", "orange", "blue"].map((color, index) => (
            <motion.div
              key={index}
              whileHover={hoverScale}
              className={`flex-shrink-0 w-14 h-14 rounded-full border-2 ${color === "gold"
                ? "border-yellow-400 bg-yellow-400/10"
                : color === "green"
                  ? "border-green-400 bg-green-400/10"
                  : color === "purple"
                    ? "border-purple-400 bg-purple-400/10"
                    : color === "silver"
                      ? "border-gray-400 bg-gray-400/10"
                      : color === "orange"
                        ? "border-orange-400 bg-orange-400/10"
                        : "border-cyan-400 bg-cyan-400/10"
                } flex items-center justify-center relative group`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
                <span className={`text-xs font-bold ${color === "gold" ? "text-yellow-400" :
                  color === "green" ? "text-green-400" :
                    color === "purple" ? "text-purple-400" :
                      color === "silver" ? "text-gray-400" :
                        color === "orange" ? "text-orange-400" :
                          "text-cyan-400"
                  }`}>{index + 1}</span>
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap">
                {color.charAt(0).toUpperCase() + color.slice(1)} Badge
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-4 p-2 space-y-6">
          {/* Project Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative bg-gray-800/40 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Team Projects</h2>
            </div>
            <div className="h-[450px] md:h-[480px] overflow-y-auto pr-2 space-y-4 no-scrollbar">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  className="bg-gray-800/40 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50 "
                >
                  <div className="flex gap-4">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1.0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="w-24 h-24 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={`https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                        alt="Project"
                        className="w-full h-full object-cover rounded-lg transition-transform hover:scale-110 duration-500"
                      />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <motion.h3
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-cyan-400 text-lg font-semibold"
                        >
                          TeamSync
                        </motion.h3>
                        <span className="text-gray-400 text-sm">{item} days ago</span>
                      </div>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                        <span>{item === 1 ? "50" : "60"} points</span>
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                        <div className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          <a href="#github" className="hover:underline">GitHub</a>
                        </div>
                        <div className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <a href="#live" className="hover:underline">Live</a>
                        </div>
                      </div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-gray-300 mt-2 line-clamp-2"
                      >
                        TeamSync is an all-in-one project management and team
                        collaboration platform designed to streamline workflows.
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Field of Excellence for desktop */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/40 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50 hidden lg:block"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Field of Excellence</h2>
            </div>
            <div className="space-y-2">
              {["Algorithm Design", "UI/UX Development", "Data Analysis", "ML Integration"].map((field, index) => (
                <div
                  key={index}
                  className="bg-gray-700/30 p-3 rounded-lg flex justify-between items-center"
                >
                  <span>{field}</span>
                  <div className="w-24 bg-gray-600 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-full"
                      style={{ width: `${90 - index * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-6 ">
          {/* Badges for desktop */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800/40 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50 hidden lg:block"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-white">Team Achievements</h2>
            </div>
            <div
              className="flex overflow-x-hidden no-scrollbar gap-6 pb-2"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              {["gold", "green", "purple", "silver", "orange", "blue"].map((color, index) => (
                <motion.div
                  key={index}
                  whileHover={hoverScale}
                  className={`flex-shrink-0 w-16 h-16 rounded-full border-2 ${color === "gold"
                    ? "border-yellow-400 bg-yellow-400/10"
                    : color === "green"
                      ? "border-green-400 bg-green-400/10"
                      : color === "purple"
                        ? "border-purple-400 bg-purple-400/10"
                        : color === "silver"
                          ? "border-gray-400 bg-gray-400/10"
                          : color === "orange"
                            ? "border-orange-400 bg-orange-400/10"
                            : "border-cyan-400 bg-cyan-400/10"
                    } flex items-center justify-center group relative`}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center">
                    <span className={`text-sm font-bold ${color === "gold" ? "text-yellow-400" :
                      color === "green" ? "text-green-400" :
                        color === "purple" ? "text-purple-400" :
                          color === "silver" ? "text-gray-400" :
                            color === "orange" ? "text-orange-400" :
                              "text-cyan-400"
                      }`}>{index + 1}</span>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                    {color.charAt(0).toUpperCase() + color.slice(1)} Badge
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Code Builder and Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team profile section */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex-[5] rounded-xl bg-gray-800/40 shadow-lg backdrop-blur-sm border border-gray-700/50 h-[715px]"
            >
              <TeamProfileSection />
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="rounded-xl bg-gray-800/40 shadow-lg backdrop-blur-sm border border-gray-700/50 p-4 h-[715px]"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Tech Stack</h2>
              </div>
              <div className="max-h-[640px] overflow-y-auto pr-2 no-scrollbar">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                >
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={hoverScale}
                      className="aspect-square bg-gray-700/30 rounded-xl flex items-center justify-center text-sm relative group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all duration-300"></div>
                      <span className="relative z-10 font-medium">{tech}</span>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Field of Excellence for mobile */}
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-800/40 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50 mt-6 lg:hidden"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Field of Excellence</h2>
        </div>
        <div className="space-y-2">
          {["Algorithm Design", "UI/UX Development", "Data Analysis", "ML Integration"].map((field, index) => (
            <div
              key={index}
              className="bg-gray-700/30 p-3 rounded-lg flex justify-between items-center"
            >
              <span>{field}</span>
              <div className="w-24 bg-gray-600 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-400 h-full rounded-full"
                  style={{ width: `${90 - index * 10}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Categories */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Categories</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {["Frontend", "Backend", "DBMS", "AI / ML", "Security", "DevOps"].map(
            (category) => (
              <motion.button
                key={category}
                whileHover={hoverScale}
                whileTap={{ scale: 0.95 }}
                className={`bg-gray-800/40 hover:bg-gray-700/60 
                          ${category === activeCategory ? 'text-cyan-400 border-cyan-400' : 'text-gray-300 border-gray-700/50'} 
                          rounded-lg py-3 px-4 transition-all duration-300 border backdrop-blur-sm`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </motion.button>
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
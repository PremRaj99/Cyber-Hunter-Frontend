import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";
import LeaderboardList from "../leaderboard/LeaderboardList";
import leaduserdemo from "../../assets/leaduserdemo.png";
import { useRef } from "react";

import { default as goldCrown } from "../../assets/goldCrown.svg";
import { default as silverCrown } from "../../assets/silverCrown.svg";
import { default as bronzeCrown } from "../../assets/bronzeCrown.svg";

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("INDIVIDUAL");
  const [openDropdown, setOpenDropdown] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedOptions, setSelectedOptions] = useState({});

  // Mock data for leaderboard (same as original)
  const individualData = [
    {
      rank: 1,
      name: "John Doe",
      points: 1250,
      techStack: "React",
      language: "JavaScript",
    },
    {
      rank: 2,
      name: "Jane Smith",
      points: 1180,
      techStack: "Vue",
      language: "TypeScript",
    },
    {
      rank: 3,
      name: "Alex Johnson",
      points: 1100,
      techStack: "Angular",
      language: "Python",
    },
    {
      rank: 4,
      name: "Sam Williams",
      points: 1050,
      techStack: "Svelte",
      language: "Go",
    },
    {
      rank: 5,
      name: "Emily Brown",
      points: 1000,
      techStack: "React Native",
      language: "Kotlin",
    },
    {
      rank: 6,
      name: "Michael Lee",
      points: 950,
      techStack: "Flutter",
      language: "Dart",
    },
    {
      rank: 7,
      name: "Sarah Kim",
      points: 900,
      techStack: "Node.js",
      language: "TypeScript",
    },
    {
      rank: 8,
      name: "Sarah Kim",
      points: 900,
      techStack: "Node.js",
      language: "TypeScript",
    },
    {
      rank: 9,
      name: "Sarah Kim",
      points: 900,
      techStack: "Node.js",
      language: "TypeScript",
    },
  ];

  const teamData = [
    {
      rank: 1,
      name: "Tech Titans",
      points: 3500,
      techStack: "Full Stack",
      members: 5,
    },
    {
      rank: 2,
      name: "Code Crushers",
      points: 3250,
      techStack: "Backend",
      members: 4,
    },
    {
      rank: 3,
      name: "Byte Breakers",
      points: 3100,
      techStack: "Frontend",
      members: 6,
    },
    {
      rank: 4,
      name: "Algo Architects",
      points: 2950,
      techStack: "ML",
      members: 3,
    },
    {
      rank: 5,
      name: "Cloud Coders",
      points: 2800,
      techStack: "Cloud",
      members: 4,
    },
    {
      rank: 6,
      name: "Data Dynamos",
      points: 2650,
      techStack: "Data Science",
      members: 5,
    },
    {
      rank: 7,
      name: "Web Warriors",
      points: 2500,
      techStack: "Web Dev",
      members: 6,
    },
    {
      rank: 8,
      name: "Mobile Mavericks",
      points: 2350,
      techStack: "Mobile",
      members: 3,
    },
    {
      rank: 9,
      name: "Security Sentinels",
      points: 2200,
      techStack: "Cybersecurity",
      members: 4,
    },
    {
      rank: 10,
      name: "AI Innovators",
      points: 2050,
      techStack: "AI/ML",
      members: 5,
    },
  ];

  // Dropdown options
  const dropdowns = [
    {
      label: "Select Tech Stack",
      options: ["React", "Vue", "Angular", "Svelte", "Node.js"],
    },
    {
      label: "Select Language",
      options: ["JavaScript", "TypeScript", "Python", "Go", "Rust"],
    },
    {
      label: "Select Tag",
      options: ["Open Source", "Machine Learning", "Web Dev", "Mobile App"],
    },
  ];

  const handleOptionSelect = (dropdownIndex, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [dropdownIndex]: option,
    }));
  };

  // Animation variants
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
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full bg-gradient-to-b md:p-8 p-4"
    >
      <main ref={ref} className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold text-cyan-400 text-center mb-20 md:mb-24"
        >
          <span className="border-b-2 border-cyan-400">LEADERBOARD</span>
        </motion.h2>

        {/* Top 3 Teams/Individuals */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 relative"
        >
          {[2, 1, 3].map((rank) => {
            let crownSrc = "";
            let namecol = "";
            let pointcol = "";
            if (rank === 2) {
              crownSrc = silverCrown;
              namecol = "text-silver-400";
              pointcol = "text-silver-400";
            } else if (rank === 1) {
              crownSrc = goldCrown;
              namecol = "text-[#ffd700]";
              pointcol = "text-[#ffd700]";
            } else {
              crownSrc = bronzeCrown;
              namecol = "text-[#cd7f32]";
              pointcol = "text-[#cd7f32]";
            }

            return (
              <motion.div
                key={rank}
                variants={itemVariants}
                className="flex flex-col items-center relative w-[100px] mx-auto"
              >
                {/* Crown SVG */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full md:w-40">
                  <img
                    src={crownSrc}
                    alt={`${rank}${
                      rank === 1 ? "st" : rank === 2 ? "nd" : "rd"
                    } place crown`}
                    className="w-[120px] h-[120px] mb-[11px] ml-[0.4px] md:mt-12 md:w-full md:h-full object-cover mt-8  "
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-16 h-16 md:w-24 md:h-24 bg-indigo-800 rounded-full mb-2 md:mb-4 relative z-0"
                >
                  <img
                    src={leaduserdemo}
                    alt="Team Logo"
                    className={`w-full h-full rounded-full`}
                  />
                </motion.div>
                <p
                  className={`text-white text-sm md:text-base text-center mt-2 ${namecol}`}
                >
                  {activeTab === "INDIVIDUAL"
                    ? individualData[rank - 1].name
                    : teamData[rank - 1].name}
                </p>
                <p className={`text-gray-400 text-xs md:text-sm ${pointcol}`}>
                  {activeTab === "INDIVIDUAL"
                    ? `${individualData[rank - 1].points} Points`
                    : `${teamData[rank - 1].points} Points`}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <hr className="m-10" />

        {/* Toggle Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8 border-2 border-cyan-400 rounded-full md:mx-40 overflow-hidden mx-18 transition-all ease-in duration-300"
        >
          <button
            onClick={() => setActiveTab("INDIVIDUAL")}
            className={`flex-1 px-8 md:px-8 py-2 font-bold transition-colors 
            ${
              activeTab === "INDIVIDUAL"
                ? "bg-cyan-400 text-black"
                : "bg-transparent text-white hover:bg-white/10"
            }`}
          >
            INDIVIDUAL
          </button>
          <button
            onClick={() => setActiveTab("TEAM")}
            className={`flex-1 px-8 md:px-10 py-2 md:py-2  font-bold transition-colors 
            ${
              activeTab === "TEAM"
                ? "bg-cyan-400 text-black"
                : "bg-transparent text-white hover:bg-white/10"
            }`}
          >
            TEAM
          </button>
        </motion.div>

        {/* Filters and List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 md:gap-12 "
        >
          {/* Left Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            {/* Search */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <input
                type="text"
                placeholder="Search Here"
                className="w-full px-4 py-2 bg-white bg-opacity-10 rounded-lg text-white 
          placeholder-stone-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </motion.div>

            {/* Dropdowns */}
            {dropdowns.map((dropdown, index) => (
              <motion.div
                key={dropdown.label}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <div
                  onClick={() =>
                    setOpenDropdown(openDropdown === index ? null : index)
                  }
                  className="w-full px-4 py-2 bg-white bg-opacity-10 rounded-lg 
            text-white flex items-center justify-between cursor-pointer 
            focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  {selectedOptions[index] || dropdown.label}
                  <motion.div
                    animate={{ rotate: openDropdown === index ? 180 : 0 }}
                  >
                    <FaAngleDown className="ml-2 w-4 h-4" />
                  </motion.div>
                </div>
                {openDropdown === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 w-full mt-1  bg-gray-900 bg-opacity-800 rounded-lg shadow-lg"
                  >
                    {dropdown.options.map((option) => (
                      <motion.div
                        key={option}
                        onClick={() => {
                          handleOptionSelect(index, option);
                          setOpenDropdown(null);
                        }}
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          scale: 1.02,
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2  cursor-pointer 
                  text-white transition-all hover:border-2 hover:border-r-4 duration-200 ease-in-out"
                      >
                        {option}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Leaderboard List Container */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1 h-[500px] overflow-y-auto bg-white/5 rounded-lg no-scrollbar"
          >
            {activeTab === "INDIVIDUAL" ? (
              <LeaderboardList data={individualData} />
            ) : (
              <LeaderboardList data={teamData} />
            )}
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}

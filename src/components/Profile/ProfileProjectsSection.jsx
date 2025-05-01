import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProfileProjectCard from "./ProfileProjectCard";
import ProfileDiscription from "./ProfileDiscription";

const ProfileProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/project`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        // Ensure projects is always an array
        const projectsData = response.data?.data || response.data;
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        console.log("Fetched projects:", projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Initialize with empty array on error
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col-reverse lg:col-span-4 lg:flex-col space-y-2 gap-4 md:gap-0 no-scrollbar"
      variants={itemVariants}
    >
      <div className="flex flex-col md:space-y-0 bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 backdrop-blur-sm">
        <div>
          <h2 className="text-lg font-semibold text-brandPrimary ml-4">Projects</h2>
        </div>
        <motion.div
          className="h-[450px] md:h-[525px] rounded-2xl overflow-y-auto pr-2 mt-6 md:mt-0 no-scrollbar"
          variants={itemVariants}
        >
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project) => (
              <ProfileProjectCard key={project._id} project={project} />
            ))
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center h-full text-gray-400"
              variants={itemVariants}
            >
              <svg
                className="w-16 h-16 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p className="text-lg font-semibold">No Projects Yet</p>
              <p className="text-sm text-gray-500">
                Start adding your projects to showcase your work
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Field of Excellence */}
      <h2 className="text-lg font-semibold text-brandPrimary">
        Field of Excellence
      </h2>
      <motion.div
        className="flex w-full bg-gray-800/60 rounded-xl h-[210px] p-4 gap-4 border border-gray-700/50 backdrop-blur-sm "
        variants={itemVariants}
      >
        <div className="overflow-y-auto no-scrollbar">
          <ProfileDiscription />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileProjectsSection;

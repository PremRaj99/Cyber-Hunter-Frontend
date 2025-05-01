/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import TechStack from "../Common/TechStackItem";

const ProfileTechStack = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const [tech, setTech] = useState([]);
  const [projects, setProjects] = useState([]);

  // fetch projects first
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
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Initialize with empty array on error
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  // fetch TechStack based on projects
  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        setIsLoading(true);
        if (projects.length === 0) {
          setIsLoading(false);
          return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/techstack/me/${projects[0]?.userId}`
        );
        setTech(response.data);
        console.log("Fetched tech stack:", response.data);
      } catch (error) {
        console.error("Error fetching tech stack:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTechStack();
  }, [projects]);

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
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="max-h-[700px] overflow-y-auto no-scrollbar rounded-xl bg-gray-800/60 border border-gray-700/50 backdrop-blur-lg"
      variants={itemVariants}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
        </div>
      ) : tech && tech.length > 0 ? (
        <motion.div
          className="flex items-center gap-8"
          variants={containerVariants}
        >
          <TechStack techstack={tech} />
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center h-[200px] "
          variants={itemVariants}
        >
          <svg
            className="w-12 h-12 text-gray-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <p className="text-gray-400 text-center mb-2">
            No technologies found
          </p>
          <p className="text-gray-500 text-sm text-center">
            Add some technologies to showcase your skills
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProfileTechStack;

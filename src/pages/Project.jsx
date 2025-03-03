import React, { useState, useEffect, use } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaTags,
  FaCode,
  FaCalendarAlt,
  FaArrowLeft,
  FaArrowRight
} from "react-icons/fa";
import ImageSlider from "../components/Project/ImageSlider";
import Preloader from "../components//Common/Preloader";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projectUser, setProjectUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatCreatedAt = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy, hh:mm a');
    } catch (error) {
      return dateString;
    }
  };

  useEffect(() => {
    const fetchProjectAndUser = async () => {
      try {
        const projectRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/project/${id}`
        );
        setProject(projectRes.data.project);
        setProjectUser(projectRes.data.userDetail);
        document.title = projectRes.data.project?.projectName || "Project";
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchProjectAndUser();
  }, [id]);

  if (loading) {
    return <Preloader />;
  }

  if (!project) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-black p-4">
        {/* Main container */}
        <div className="relative w-full max-w-lg mx-auto">
          {/* Decorative elements */}
          <div className="absolute -top-20 left-1/2 w-32 h-32 bg-cyan-500 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-20 right-1/2 w-32 h-32 bg-cyan-500 rounded-full opacity-20 blur-xl"></div>

          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-300 opacity-50 blur-lg transform -rotate-1"></div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-cyan-500 to-cyan-300 opacity-50 blur-lg transform rotate-1"></div>

          {/* Content card */}
          <div className="relative bg-black border border-cyan-500/30 rounded-2xl shadow-2xl p-8 overflow-hidden">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#0e7490_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

            {/* 404 background text */}
            <div className="absolute -right-4 -top-6 text-9xl font-black text-cyan-500 opacity-10">404</div>

            {/* Main content */}
            <div className="relative">
              <div className="flex items-center mb-2">
                <div className="h-px w-8 bg-cyan-500 mr-4"></div>
                <span className="text-cyan-500 uppercase text-sm tracking-widest">Error</span>
              </div>

              <h2 className="text-5xl font-extrabold text-white mb-2">
                Project <span className="text-cyan-400">Not Found</span>
              </h2>

              <div className="h-1 w-20 bg-cyan-500 rounded-full mt-2 mb-6"></div>

              <p className="text-gray-400 mb-8">
                The project you're looking for doesn't exist or has been moved to another dimension.
              </p>

              {/* Back button with cyan hover effect */}
              <button
                onClick={() => navigate(-1)}
                className="group relative flex items-center bg-black text-cyan-400 border border-cyan-500/50 rounded-lg px-6 py-3 overflow-hidden transition-all duration-300 hover:bg-cyan-500 hover:text-black focus:outline-none"
              >
                <span className="absolute inset-0 w-0 bg-cyan-500 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative flex items-center font-medium">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Home
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          {/* Hero section */}
          <div className="relative rounded-3xl overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/100 to-transparent z-10" />
            <img
              src={project.projectThumbnail}
              alt={project.projectName}
              className="w-full h-[60vh] object-cover object-center"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                  {project.projectName}
                </h1>
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-full">
                    <FaTags className="text-cyan-400" />
                    <span className="text-white">
                      Points: <span className="text-cyan-400 font-semibold">{project.point}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-full">
                    <FaCalendarAlt className="text-cyan-400" />
                    <span className="text-white text-sm">{formatCreatedAt(project.createdAt)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {project.gitHubLink && (
                    <motion.a
                      href={project.gitHubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-800/70 hover:bg-gray-700/90 backdrop-blur-sm px-6 py-3 rounded-full text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaGithub className="text-xl" />
                      View on GitHub
                    </motion.a>
                  )}

                  {project.liveLink && (
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-cyan-600/90 hover:bg-cyan-700 backdrop-blur-sm px-6 py-3 rounded-full text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Project description */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 mb-8 border border-gray-700/50 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-brandPrimary/20 rounded-full p-3">
                    <FaCode className="text-cyan-400 text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Project Description</h2>
                </div>
                <p className="text-white leading-relaxed">
                  {project.projectDescription}
                </p>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Project Screenshots</h2>
                <ImageSlider images={project.projectImage || []} />
              </div>
            </motion.div>

            {/* Right column - Info cards */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col gap-8"
            >
              {/* Creator card */}
              {projectUser && (
                <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                  <h2 className="text-2xl font-bold text-white mb-6">Creator</h2>
                  <div className="flex items-center gap-4">
                    <img
                      src={projectUser.profilePicture || "/default-avatar.png"}
                      className="w-20 h-20 rounded-full object-cover border-2 border-cyan-400 shadow-lg"
                      alt={projectUser.name}
                      draggable={false}
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{projectUser.name}</h3>
                      <p className="text-cyan-400">@{projectUser.username}</p>
                      <p className="text-gray-400 text-sm mt-2">
                        {`${projectUser.course} ${projectUser.branch}`}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {`${projectUser.session} • ${projectUser.qId}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tech stack card */}
              <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-brandPrimary/20 rounded-full p-3">
                    <FaCode className="text-cyan-400 text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Tech Stack</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech, index) => (
                    <motion.div
                      key={tech._id || `tech-${index}`}
                      className="bg-gray-700/70 text-cyan-400 px-4 py-2 rounded-full text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {tech.content}
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <div className="bg-brandPrimary/20 rounded-full p-3 items-center">
                    <FaTags className="text-cyan-400 text-xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mt-6 mb-6">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.language?.map((lang, index) => (
                    <motion.div
                      key={`lang-${index}`}
                      className="bg-gray-700/70 text-cyan-400 px-4 py-2 rounded-full text-sm"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      #{lang.content}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats card (can add more project stats here) */}
              <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Project Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/60 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Points</p>
                    <p className="text-2xl font-bold text-cyan-400">{project.point}</p>
                  </div>
                  <div className="bg-gray-700/60 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Screenshots</p>
                    <p className="text-2xl font-bold text-cyan-400">{project.projectImage?.length || 0}</p>
                  </div>
                  <div className="bg-gray-700/60 rounded-xl p-4 col-span-2">
                    <p className="text-gray-400 text-sm mb-1">Created</p>
                    <p className="text-xl font-semibold text-white">{formatCreatedAt(project.createdAt)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
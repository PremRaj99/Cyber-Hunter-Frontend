import { useRef, useEffect, useState } from "react";
import { FaEye, FaGithub, FaCalendar, FaMedal } from "react-icons/fa";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { format } from 'date-fns';
import { Link, useNavigate } from "react-router-dom";
import DeleteProjectPopUp from "./DeleteProjectPopUp";
import { FaLink } from "react-icons/fa6";

const formatCreatedAt = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'dd MMM yyyy, hh:mm a');
  } catch (error) {
    return dateString;
  }
};

export default function ViewProjectItem() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/project`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
          >
            Project Gallery
          </motion.h1>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project }) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.98, 1]);

  return (
    <div className="relative">
      <DeleteProjectPopUp
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onDelete={() => deleteProject(project._id)}
      />

      <motion.div
        ref={ref}
        style={{ opacity, scale }}
        whileHover={{ y: -4 }}
        className="group relative rounded-2xl p-6 backdrop-blur-sm border bg-gray-950 border-brandPrimary/50 overflow-hidden"
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-brandPrimary/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Project Image */}
          <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden">
            <motion.img
              src={project.projectThumbnail}
              alt={project.projectName}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              draggable="false"
            />
          </div>

          {/* Project Details */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {project.projectName.toUpperCase().slice(0, 17)}
              </h2>
              <div className="flex items-center gap-2 text-gray-400">
                <FaMedal className="text-yellow-500" />
                <span>{project.points || 0} points</span>
              </div>
            </div>

            {/* Project Links */}
            <div className="flex gap-4">
              {project.gitHubLink && (
                <a
                  href={project.gitHubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-brandPrimary transition-colors"
                >
                  <FaGithub /> GitHub
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-brandPrimary transition-colors"
                >
                  <FaLink /> Live Demo
                </a>
              )}
            </div>

            {/* Status and Date */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium
                  ${project.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                    project.status === "approved" ? "bg-green-500/20 text-green-400" :
                      "bg-red-500/20 text-red-400"}`}>
                  {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FaCalendar />
                <span>{formatCreatedAt(project.createdAt)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex md:justify-end justify-center gap-4 md:gap-3 mt-4 py-2">
              <Link to={`/dashboard/project/${project._id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-transparent font-semibold text-brandPrimary border-2 border-brandPrimary hover:bg-cyan-600 hover:text-black transition-colors"
                >
                  View
                </motion.button>
              </Link>
              <Link to={`/dashboard/project/edit/${project._id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-transparent font-semibold text-green-400 border-2 border-green-600 hover:bg-green-500 hover:text-black transition-colors"
                >
                  Edit
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteAlert(true)}
                className="px-4 py-2 rounded-lg bg-transparent border-2 font-semibold border-red-600 text-red-600 hover:bg-red-600 transition-colors hover:text-black"
              >
                Delete
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
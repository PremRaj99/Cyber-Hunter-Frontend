/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { FaGithub, FaCalendar, FaMedal } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from 'axios';
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import DeleteProjectPopUp from "../components/Project/DeleteProjectPopUp";
import { FaLink } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const formatCreatedAt = (dateString) => {
  try {
    const date = new Date(dateString);
    return format(date, 'dd MMM yyyy, hh:mm a');
  } catch (error) {
    return dateString;
  }
};

export default function ViewTeamProject() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [teamId, setTeamId] = useState(null);
  const [fetchingUserData, setFetchingUserData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user data to get teamId
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setFetchingUserData(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });

        if (response.data && response.data.data && response.data.data.teamId) {
          setTeamId(response.data.data.teamId);
        } else {
          toast.error("You don't belong to any team. Please join or create a team first.");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to get your team information");
      } finally {
        setFetchingUserData(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  console.log("teamId", teamId);

  // Fetch team projects when teamId is available
  useEffect(() => {
    const fetchProjects = async () => {
      if (!teamId) return; // Don't fetch if teamId is not available

      try {
        setIsLoading(true);
        // Remove the extra space after teamId that might be causing issues
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/project/team/${teamId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        console.log("Team projects response:", response.data);

        // Check the structure of the response and extract the projects array
        if (response.data && response.data.success) {
          // The backend returns { success: true, data: [...projects], message: '...' }
          setProjects(response.data.data || []);
        } else {
          // Fallback to empty array if data structure is not as expected
          setProjects([]);
          setError("No projects found for this team");
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.response?.data?.message || "Failed to load team projects");
        setProjects([]); // Ensure projects is always an array
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [teamId]);

  // Show loading state
  if (fetchingUserData || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brandPrimary"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-400 text-xl mb-4">{error}</p>
        <button
          onClick={() => navigate("/dashboard/team")}
          className="px-4 py-2 bg-brandPrimary text-black rounded-lg"
        >
          Return to Team Dashboard
        </button>
      </div>
    );
  }

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
            Team Project Gallery
          </motion.h1>
        </div>

        {projects.length > 0 ? (
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
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-400 mb-4">No team projects found</h3>
            <p className="text-gray-500 mb-8">Your team hasn&apos;t created any projects yet.</p>
            <Link to="/dashboard/team/addproject">
              <button className="px-6 py-3 bg-brandPrimary text-black rounded-lg hover:bg-transparent hover:text-brandPrimary hover:border hover:border-brandPrimary transition-all">
                Create Your First Team Project
              </button>
            </Link>
          </div>
        )}
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
              <Link to={`/dashboard/team/editproject/${project._id}`}>
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
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TeamProjects = ({ containerVariants }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.currentUser);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Fetch team projects
  useEffect(() => {
    const fetchProjects = async () => {
      if (!user?.teamId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/project/team/${user.teamId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.data && response.data.success) {
          setProjects(response.data.data || []);
        } else {
          setError("No projects found for this team");
        }
      } catch (error) {
        console.error("Error fetching team projects:", error);
        setError(error.response?.data?.message || "Failed to load team projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [user?.teamId]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-gray-800/40 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Team Projects</h2>
        <Link to="/dashboard/team/viewproject" className="text-sm text-cyan-400 hover:underline">
          View all
        </Link>
      </div>

      <div className="h-[450px] md:h-[480px] overflow-y-auto pr-2 space-y-4 no-scrollbar">
        {isLoading ? (
          // Loading state
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          </div>
        ) : error ? (
          // Error state
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-400 mb-3">{error}</p>
            <Link
              to="/dashboard/team/addproject"
              className="px-4 py-2 bg-brandPrimary text-black rounded-lg hover:bg-transparent hover:text-brandPrimary hover:border hover:border-brandPrimary transition-all text-sm"
            >
              Create a Project
            </Link>
          </div>
        ) : projects.length > 0 ? (
          // Projects found
              projects.map((project) => (
            
            <motion.div
              key={project._id}
              variants={itemVariants}
              className="bg-gray-800/40 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-700/50"
            >
              <div className="flex gap-4">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-24 h-24 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0"
                >
                  <img
                    src={project.projectThumbnail}
                    alt={project.projectName}
                    className="w-full h-full object-cover rounded-lg transition-transform hover:scale-110 duration-500"
                    onError={(e) => {
                        e.target.src = `https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=500&auto=format`;
                      }}
                      />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <motion.h3
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-cyan-400 text-lg font-semibold"
                          title={project.projectName} // Show full name on hover
                        >
                          {project.projectName.length > 20
                            ? `${project.projectName.slice(0, 20)}...`
                            : project.projectName}
                        </motion.h3>
                      <span className="text-gray-400 text-sm">
                        {formatDate(project.createdAt)}
                      </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                      {project.gitHubLink && (
                        <div className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <a
                          href={project.gitHubLink}
                          className="hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </a>
                        </div>
                      )}

                      {project.liveLink && (
                        <div className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <a
                          href={project.liveLink}
                          className="hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live
                        </a>
                        </div>
                      )}

                      <div className="flex items-center gap-1 hover:text-cyan-400 transition-colors ml-auto">
                        <Link to={`/dashboard/project/${project._id}`} className="hover:underline">
                        View Details
                        </Link>
                      </div>
                      </div>
                      <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-sm text-white mt-2 line-clamp-2"
                      >
                      {project.projectDescription || "No description provided."}
                      </motion.p>
                    </div>
                    </div>
                  </motion.div>
                  ))
                ) : (
          // No projects
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-400 mb-3">Your team hasn&apos;t created any projects yet.</p>
            <Link
              to="/dashboard/team/addproject"
              className="px-4 py-2 bg-brandPrimary text-black rounded-lg hover:bg-transparent hover:text-brandPrimary hover:border hover:border-brandPrimary transition-all text-sm"
            >
              Create Your First Project
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamProjects;

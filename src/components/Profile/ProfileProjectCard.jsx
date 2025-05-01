/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaBullseye } from "react-icons/fa6";

const ProfileProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-gray-800/60 rounded-xl p-4 shadow-lg mb-4 last:mb-0 hover:bg-gray-700/80 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="flex gap-4 hover:cursor-pointer"
        onClick={() => navigate(`/dashboard/project/${project._id}`)}
      >
        <div className="w-36 h-40 md:w-32 md:h-32 bg-navy-900 rounded-lg overflow-hidden">
          <img
            src={project.projectThumbnail || "/path/to/default-image.png"}
            alt={project.projectName}
            className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
            draggable="false"
            onError={(e) => {
              e.target.src = "/path/to/default-image.png";
            }}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-cyan-400 text-lg font-semibold">
              {project.projectName?.toUpperCase()}
            </h3>
            <span className="text-xs text-gray-400">
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Status Badge */}
          <div className="mt-1">
            <span
              className={`text-xs px-2 py-1 rounded-full ${project.status === "pending"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : project.status === "approved"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
            >
              {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
            </span>
          </div>

          {/* Project Links */}
          <div className="flex items-start justify-start gap-4 text-sm text-gray-400 mt-2">
            {project.gitHubLink && (
              <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <FaGithub className="text-lg" />
                <a
                  href={project.gitHubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub
                </a>
              </div>
            )}
            {project.liveLink && (
              <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <FaBullseye />
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live
                </a>
              </div>
            )}
          </div>

          {/* Project Description */}
          <p className="text-sm text-white mt-2 line-clamp-2">
            {project.projectDescription}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileProjectCard;

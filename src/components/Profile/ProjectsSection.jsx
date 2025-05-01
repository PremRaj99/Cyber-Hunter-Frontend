/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FaBullseye, FaGithub } from "react-icons/fa6";
import ProfileDescription from "../Profile/ProfileDiscription";

const ProjectsSection = ({ projects, navigate, itemVariants, userId }) => {
  return (
    <>
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
              <ProjectCard
                key={project._id}
                project={project}
                onClick={() => navigate(`/dashboard/project/${project._id}`)}
              />
            ))
          ) : (
            <NoProjectsMessage itemVariants={itemVariants} />
          )}
        </motion.div>
      </div>

      {/* Field of Excellence */}
      <h2 className="text-lg font-semibold text-brandPrimary">
        Field of Excellence
      </h2>
      <motion.div
        className="flex w-full bg-gray-800/60 rounded-xl h-[210px] p-4 gap-4 border border-gray-700/50 backdrop-blur-sm"
        variants={itemVariants}
      >
        <div className="overflow-y-auto no-scrollbar w-full">
          {/* Pass userId to make it work for any profile */}
          <ProfileDescription userId={userId} />
        </div>
      </motion.div>
    </>
  );
};

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      className="bg-gray-800/60 rounded-xl p-4 shadow-lg mb-4 last:mb-0 hover:bg-gray-700/80 transition-all duration-300"
    >
      <div
        className="flex gap-4 hover:cursor-pointer"
        onClick={onClick}
      >
        <div className="w-36 h-40 md:w-32 md:h-32 bg-navy-900 rounded-lg overflow-hidden">
          <img
            src={
              project.projectThumbnail ||
              "/path/to/default-image.png"
            }
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
              {project.status?.charAt(0).toUpperCase() +
                project.status?.slice(1)}
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

const NoProjectsMessage = ({ itemVariants }) => {
  return (
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
  );
};

export default ProjectsSection;

/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const TeamProjects = ({ projects = [], containerVariants }) => {
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

  // Sample project data if no projects
  const sampleProjects = [1, 2, 3, 4, 5, 6];

  return (
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
        {(projects.length > 0 ? projects : sampleProjects).map((project, index) => (
          <motion.div
            key={typeof project === 'object' ? project._id : index}
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
                  src={typeof project === 'object' && project.projectThumbnail
                    ? project.projectThumbnail
                    : `https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt={typeof project === 'object' ? project.projectName : "Project"}
                  className="w-full h-full object-cover rounded-lg transition-transform hover:scale-110 duration-500"
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
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
                  >
                    {typeof project === 'object' ? project.projectName : "TeamSync"}
                  </motion.h3>
                  <span className="text-gray-400 text-sm">
                    {typeof project === 'object' && project.createdAt
                      ? new Date(project.createdAt).toLocaleDateString()
                      : `${typeof project === 'number' ? project : index + 1} days ago`}
                  </span>
                </div>
                <p className="text-gray-400 text-sm flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                  <span>{typeof project === 'object' && project.points ? project.points : (index === 0 ? "50" : "60")} points</span>
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                  {(typeof project === 'object' && project.gitHubLink) || !project.gitHubLink ? (
                    <div className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <a
                        href={typeof project === 'object' && project.gitHubLink ? project.gitHubLink : "#github"}
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    </div>
                  ) : null}

                  {(typeof project === 'object' && project.liveLink) || !project.liveLink ? (
                    <div className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <a
                        href={typeof project === 'object' && project.liveLink ? project.liveLink : "#live"}
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live
                      </a>
                    </div>
                  ) : null}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-white mt-2 line-clamp-2"
                >
                  {typeof project === 'object' && project.projectDescription
                    ? project.projectDescription
                    : "TeamSync is an all-in-one project management and team collaboration platform designed to streamline workflows."}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamProjects;

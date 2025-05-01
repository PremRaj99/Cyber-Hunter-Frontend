/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { getStatusClass } from "../../utils/projectUtils";

export default function ProjectMobileItem({ project, itemVariants }) {
  return (
    <motion.div
      key={project.id}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={itemVariants}
      className="p-4 hover:bg-brandPrimary hover:bg-opacity-50"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white">
          {project.title}
        </span>
        <span className={getStatusClass(project.status)}>
          {project.status}
        </span>
      </div>
      <div className="text-xs text-white mb-2">
        {project.description}
      </div>
      <div className="flex justify-between text-xs text-white">
        <span>Budget: ${project.budget.toLocaleString()}</span>
        <span>Deadline: {project.deadline}</span>
      </div>
    </motion.div>
  );
}

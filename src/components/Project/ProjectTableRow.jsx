/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { getStatusClass } from "../../utils/projectUtils";

export default function ProjectTableRow({ project, itemVariants }) {
  return (
    <motion.tr
      key={project.id}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={itemVariants}
      className="hover:bg-brandPrimary hover:bg-opacity-50"
    >
      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-white">
          {project.title}
        </div>
      </td>
      <td className="px-4 md:px-6 py-4">
        <div className="text-sm text-white">
          {project.description}
        </div>
      </td>
      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-white">
          ${project.budget.toLocaleString()}
        </div>
      </td>
      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-white">
          {project.deadline}
        </div>
      </td>
      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
        <span className={getStatusClass(project.status)}>
          {project.status}
        </span>
      </td>
    </motion.tr>
  );
}

/* eslint-disable react/prop-types */
import { AnimatePresence } from "framer-motion";
import ProjectMobileItem from "./ProjectMobileItem";

export default function ProjectMobileList({ projects }) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="divide-y divide-brandPrimary">
      <AnimatePresence>
        {projects.map((project) => (
          <ProjectMobileItem
            key={project.id}
            project={project}
            itemVariants={itemVariants}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

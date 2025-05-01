/* eslint-disable react/prop-types */
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ProjectTableRow from "./ProjectTableRow";

export default function ProjectTable({ projects, sortField, sortDirection, handleSort }) {
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
    <table className="min-w-full divide-y divide-brandPrimary hidden lg:table">
      <thead className="bg-black">
        <tr>
          {["Title", "Description", "Budget", "Deadline", "Status"].map(
            (header) => (
              <th
                key={header}
                className="px-4 md:px-6 py-3 text-left text-xs font-medium text-brandPrimary uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(header.toLowerCase())}
              >
                <div className="flex items-center">
                  {header}
                  {sortField === header.toLowerCase() &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="bg-black divide-y divide-white">
        <AnimatePresence>
          {projects.map((project) => (
            <ProjectTableRow
              key={project.id}
              project={project}
              itemVariants={itemVariants}
            />
          ))}
        </AnimatePresence>
      </tbody>
    </table>
  );
}

/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import ProjectSearch from "../components/Project/ProjectSearch";
import ProjectTable from "../components/Project/ProjectTable";
import ProjectMobileList from "../components/Project/ProjectMobileList";
import { projectsData } from "../data/projectsData";

export default function ListProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("deadline");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  const filteredAndSortedProjects = projectsData
    .filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-6 md:py-12 px-2 sm:px-4 md:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center text-brandPrimary mb-6 md:mb-8"
        >
          <span className="border-b-2 border-brandPrimary">All Projects</span>
        </motion.h1>

        {/* Search Component */}
        <ProjectSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black shadow-md rounded-lg overflow-hidden border-2 border-brandPrimary"
        >
          {/* Mobile View */}
          <div className="block lg:hidden">
            <ProjectMobileList projects={filteredAndSortedProjects} />
          </div>

          {/* Desktop View */}
          <ProjectTable
            projects={filteredAndSortedProjects}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
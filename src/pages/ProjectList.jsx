import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "E-commerce Website Redesign",
    description: "Redesign the UI/UX of an existing e-commerce platform",
    budget: 5000,
    deadline: "2023-08-15",
    status: "Open",
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Develop a cross-platform mobile app for task management",
    budget: 10000,
    deadline: "2023-09-30",
    status: "In Progress",
  },
  {
    id: 3,
    title: "SEO Optimization",
    description: "Improve search engine rankings for a local business website",
    budget: 2000,
    deadline: "2023-07-31",
    status: "Completed",
  },
  {
    id: 4,
    title: "Custom CRM Integration",
    description: "Integrate a custom CRM solution with existing systems",
    budget: 8000,
    deadline: "2023-10-15",
    status: "Open",
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description:
      "Create a dashboard to monitor and analyze social media metrics",
    budget: 3500,
    deadline: "2023-08-31",
    status: "open",
  },
  {
    id: 6,
    title: "Content Writing ",
    description:
      "write content for a website",
    budget: 3500,
    deadline: "2023-08-31",
    status: "open",
  },
  {
    id: 7,
    title: "Smart Contract Development",
    description:
      "Write a smart contract for a decentralized application",
    budget: 3500,
    deadline: "2023-08-31",
    status: "open",
  },
  {
    id: 8,
    title: "Java Developer",
    description:
      "A java developer is required to develop a software",
    budget: 3500,
    deadline: "2023-08-31",
    status: "open",
  },
  {
    id: 9,
    title: "Frontend Developer",
    description:
      "Require frontend developer to develop a website for a company website UI/UX", 
    budget: 3500,
    deadline: "2023-08-31",
    status: "open",
  },
  {
    id: 10,
    title: "Excel Management",
    description:
      "Manage excel sheets for a company",
    budget: 3500,
    deadline: "2023-08-31",
    status: "completed",
  },
  {
    id: 11,
    title: "Blockchain Developer",
    description:
      "require a blockchain developer to develop a blockchain application",
    budget: 3500,
    deadline: "2023-08-31",
    status: "open",
  },
  {
    id: 12,
    title: "React Developer",
    description:
      "Require a react developer to develop a website in react",
    budget: 3500,
    deadline: "2023-08-31",
    status: "open",
  },
];

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

  const filteredAndSortedProjects = projects
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

        <div className="mb-4 md:mb-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border bg-black border-brandPrimary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brandPrimary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-white" />
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black shadow-md rounded-lg overflow-hidden border-2 border-brandPrimary"
        >
          {/* Mobile Responsive Table View */}
          <div className="block lg:hidden">
            <div className="divide-y divide-brandPrimary">
              <AnimatePresence>
                {filteredAndSortedProjects.map((project) => (
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
                      <span
                        className={`px-2 text-xs leading-5 font-semibold rounded-full ${
                          project.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : project.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
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
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Table View */}
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
                {filteredAndSortedProjects.map((project) => (
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
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          project.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : project.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.div>
  );
}
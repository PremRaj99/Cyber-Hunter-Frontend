/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function ProjectSearch({ searchTerm, setSearchTerm }) {
  return (
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
  );
}

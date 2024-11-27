import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import leaduserdemo from "../../assets/leaduserdemo.png";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const ViewPersonItem = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const people = [
    {
      id: 1,
      name: "Code Hunter",
      score: 90,
      avatar: leaduserdemo,
    },
    {
      id: 2,
      name: "CodeSec",
      score: 85,
      avatar: leaduserdemo,
    },
    {
      id: 3,
      name: "Hunters",
      score: 80,
      avatar: leaduserdemo,
    },
    {
      id: 4,
      name: "Noob coders",
      score: 75,
      avatar: leaduserdemo,
    },
    {
      id: 5,
      name: "Selectors",
      score: 70,
      avatar: leaduserdemo,
    },
    {
      id: 6,
      name: "Harsh",
      score: 70,
      avatar: leaduserdemo,
    },
    {
      id: 7,
      name: "Rahul",
      score: 70,
      avatar: leaduserdemo,
    },
    {
      id: 8,
      name: "Prem",
      score: 70,
      avatar: leaduserdemo,
    },
  ];

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };


  return (
    <motion.div
      className="p-4 md:p-8"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      
    >
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-2xl font-bold">
          <span className="text-cyan-400">Person</span>{" "}
          <span className="text-white">Selection</span>
        </h1>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search For Person by Entering Person name"
            className="w-full rounded-lg border-2 border-cyan-400 bg-gray-800 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-cyan-400" />
        </div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPeople.map((person) => (
            <motion.div
              key={person.id}
              className="flex flex-col sm:flex-row items-center justify-between rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700 space-y-2 sm:space-y-0"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between w-full sm:w-auto">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium text-gray-400">
                    {person.id}
                  </span>
                  <img
                    src={person.avatar}
                    alt={`Avatar of ${person.name}`}
                    className="h-10 w-10 rounded-full"
                  />
                  <span className="text-l font-medium text-white">
                    {person.name}
                  </span>
                </div>
                <div className="flex">
                  <span className="text-xs font-medium text-white px-4">
                    score: {person.score}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div className="flex space-x-2">
                  <button className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none">
                    <span className="flex items-center text-l gap-1"><FaCheck/>Accept</span>
                  </button>
                  <button className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none">
                    <span className="flex items-center text-l gap-1"><FaXmark/>Reject</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ViewPersonItem;

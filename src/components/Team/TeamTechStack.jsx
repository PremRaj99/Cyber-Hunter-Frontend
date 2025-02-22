import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Code, Search } from 'lucide-react';
import MultiSelectInput from '../Input/MultiSelectInput';

const TeamTechStack = () => {
  const [formData, setFormData] = useState({
    techStack: ['React', 'TypeScript', 'Node.js', 'TailwindCSS', 'GraphQL']
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newTech, setNewTech] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Popular tech for suggestions
  const popularTech = [
    'Angular', 'Vue.js', 'Next.js', 'Express', 'MongoDB',
    'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Firebase',
    'Redux', 'Jest', 'Cypress', 'Styled Components', 'Material UI'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 25, stiffness: 500 }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const removeTech = (indexToRemove) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleAddTech = () => {
    if (newTech.trim() && !formData.techStack.includes(newTech.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, newTech.trim()]
      });
      setNewTech('');
      setIsAdding(false);
    }
  };

  const handleSearch = (value) => {
    setNewTech(value);
    if (value.trim().length > 0) {
      setSuggestions(
        popularTech.filter(tech =>
          tech.toLowerCase().includes(value.toLowerCase()) &&
          !formData.techStack.includes(tech)
        ).slice(0, 5)
      );
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="flex items-start justify-start p-8">
      <div className="rounded-2xl  p-8 w-full max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-brandPrimary/20 rounded-lg">
            <Code size={22} className="text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Technology Stack</h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="relative">
            <AnimatePresence>
              <motion.div
                layout
                className="flex flex-wrap gap-3"
              >
                <AnimatePresence>
                  {formData.techStack.map((tech, index) => (
                    <motion.div
                      key={tech}
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="group flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700 hover:border-brandPrimary/30 hover:bg-gray-800 transition-colors shadow-sm hover:shadow-brandPrimary/10"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-gray-200">{tech}</span>
                      <button
                        onClick={() => removeTech(index)}
                        className="text-gray-500 hover:text-red-400 transition-colors p-1 rounded-full hover:bg-gray-700/50"
                        whileHover={{ rotate: 90 }}
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {!isAdding ? (
                  <motion.button
                    layout
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gray-800/40 rounded-full border border-dashed border-gray-600 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-gray-800/60 transition-all flex items-center gap-2 group"
                    onClick={() => setIsAdding(true)}
                  >
                    <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Add Technology</span>
                  </motion.button>
                ) : (
                  <motion.div
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative"
                  >
                    <div className="flex items-center bg-gray-800 rounded-full border border-gray-700 focus-within:border-brandPrimary/50 transition-colors overflow-hidden pr-1">
                      <div className="pl-4 pr-2 text-gray-400">
                        <Search size={16} />
                      </div>
                      <MultiSelectInput
                        type="text"
                        value={newTech}
                        apiEndpoint={`${import.meta.env.VITE_API_URL}/api/v1/techstack`}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search or type..."
                        className="bg-transparent py-2 px-1 outline-none focus:ring-0 focus:border-none text-white w-40 sm:w-56"
                        autoFocus
                      />
                      <div className="flex gap-1">
                        <button
                          onClick={() => setIsAdding(false)}
                          className="p-1 text-gray-400 hover:text-gray-200 rounded-full hover:bg-gray-700 transition-colors"
                        >
                          <X size={16} />
                        </button>
                        <button
                          onClick={handleAddTech}
                          disabled={!newTech.trim()}
                          className={`${newTech.trim()
                            ? 'bg-brandPrimary text-gray-900 hover:bg-cyan-400'
                            : 'bg-gray-700 text-gray-500'
                            } transition-colors py-1 px-3 rounded-full ml-1`}
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Suggestions dropdown */}
                    <AnimatePresence>
                      {suggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 right-0 mt-2 py-2 bg-gray-800 rounded-lg border border-gray-700 shadow-lg z-10"
                        >
                          {suggestions.map((suggestion) => (
                            <button
                              key={suggestion}
                              className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 hover:text-cyan-400 transition-colors"
                              onClick={() => {
                                setNewTech(suggestion);
                                setSuggestions([]);
                              }}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            variants={itemVariants}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50"
          >
            <h3 className="text-gray-400 mb-2 text-sm font-medium">RECOMMENDED</h3>
            <div className="flex flex-wrap gap-2">
              {popularTech.slice(0, 5).filter(tech => !formData.techStack.includes(tech)).map((tech) => (
                <button
                  key={tech}
                  onClick={() => {
                    if (!formData.techStack.includes(tech)) {
                      setFormData({
                        ...formData,
                        techStack: [...formData.techStack, tech]
                      });
                    }
                  }}
                  className="px-3 py-1 text-sm bg-gray-800/60 text-gray-400 rounded-full border border-gray-700 hover:border-brandPrimary/30 hover:text-cyan-400 transition-colors"
                >
                  + {tech}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamTechStack;
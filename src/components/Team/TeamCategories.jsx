/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const TeamCategories = ({ activeCategory, setActiveCategory }) => {
  const categories = ["Frontend", "Backend", "DBMS", "AI / ML", "Security", "DevOps"];

  const hoverScale = {
    scale: 1.05,
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.9 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Categories</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={hoverScale}
            whileTap={{ scale: 0.95 }}
            className={`bg-gray-800/40 hover:bg-gray-700/60 
                      ${category === activeCategory ? 'text-cyan-400 border-cyan-400' : 'text-white border-gray-700/50'} 
                      rounded-lg py-3 px-4 transition-all duration-300 border backdrop-blur-sm`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamCategories;

import { motion } from "framer-motion";

const EducationTab = ({
  activeTab,
  formData,
  handleInputChange,
  containerVariants,
  itemVariants
}) => {
  return (
    <motion.div
      className={`space-y-6 ${activeTab !== "education" && "hidden"}`}
      variants={containerVariants}
      initial="hidden"
      animate={activeTab === "education" ? "visible" : "hidden"}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="group" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            QID
          </label>
          <input
            type="text"
            name="qId"
            value={formData.qId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
          />
        </motion.div>
        <motion.div className="group" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            Course
          </label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
          />
        </motion.div>
        <motion.div className="group" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            Branch
          </label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
          />
        </motion.div>
        <motion.div className="group" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            Session
          </label>
          <input
            type="text"
            name="session"
            value={formData.session}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EducationTab;

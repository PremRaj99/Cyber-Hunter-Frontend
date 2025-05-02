/* eslint-disable react/prop-types */
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
          <select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-cyan-400"
          >
            <option value="" className="bg-black text-cyan-400">Select Course</option>
            <option value="Btech" className="bg-black text-cyan-400">BTech</option>
            <option value="BCA" className="bg-black text-cyan-400">BCA</option>
            <option value="MCA" className="bg-black text-cyan-400">MCA</option>
            <option value="Other" className="bg-black text-cyan-400">Other</option>
          </select>
        </motion.div>
        <motion.div className="group" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            Branch
          </label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-cyan-400"
          >
            <option value="" className="bg-black text-cyan-400">Select Branch</option>
            <option value="CSE" className="bg-black text-cyan-400">CSE</option>
            <option value="CSCQ" className="bg-black text-cyan-400">CSCQ</option>
            <option value="AIML" className="bg-black text-cyan-400">AIML</option>
            <option value="FSD" className="bg-black text-cyan-400">FSD</option>
            <option value="DS" className="bg-black text-cyan-400">DS</option>
            <option value="MAWT" className="bg-black text-cyan-400">MAWT</option>
            <option value="CA" className="bg-black text-cyan-400">CA</option>
            <option value="Other" className="bg-black text-cyan-400">Other</option>
          </select>
        </motion.div>
        <motion.div className="group" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            Session
          </label>
          <select
            name="session"
            value={formData.session}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-cyan-400"
          >
            <option value="" className="bg-black text-cyan-400">Select Session</option>
            {[
              "2022-25", "2022-26", "2023-26", "2023-27", "2024-28",
              "2024-27", "2025-29", "2025-28", "2026-29", "2026-30",
            ].map((s) => (
              <option key={s} value={s} className="bg-black text-cyan-400">{s}</option>
            ))}
          </select>
        </motion.div>
        <motion.div className="group" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            Section
          </label>
          <select
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 text-cyan-400"
          >
            <option value="" className="bg-black text-cyan-400">Select Section</option>
            {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "Other"].map((s) => (
              <option key={s} value={s} className="bg-black text-cyan-400">{s}</option>
            ))}
          </select>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EducationTab;

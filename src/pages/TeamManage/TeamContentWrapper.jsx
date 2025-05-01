/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const TeamContentWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="bg-gray-800/40 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeamContentWrapper;

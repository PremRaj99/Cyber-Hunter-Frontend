import { motion } from "framer-motion";
import { RiSaveLine } from "react-icons/ri";

const SubmitButton = ({ isLoading, itemVariants }) => {
  return (
    <motion.div
      className="flex justify-end mt-8"
      variants={itemVariants}
    >
      <motion.button
        type="submit"
        disabled={isLoading}
        className={`flex items-center gap-2 px-6 py-3 hover:bg-black hover:text-cyan-400 bg-cyan-400 text-black font-medium hover:border hover:border-cyan-400 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
          }`}
        whileHover={{ scale: isLoading ? 1 : 1.05 }}
        whileTap={{ scale: isLoading ? 1 : 0.95 }}
      >
        {isLoading ? (
          <>
            <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
            <span>Saving...</span>
          </>
        ) : (
          <>
            <RiSaveLine size={20} />
            <span>Save Changes</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default SubmitButton;

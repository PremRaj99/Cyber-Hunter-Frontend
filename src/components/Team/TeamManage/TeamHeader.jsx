import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { useContext } from 'react';
import { TeamContext } from '../../../context/TeamContext';

const TeamHeader = () => {
  const {
    navigate,
    isTeamLeader,
    handleSubmit,
    isLoading
  } = useContext(TeamContext);

  return (
    <div className="flex justify-between items-center p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">Edit Team Profile</h1>
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          onClick={() => navigate(-1)}
        >
          Cancel
        </motion.button>
        {isTeamLeader ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r bg-cyan-400 text-black font-medium transition-colors cursor-pointer flex items-center space-x-2 hover:bg-black hover:text-cyan-400 hover:border hover:border-cyan-400"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Save </span>
              </>
            )}
          </motion.button>
        ) : (
          <button
            onClick={() => navigate("/dashboard/team")}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamHeader;

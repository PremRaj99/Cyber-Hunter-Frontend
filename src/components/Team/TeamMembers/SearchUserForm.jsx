/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const SearchUserForm = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  searchResults,
  isSearching,
  onSelectUser
}) => {
  const slideVariants = {
    enter: { x: '100%', opacity: 0 },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: { x: '-100%', opacity: 0 }
  };

  return (
    <motion.div
      key="step1"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="space-y-6"
    >
      <h4 className="text-xl text-white font-medium mb-4">Find Team Member</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-2 text-sm">Search by Email or Name</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-gray-800 border-b-2 border-gray-700 focus:border-cyan-400 px-4 py-3 rounded text-white focus:outline-none transition-colors"
            placeholder="Enter email or name"
          />
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-cyan-400"></div>
          </div>
        )}

        {!isSearching && searchResults.length > 0 && (
          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-400 mb-2">Search Results</h5>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults.map(user => (
                <div
                  key={user._id}
                  onClick={() => onSelectUser(user)}
                  className="flex items-center p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                >
                  <img
                    src={user.profilePicture || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(user.name || user.email)}`}
                    className="w-10 h-10 rounded-full"
                    alt={user.name}
                  />
                  <div className="ml-3">
                    <p className="text-white">{user.name || user.email?.split('@')[0]}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isSearching && searchTerm && searchResults.length === 0 && (
          <p className="text-gray-400 text-center py-2">No users found matching your search</p>
        )}
      </div>
    </motion.div>
  );
};

export default SearchUserForm;

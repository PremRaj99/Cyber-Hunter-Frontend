/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, UserPlus, Send } from "lucide-react";
import { TeamService } from "../../services/TeamService";
import { toast } from "react-toastify";
import Spinner from "../utils/Spinner";

export default function SendTeamInvitation({ isOpen, onClose, teamId }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const searchTimeout = useRef(null);

  // Reset component state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSearchResults([]);
      setSelectedUser(null);
      setMessage("");
    }
  }, [isOpen]);

  // Search users as the user types
  useEffect(() => {
    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    // Set a new timeout for debounced search
    searchTimeout.current = setTimeout(async () => {
      try {
        setIsSearching(true);
        const response = await TeamService.searchPotentialMembers(searchQuery);

        if (response && response.success) {
          setSearchResults(response.data || []);
        }
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSearchQuery(""); // Clear search after selection
  };

  const handleSendInvitation = async (e) => {
    e.preventDefault();

    if (!selectedUser || !teamId) {
      toast.error("Please select a user to invite");
      return;
    }

    try {
      setIsSending(true);

      await TeamService.sendTeamInvitation(teamId, selectedUser._id, message);

      toast.success(`Invitation sent to ${selectedUser.name || selectedUser.email}`);
      onClose();

    } catch (error) {
      console.error("Error sending team invitation:", error);

      // Handle specific error cases
      if (error.status === 409) {
        toast.info("This user already has a pending request or invitation");
      } else if (error.status === 400) {
        toast.error(error.message || "This user already belongs to a team");
      } else {
        toast.error("Failed to send invitation. Please try again.");
      }

    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Invite Team Member</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search & Selection */}
            <div className="p-6">
              {!selectedUser ? (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Search for users
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name or email"
                      className="block w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>

                  {/* Search results */}
                  <div className="mt-4 max-h-60 overflow-y-auto">
                    {isSearching ? (
                      <div className="flex justify-center py-4">
                        <Spinner size="sm" />
                      </div>
                    ) : searchQuery.trim().length >= 2 && searchResults.length === 0 ? (
                      <p className="text-center py-4 text-gray-400">No users found</p>
                    ) : (
                      <div className="space-y-2">
                        {searchResults.map((user) => (
                          <div
                            key={user._id}
                            onClick={() => handleSelectUser(user)}
                            className="flex items-center p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700"
                          >
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                              <img
                                src={user.profilePicture || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(user.name || user.email)}`}
                                alt={user.name || user.email}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-3 flex-grow">
                              <p className="text-white font-medium">{user.name || "User"}</p>
                              <p className="text-gray-400 text-sm">{user.email}</p>
                            </div>
                            <UserPlus size={18} className="text-cyan-400" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Selected user view
                <form onSubmit={handleSendInvitation}>
                  <div className="flex items-center mb-6 bg-gray-700/50 p-4 rounded-lg">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600">
                      <img
                        src={selectedUser.profilePicture || `https://avatar.iran.liara.run/username?username=${encodeURIComponent(selectedUser.name || selectedUser.email)}`}
                        alt={selectedUser.name || selectedUser.email}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-white font-medium">{selectedUser.name || "User"}</h3>
                      <p className="text-gray-400 text-sm">{selectedUser.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedUser(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Invitation Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Add a personal message (optional)"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none h-24"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedUser(null)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                      disabled={isSending}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 flex items-center gap-2 disabled:opacity-50"
                      disabled={isSending}
                    >
                      {isSending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Invitation
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

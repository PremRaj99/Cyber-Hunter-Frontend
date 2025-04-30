/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import axios from "../../utils/Axios";
import { toast } from "react-toastify";

export default function JoinRequestModal({ isOpen, onClose, team }) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when modal opens with a new team
  useEffect(() => {
    if (isOpen && team) {
      setMessage("");
    }
  }, [isOpen, team]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!team?._id) {
      toast.error("Invalid team information");
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.post(`/api/v1/team/${team._id}/join-request`, {
        message
      });

      toast.success("Join request sent successfully!");
      onClose();

    } catch (error) {
      console.error("Error sending join request:", error);

      // Handle specific error cases
      if (error.response?.status === 409) {
        toast.info(error.response?.data?.message || "You already have a pending request for this team");
      } else if (error.response?.status === 403) {
        toast.error(error.response?.data?.message || "You are already a member of a team");
      } else {
        toast.error(error.response?.data?.message || "Failed to send join request. Please try again.");
      }

    } finally {
      setIsSubmitting(false);
    }
  };

  if (!team) return null;

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
              <h2 className="text-xl font-bold text-white">Join {team.TeamName}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Introduction Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Introduce yourself to the team"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none h-32"
                ></textarea>
                <p className="mt-2 text-xs text-gray-400">
                  Let the team know about your skills and why you want to join
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r bg-cyan-400 text-black font-medium transition-colors cursor-pointer flex items-center space-x-2 hover:bg-black hover:text-cyan-400 hover:border hover:border-cyan-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

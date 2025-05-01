import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfileInterests = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const userInterests = user?.interest || [];

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        if (user?._id) {
          // Fetch user details if needed
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/user/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
        }
      } catch (error) {
        console.error("Error fetching user details:", error.response || error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [user?._id]);

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 mb-8 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {isLoading ? (
        <div className="col-span-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
        </div>
      ) : userInterests.length > 0 ? (
        userInterests.map((interestId) => (
          <motion.button
            key={interestId}
            className="bg-brandPrimary/20 hover:bg-brandPrimary/30 text-cyan-400 rounded-lg py-2 px-4 transition-colors border border-brandPrimary/30 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            # {interestId}
          </motion.button>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-400 p-4">
          <svg
            className="w-12 h-12 mx-auto mb-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <p className="text-lg font-semibold">No interests found</p>
          <p className="text-sm text-gray-500">
            Add some interests to showcase your preferences
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileInterests;

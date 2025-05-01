/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfileDescription = ({ description: propDescription, isLoading: propIsLoading, userId: propUserId }) => {
  const [isLoading, setIsLoading] = useState(propIsLoading || false);
  const [error, setError] = useState(null);
  const [userDescription, setUserDescription] = useState(propDescription || "");
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = propUserId || currentUser?._id;

  // Fetch the user description directly from the user endpoint
  useEffect(() => {
    const fetchUserDescription = async () => {
      // If description is already provided through props, don't fetch
      if (propDescription || !userId) return;

      setIsLoading(true);
      setError(null);

      try {
        // Fetch user details directly
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        // Update description from the response
        if (response.data && response.data.description) {
          setUserDescription(response.data.description);
          console.log('Fetched user desc', response.data.description);
        } else {
          console.log('No description found in data:', response.data);
          setUserDescription("No description available.");
        }
      } catch (error) {
        console.error("Error fetching user description:", error);
        setError("Failed to load description");
        setUserDescription("No description available.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDescription();
  }, [userId, propDescription]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  // Content based on loading/error state
  if (isLoading) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center h-full w-full p-4 text-gray-400"
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mb-4"></div>
        <p>Loading description...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center h-full w-full p-4 text-red-400"
      >
        <p>{error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-2 rounded-md text-white"
    >
      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
        {userDescription || "No description available."}
      </p>
      </motion.div>
  );
};

export default ProfileDescription;

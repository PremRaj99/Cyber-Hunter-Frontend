/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";

// Import custom hook
import useProfileData from "../hooks/useProfileData";

// Import component sections
import ProfilePictureSection from "../components/Profile/EditProfile/ProfilePictureSection";
import ProfileTabs from "../components/Profile/EditProfile/ProfileTabs";
import BasicInfoTab from "../components/Profile/EditProfile/BasicInfoTab";
import EducationTab from "../components/Profile/EditProfile/EducationTab";
import SocialLinksTab from "../components/Profile/EditProfile/SocialLinksTab";
import SubmitButton from "../components/Profile/EditProfile/SubmitButton";

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // Use our custom hook for profile data management
  const {
    formData,
    isLoading,
    handleInputChange,
    handleDateChange,
    updateProfile
  } = useProfileData();

  // Set preview image based on profile data when component mounts or when user changes
  useEffect(() => {
    if (user?.profilePicture) {
      setPreviewImage(user.profilePicture);
    }
  }, [user]);

  useEffect(() => {
    document.title = "Edit Profile | Cyber Hunter";
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name) {
      toast.error("Please enter your name");
      return;
    }

    try {
      console.log("Submitting form data:", formData);
      console.log("Selected file:", selectedFile ? selectedFile.name : "None");
      
      // Get the access token from localStorage instead of depending on cookies
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }
      
      const result = await updateProfile(selectedFile);
      console.log("Profile update successful:", result);
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        navigate("/dashboard/profile");
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
      
      let errorMessage = "Failed to update profile";
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server error response:", error.response.data);
        errorMessage = error.response.data.message || "Server error occurred";
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server. Please check your network connection.";
      } else {
        // Something happened in setting up the request
        errorMessage = error.message || "Error occurred while submitting form";
      }
      
      toast.error(errorMessage);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto p-4 md:p-6 text-stone-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-gray-800/60 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm shadow-xl max-w-[2000px] min- mx-auto"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-8">
          <span className="border-b border-brandPrimary ">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Edit Your Profile
            </h1>
          </span>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors text-white"
            aria-label="Close"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <motion.form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            className="flex flex-col md:flex-row gap-8 items-start"
            variants={itemVariants}
          >
            {/* Profile Picture Section */}
            <ProfilePictureSection
              previewImage={previewImage}
              formData={formData}
              handleImageChange={handleImageChange}
            />

            {/* Tabs & Form Section */}
            <div className="w-full md:w-2/3">
              <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {/* Tab Contents */}
              <BasicInfoTab
                activeTab={activeTab}
                formData={formData}
                handleInputChange={handleInputChange}
                handleDateChange={handleDateChange}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
              />

              <EducationTab
                activeTab={activeTab}
                formData={formData}
                handleInputChange={handleInputChange}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
              />

              <SocialLinksTab
                activeTab={activeTab}
                formData={formData}
                handleInputChange={handleInputChange}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <SubmitButton isLoading={isLoading} itemVariants={itemVariants} />
        </motion.form>
      </motion.div>
    </motion.div>
  );
}
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css"; 

// Import component sections
import ProfilePictureSection from "../components/Profile/EditProfile/ProfilePictureSection";
import ProfileTabs from "../components/Profile/EditProfile/ProfileTabs";
import BasicInfoTab from "../components/Profile/EditProfile/BasicInfoTab";
import EducationTab from "../components/Profile/EditProfile/EducationTab";
import SocialLinksTab from "../components/Profile/EditProfile/SocialLinksTab";
import SubmitButton from "../components/Profile/EditProfile/SubmitButton";

export default function EditProfile() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.profilePicture || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    DOB: new Date(user?.DOB).toISOString().split("T")[0] || "",
    qId: user?.qId || "",
    course: user?.course || "",
    branch: user?.branch || "",
    session: user?.session || "",
    gender: user?.gender || "",
    description: user?.description || "",
    interest: user?.interest || [],
    socialLinks: {
      github: user?.socialLinks?.github || "",
      instagram: user?.socialLinks?.instagram || "",
      linkedin: user?.socialLinks?.linkedin || "",
      twitter: user?.socialLinks?.twitter || "",
    },
  });
  const [individualId, setIndividualId] = useState(user?.individualId);

  // Update the fetchIndividualId function
  useEffect(() => {
    const fetchIndividualId = async () => {
      try {
        // Check if we have a valid user ID before making the API request
        if (!individualId && user?._id && user._id !== "undefined") {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/individual/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          if (response.data && response.data.data && response.data.data._id) {
            setIndividualId(response.data.data._id);
            console.log("Found individualId:", response.data.data._id);
          }
        } else if (!user?._id || user._id === "undefined") {
          console.warn("Cannot fetch individual info - user ID is missing or invalid");
          // Optionally redirect to login or profile completion page if needed
        }
      } catch (error) {
        console.error("Error fetching individual ID:", error);
      }
    };

    fetchIndividualId();
  }, [user, individualId]);

  useEffect(() => {
    document.title = "Edit Profile";
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

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

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      DOB: date ? date.toISOString().split('T')[0] : ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check for valid user ID first
      if (!user?._id || user._id === "undefined") {
        throw new Error("Invalid user ID. Please log in again.");
      }

      console.log("About to update individual, ID:", individualId);
      // 1. Update bio (description) using individual route
      if (individualId && formData.description) {
        console.log("Updating individual with ID:", individualId);
        console.log("Description:", formData.description);

        const bioResponse = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/v1/individual/${individualId}`,
          { description: formData.description },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log("Bio update response:", bioResponse.data);
      } else {
        console.warn("No individualId found or no description provided");
        if (!individualId) console.warn("individualId is missing");
        if (!formData.description) console.warn("description is empty");
      }

      // 2. Update user profile (excluding bio/description)
      const formDataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        if (key === 'socialLinks') {
          formDataToSend.append('socialLinks', JSON.stringify(formData.socialLinks));
        } else if (key === 'interest') {
          // Skip this - we'll handle interests separately
        } else if (key !== 'description') { // Exclude description here
          formDataToSend.append(key, formData[key]);
        }
      });

      if (selectedFile) {
        formDataToSend.append('profilePicture', selectedFile);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/${user._id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data) {
        dispatch({ type: "UPDATE_USER", payload: response.data });
        navigate("/dashboard/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Add more detailed error handling
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Failed to update profile: ${error.response.data.message || "Unknown error"}`);
      } else {
        alert(error.message || "Failed to update profile. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
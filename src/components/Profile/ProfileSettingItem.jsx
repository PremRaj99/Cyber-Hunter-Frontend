import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { RiSaveLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../index.css";

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
        if (!individualId && user?._id) {
          // Updated endpoint to use the new route
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/individual/user/${user._id}`,
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
  console.log("user", user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
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
        alert("Failed to update profile. Please try again.");
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
      className="container mx-auto  p-4 md:p-6 text-stone-300"
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
            <h1 className="text-2xl md:text-3xl font-bold text-white">Edit Your Profile</h1>
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
            <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
              <div className="relative group">
                <motion.div
                  className="w-48 h-48 rounded-full bg-gray-700/70 flex items-center justify-center overflow-hidden border-4 border-cyan-400/30 group-hover:border-cyan-400/70 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <FaCamera size={40} className="text-gray-400" />
                      <p className="text-sm text-gray-400 mt-2">Upload Image</p>
                    </div>
                  )}
                </motion.div>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="profilePicture"
                  className="absolute bottom-2 right-2 p-3 bg-brandPrimary hover:bg-cyan-600 rounded-full cursor-pointer shadow-lg transition-all duration-300 transform group-hover:scale-110"
                >
                  <FaCamera size={18} className="text-white" />
                </label>
              </div>
              <p className="text-cyan-400 font-medium">
                {formData.name || "Your Name"}
              </p>
              <p className="text-gray-400 text-sm text-center max-w-xs">
                {formData.description || "Add a brief description about yourself"}
              </p>
            </div>

            {/* Tabs & Form Section */}
            <div className="w-full md:w-2/3">
              <div className="mb-6 border-b border-gray-700">
                <div className="flex space-x-1 overflow-x-auto hide-scrollbar">
                  {["basic", "education", "social"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`py-3 px-4 text-sm font-medium capitalize transition-all duration-300 ${activeTab === tab
                        ? "text-cyan-400 border-b-2 border-cyan-400"
                        : "text-gray-400 hover:text-white"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Basic Info Tab */}
              <motion.div
                className={`space-y-6 ${activeTab !== "basic" && "hidden"}`}
                variants={containerVariants}
                initial="hidden"
                animate={activeTab === "basic" ? "visible" : "hidden"}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div className="group" variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div className="group" variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div className="group" variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div className="group" variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      Date of Birth
                    </label>
                    <DatePicker
                      selected={formData.DOB ? new Date(formData.DOB) : null}
                      onChange={(date) => {
                        setFormData({
                          ...formData,
                          DOB: date ? date.toISOString().split('T')[0] : ''
                        });
                      }}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      yearDropdownItemNumber={100}
                      scrollableYearDropdown
                      showMonthDropdown
                      placeholderText="Select your date of birth"
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                      calendarClassName="bg-gray-800 border border-gray-700 text-white"
                      wrapperClassName="w-full"
                      maxDate={new Date()} // Prevents selection of future dates
                      minDate={new Date('1900-01-01')} // Sets minimum date
                    />
                  </motion.div>
                  <motion.div className="group" variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer hover:bg-gray-700/70"
                      >
                        <option value="" className="bg-gray-800 text-gray-400">Select Gender</option>
                        <option value="male" className="bg-gray-800 text-white hover:bg-gray-700">Male</option>
                        <option value="female" className="bg-gray-800 text-white hover:bg-gray-700">Female</option>
                        <option value="other" className="bg-gray-800 text-white hover:bg-gray-700">Other</option>
                        <option value="prefer-not-to-say" className="bg-gray-800 text-white hover:bg-gray-700">Prefer not to say</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <motion.svg
                          className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: formData.gender ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div className="col-span-1 md:col-span-2 group" variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      About Me
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  </motion.div>
                </div>
              </motion.div>

              {/* Education Tab */}
              <motion.div
                className={`space-y-6 ${activeTab !== "education" && "hidden"}`}
                variants={containerVariants}
                initial="hidden"
                animate={activeTab === "education" ? "visible" : "hidden"}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div className="group" variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      QID
                    </label>
                    <input
                      type="text"
                      name="qId"
                      value={formData.qId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div className="group" variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      Course
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div className="group" variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      Branch
                    </label>
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div className="group" variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      Session
                    </label>
                    <input
                      type="text"
                      name="session"
                      value={formData.session}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Social Links Tab */}
              <motion.div
                className={`space-y-6 ${activeTab !== "social" && "hidden"}`}
                variants={containerVariants}
                initial="hidden"
                animate={activeTab === "social" ? "visible" : "hidden"}
              >
                <div className="space-y-6">
                  <motion.div className="group flex items-center gap-3" variants={itemVariants}>
                    <FaGithub size={24} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                        GitHub Profile
                      </label>
                      <input
                        type="url"
                        name="socialLinks.github"
                        value={formData.socialLinks.github}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </motion.div>

                  <motion.div className="group flex items-center gap-3" variants={itemVariants}>
                    <FaLinkedin size={24} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        name="socialLinks.linkedin"
                        value={formData.socialLinks.linkedin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </motion.div>

                  <motion.div className="group flex items-center gap-3" variants={itemVariants}>
                    <FaTwitter size={24} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                        Twitter Profile
                      </label>
                      <input
                        type="url"
                        name="socialLinks.twitter"
                        value={formData.socialLinks.twitter}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                  </motion.div>

                  <motion.div className="group flex items-center gap-3" variants={itemVariants}>
                    <FaInstagram size={24} className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-400 mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                        Instagram Profile
                      </label>
                      <input
                        type="url"
                        name="socialLinks.instagram"
                        value={formData.socialLinks.instagram}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300"
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="flex justify-end mt-8"
            variants={itemVariants}
          >
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brandPrimary to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
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
        </motion.form>
      </motion.div>
    </motion.div>
  );
}
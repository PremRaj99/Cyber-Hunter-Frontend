import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// import { toast } from "react-toastify";

const useProfileData = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [individualId, setIndividualId] = useState(null);

  // Initialize form data with user data
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    DOB: user?.DOB ? new Date(user?.DOB).toISOString().split("T")[0] : "",
    qId: user?.qId || "",
    course: user?.course || "",
    branch: user?.branch || "",
    session: user?.session || "",
    section: user?.section || "",
    gender: user?.gender || "",
    description: user?.bio || user?.description || "",
    interest: user?.interest || [],
    socialLinks: {
      github: user?.socialLinks?.github || "",
      instagram: user?.socialLinks?.instagram || "",
      linkedin: user?.socialLinks?.linkedin || "",
      twitter: user?.socialLinks?.twitter || "",
    },
  });

  // Fetch individual ID if not already available
  useEffect(() => {
    const fetchIndividualId = async () => {
      try {
        if (!individualId && user?._id && user._id !== "undefined") {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/individual/user/${
              user._id
            }`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );

          if (response.data && response.data.data && response.data.data._id) {
            setIndividualId(response.data.data._id);
          }
        }
      } catch (error) {
        console.error("Error fetching individual ID:", error);
      }
    };

    fetchIndividualId();
  }, [user, individualId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle date changes for DOB
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      DOB: date ? date.toISOString().split("T")[0] : "",
    });
  };

  // Update profile data
  const updateProfile = async (selectedFile) => {
    setIsLoading(true);

    try {
      // Check for valid user ID
      if (!user?._id || user._id === "undefined") {
        throw new Error("Invalid user ID. Please log in again.");
      }

      // Step 1: Handle individual bio update if we have an individualId
      if (individualId && formData.description) {
        try {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/api/v1/individual/${individualId}`,
            { description: formData.description },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Bio updated successfully in Individual model");
        } catch (bioError) {
          console.error("Error updating bio:", bioError);
          // Continue with user update even if bio update fails
        }
      }

      // Step 2: Create properly formatted FormData object for user profile update
      const formDataToSend = new FormData();

      // Add basic data fields - explicitly convert to string to avoid FormData issues
      formDataToSend.append("name", String(formData.name || ""));
      formDataToSend.append("email", String(formData.email || ""));
      formDataToSend.append("phoneNumber", String(formData.phoneNumber || ""));
      formDataToSend.append("DOB", String(formData.DOB || ""));
      formDataToSend.append("qId", String(formData.qId || ""));
      formDataToSend.append("course", String(formData.course || ""));
      formDataToSend.append("branch", String(formData.branch || ""));
      formDataToSend.append("session", String(formData.session || ""));
      formDataToSend.append("section", String(formData.section || ""));
      formDataToSend.append("gender", String(formData.gender || ""));
      formDataToSend.append("bio", String(formData.description || ""));

      // Add social links as JSON string
      if (formData.socialLinks) {
        formDataToSend.append(
          "socialLinks",
          JSON.stringify(formData.socialLinks)
        );
      }

      // Add profile picture if available
      if (selectedFile) {
        formDataToSend.append("profilePicture", selectedFile);
      }

      console.log("Sending form data to backend:");
      for (const pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Send the request to update user data with proper headers
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/${user._id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update Redux store with new data
      if (response.data && response.data.data) {
        dispatch({ type: "UPDATE_USER", payload: response.data.data });
        return response.data;
      }
    } catch (error) {
      console.error("Error in updateProfile:", error);
      console.error(
        "Error details:",
        error.response?.data || "No response data"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    individualId,
    isLoading,
    handleInputChange,
    handleDateChange,
    updateProfile,
  };
};

export default useProfileData;

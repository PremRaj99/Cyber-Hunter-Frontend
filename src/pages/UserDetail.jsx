import { useState, useCallback, useEffect, useRef } from "react";
import leaduserdemo from "../assets/leaduserdemo.png";
import axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateSuccess } from "../redux/User/userSlice";

// Import component sections
import ProfilePictureSection from "../components/UserDetail/ProfilePictureSection";
import PersonalInfoFields from "../components/UserDetail/PersonalInfoFields";
import PaymentSection from "../components/UserDetail/PaymentSection";
import TermsAndSubmit from "../components/UserDetail/TermsAndSubmit";

export default function UserDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initial amounts
  const clubReg = 100;
  const clubId = 50;

  // States for form fields
  const [userDetails, setUserDetails] = useState({
    profilePicture: "",
    name: "",
    section: "",
    email: "",
    qId: "",
    program: "",
    branch: "",
    session: "",
    dob: "",
    gender: "",
    phone: "",
    bio: "",
  });

  // Interest
  const [interest, setInterest] = useState([]);
  const [loading, setLoading] = useState(false);

  // Profile Picture
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageSrc, setImageSrc] = useState(leaduserdemo);
  const fileInputRef = useRef(null);

  // States for checkboxes
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clubAccepted, setClubAccepted] = useState(false);
  const [idCardAccepted, setIdCardAccepted] = useState(false);

  // State to keep track of the total amount
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to update total amount when checkboxes are checked/unchecked
  const handleCheckboxChange = useCallback(() => {
    let newAmount = 0;
    if (clubAccepted) newAmount += clubReg;
    if (idCardAccepted) newAmount += clubId;
    setTotalAmount(newAmount);
  }, [clubAccepted, idCardAccepted]);

  // useEffect for document title
  useEffect(() => {
    document.title = "User Registration | Cyber Hunter Club";
  }, []);

  // Use useEffect to trigger total amount calculation whenever checkboxes change
  useEffect(() => {
    handleCheckboxChange();
  }, [clubAccepted, idCardAccepted, handleCheckboxChange]);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePicture(file);
    } else {
      // If no file is selected, revert to default image
      setImageSrc(leaduserdemo);
      setProfilePicture(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Reset form method to clear form fields
  const resetForm = () => {
    setUserDetails({
      name: "",
      section: "",
      email: "",
      qId: "",
      program: "",
      branch: "",
      session: "",
      dob: "",
      gender: "",
      phone: "",
      bio: "",
    });
    setInterest([]);
    setProfilePicture(null);
    setImageSrc(leaduserdemo);
    setTermsAccepted(false);
    setClubAccepted(false);
    setIdCardAccepted(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate profile picture
    if (!profilePicture && imageSrc === leaduserdemo) {
      // Convert the default leaduserdemo image to a File object
      const response = await fetch(leaduserdemo);
      const blob = await response.blob();
      const defaultImageFile = new File([blob], "defaultProfile.png", {
        type: "image/png",
      });
      setProfilePicture(defaultImageFile);
    }

    // Validate form
    if (!termsAccepted || !clubAccepted || !idCardAccepted) {
      alert("Please accept all required terms and conditions.");
      return setLoading(false);
    }

    // Validate interest
    if (interest.length === 0) {
      toast.error("Please select at least one interest");
      setLoading(false);
      return;
    }

    try {
      // Prepare minimal form data without projectId
      const formData = new FormData();

      // Required user details
      formData.append("name", userDetails.name);
      formData.append("qId", userDetails.qId);
      formData.append("course", userDetails.program);
      formData.append("session", userDetails.session);
      formData.append("branch", userDetails.branch);
      formData.append("DOB", userDetails.dob);
      formData.append("phoneNumber", userDetails.phone);
      formData.append("gender", userDetails.gender.toLowerCase());
      formData.append("section", userDetails.section);
      formData.append("bio", userDetails.bio);

      // Profile picture
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      // Interest IDs
      if (interest.length > 0) {
        interest.forEach((item, index) => {
          formData.append(`interestId[${index}]`, item.tagId);
        });
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.success) {
        dispatch(
          updateSuccess({ ...response.data.data, isProfileComplete: true })
        );
        toast.success(response.data.message);
        resetForm();
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b text-white p-2 md:p-8">
      <div className="max-w-4xl mx-auto rounded-lg shadow-lg md:bg-gray-900 p-4 md:p-8">
        <h1 className="text-xl md:text-3xl text-center mb-4 md:mb-8">
          Register with{" "}
          <span className="text-cyan-400 font-bold">CYBER HUNTER CLUB</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Profile Picture Section */}
          <ProfilePictureSection
            imageSrc={imageSrc}
            fileInputRef={fileInputRef}
            handleButtonClick={handleButtonClick}
            handleImageUpload={handleImageUpload}
          />

          {/* Personal Information Fields */}
          <PersonalInfoFields
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            interest={interest}
            setInterest={setInterest}
          />

          {/* Payment Section */}
          <PaymentSection
            clubReg={clubReg}
            clubId={clubId}
            clubAccepted={clubAccepted}
            setClubAccepted={setClubAccepted}
            idCardAccepted={idCardAccepted}
            setIdCardAccepted={setIdCardAccepted}
          />

          {/* Terms and Submit Button */}
          <TermsAndSubmit
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            loading={loading}
            totalAmount={totalAmount}
          />
        </form>
      </div>
    </div>
  );
}

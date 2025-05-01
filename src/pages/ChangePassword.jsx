import { useState, useEffect, createContext } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { IoIosPlanet } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/Axios";

// Import sub-components
import StarsBackground from "../components/password/StarsBackground";
import NebulaEffect from "../components/password/NebulaEffect";
import PasswordForm from "../components/password/PasswordForm";
import SuccessAnimation from "../components/password/SuccessAnimation";

// Create a context for sharing state between components
export const PasswordContext = createContext(null);

const ChangePassword = () => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stars, setStars] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    general: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  }, []);

  // Password strength validation logic
  const validatePassword = (password) => {
    const criteria = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const strength = Object.values(criteria).filter(Boolean).length;
    return { valid: strength >= 4, strength: (strength / 5) * 100 };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear specific error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate current password
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
      valid = false;
    }

    // Validate new password
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else {
      const { valid: isStrongPassword } = validatePassword(formData.newPassword);
      if (!isStrongPassword) {
        newErrors.newPassword = "Password should be at least 8 characters with uppercase, lowercase, number and special character";
        valid = false;
      }
    }

    // Validate confirm password
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    // Check if new password is same as current
    if (formData.currentPassword && formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = "New password cannot be the same as current password";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Verify current password before proceeding
  const verifyCurrentPassword = async () => {
    if (!formData.currentPassword) {
      setErrors(prev => ({
        ...prev,
        currentPassword: "Current password is required"
      }));
      return;
    }

    try {
      setIsVerifying(true);

      // Verify current password with backend
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/verify-password`,
        { password: formData.currentPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      setIsCurrentPasswordVerified(true);
      setErrors(prev => ({ ...prev, currentPassword: "" }));
      toast.success("Current password verified!");
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        currentPassword: "Current password is incorrect"
      }));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Verify current password first if not already verified
    if (!isCurrentPasswordVerified) {
      await verifyCurrentPassword();
      if (!isCurrentPasswordVerified) return;
    }

    setIsLoading(true);

    try {
      // Update to correctly use your API endpoint with authorization header
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/change-password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      // Show success animation
      setIsLoading(false);
      setIsLaunched(true);
      toast.success("Password updated successfully!");

    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || "Failed to update password";
      setErrors({ ...errors, general: errorMessage });
      toast.error(errorMessage);
    }
  };

  // Create context value object
  const contextValue = {
    formData,
    setFormData,
    showPasswords,
    errors,
    isCurrentPasswordVerified,
    isVerifying,
    isLoading,
    validatePassword,
    handleInputChange,
    togglePasswordVisibility,
    verifyCurrentPassword,
    handleSubmit
  };

  return (
    <PasswordContext.Provider value={contextValue}>
      <div className="bg-gradient-to-b text-white relative overflow-hidden">
        <StarsBackground stars={stars} />
        <NebulaEffect />

        {/* Main Content */}
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md"
          >
            {!isLaunched ? (
              <div className="relative">
                {/* Floating Planet */}
                <motion.div
                  animate={{
                    y: [-10, 10],
                    rotate: [0, 360],
                  }}
                  transition={{
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                    rotate: {
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  className="absolute -top-20 -right-20 text-brandPrimary opacity-30"
                >
                  <IoIosPlanet size={120} />
                </motion.div>

                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <div className="flex flex-col items-start">
                    <motion.button
                      onClick={() => navigate(-1)}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </motion.button>
                  </div>

                  <PasswordForm errors={errors} />
                </div>
              </div>
            ) : (
              <SuccessAnimation navigate={navigate} />
            )}
          </motion.div>
        </div>
      </div>
    </PasswordContext.Provider>
  );
};

export default ChangePassword;

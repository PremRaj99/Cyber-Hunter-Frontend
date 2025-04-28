import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LockKeyhole, ArrowRight, Sparkles, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { FaRocket } from "react-icons/fa";
import { IoIosPlanet } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/Axios";

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

  return (
    <div className="bg-gradient-to-b text-white relative overflow-hidden">
      {/* Stars Background */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Nebula Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 25%, transparent 50%)",
        }}
      />

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
                <div className="text-center mb-8">
                  <motion.div
                    className="relative w-24 h-24 mx-auto mb-4"
                    animate={{
                      y: [-5, 5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="absolute inset-0 bg-brandPrimary rounded-full blur-2xl opacity-20" />
                    <div className="relative h-full flex items-center justify-center">
                      <FaRocket className="w-12 h-12 text-cyan-400" />
                    </div>
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">Change Password</h2>
                  <p className="text-gray-400">
                    Enter the details to Change Your Password
                  </p>
                </div>

                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 text-red-300 p-3 rounded-xl mb-4 text-sm"
                  >
                    {errors.general}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Current Password Field */}
                  <div className="relative group">
                    <div className="relative flex items-center">
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        placeholder="Current password"
                        className={`w-full px-4 py-4 bg-white/5 text-white border ${errors.currentPassword ? "border-red-500" :
                            isCurrentPasswordVerified ? "border-green-500" : "border-white/10"
                          } rounded-2xl focus:outline-none focus:border-brandPrimary transition-all pl-12`}
                        disabled={isCurrentPasswordVerified}
                        required
                      />
                      <LockKeyhole className="absolute left-4 w-5 h-5 text-gray-400" />
                      {!isCurrentPasswordVerified && (
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('current')}
                          className="absolute right-4 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPasswords.current ?
                            <EyeOff className="w-5 h-5" /> :
                            <Eye className="w-5 h-5" />
                          }
                        </button>
                      )}
                      {isCurrentPasswordVerified && (
                        <span className="absolute right-4 text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </div>
                    {errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-400">{errors.currentPassword}</p>
                    )}
                    {!isCurrentPasswordVerified && !errors.currentPassword && (
                      <div className="mt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={verifyCurrentPassword}
                          disabled={isVerifying || !formData.currentPassword}
                          className="px-3 py-1 text-xs bg-brandPrimary text-black rounded hover:opacity-90 disabled:opacity-50 flex items-center gap-1"
                        >
                          {isVerifying ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <AiOutlineLoading3Quarters className="w-3 h-3" />
                              </motion.div>
                              <span>Verifying...</span>
                            </>
                          ) : (
                            <span>Verify Password</span>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* New Password Field */}
                  <div className="relative group">
                    <div className="relative flex items-center">
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="New password"
                        className={`w-full px-4 py-4 bg-white/5 text-white border ${errors.newPassword ? "border-red-500" : "border-white/10"
                          } rounded-2xl focus:outline-none focus:border-brandPrimary transition-all pl-12`}
                        required
                      />
                      <LockKeyhole className="absolute left-4 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute right-4 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPasswords.new ?
                          <EyeOff className="w-5 h-5" /> :
                          <Eye className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>
                    )}

                    {/* Password strength indicator */}
                    {formData.newPassword && (
                      <div className="mt-2">
                        <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${validatePassword(formData.newPassword).strength < 40 ? "bg-red-500" :
                              validatePassword(formData.newPassword).strength < 70 ? "bg-yellow-500" :
                                "bg-green-500"
                              }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${validatePassword(formData.newPassword).strength}%` }}
                          />
                        </div>
                        <p className="text-xs mt-1 text-gray-400">Password strength:
                          <span className={
                            validatePassword(formData.newPassword).strength < 40 ? "text-red-400" :
                              validatePassword(formData.newPassword).strength < 70 ? "text-yellow-400" :
                                "text-green-400"
                          }>
                            {" "}
                            {validatePassword(formData.newPassword).strength < 40 ? "Weak" :
                              validatePassword(formData.newPassword).strength < 70 ? "Medium" :
                                "Strong"}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative group">
                    <div className="relative flex items-center">
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        className={`w-full px-4 py-4 bg-white/5 text-white border ${errors.confirmPassword ? "border-red-500" : "border-white/10"
                          } rounded-2xl focus:outline-none focus:border-brandPrimary transition-all pl-12`}
                        required
                      />
                      <LockKeyhole className="absolute left-4 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-4 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPasswords.confirm ?
                          <EyeOff className="w-5 h-5" /> :
                          <Eye className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-brandPrimary to-black rounded-2xl font-semibold relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-black/50 translate-y-full group-hover:translate-y-0 transition-transform" />
                    <span className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <AiOutlineLoading3Quarters className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <>
                          Update Password
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10"
            >
              {/* Success Animation */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <motion.div
                  animate={{
                    y: [-100, 0],
                    scale: [0.5, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <FaRocket className="w-12 h-12 text-cyan-400 mx-auto" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute inset-0 bg-brandPrimary rounded-full blur-2xl opacity-20"
                />
              </div>

              <h3 className="text-2xl font-bold mb-4">Password Updated</h3>
              <p className="text-gray-400 mb-6">
                Use Your New Password for login
                <br />
              </p>
              <motion.button
                onClick={() => navigate("/auth/login")}
                className="bg-brandPrimary text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-black hover:text-brandPrimary transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Login
              </motion.button>

              {/* Particle Effects */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                    y: [-20, 20],
                    x: [-20, 20],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                  className="absolute"
                  style={{
                    left: `${50 + (Math.random() - 0.5) * 40}%`,
                    top: `${50 + (Math.random() - 0.5) * 40}%`,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ChangePassword;

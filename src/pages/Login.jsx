/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/User/userSlice";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
} from "lucide-react";
import axios from "../utils/Axios";
import google from "../assets/loginSignUp/google.svg";
import login from "../assets/loginSignUp/login.svg";
import signup from "../assets/loginSignUp/signup.svg";
import metamask from "../assets/loginSignUp/metamask.svg";
import { motion, AnimatePresence } from "framer-motion";
import { FaApple } from "react-icons/fa6";
import GoogleLogin from "../components/google/GoogleLogin";
import GithubLogin from "../components/auth/GithubLogin";
import WalletLogin from "../components/auth/WalletLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "react-toastify";

const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, "");
};

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const commonFakeDomains = [
    "tempmail.com",
    "throwaway.com",
    "tempmail.net",
    "fakeinbox.com",
    "trash-mail.com",
    "10minutemail.com",
  ];

  if (!emailRegex.test(email)) return false;

  const domain = email.split("@")[1].toLowerCase();
  if (commonFakeDomains.includes(domain)) return false;

  return true;
};

const validatePassword = (password) => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    noSpaces: !/\s/.test(password),
  };
};

const Login = () => {
  const location = useLocation();
  const [isSignup, setIsSignup] = useState(
    location.search.includes("mode=signup")
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.title = isSignup ? "Sign Up" : "Login";
    // Update URL when isSignup changes
    const newUrl = isSignup ? "/auth/login?mode=signup" : "/auth/login";
    window.history.replaceState({}, "", newUrl);
  }, [isSignup]);

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  }, [isSignup]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setIsSignup(searchParams.get("mode") === "signup");
  }, [location.search]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const sanitizedEmail = sanitizeInput(formData.email);
    if (!sanitizedEmail) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(sanitizedEmail)) {
      newErrors.email =
        "Please enter a valid email address. Temporary email providers are not allowed.";
    }

    // Password validation
    const sanitizedPassword = sanitizeInput(formData.password);
    const passwordRequirements = validatePassword(sanitizedPassword);

    if (!sanitizedPassword) {
      newErrors.password = "Password is required";
    } else {
      const passwordErrors = [];
      if (!passwordRequirements.minLength)
        passwordErrors.push("at least 8 characters");
      if (!passwordRequirements.hasUppercase)
        passwordErrors.push("an uppercase letter");
      if (!passwordRequirements.hasLowercase)
        passwordErrors.push("a lowercase letter");
      if (!passwordRequirements.hasNumber) passwordErrors.push("a number");
      if (!passwordRequirements.hasSpecialChar)
        passwordErrors.push("a special character");
      if (!passwordRequirements.noSpaces) passwordErrors.push("no spaces");

      if (passwordErrors.length > 0) {
        newErrors.password = `Password must contain ${passwordErrors.join(
          ", "
        )}`;
      }
    }

    // Signup-specific validations
    if (isSignup) {
      const sanitizedConfirmPassword = sanitizeInput(formData.confirmPassword);
      if (!sanitizedConfirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (sanitizedPassword !== sanitizedConfirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (sanitizedPassword === sanitizedEmail) {
        newErrors.password = "Password cannot be the same as email";
      }
    }

    // Common password check
    const commonPasswords = [
      "password123",
      "admin123",
      "12345678",
      "qwerty123",
    ];
    if (commonPasswords.includes(sanitizedPassword.toLowerCase())) {
      newErrors.password =
        "Please use a stronger password. This password is too common.";
    }

    // Update form with sanitized values
    setFormData({
      ...formData,
      email: sanitizedEmail,
      password: sanitizedPassword,
      confirmPassword: isSignup ? sanitizeInput(formData.confirmPassword) : "",
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        // Check if 2FA is required
        if (response.data.data.requiresTwoFactor) {
          // Redirect to 2FA verification page
          navigate("/auth/verify", {
            state: {
              email: response.data.data.email,
              type: "2fa",
              userData: response.data.data.userData,
              redirect: location.state?.from || "/dashboard"
            }
          });
          return;
        }

        // Normal login flow without 2FA
        const { accessToken, refreshToken } = response.data.data;

        // Set tokens in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", response.data.data._id);

        // Dispatch action to update user state
        dispatch(signInSuccess(response.data.data));

        toast.success("Login successful");

        // Redirect to dashboard or previous intended page
        const redirectPath = location.state?.from || "/dashboard";
        navigate(redirectPath);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8 md:p-2 gap-48 ">
      <motion.div
        className="hidden lg:flex h-screen items-center justify-center relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-[600px] h-[600px]">
          {/* Main image container */}
          <motion.div
            className="relative w-full h-full rounded-3xl overflow-hidden shadow-4xl "
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="">
              <motion.img
                key={isSignup ? "signup" : "login"}
                src={isSignup ? signup : login}
                alt="form image"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{
                  duration: 0.7,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              />
            </AnimatePresence>

            {/* Overlay gradient */}
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute -z-10 w-[800px] h-[800px] bg-brandPrimary/30 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div className="absolute -z-10 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl -bottom-10 -right-10 animate-pulse delay-1000" />
        </div>
      </motion.div>
      <div className="w-full max-w-lg relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-brandPrimary/50 to-brandPrimary/50 rounded-2xl blur-2xl animate-pulse" />

        <div className="relative bg-gray-900 rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-brandPrimary">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brandPrimary mb-2">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-white text-md">
              {isSignup
                ? "Join us for an amazing experience"
                : "Sign in to continue your journey"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  className={`w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-brandPrimary transition-all duration-300 ${errors.email ? "border-red-500" : "border-gray-700"
                    }`}
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full bg-gray-800 text-white pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-brandPrimary transition-all duration-300 ${errors.password ? "border-red-500" : "border-gray-700"
                    }`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              {isSignup && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-400">
                    Password must contain:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li
                      className={`flex items-center ${formData.password.length >= 8
                        ? "text-green-500"
                        : "text-gray-400"
                        }`}
                    >
                      <span className="mr-2">✓</span> At least 8 characters
                    </li>
                    <li
                      className={`flex items-center ${/[A-Z]/.test(formData.password)
                        ? "text-green-500"
                        : "text-gray-400"
                        }`}
                    >
                      <span className="mr-2">✓</span> At least one uppercase
                      letter
                    </li>
                    <li
                      className={`flex items-center ${/[a-z]/.test(formData.password)
                        ? "text-green-500"
                        : "text-gray-400"
                        }`}
                    >
                      <span className="mr-2">✓</span> At least one lowercase
                      letter
                    </li>
                    <li
                      className={`flex items-center ${/\d/.test(formData.password)
                        ? "text-green-500"
                        : "text-gray-400"
                        }`}
                    >
                      <span className="mr-2">✓</span> At least one number
                    </li>
                    <li
                      className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
                        ? "text-green-500"
                        : "text-gray-400"
                        }`}
                    >
                      <span className="mr-2">✓</span> At least one special
                      character
                    </li>
                    <li
                      className={`flex items-center ${!/\s/.test(formData.password)
                        ? "text-green-500"
                        : "text-gray-400"
                        }`}
                    >
                      <span className="mr-2">✓</span> No spaces
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm Password (Sign Up only) */}
            {isSignup && (
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-brandPrimary transition-all duration-300 ${errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-700"
                      }`}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Forgot Password Link */}
            {!isSignup && (
              <div className="flex justify-end">
                <a
                  href="/auth/forgot"
                  className="text-sm text-brandPrimary hover:text-cyan-400 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brandPrimary text-black py-3 rounded-lg font-semibold hover:bg-black hover:text-brandPrimary
              hover:border hover:border-brandPrimary flex items-center justify-center space-x-2 disabled:opacity-50 transition-all duration-500"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isSignup ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-4 hover:text-black">
              <button className="flex items-center justify-center px-4 py-3 bg-gray-800 rounded-lg hover:bg-cyan-700  transition-colors">
                <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
                  <GoogleLogin>
                    <img src={google} alt="Google Icon" className="h-5 w-5" />
                  </GoogleLogin>
                </GoogleOAuthProvider>
              </button>
              <GithubLogin />
              <WalletLogin />
            </div>
          </div>

          {/* Toggle Auth Mode */}
          <p className="mt-8 text-center text-gray-400">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setFormData({ email: "", password: "", confirmPassword: "" });
                setErrors({});
              }}
              className="text-brandPrimary hover:text-cyan-400 font-medium transition-colors"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

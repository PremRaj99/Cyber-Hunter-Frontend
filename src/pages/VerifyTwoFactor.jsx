/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from 'react';
import { FaArrowRight, FaLock, FaEnvelope, FaShieldAlt, FaKey } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/Axios";
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/User/userSlice';

const VerifyTwoFactor = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  // Extract user data from query params or state
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || location.state?.email;
  const isTwoFactor = queryParams.get('type') === '2fa' || location.state?.type === '2fa';
  const redirectPath = queryParams.get('redirect') || location.state?.redirect || "/dashboard";
  const userData = location.state?.userData;

  const handleInputChange = (index, value) => {
    // Only allow numeric input
    if (value && !/^\d*$/.test(value)) return;

    // Case 1: Single digit input (most common)
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input after entering a digit
      if (index < 5) {
        setTimeout(() => {
          if (inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
          }
        }, 10); // Slight delay to ensure DOM update
      }
      return;
    }

    // Case 2: Multi-digit input (paste or auto-complete)
    if (value.length > 1) {
      const digits = value.split('').filter(char => /\d/.test(char)).slice(0, 6);
      const newOtp = [...otp];

      // Fill OTP array with digits
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });

      setOtp(newOtp);

      // Focus on appropriate field after paste
      const nextIndex = Math.min(index + digits.length, 5);
      setTimeout(() => {
        if (inputRefs.current[nextIndex]) {
          inputRefs.current[nextIndex].focus();
        }
      }, 10);
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace - improved logic
    if (e.key === 'Backspace') {
      if (otp[index]) {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // If current field is empty, go back and clear previous field
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);

        setTimeout(() => {
          if (inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
          }
        }, 10);
      }
    }
    // Handle arrow keys
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    // Tab key is handled automatically by the browser
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d+/.test(pastedData)) {
      // Extract only digits from pasted content
      const digits = pastedData.match(/\d/g) || [];
      const digitsToUse = digits.slice(0, 6);

      const newOtp = [...otp];
      digitsToUse.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });

      setOtp(newOtp);

      // Focus on appropriate field after paste
      const lastIndex = Math.min(digitsToUse.length, 5);
      setTimeout(() => {
        if (digitsToUse.length < 6 && inputRefs.current[lastIndex]) {
          inputRefs.current[lastIndex].focus();
        }
      }, 10);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (!otpValue || otpValue.length < 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isTwoFactor) {
        // Handle 2FA verification during login
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login/verify-2fa`, {
          email,
          token: otpValue
        });

        if (response.data && response.data.success) {
          const { accessToken, refreshToken } = response.data.data;

          // Store tokens and user ID in localStorage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          if (response.data.data._id) {
            localStorage.setItem("userId", response.data.data._id);
          }

          // Fetch comprehensive user data from multiple endpoints
          try {
            // 1. Fetch basic user profile - use the correct endpoint
            const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });

            // Store user ID from the successful me request
            const userId = userResponse.data?.data?._id || response.data.data._id;

            // 2. Fetch individual profile data with the correct endpoint pattern
            let individualResponse;
            try {
              individualResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/individual/user/${userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`
                  }
                }
              );
            } catch (individualErr) {
              console.log("Individual data fetch failed, continuing without it:", individualErr);
              individualResponse = { data: { data: {} } };
            }

            // Merge all data
            const completeUserData = {
              ...response.data.data,              // Basic auth data
              ...userResponse.data.data,          // User profile data
              bio: individualResponse.data?.data?.description || userResponse.data.data.bio || response.data.data.bio || "",
              description: individualResponse.data?.data?.description || userResponse.data.data.description || "",
              interest: individualResponse.data?.data?.interest || userResponse.data.data.interest || [],
              accessToken,
              refreshToken,
              isNewUser: false,
              isProfileComplete: true
            };

            // Update Redux store with complete user data
            dispatch(signInSuccess(completeUserData));

            toast.success('Login successful');
            navigate('/dashboard/profile');
          } catch (profileError) {
            console.error("Error fetching complete profile data:", profileError);

            // Make a second attempt with a different endpoint pattern
            try {
              // Try with the actual userId from 2FA response - avoid using wrong ID pattern
              const userId = response.data.data._id;
              console.log("Attempting fallback with userId:", userId);

              const fallbackResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/${userId}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              });

              const fallbackData = {
                ...response.data.data,
                ...fallbackResponse.data.data,
                accessToken,
                refreshToken,
                isNewUser: false,
                isProfileComplete: true
              };

              dispatch(signInSuccess(fallbackData));
              toast.info('Profile loaded with basic data');
              navigate('/dashboard/profile');
            } catch (fallbackError) {
              console.error("Fallback also failed:", fallbackError);

              // Final attempt - just use the /me endpoint which should always work
              try {
                const meResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, {
                  headers: {
                    Authorization: `Bearer ${accessToken}`
                  }
                });

                dispatch(signInSuccess({
                  ...meResponse.data.data,
                  accessToken,
                  refreshToken,
                  isNewUser: false,
                  isProfileComplete: true
                }));

                toast.info('Basic profile loaded successfully');
                navigate('/dashboard/profile');
              } catch (meError) {
                // Absolute final fallback
                dispatch(signInSuccess({
                  ...response.data.data,
                  isNewUser: false,
                  isProfileComplete: true
                }));

                toast.warning('Logged in with limited profile data');
                navigate('/dashboard/profile');
              }
            }
          }
        }
      } else {
        // Handle regular OTP verification (email verification, password reset, etc)
        await axios.post('/api/v1/auth/verify-otp', {
          email,
          otp: otpValue
        });

        toast.success('OTP verified successfully');
        navigate(redirectPath);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'OTP verification failed';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;

    // Implement resend code functionality here
    toast.info('Sending new verification code');
    setTimeLeft(60);
    setCanResend(false);
  };

  // Add this function to initialize the refs safely without causing focus issues
  const setInputRef = (index, element) => {
    inputRefs.current[index] = element;
  };

  useEffect(() => {
    // Redirect if no email is found
    if (!email) {
      toast.error('No email provided for verification');
      navigate('/auth/login');
    }

    // Remove automatic focus on first load to prevent unwanted focus behavior
    // Only focus the first input if all fields are empty - prevents focus jump issues
    const allEmpty = otp.every(digit => !digit);
    if (allEmpty && inputRefs.current[0]) {
      // Use requestAnimationFrame for smoother behavior
      requestAnimationFrame(() => {
        // Only focus if the user hasn't already clicked somewhere else
        if (document.activeElement !== inputRefs.current[0] &&
          !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
          inputRefs.current[0].focus();
        }
      });
    }

    // Timer for resend code option
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [email, navigate, timeLeft, canResend, otp]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Animated circles */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_0.1px,transparent_0.1px),linear-gradient(to_right,rgba(13,148,136,0.05)_0.1px,transparent_0.1px)] bg-[length:18px_18px]"></div>
      </div>

      <div className="max-w-md w-full backdrop-blur-sm">
        {/* Main card */}
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
          {/* Top accent bar */}
          <div className="h-2 w-full bg-gradient-to-r from-cyan-400 to-cyan-600"></div>

          {/* Content */}
          <div className="bg-black/80 backdrop-blur-xl p-6 sm:p-8">
            {/* Header with icon */}
            <div className="flex flex-col items-center mb-8">
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full p-4 shadow-lg shadow-cyan-500/20 mb-5">
                {isTwoFactor ?
                  <FaShieldAlt className="text-black text-2xl" /> :
                  <FaKey className="text-black text-2xl" />
                }
              </div>

              <h1 className="text-3xl font-bold text-white">
                {isTwoFactor ? '2FA Verification' : 'Verify Your Code'}
              </h1>

              <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full mt-3 mb-4"></div>

              {email && (
                <div className="mt-3 flex items-center justify-center text-gray-300 text-sm">
                  <FaEnvelope className="text-cyan-500 mr-2" />
                  <p>Code sent to <span className="text-cyan-400 font-medium">{email}</span></p>
                </div>
              )}

              {isTwoFactor && (
                <p className="text-gray-400 mt-3 text-l text-center">
                  Please enter the 6-digit code from your authenticator app
                </p>
              )}
            </div>

            {/* Error display */}
            {error && (
              <div className="mb-6 bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-lg text-sm">
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleVerify}>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  <div className="flex items-center">
                    <FaLock className="text-cyan-500 mr-2" />
                    {isTwoFactor ? 'Enter Authentication Code' : 'Enter Verification Code'}
                  </div>
                </label>

                {/* OTP Input Fields */}
                <div className="flex justify-between gap-2 mt-2" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => setInputRef(index, el)}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 sm:w-14 sm:h-16 rounded-lg bg-black/60 border-2 focus:border-cyan-500 border-gray-700 text-center text-2xl text-white focus:outline-none transition-all duration-300"
                      // Add this to prevent automatic focus issues
                      autoComplete="off"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-bold py-4 px-6 rounded-xl flex items-center justify-center transform transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-70"
                >
                  <span className="mr-2">
                    {loading ? 'Verifying...' : isTwoFactor ? 'Authenticate' : 'Verify Code'}
                  </span>
                  {!loading && <FaArrowRight />}
                </button>
              </div>
            </form>

            {/* Extra functionality - resend code option */}
            {!isTwoFactor && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={!canResend}
                  className={`text-sm font-medium focus:outline-none transition-colors ${canResend ? 'text-cyan-400 hover:text-cyan-300' : 'text-gray-500'}`}
                >
                  {canResend
                    ? "Didn't receive code? Resend"
                    : `Resend code in ${timeLeft}s`}
                </button>
              </div>
            )}

            {/* Back button */}
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => navigate('/auth/login')}
                className="text-gray-400 hover:text-cyan-400 text-sm font-medium transition-colors"
              >
                Back to login
              </button>
            </div>
          </div>
        </div>

        {/* Security note */}
        <div className="text-center mt-6 text-gray-500 text-xs">
          <p>Your security is our priority. Never share your verification code.</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyTwoFactor;
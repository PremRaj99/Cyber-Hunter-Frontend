import { useState, useEffect } from 'react';
import Verifyotp from "../assets/loginSignUp/verifyotp.gif";
import { FaArrowRight, FaLock } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/Axios";
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/User/userSlice';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract user data from query params or state
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || location.state?.email;
  const isTwoFactor = queryParams.get('type') === '2fa' || location.state?.type === '2fa';
  const redirectPath = queryParams.get('redirect') || location.state?.redirect || "/dashboard";
  const userData = location.state?.userData;

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp || otp.length < 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isTwoFactor) {
        // Handle 2FA verification
        await axios.post('/api/v1/auth/2fa/validate', {
          email,
          token: otp
        });

        toast.success('2FA verification successful');

        if (userData) {
          // Update Redux store with user data
          dispatch(signInSuccess(userData));

          // Store tokens in localStorage if they exist in userData
          if (userData.accessToken) localStorage.setItem("accessToken", userData.accessToken);
          if (userData.refreshToken) localStorage.setItem("refreshToken", userData.refreshToken);
        }

        navigate(redirectPath);
      } else {
        // Handle regular OTP verification (email verification, password reset, etc)
        await axios.post('/api/v1/auth/verify-otp', {
          email,
          otp
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

  useEffect(() => {
    // Redirect if no email is found
    if (!email) {
      toast.error('No email provided for verification');
      navigate('/auth/login');
    }
  }, [email, navigate]);

  return (
    <div>
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-4 text-white border-brandPrimary p-6 rounded-lg shadow-lg">
            {/* <!-- image --> */}
            <div className="space-y-8" data-aos="fade-right">
              <img src={Verifyotp} alt="verification" className="w-full h-full md:h-fit object-cover hover:-translate-y-3 transition-all duration-700" />
            </div>

            {/* <!-- OTP verification form --> */}
            <div
              className="border-2 text-white border-white p-6 rounded-lg shadow-lg"
              data-aos="fade-left"
            >
              <form className="space-y-6 flex flex-col" onSubmit={handleVerify}>
                <div className="text-center mb-4" data-aos="fade-down">
                  <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <span className="text-4xl font-extrabold text-brandPrimary text-500 text-center md:m-4 border-b-2 border-brandPrimary">
                      {isTwoFactor ? '2FA Verification' : 'Verify OTP'}
                    </span>
                  </div>

                  {email && (
                    <p className="text-gray-300 mt-4">
                      Enter the verification code for <span className="text-brandPrimary">{email}</span>
                    </p>
                  )}
                </div>

                {error && (
                  <div className="bg-red-500/20 text-red-300 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="otp" className="flex text-md font-medium text-white">
                    <FaLock className='h-6 w-6 mx-2 my-2' />
                    {isTwoFactor ? 'Enter Authentication Code' : 'Verify OTP'}
                  </label>
                  <input
                    type="number"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-brandPrimary rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder:text-white"
                    placeholder="Enter 6-digit code"
                    required
                    maxLength={6}
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="lg:w-1/2 md:w-full flex items-center justify-center bg-brandPrimary text-black font-bold py-3 px-6 rounded-lg hover:bg-black hover:text-brandPrimary hover:border hover:border-brandPrimary transform hover:scale-105 transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                    {!loading && (
                      <span className="ml-2">
                        <FaArrowRight />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyOTP;
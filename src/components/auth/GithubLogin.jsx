/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import github from '../../assets/loginSignUp/github.svg';
import { toast } from 'react-toastify';
import Axios from "../../utils/Axios";
import { useNavigate } from 'react-router-dom';

const GithubLogin = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGithubLogin = () => {
    try {
      setLoading(true);
      // Create a timestamp to prevent caching issues
      const timestamp = new Date().getTime();
      const apiUrl = import.meta.env.VITE_API_URL;
      
      // First ensure GitHub authentication is configured properly
      Axios.get(`${apiUrl}/api/v1/auth/github-config`)
        .then(response => {
          if (response.data.success && response.data.data.clientIdConfigured) {
            // Add timestamp to prevent caching issues
            const redirectUrl = `${apiUrl}/api/v1/auth/github?t=${timestamp}`;
            console.log("Redirecting to GitHub auth URL:", redirectUrl);
            window.location.href = redirectUrl;
          } else {
            toast.error("GitHub authentication is not configured on the server");
            setLoading(false);
          }
        })
        .catch(error => {
          console.log("Skipping config check, proceeding with direct GitHub auth");
          // Direct approach as fallback
          window.location.href = `${apiUrl}/api/v1/auth/github?t=${timestamp}`;
        });
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error("Failed to connect with GitHub. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <button
        className="flex items-center justify-center px-4 py-3 bg-gray-800 rounded-lg"
        disabled
      >
        <span className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full mr-2"></span>
        Connecting to GitHub...
      </button>
    );
  }

  if (children) {
    return <span onClick={handleGithubLogin}>{children}</span>;
  }

  return (
    <button
      onClick={handleGithubLogin}
      className="flex items-center justify-center px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      aria-label="Sign in with GitHub"
      type="button"
    >
      <img src={github} alt='Github Icon' className="h-5 w-5" />
    </button>
  );
};

export default GithubLogin;

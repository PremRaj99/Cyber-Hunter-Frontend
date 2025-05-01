import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/User/userSlice';
import { toast } from 'react-toastify';
import axios from "../utils/Axios";

const GitHubAuthSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Processing GitHub authentication success');
    
    const processGitHubAuth = async () => {
      try {
        // Extract tokens from URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const refreshToken = params.get('refreshToken');
        
        if (!token) {
          setError('No access token provided');
          toast.error('GitHub login failed: No access token');
          setTimeout(() => navigate('/auth/login'), 3000);
          return;
        }
        
        console.log("Authentication tokens received, storing them");
        
        // Store tokens
        localStorage.setItem('accessToken', token);
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        
        try {
          console.log("Fetching user data with access token");
          // Get user data - make sure API endpoint exists
          const response = await axios.get('/api/v1/auth/github/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.data.success) {
            // Update Redux store
            dispatch(signInSuccess({
              ...response.data.data,
              accessToken: token,
              refreshToken: refreshToken || null
            }));
            
            toast.success('Successfully signed in with GitHub!');
            
            // Navigate to appropriate page
            if (response.data.data.isProfileComplete) {
              navigate('/dashboard/profile', { replace: true });
            } else {
              navigate('/auth/userdetails', { replace: true });
            }
          } else {
            throw new Error(response.data.message || 'Failed to fetch user data');
          }
        } catch (apiError) {
          console.error('Error fetching user data:', apiError);
          
          // Check if the error is from axios response
          const errorMessage = apiError.response?.data?.message || 
                              'Failed to fetch user data. Please try again.';
                              
          setError(errorMessage);
          toast.error('Error completing GitHub sign in: ' + errorMessage);
          
          // Clear tokens since they're invalid or expired
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          
          setTimeout(() => navigate('/auth/login'), 3000);
        }
      } catch (error) {
        console.error('GitHub auth processing error:', error);
        setError('Failed to process GitHub authentication');
        toast.error('GitHub login failed.');
        setTimeout(() => navigate('/auth/login'), 3000);
      } finally {
        setLoading(false);
      }
    };
    
    processGitHubAuth();
  }, [location.search, dispatch, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <h1 className="mt-8 text-2xl font-bold text-white">Processing GitHub Login...</h1>
        <p className="mt-2 text-gray-400">Please wait while we authenticate your account.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="p-6 bg-red-900/30 rounded-lg border border-red-500 max-w-md w-full">
          <h1 className="text-xl font-bold text-white mb-2">Authentication Failed</h1>
          <p className="text-gray-300">{error}</p>
          <p className="text-gray-400 mt-4">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="p-6 bg-green-900/30 rounded-lg border border-green-500 max-w-md w-full">
        <h1 className="text-xl font-bold text-white mb-2">Authentication Successful</h1>
        <p className="text-gray-300">You are now signed in with GitHub!</p>
      </div>
    </div>
  );
};

export default GitHubAuthSuccess;

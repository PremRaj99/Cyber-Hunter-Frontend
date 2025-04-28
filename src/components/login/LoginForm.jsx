import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { signInSuccess } from '../../redux/slices/userSlice'; // Adjust the path as needed

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Modify your login submission handler to handle 2FA flow
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, { email, password });

      // Check if 2FA is required
      if (response.data.data?.twoFactorEnabled) {
        // Save userData temporarily, but don't update Redux store yet
        navigate('/auth/verify-otp', {
          state: {
            email: email,
            type: '2fa',
            userData: response.data.data, // Pass user data to be set after 2FA
            redirect: '/dashboard'
          }
        });
      } else {
        // Normal login flow (no 2FA)
        dispatch(signInSuccess(response.data.data));

        if (response.data.data.accessToken) {
          localStorage.setItem("accessToken", response.data.data.accessToken);
        }

        navigate('/dashboard');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields go here */}
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default LoginForm;

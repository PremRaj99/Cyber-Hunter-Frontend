/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { signInSuccess } from '../../redux/User/userSlice';
import {
  connectMetaMask,
  requestAuthNonce,
  signMessage,
  verifyWalletSignature,
  isMetaMaskInstalled
} from '../../utils/metamask';
import metamaskIcon from '../../assets/loginSignUp/metamask.svg';

const WalletLogin = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWalletLogin = async () => {
    if (!isMetaMaskInstalled()) {
      toast.info("MetaMask is not installed. Please install MetaMask to continue.", {
        autoClose: 7000,
      });
      // Open MetaMask install page in new tab
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    try {
      setLoading(true);

      // Step 1: Connect to MetaMask and get wallet address
      const { address: walletAddress } = await connectMetaMask();
      toast.info("Wallet connected! Please sign the message to authenticate.");

      // Step 2: Request nonce from server
      const { message } = await requestAuthNonce(walletAddress);

      // Step 3: Sign the nonce with wallet
      const signature = await signMessage(message);

      // Step 4: Verify signature with server
      const userData = await verifyWalletSignature(walletAddress, signature);

      // Step 5: Save auth data and update Redux store
      localStorage.setItem("accessToken", userData.accessToken);
      localStorage.setItem("refreshToken", userData.refreshToken);

      // Make sure we're correctly capturing the profile completion status
      const isProfileComplete = !!userData.isProfileComplete;

      dispatch(signInSuccess({
        ...userData,
        isProfileComplete
      }));

      toast.success("Successfully signed in with wallet!");

      // Navigate based on profile completion status
      if (isProfileComplete) {
        console.log("Profile is complete, navigating to dashboard");
        navigate('/dashboard/profile', { replace: true });
      } else {
        console.log("Profile is incomplete, navigating to user details");
        navigate('/auth/userdetails', { replace: true });
      }

    } catch (error) {
      // Error is already handled in the utility functions
      console.error("Wallet login error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <button
        className="flex items-center justify-center px-4 py-3 bg-gray-800 rounded-lg"
        disabled
      >
        <div className="mr-2 w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        Connecting...
      </button>
    );
  }

  if (children) {
    return <span onClick={handleWalletLogin}>{children}</span>;
  }

  return (
    <button
      onClick={handleWalletLogin}
      className="flex items-center justify-center px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      aria-label="Sign in with MetaMask"
      type="button"
    >
      <motion.img
        src={metamaskIcon}
        alt="MetaMask Icon"
        className="h-5 w-5"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />
    </button>
  );
};

export default WalletLogin;

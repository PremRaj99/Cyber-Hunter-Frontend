import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Wallet,
  Link,
  Unlink,
  CheckCircle,
  XCircle,
  Loader
} from 'lucide-react';
import { toast } from 'react-toastify';
import { updateSuccess } from '../../../redux/User/userSlice';
import {
  isMetaMaskInstalled,
  connectMetaMask,
  requestAuthNonce,
  signMessage,
  connectWalletToAccount,
  disconnectWallet
} from '../../../utils/metamask';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.005 }
};

const WalletSettings = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize state based on user data
  useEffect(() => {
    if (currentUser?.walletAddress) {
      setIsConnected(true);
      setWalletAddress(currentUser.walletAddress);
    }
  }, [currentUser]);

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleConnectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      toast.info("MetaMask is not installed. Please install MetaMask to continue.", {
        autoClose: 7000,
      });
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    try {
      setIsLoading(true);

      // Connect to MetaMask
      const { address } = await connectMetaMask();

      // Request nonce for authentication
      const { message } = await requestAuthNonce(address);

      // Sign message with wallet
      const signature = await signMessage(message);

      // Connect wallet to account
      await connectWalletToAccount(address, signature);

      // Update state and Redux store
      setIsConnected(true);
      setWalletAddress(address);

      dispatch(updateSuccess({
        ...currentUser,
        walletAddress: address,
        walletConnected: true
      }));

      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      // Error is handled in utility functions
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      setIsLoading(true);

      // Disconnect wallet from account
      await disconnectWallet();

      // Update state and Redux store
      setIsConnected(false);
      setWalletAddress("");

      dispatch(updateSuccess({
        ...currentUser,
        walletAddress: null,
        walletConnected: false
      }));

      toast.success("Wallet disconnected successfully");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      // Error is handled in utility functions
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-bold text-cyan-400 mb-6"
      >
        Wallet Connection
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mb-6"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-brandPrimary/10 p-3 rounded-full">
              <Wallet className="h-6 w-6 text-brandPrimary" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-white">MetaMask Wallet</h3>
              {isConnected ? (
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <p className="text-sm text-gray-400">
                    Connected: {formatAddress(walletAddress)}
                  </p>
                </div>
              ) : (
                <div className="flex items-center mt-1">
                  <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  <p className="text-sm text-gray-400">Not connected</p>
                </div>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="bg-gray-800 rounded-lg px-4 py-2">
              <Loader className="h-5 w-5 text-cyan-400 animate-spin" />
            </div>
          ) : isConnected ? (
            <button
              onClick={handleDisconnectWallet}
              className="bg-red-900/30 hover:bg-red-900/50 text-red-300 px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <Unlink className="h-4 w-4 mr-2" />
              Disconnect
            </button>
          ) : (
            <button
              onClick={handleConnectWallet}
              className="bg-brandPrimary text-black px-4 py-2 rounded-lg flex items-center hover:bg-cyan-400 transition-colors"
            >
              <Link className="h-4 w-4 mr-2" />
              Connect
            </button>
          )}
        </div>

        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-300 mb-2">What you can do with a connected wallet:</h4>
          <ul className="text-sm text-gray-400 space-y-1 list-disc pl-5">
            <li>Sign in with your wallet address</li>
            <li>Use the same account across multiple devices</li>
            <li>Enhanced security for your Cyber Hunter account</li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="text-sm text-gray-500"
      >
        <p>
          By connecting a wallet, you&apos;ll be able to sign in to Cyber Hunter using your Ethereum address.
          Your wallet is only used for authentication and no funds will be requested.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default WalletSettings;

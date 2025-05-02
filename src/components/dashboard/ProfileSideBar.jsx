import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';

const WalletSettings = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error('MetaMask is not installed. Please install MetaMask and try again.');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const account = accounts[0];

      setWalletAddress(account);
      setIsConnected(true);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
    toast.info('Wallet disconnected.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gray-900 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Wallet Settings</h2>
      <p className="text-gray-400 mb-6">
        Connect your wallet to manage your account and transactions securely.
      </p>

      {isConnected ? (
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">Connected Wallet Address:</p>
            <p className="text-cyan-400 font-mono">{walletAddress}</p>
          </div>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 transition-colors"
        >
          Connect Wallet
        </button>
      )}
    </motion.div>
  );
};

export default WalletSettings;
import { ethers } from "ethers";
import axios from "./Axios";
import { toast } from "react-toastify";

/**
 * Checks if MetaMask is installed
 */
export const isMetaMaskInstalled = () => {
  return window.ethereum && window.ethereum.isMetaMask;
};

/**
 * Requests connection to MetaMask and returns the user's wallet address
 */
export const connectMetaMask = async () => {
  if (!isMetaMaskInstalled()) {
    toast.error("MetaMask is not installed. Please install to continue.");
    throw new Error("MetaMask is not installed");
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found");
    }

    // Get the current network
    const network = await provider.getNetwork();

    return {
      address: accounts[0],
      chainId: network.chainId,
    };
  } catch (error) {
    console.error("MetaMask connection error:", error);
    if (error.code === 4001) {
      // User rejected request
      toast.error("MetaMask connection rejected. Please try again.");
      throw new Error("User rejected connection");
    } else {
      toast.error("Failed to connect to MetaMask");
      throw error;
    }
  }
};

/**
 * Requests a nonce from the server for authentication
 */
export const requestAuthNonce = async (walletAddress) => {
  try {
    const response = await axios.post("/api/v1/wallet/nonce", {
      walletAddress,
    });

    return response.data.data;
  } catch (error) {
    console.error("Error requesting nonce:", error);
    toast.error(
      error.response?.data?.message || "Failed to request authentication nonce"
    );
    throw error;
  }
};

/**
 * Signs a message using MetaMask
 */
export const signMessage = async (message) => {
  if (!isMetaMaskInstalled()) {
    toast.error("MetaMask is not installed");
    throw new Error("MetaMask is not installed");
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    return signature;
  } catch (error) {
    console.error("Error signing message:", error);
    if (error.code === 4001) {
      toast.error("Message signing rejected. Please try again.");
      throw new Error("User rejected signing");
    } else {
      toast.error("Failed to sign message with MetaMask");
      throw error;
    }
  }
};

/**
 * Verifies a signed message with the server and authenticates the user
 */
export const verifyWalletSignature = async (walletAddress, signature) => {
  try {
    const response = await axios.post("/api/v1/wallet/verify", {
      walletAddress,
      signature,
    });

    // Check if there was an issue with the response
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || "Authentication failed");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error verifying wallet signature:", error);
    toast.error(
      error.response?.data?.message || "Failed to authenticate with wallet"
    );
    throw error;
  }
};

/**
 * Connects a wallet to an existing authenticated account
 */
export const connectWalletToAccount = async (walletAddress, signature) => {
  try {
    const response = await axios.post("/api/v1/wallet/connect", {
      walletAddress,
      signature,
    });

    return response.data.data;
  } catch (error) {
    console.error("Error connecting wallet to account:", error);
    toast.error(
      error.response?.data?.message || "Failed to connect wallet to account"
    );
    throw error;
  }
};

/**
 * Disconnects a wallet from an existing authenticated account
 */
export const disconnectWallet = async () => {
  try {
    const response = await axios.post("/api/v1/wallet/disconnect");
    return response.data.data;
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
    toast.error(error.response?.data?.message || "Failed to disconnect wallet");
    throw error;
  }
};

// Set up event listeners for MetaMask
export const setupMetaMaskListeners = (callback) => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        callback && callback({ type: "disconnected" });
      } else {
        // User switched accounts
        callback &&
          callback({
            type: "accountChanged",
            address: accounts[0],
          });
      }
    });

    window.ethereum.on("chainChanged", (chainId) => {
      // User switched networks
      callback &&
        callback({
          type: "networkChanged",
          chainId,
        });
    });
  }
};

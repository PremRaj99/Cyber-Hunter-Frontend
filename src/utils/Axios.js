import axios from "axios";
import { toast } from "react-toastify";

// Create axios instance with default config
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for passing cookies
});

// Add request interceptor to add auth token
instance.interceptors.request.use(
  (config) => {
    // Debug logging
    console.log(
      `Making ${config.method?.toUpperCase() || "GET"} request to ${config.url}`
    );

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("Added token to request headers");
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      const originalRequest = error.config;

      // Don't try to refresh token for the github/user endpoint if it fails
      // since we're likely in the authentication process
      const isGithubUserEndpoint =
        originalRequest.url.includes("/auth/github/user");

      if (refreshToken && !originalRequest._retry && !isGithubUserEndpoint) {
        originalRequest._retry = true;
        try {
          // Try to refresh the token
          const res = await instance.put("/api/v1/auth/refresh");

          if (res.data.success && res.data.data.accessToken) {
            localStorage.setItem("accessToken", res.data.data.accessToken);

            // Retry the original request with new token
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${res.data.data.accessToken}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Continue to logout logic below
        }
      }

      // Clear auth data if refresh failed or we're handling GitHub user endpoint error
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Show message to user
      toast.error("Your session has expired. Please login again.");

      // Redirect to login if not already there
      if (
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/auth/github")
      ) {
        window.location.href = "/auth/login";
      }
    }
    // Other error handling
    else if (error.response) {
      // Show error message for other response errors
      const message = error.response.data?.message || "An error occurred";
      toast.error(message);
    } else if (error.request) {
      // The request was made but no response was received
      // toast.error("Network error. Please check your connection.");
    } else {
      // Something happened in setting up the request
      toast.error("An error occurred while processing your request");
    }

    return Promise.reject(error);
  }
);

// Add a method to handle logout specifically
instance.logout = async () => {
  try {
    const response = await instance.post(
      "/api/v1/auth/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Clear local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    // Clear storage anyway to ensure user is logged out on client side
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    throw error;
  }
};

export default instance;

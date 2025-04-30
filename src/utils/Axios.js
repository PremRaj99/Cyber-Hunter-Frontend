import axios from "axios";

// Create Axios instance with base URL and default config
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor to automatically add auth token
instance.interceptors.request.use(
  (config) => {
    // Get token from localStorage and add to headers if available
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for global error handling
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Handle 401 Unauthorized errors (e.g., token expired)
      if (error.response.status === 401) {
        // You could redirect to login or refresh token here
        console.error("Authentication error:", error.response.data);
      }

      // Handle 400 Bad Request with specific messaging
      if (error.response.status === 400) {
        console.error("Bad Request:", error.response.data);
        // Check if it's the specific "Invalid user ID" error
        if (error.response.data?.message?.includes("Invalid user ID")) {
          console.error("User ID validation error - check for undefined IDs");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

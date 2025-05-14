import axios from "axios";
import { store } from "../redux/store";
import { signOutUserSuccess } from "../redux/User/userSlice";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Request Interceptor
Axios.interceptors.request.use(
  (config) => {
    // Add Authorization token before every request
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
let isRefreshing = false;
Axios.interceptors.response.use(
  (response) => response, // Return the response if successful
  async (error) => {
    const originalRequest = error.config;

    const isGithubUserEndpoint =
        originalRequest.url.includes("/auth/github/user");
    if (error.response?.status === 401 && !originalRequest._retry && !isGithubUserEndpoint) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            throw new Error("No refresh token found");
          }

          // console.log("Refreshing token...");

          const response = await Axios.put("/api/v1/auth/refresh", {
            refreshToken,
          });

          if (!response.data?.success) {
            throw new Error("Refresh token expired or invalid");
          }

          const { accessToken, refreshToken: newRefreshToken } =
            response.data.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          Axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          onRefreshed(accessToken);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          store.dispatch(signOutUserSuccess());
          window.location.replace("/auth/login");
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          resolve(Axios(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default Axios;

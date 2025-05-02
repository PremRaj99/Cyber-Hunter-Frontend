import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { router } from "./config/Routes";
import Preloader from "./components/Common/Preloader";
import './App.css';
import { useNotifications } from './context/NotificationContext';

export default function App() {
  const [loading, setLoading] = useState(true);
  const { fetchNotifications } = useNotifications();
  // Get current user from Redux store
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Effect to fetch notifications when user is authenticated
  useEffect(() => {
    // Get the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // If user is authenticated, fetch notifications
    if (currentUser?._id && accessToken) {
      // Fetch initial notifications
      try {
        fetchNotifications(1);
      } catch (error) {
        console.error("Error initializing notifications:", error);
      }
    }
  }, [currentUser, fetchNotifications]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
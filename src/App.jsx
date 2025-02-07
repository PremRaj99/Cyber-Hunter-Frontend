// App.jsx
import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/Routes";
import Preloader from "./components/Common/Preloader";
import './App.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <RouterProvider router={router} />;
}
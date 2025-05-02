/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export const AuthGuard = ({ children }) => {
  const { currentUser, isProfileComplete } = useSelector((state) => state.user);
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log('Auth Guard State:', {
      currentUser: !!currentUser,
      isProfileComplete,
      pathname: location.pathname,
      walletConnected: currentUser?.walletConnected
    });
    setIsChecking(false);
  }, [currentUser, isProfileComplete, location]);

  if (isChecking) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Only redirect to userdetails if profile is not complete and we're not already on the userdetails page
  // Also check if we're coming from a wallet connection to prevent redirect loops
  if (!isProfileComplete && location.pathname !== '/auth/userdetails') {
    console.log('Redirecting to userdetails - Profile not complete');
    return <Navigate to="/auth/userdetails" replace />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const { currentUser, isProfileComplete } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    console.log('Public Route State:', {
      currentUser: !!currentUser,
      isProfileComplete,
      walletConnected: currentUser?.walletConnected
    });
  }, [currentUser, isProfileComplete]);

  if (currentUser) {
    if (!isProfileComplete) {
      return <Navigate to="/auth/userdetails" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
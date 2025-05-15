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

  // Add check for 2FA authenticated users
  // If user has just completed 2FA (has tokens) but profile isn't loading correctly,
  // we should allow them to access dashboard without redirecting to userdetails
  const hasAuthTokens = !!localStorage.getItem("accessToken") && !!localStorage.getItem("refreshToken");
  const isExistingUser = currentUser?._id && currentUser?.email && !currentUser?.isNewUser;

  if (!isProfileComplete && location.pathname !== '/auth/userdetails') {
    // Allow access to dashboard if the user appears to be an existing authenticated user
    if (isExistingUser && hasAuthTokens) {
      console.log('Existing user detected with tokens - allowing dashboard access');
      return children;
    }

    console.log('Redirecting to userdetails - Profile not complete');
    return <Navigate to="/auth/userdetails" replace />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const { currentUser, isProfileComplete } = useSelector((state) => state.user);
  const location = useLocation();

  // Same check for PublicRoute to ensure consistent behavior
  const hasAuthTokens = !!localStorage.getItem("accessToken") && !!localStorage.getItem("refreshToken");
  const isExistingUser = currentUser?._id && currentUser?.email && !currentUser?.isNewUser;

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
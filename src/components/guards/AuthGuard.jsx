import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export const AuthGuard = ({ children }) => {
  const { currentUser, isProfileComplete } = useSelector((state) => state.user);
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log('Auth Guard State:', { currentUser, isProfileComplete, pathname: location.pathname });
    setIsChecking(false);
  }, [currentUser, isProfileComplete, location]);

  if (isChecking) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Only redirect to userdetails if profile is not complete and we're not already on the userdetails page
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
    console.log('Public Route State:', { currentUser, isProfileComplete });
  }, [currentUser, isProfileComplete]);

  if (currentUser) {
    if (!isProfileComplete) {
      return <Navigate to="/auth/userdetails" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
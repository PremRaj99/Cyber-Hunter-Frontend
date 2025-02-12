import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileCompleteGuard = ({ children }) => {
  const { isProfileComplete } = useSelector((state) => state.user);
  const location = useLocation();

  // Only redirect if profile is complete and we're on userdetails page
  if (isProfileComplete && location.pathname.includes('userdetails')) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default ProfileCompleteGuard;
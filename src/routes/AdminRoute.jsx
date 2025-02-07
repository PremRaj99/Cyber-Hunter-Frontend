import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return children;
};

export default AdminRoute;
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const AuthLayout = () => {
  const { currentUser, isNewUser } = useSelector((state) => state.user);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  // Redirect to userdetails if user is new
  if (currentUser && isNewUser) {
    return <Navigate to="/userdetails" replace state={{ from: location }} />;
  }

  // Redirect authenticated users away from auth pages
  if (currentUser && !location.pathname.includes('userdetails')) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="auth-layout">
      <Header />
      <main className="auth-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
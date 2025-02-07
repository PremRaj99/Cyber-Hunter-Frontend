import { Outlet } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const AuthLayout = () => {
  const { currentUser, isNewUser } = useSelector((state) => state.user);
  const location = useLocation();

  // Redirect to userdetails if user is new (just signed up)
  if (currentUser && isNewUser) {
    return <Navigate to="/userdetails" replace state={{ from: location }} />;
  }

  // // Redirect to dashboard if user is already logged in
  // if (currentUser && !location.pathname.includes('userdetails')) {
  //   return <Navigate to="/dashboard" replace state={{ from: location }} />;
  // }

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
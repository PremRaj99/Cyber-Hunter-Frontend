// layouts/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/Common/ScrollToTop";

const Layout = () => {
  const location = useLocation();

  // Routes where footer should not appear
  const routesWithoutFooter = [
    '/dashboard',
    '/accountSetting',
    '/profile',
    '/ProfileSetting',
    '/teamsetting',
    '/projectdetail',
    '/Addproject',
    '/Viewproject',
    '/postproject',
    '/projectlist',
    '/personselection',
    '/leaderboard',
    '/projects',
    '/freelancer',
  ];

  const shouldShowFooter = !routesWithoutFooter.includes(location.pathname);

  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}
    </>
  );
};

export default Layout;
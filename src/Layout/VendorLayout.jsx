import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const FreelancerLayout = () => {
  return (
    <div className="freelancer-layout">
      <Header />
      <main className="freelancer-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default FreelancerLayout;
import { Outlet } from "react-router-dom";
import Dashboard from "../../src/pages/Dashboard";
import Header from "../components/header/Header";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-layout">
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div >
  );
}

export default DashboardLayout;
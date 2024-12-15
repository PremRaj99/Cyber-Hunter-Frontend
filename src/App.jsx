import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// components of navigation
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import CreatePassword from "./pages/CreatePassword";
import ForgetPassword from "./pages/ForgetPassword";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Project from "./pages/Project";
import ProjectSearch from "./pages/ProjectSearch";
import Team from "./pages/Team";
import UserDetail from "./pages/UserDetail";
import VerifyOTP from "./pages/VerifyOTP";
import Profile from "./pages/Profile";
import Course from "./pages/Course";
import Event from "./pages/Event";
import Service from "./pages/Service";
import ServiceItem from "./components/Service/ServiceItem";
import Addproject from "./pages/Addproject";
import Teamselection from "./pages/Teamselection";
import Viewproject from "./pages/Viewproject";
import Personselection from "./pages/Personselection";
import EventDetail from "./pages/EventDetail";
import CreateTeam from "./pages/CreateTeam";
import ProfileSetting from "./pages/ProfileSetting";
import Freelancer from "./pages/Freelancer";
import VendorLogin from "./pages/VendorLogin";
import PostProject from "./pages/PostProject";
import ProjectList from "./pages/ProjectList";
import ProjectDetail from "../src/components/Freelancer/ProjectDetail";
import VerifyAchievement from "./pages/VerifyAchievement";
import OurTeam from "./pages/OurTeam";
import DAccountSetting from "./components/dashboard/dAccountSetting"

//manik home page 
import './App.css';
import About from "./components/home/About";
import Preloader from "./components/Common/Preloader";
import TeamSetting from "./pages/TeamSetting";
import ScrollToTop from "./components/Common/ScrollToTop";
import VendorForm from "./components/Freelancer/VendorForm";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust this value to control how long the preloader is shown

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Header />
          <ScrollToTop />
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accountSetting" element={<DAccountSetting />} />
            <Route path="/createpassword" element={<CreatePassword />} />
            <Route path="/event" element={<Event />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/project" element={<Project />} />
            <Route path="/projectsearch" element={<ProjectSearch />} />
            <Route path="/team" element={<Team />} />
            <Route path="/userdetail" element={<UserDetail />} />
            <Route path="/verifyotp" element={<VerifyOTP />} />
            <Route path="/course" element={<Course />} />
            <Route path="/service" element={<Service />} />
            <Route path="/service/:id" element={<ServiceItem />} />
            <Route path="/Addproject" element={<Addproject />} />
            <Route path="/Viewproject" element={<Viewproject />} />
            <Route path="/Teamselection" element={<Teamselection />} />
            <Route path="/Personselection" element={<Personselection />} />
            <Route path="/EventDetail" element={<EventDetail />} />
            <Route path="/CreateTeam" element={<CreateTeam />} />
            <Route path="/ProfileSetting" element={<ProfileSetting />} />
            <Route path="/freelancer" element={<Freelancer />} />
            <Route path="/vendorlogin" element={<VendorLogin />} />
            <Route path="/postproject" element={<PostProject />} />
            <Route path="/projectlist" element={<ProjectList />} />
            <Route path="/projectdetail" element={<ProjectDetail />} />
            <Route path="/ourteam" element={<OurTeam />} />
            <Route path="/verifyachievement" element={<VerifyAchievement />} />
            <Route path="/teamsetting" element={<TeamSetting />} />
            <Route path="/Vendorform" element={<VendorForm />} />
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

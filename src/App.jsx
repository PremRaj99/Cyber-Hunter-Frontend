// import React from "react";
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

//manik home page 
import './App.css';

export default function App() {

  return (
    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
        <Route path="/Addproject" element={<Addproject/>} />
        <Route path="/Viewproject" element={<Viewproject/>} />
        <Route path="/Teamselection" element={<Teamselection/>} />
        <Route path="/Personselection" element={<Personselection />} />
        <Route path="/EventDetail" element={<EventDetail />} />
        <Route path="/CreateTeam" element={<CreateTeam />} />
        <Route path="/ProfileSetting" element={<ProfileSetting />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

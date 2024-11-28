import React from "react";
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
//manik home page 
import './App.css'
import AddProject from "./pages/AddProject";
import AddProject2 from "./pages/AddProject2";
import AddProject3 from "./pages/AddProject3";
import Description from "./pages/Description";
import EventPage from "./pages/EventPage";
import HackathonEvent2 from "./pages/HackathonEvent2";
import HackathonEvents from "./pages/HackathonEvents";

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
        <Route path="/addproject" element={<AddProject />} />
        <Route path="/addproject2" element={<AddProject2/>} />
        <Route path="/addproject3" element={<AddProject3 />} />
        <Route path="/description" element={<Description />} />
        <Route path="/eventpage" element={<EventPage />} />
        <Route path="/hackathonevent2" element={<HackathonEvent2 />} />
        <Route path="/hackathonevents" element={<HackathonEvents />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

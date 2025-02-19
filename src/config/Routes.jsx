import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AuthLayout from "../Layout/AuthLayout";
import ErrorPage from "../components/Common/Error";
import Home from "../../src/pages/Home";
import Login from "../../src/pages/Login";
import ForgotPassword from "../../src/pages/ForgetPassword";
import VerifyOTP from "../../src/pages/VerifyOTP";
import Profile from "../../src/pages/Profile";
import ProjectList from "../../src/pages/ProjectList";
import PostProject from "../../src/pages/PostProject";
import ProjectDetail from "../../src/pages/Project";
import Team from "../pages/Team";
import CreateTeam from "../../src/pages/CreateTeam";
import About from "../components/home/About";
import Service from "../../src/pages/Service";
import Contact from "../components/home/Contact";
import Leaderboard from "../../src/pages/Leaderboard";
import Event from "../../src/pages/Event";
import EventDetail from "../../src/pages/EventDetail";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../../src/pages/Dashboard";
import UserDetail from "../../src/pages/UserDetail";
import AddProject from "../../src/pages/Addproject";
import ViewProject from "../../src/pages/Viewproject";
import VerifyAchievement from "../../src/pages/VerifyAchievement";
import TeamSetting from "../../src/pages/TeamSetting";
import ProfileSetting from "../../src/pages/ProfileSetting";
import FreelancerLayout from "../Layout/VendorLayout";
import Freelancer from "../pages/Freelancer";
import { AuthGuard, PublicRoute } from '../components/guards/AuthGuard';
import EditProject from "../pages/EditProject";
import DAccountSetting from "../components/dashboard/dAccountSetting";
import TeamChat from "../components/Team/TeamChat";
import TeamManageSettings from "../components/Team/TeamManageSettings";
import AccountAccessPage from "../pages/AccountAccess";
import EmailSettings from "../pages/EmailSettings";
import ChangePassword from "../pages/ChangePassword";
import Policy from "../pages/Policy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "service",
        element: <Service />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "event",
        element: <Event />,
      },
      {
        path: "eventdetail",
        element: <EventDetail />,
      },
      {
        path: "policy",
        element: <Policy />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <PublicRoute><Login /></PublicRoute>,
      },
      {
        path: "forgot",
        element: <PublicRoute><ForgotPassword /></PublicRoute>,
      },
      {
        path: "verify-otp",
        element: <PublicRoute><VerifyOTP /></PublicRoute>,
      },
      {
        path: "userdetails",
        element: <AuthGuard><UserDetail /></AuthGuard>,
      },
      {
        path: "userdetails",
        element: <AuthGuard><UserDetail /></AuthGuard>,
      }
    ],
  },
  {
    path: "/dashboard",
    element: <AuthGuard><DashboardLayout /></AuthGuard>,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "profilesetting",
        element: <ProfileSetting />,
      },
      {
        path: "achievement",
        element: <VerifyAchievement />,
      },
      {
        path: "account",
        element: <DAccountSetting />,
      },
      {
        path: "email",
        element: <EmailSettings />,
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            element: <Profile />,
          },
          {
            path: "personalachivement",
            element: <VerifyAchievement />,
          },
          {
            path: "setting",
            element: <ProfileSetting />,
          },
          {
            path: "account",
            element: <AccountAccessPage />,
          },
          {
            path: "changepassword",
            element: <ChangePassword />
          }
          
        ],
      },
      {
        path: "project",
        children: [
          {
            path: "",
            element: <ViewProject />,
          },
          {
            path: ":id",
            element: <ProjectDetail />,
          },
          {
            path: "add",
            element: <AddProject />,
          },
          {
            path: "view",
            element: <ViewProject />,
          },
          {
            path: "edit/:id", 
            element: <EditProject />,
          },
        ],
      },
      {
        path: "team",
        children: [
          {
            path: "",
            element: <Team />,
          },
          {
            path: "addteamproject",
            element: <AddProject />,
          },
          {
            path: "viewteamproject",
            element: <ViewProject />,
          },
          {
            path: "teamsetting",
            element: <TeamManageSettings />,
          },
          {
            path: "create",
            element: <CreateTeam />,
          },
          {
            path: "createteam",
            element: <CreateTeam />,
          },
          {
            path: "chat",
            element: <TeamChat />,
          },
        ],
      },
    ],
  },
  {
    path: "/freelancer",
    element: <AuthGuard><FreelancerLayout /></AuthGuard>,
    children: [
      {
        path: "",
        element: <Freelancer />,
      },
      {
        path: "projects",
        element: <ProjectList />,
      },
      {
        path: "post",
        element: <PostProject />,
      },
    ],
  },
]);
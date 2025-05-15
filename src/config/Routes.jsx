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
// import Service from "../../src/pages/Service";
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
import ProfileSetting from "../../src/pages/ProfileSetting";
import FreelancerLayout from "../Layout/VendorLayout";
import Freelancer from "../pages/Freelancer";
import { AuthGuard, PublicRoute } from '../components/guards/AuthGuard';
import EditProject from "../pages/EditProject";
import DAccountSetting from "../components/dashboard/dAccountSetting";
// import TeamChat from "../components/Team/TeamChat";
import AccountAccessPage from "../pages/AccountAccess";
import EmailSettings from "../pages/EmailSettings";
import ChangePassword from "../pages/ChangePassword";
import Policy from "../pages/Policy";
import VendorLogin from "../pages/VendorLogin";
import OurTeam from "../pages/OurTeam";
import AddTeamProject from "../pages/AddTeamProject";
import ViewTeamProject from "../pages/ViewTeamProject";
import EditTeamProject from "../pages/EditTeamProject";
import TeamInvitationsPage from "../pages/TeamInvitationsPage";
import TeamBrowse from "../pages/TeamBrowse";
import TeamSettings from "../pages/TeamSetting";
import GitHubAuthSuccess from '../pages/GitHubAuthSuccess';
import About from "../pages/About";
import VerifyTwoFactor from "../pages/VerifyTwoFactor";

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
        path: "freelancer",
        element: <Freelancer />,
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
      {
        path: "Verify",
        element: <VerifyAchievement />,
      },
      {
        path: "ourteam",
        element: <OurTeam />,
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
        path: "verifyOtp",
        element: <PublicRoute><VerifyOTP /></PublicRoute>,
      },
      {
        path: "verify",
        element: <PublicRoute><VerifyTwoFactor /></PublicRoute>,
      },
      {
        path: "userdetails",
        element: <AuthGuard><UserDetail /></AuthGuard>,
      },
      {
        path: "userdetails",
        element: <AuthGuard><UserDetail /></AuthGuard>,
      },
      {
        path: "github/success",
        element: <GitHubAuthSuccess />,
      },
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
            path: "addproject",
            element: <AddTeamProject />,
          },
          {
            path: "viewproject",
            element: <ViewTeamProject />,
          },
          {
            path: "editproject/:id",
            element: <EditTeamProject />,
          },
          {
            path: "teamsetting",
            element: <TeamSettings />,
          },
          {
            path: "viewrequest",
            element: <TeamInvitationsPage />,
          },
          {
            path: "browse",
            element: <TeamBrowse />,
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
      {
        path: "login",
        element: <VendorLogin />,
      },
    ],
  },
]);
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import OverviewPage from "./pages/dashboard/OverviewPage";
import TestPage from "./pages/test/TestPage";
import ReportPage from "./pages/report/ReportPage";
import AboutPage from "./pages/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: "patients",
        element: <div className="p-4">Patients List (Placeholder)</div>,
      },
      {
        path: "reports",
        element: <div className="p-4">Reports List (Placeholder)</div>,
      },
    ],
  },
  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "/report/:id",
    element: <ReportPage />,
  },
]);

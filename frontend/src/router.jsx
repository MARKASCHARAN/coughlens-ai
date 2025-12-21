import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import OverviewPage from "./pages/dashboard/OverviewPage";
import PatientListPage from "./pages/patients/PatientListPage";
import PatientProfilePage from "./pages/patients/PatientProfilePage";
import ReportHistoryPage from "./pages/report/ReportHistoryPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import LearnPage from "./pages/learn/LearnPage";
import SettingsPage from "./pages/settings/SettingsPage";
import CoughTestPage from "./pages/test/CoughTestPage";
import ReportResultPage from "./pages/report/ReportResultPage";
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
        element: <PatientListPage />,
      },
      {
        path: "patients/:id",
        element: <PatientProfilePage />,
      },
      {
        path: "reports",
        element: <ReportHistoryPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "learn",
        element: <LearnPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "/test/cough",
    element: <CoughTestPage />,
  },
  // Redirect old /test to /test/cough for now or handle as separate
  {
    path: "/test",
    element: <CoughTestPage />, 
  },
  {
    path: "/reports/:id",
    element: <ReportResultPage />,
  },
  // Handle /report/:id legacy if needed, or update legacy links
  {
    path: "/report/:id",
    element: <ReportResultPage />,
  }
]);

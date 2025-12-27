import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ProfileCompletionPage from "./pages/auth/ProfileCompletionPage";
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
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
      path: "/profile/complete",
      element: <ProtectedRoute><ProfileCompletionPage /></ProtectedRoute>
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: "patients",
        element: <ProtectedRoute roles={["ASHA_WORKER", "CLINICIAN"]}><PatientListPage /></ProtectedRoute>,
      },
      {
        path: "patients/:id",
        element: <ProtectedRoute roles={["ASHA_WORKER", "CLINICIAN"]}><PatientProfilePage /></ProtectedRoute>,
      },
      {
        path: "reports",
        element: <ReportHistoryPage />,
      },
      {
        path: "analytics",
        element: <ProtectedRoute roles={["CLINICIAN"]}><AnalyticsPage /></ProtectedRoute>,
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
    element: <ProtectedRoute><CoughTestPage /></ProtectedRoute>,
  },
  {
    path: "/test",
    element: <Navigate to="/test/cough" replace />, 
  },
  {
    path: "/reports/:id",
    element: <ProtectedRoute><ReportResultPage /></ProtectedRoute>,
  },
  {
    path: "/report/:id",
    element: <Navigate to="/reports/:id" replace />,
  }
]);

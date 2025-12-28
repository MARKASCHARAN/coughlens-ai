import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function ProtectedRoute({ children, roles = [] }) {
    const { user, isLoading } = useUser();
    const location = useLocation();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading...</div>;
    }

    // 1. Check Authentication
    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // 2. Check Profile Completion (INDIVIDUAL only)
    if (user.role === "INDIVIDUAL") {
        const isProfilePage = location.pathname === "/profile/complete";
        
        if (!user.profile_completed && !isProfilePage) {
            return <Navigate to="/profile/complete" replace />;
        }

        if (user.profile_completed && isProfilePage) {
            return <Navigate to="/dashboard" replace />;
        }
    }

    // 3. Check Role (if roles are specified)
    if (roles.length > 0 && !roles.includes(user.role)) {
        // Unauthorized role - Redirect to dashboard home or error page
        // For now, redirect to their allowed dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

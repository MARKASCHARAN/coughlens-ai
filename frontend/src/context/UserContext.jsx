import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Check storage before deciding not logged in
    const [authStep, setAuthStep] = useState("EMAIL"); // EMAIL | OTP

    useEffect(() => {
        // Check for existing token on load
        const token = localStorage.getItem("access_token");
        const storedRole = localStorage.getItem("role");
        
        if (token && storedRole) {
            // Already loading
            
            // Fetch fresh data
            authService.getProfile()
                .then(data => {
                    // Only set user once we have full profile data (including profile_completed)
                    setUser({ role: storedRole, token, ...data });
                })
                .catch(err => {
                    console.error("Failed to restore session", err);
                    // Fallback: if 401, likely expired. But for now keep behavior or logout.
                    // If error is 401, logout?
                    if (err.response && err.response.status === 401) {
                         localStorage.removeItem("access_token");
                         localStorage.removeItem("role");
                         setUser(null);
                    } else {
                        setUser({ role: storedRole, token });
                    }
                })
                .finally(() => {
                    setIsLoading(false); // Stop loading regardless of success/fail
                });
        } else {
             setIsLoading(false); // No token, ready to render
        }
    }, []);

    const requestOtp = async (email, role) => {
        setIsLoading(true);
        try {
            await authService.requestOtp(email, role);
            setAuthStep("OTP");
            return true;
        } catch (error) {
            console.error("OTP Request Failed", error);
            // In a real app, toast notification here
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOtp = async (email, otp) => {
        setIsLoading(true);
        try {
            const data = await authService.verifyOtp(email, otp);
            // data: { access_token, role }
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("role", data.role);

                // Use the profile_completed flag from backend if available
                let fullUser = { 
                    role: data.role, 
                    token: data.access_token,
                    profile_completed: data.profile_completed 
                };
                
                // Fetch full profile immediately
                try {
                     const profileData = await authService.getProfile();
                     // Merge, allowing backend profile record to override if needed
                     fullUser = { ...fullUser, ...profileData };
                } catch (e) {
                     console.warn("Could not fetch profile on login", e);
                }

                setUser(fullUser);
                return fullUser;
            }
            return false;
        } catch (error) {
            console.error("OTP Verification Failed", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const completeProfile = async (profileData) => {
        setIsLoading(true);
        try {
            const data = await authService.completeProfile(profileData);
            // The backend returns the updated user object with profile
            // Based on logs: { _id, role, auth, profile: {...}, role_profile: {...} }
            
            // Refresh user state
            setUser(prev => ({ ...prev, ...data }));
            return true;
        } catch (error) {
            console.error("Profile Completion Failed", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        setUser(null);
        setAuthStep("EMAIL");
    };

    return (
        <UserContext.Provider value={{ user, isLoading, requestOtp, verifyOtp, completeProfile, logout, authStep, setAuthStep }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

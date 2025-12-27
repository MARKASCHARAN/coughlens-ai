import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [authStep, setAuthStep] = useState("EMAIL"); // EMAIL | OTP

    useEffect(() => {
        // Check for existing token on load
        const token = localStorage.getItem("access_token");
        const storedRole = localStorage.getItem("role");
        if (token && storedRole) {
            // Optimistically set basic user
            setUser({ role: storedRole, token });
            
            // Fetch fresh data
            authService.getProfile()
                .then(data => {
                    setUser(prev => ({ ...prev, ...data }));
                })
                .catch(err => {
                    console.error("Failed to restore session", err);
                    // Optionally logout if 401?
                });
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

                let fullUser = { role: data.role, token: data.access_token };
                
                // Fetch full profile immediately
                try {
                     const profileData = await authService.getProfile();
                     fullUser = { ...profileData, token: data.access_token, role: data.role };
                     setUser(fullUser);
                } catch (e) {
                     console.warn("Could not fetch profile on login", e);
                     setUser(fullUser);
                }

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

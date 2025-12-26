import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [authStep, setAuthStep] = useState("PHONE"); // PHONE | OTP

    useEffect(() => {
        // Check for existing token on load
        const token = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        if (token && storedRole) {
            setUser({ role: storedRole, token });
        }
    }, []);

    const requestOtp = async (phone, role) => {
        setIsLoading(true);
        try {
            await authService.requestOtp(phone, role);
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

    const verifyOtp = async (phone, otp) => {
        setIsLoading(true);
        try {
            const data = await authService.verifyOtp(phone, otp);
            // data: { access_token, token_type, role }
            if (data.access_token) {
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("role", data.role);
                setUser({ role: data.role, token: data.access_token });
                return true;
            }
            return false;
        } catch (error) {
            console.error("OTP Verification Failed", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null);
        setAuthStep("PHONE");
    };

    return (
        <UserContext.Provider value={{ user, isLoading, requestOtp, verifyOtp, logout, authStep, setAuthStep }}>
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

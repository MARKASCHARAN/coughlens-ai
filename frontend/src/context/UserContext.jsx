import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    // Mock initial user state
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (phone, otp) => {
        setIsLoading(true);
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: "u-123",
                    name: "Demo User",
                    role: "individual", // 'asha', 'clinician'
                    phone: phone,
                    prefs: { language: 'en', theme: 'light' }
                };
                setUser(mockUser);
                setIsLoading(false);
                resolve(mockUser);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, isLoading, login, logout }}>
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

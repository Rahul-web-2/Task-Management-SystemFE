import { createContext, useContext, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API;
const api = axios.create({
    baseURL: API,
    withCredentials: true
});


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const login = (userData) => {
        const safeUser = {
            id: userData.id,
            username: userData.name,
            email: userData.email
        };
        localStorage.setItem("user", JSON.stringify(safeUser));
        setUser(safeUser);
    };

    const logout = async () => {
        try {
            await api.post("/api/auth/logout"); // backend call
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            localStorage.removeItem("user");
            setUser(null);
        }
    };
 

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
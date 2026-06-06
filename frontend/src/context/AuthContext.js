import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
import { socket } from "../socket/socket";
import { getProfile } from "../api/profileApi";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");
            if (!token)
                return;
            try {
                const res = await getProfile();
                setUser(res.user);
                localStorage.setItem("user", JSON.stringify(res.user));
            }
            catch (error) {
                console.log("AUTH USER LOAD ERROR", error);
                localStorage.clear();
            }
        };
        loadUser();
    }, []);
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
    }, []);
    const login = (user, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };
    const updateUser = (newUser) => {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };
    const logout = () => {
        localStorage.clear();
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            login,
            logout,
            updateUser,
        }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthProvider missing");
    }
    return context;
};

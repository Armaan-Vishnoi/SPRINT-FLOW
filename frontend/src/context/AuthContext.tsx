import { createContext, useContext, useState, useEffect } from "react";

import type { ReactNode } from "react";

import { socket } from "../socket/socket";

import { getProfile } from "../api/profileApi";

interface AuthContextType {
  user: any;

  login: (user: any, token: string) => void;

  logout: () => void;

  updateUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const res = await getProfile();

        setUser(res.user);

        localStorage.setItem("user", JSON.stringify(res.user));
      } catch (error) {
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

  const login = (user: any, token: string) => {
    localStorage.setItem("token", token);

    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
  };

  const updateUser = (newUser: any) => {
    setUser(newUser);

    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    localStorage.clear();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        login,

        logout,

        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthProvider missing");
  }

  return context;
};

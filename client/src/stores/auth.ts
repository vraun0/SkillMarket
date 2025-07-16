import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  courseIds: string[],
  admin: true | false,
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: true | false,
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuth= create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated : false, 
  login: (token, user) => {
    localStorage.setItem("token", token);
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));



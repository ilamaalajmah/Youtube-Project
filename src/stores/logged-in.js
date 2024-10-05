import { create } from "zustand";

export const useLoggedIn = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')),
    setUser: (user) => set({ user }),
}));

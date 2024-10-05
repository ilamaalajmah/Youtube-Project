import { create } from "zustand";
export const useSidebarOpen = create((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
    toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
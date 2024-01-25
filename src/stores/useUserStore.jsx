import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            setUser: (user) => set({ user: user, isLoggedIn: true}),
            clearUser: () => set({ user: null, isLoggedIn: false}),
            }),
        {
        name: 'user',
        }
    )
);

export const useToken = () => useUserStore((state) => state.user?.token);

export const useUserActions = () => {
    const {setUser, clearUser} = useUserStore();
    return {setUser, clearUser};
}
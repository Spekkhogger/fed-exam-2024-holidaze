import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            token: null,
            setUser: (user) => set({ user: user, isLoggedIn: true, token: user.accessToken}),
            clearUser: () => set({ user: null, isLoggedIn: false}),
            setLoggedInStatus: (status) => set({ isLoggedIn: status }),
            isUserLoggedIn: () => set((state) => state.isLoggedIn),
            }),
        {
        name: 'user',
        }
    )
);

// To be determined
export const useToken = () => useUserStore((state) => state.user?.accessToken);
export const useRole = () => useUserStore((state) => state.user?.venueManager);


export const useUserActions = () => {
    const {setUser, clearUser} = useUserStore();
    return {setUser, clearUser};
}
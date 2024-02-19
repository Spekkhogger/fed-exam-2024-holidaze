import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            token: null,
            setUser: (user) => set({ user: user, isLoggedIn: true, token: user.accessToken}),
            clearUser: () => set({ user: null, isLoggedIn: false, token: null}),
            setLoggedInStatus: (status) => set({ isLoggedIn: status }),
            isUserLoggedIn: () => set((state) => state.isLoggedIn),
            }),
        {
        name: 'user',
        }
    )
);


export const useToken = () => useUserStore((state) => state.user?.accessToken);
export const useRole = () => useUserStore((state) => state.user?.venueManager);
export const useUser = () => useUserStore((state) => state.user);

export const useUserActions = () => {
    const {setUser, clearUser} = useUserStore();
    return {setUser, clearUser};
}
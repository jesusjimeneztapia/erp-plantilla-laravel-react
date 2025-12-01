import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: number;
    email: string;
    name: string;
}

interface AuthState {
    token?: string | null;
    user?: User | null;
    isAuthenticated: boolean;
    authenticate: (token: string, user: User) => void;
    unauthenticate: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            authenticate: (token, user) => {
                set({ token, user, isAuthenticated: true });
            },
            unauthenticate: () => {
                set({ token: null, user: null, isAuthenticated: false });
            },
        }),
        { name: "auth" }
    )
);

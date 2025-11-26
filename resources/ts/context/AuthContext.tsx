"use client";

import type { FC, ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Auth = {
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
};

type AuthContextType = {
    auth?: Auth | null;
    authenticate: (auth: Auth) => void;
    unauthenticate: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function isAuth(auth: any): boolean {
    return (
        typeof auth === "object" &&
        !!auth &&
        typeof auth.token === "string" &&
        !!auth.token &&
        typeof auth.user === "object" &&
        !!auth.user
    );
}

function parseAuth(raw: string | null): Auth | null {
    if (raw) {
        try {
            const auth = JSON.parse(raw) as any;
            if (isAuth(auth)) {
                return auth as Auth;
            }
        } catch (error) {}
    }
    return null;
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<Auth | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedAuth = parseAuth(localStorage.getItem("auth"));
        setAuth(savedAuth);
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("auth", JSON.stringify(auth));
        }
    }, [auth, isInitialized]);

    const authenticate = (auth: Auth) => {
        setAuth(auth);
    };

    const unauthenticate = () => {
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, authenticate, unauthenticate }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthContext");
    }
    return context;
};

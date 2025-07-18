"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { loginUser, logoutUser, getCurrentUser } from "../App/lib/api"

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        loadUser();
    }, [])

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const userData = await loginUser(email, password);
            setUser(userData);
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        setIsLoading(true);
        try {
            await logoutUser();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider
            value = {{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
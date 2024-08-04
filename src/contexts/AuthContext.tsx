// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
    accessToken: string | null;
    refreshToken: string | null;
    email: string | null;
    password: string | null;
    setAccessToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
    setEmailState: (email: string | null) => void;
    setPasswordState: (password: string | null) => void;
    setAuthData: (data: { accessToken: string | null, refreshToken: string | null, email: string | null, password: string | null }) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token'));
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refresh_token'));
    const [email, setEmailState] = useState<string | null>(localStorage.getItem('saved_email'));
    const [password, setPasswordState] = useState<string | null>(localStorage.getItem('saved_password'));
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            navigate('/me');
        }
    }, [accessToken, navigate]);

    const setAuthData = (data: { accessToken: string | null, refreshToken: string | null, email: string | null, password: string | null }) => {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setEmailState(data.email);
        setPasswordState(data.password);
        // Сохранение в localStorage (по необходимости)
        if (data.accessToken) localStorage.setItem('access_token', data.accessToken);
        if (data.refreshToken) localStorage.setItem('refresh_token', data.refreshToken);
        if (data.email) localStorage.setItem('saved_email', data.email);
        if (data.password) localStorage.setItem('saved_password', data.password);
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, email, password, setAccessToken, setRefreshToken, setEmailState, setPasswordState, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

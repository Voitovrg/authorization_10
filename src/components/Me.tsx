import React, {useEffect, useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import '../style/App.css';
import {useNavigate} from "react-router-dom";

const shortenText = (text: string, startLength: number, endLength: number): string => {
    if (text.length <= startLength + endLength) {
        return text;
    }
    const start = text.substring(0, startLength);
    const end = text.substring(text.length - endLength);
    return `${start}.....${end}`;
};

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert('Text copied to clipboard');
        })
        .catch((err) => {
            console.error('Failed to copy text: ', err);
        });
};

const refreshAccessToken = async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | null> => {
    try {
        const response = await axios.post(
            'http://142.93.134.108:1111/refresh',
            null,
            {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                } as Record<string, string> // Типизация заголовков
            }
        );

        const newAccessToken = response.data.body.access_token;
        const newRefreshToken = response.data.body.refresh_token;

        // Сохраните новый токен в хранилище
        localStorage.setItem('access_token', newAccessToken);
        localStorage.setItem('refresh_token', newRefreshToken);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
        console.error('Error refreshing tokens:', error);
        return null;
    }
};

const Me: React.FC = () => {
    const { accessToken: initialAccessToken, refreshToken: initialRefreshToken, email, password } = useAuth();
    const [accessToken, setAccessToken] = useState<string>(initialAccessToken || '');
    const [refreshTokenState, setRefreshTokenState] = useState<string>(initialRefreshToken || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            // Если нет токена, перенаправляем на страницу входа
            navigate('/');
        }
    }, [accessToken, navigate]);

    const handleSignOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('saved_email');
        localStorage.removeItem('saved_password');
        navigate('/'); // Перенаправляем на страницу входа
    };

    const handleRefreshToken = async () => {
        if (refreshTokenState) {
            const result = await refreshAccessToken(refreshTokenState);
            if (result) {
                console.log('Tokens updated successfully:', result);
                setAccessToken(result.accessToken); // Обновите состояние с новым access token
                setRefreshTokenState(result.refreshToken); // Обновите состояние с новым refresh token
            } else {
                console.log('Failed to update tokens.');
            }
        }
    };

    return (
        <div className="App">
            <div className="container-MeBtn">
                <h1>Welcome to your profile page!</h1>
                <div className="container-Text">Email: {email}</div>
                <div className="container-Text">Password: {password}</div>
                <div className="container-Text">
                    <div className={'container-ATokens'}>Access Token:</div>
                    <div className="container-Tokens">{shortenText(accessToken || '', 30, 30)}</div>
                    <button onClick={() => copyToClipboard(accessToken || '')} className={'copy-button'}>Copy</button>
                </div>
                <div className="container-Text">
                    <button onClick={handleRefreshToken} className="refresh-button">Refresh Token</button>
                    <div className="container-Tokens">{shortenText(refreshTokenState || '', 30, 30)}</div>
                    <button onClick={() => copyToClipboard(refreshTokenState || '')} className={'copy-button'}>Copy</button>
                </div>

                <button onClick={handleSignOut} className={'MeBtn'}>Exit</button>
            </div>
        </div>
    );
};

export default Me;

import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Account from './components/Account';
import axios from 'axios';
import './style/App.css'

const App: React.FC = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = React.useState(false);

    React.useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setAuthenticated(true);
        } else {
            navigate('/sign-in');
        }
    }, [navigate]);

    axios.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://142.93.134.108:1111/refresh', { token: refreshToken });
                localStorage.setItem('accessToken', response.data.accessToken);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
                return axios(originalRequest);
            }
            return Promise.reject(error);
        }
    );

    return (
        <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/me" element={authenticated ? <Account /> : <Navigate to="/sign-in" />} />
            <Route path="*" element={<Navigate to="/me" />} />
        </Routes>
    );
};

export default App;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/styles.css';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }
        try {
            const response = await axios.post('http://142.93.134.108:1111/login', { email, password });
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            navigate('/me');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                navigate('/sign-up', { state: { email, password } });
            } else {
                setAuthError('Authentication failed. Please check your credentials.');
            }
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSignIn}>
                <h2>Sign in</h2>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError('');
                            setAuthError('');
                        }}
                        required
                    />
                </label>
                {emailError && <p>{emailError}</p>}
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setAuthError('');
                        }}
                        required
                    />
                </label>
                {authError && <p>{authError}</p>}
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
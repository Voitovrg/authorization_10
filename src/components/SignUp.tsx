import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import '../style/styles.css';

interface LocationState {
    email?: string;
    password?: string;
}

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const state = location.state as LocationState;
        if (state) {
            setEmail(state.email || '');
            setPassword(state.password || '');
        }
    }, [location.state]);

    const validateEmail = (email: string): boolean => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }
        try {
            await axios.post('http://142.93.134.108:1111/register', { email, password });
            navigate('/sign-in');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSignUp}>
                <h2>Sign Up</h2>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError('');
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
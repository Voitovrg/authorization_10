// src/components/SignIn.tsx

import React, { useState, ChangeEvent, FocusEvent, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthResponse } from '../types/AuthResponse'; // Импортируйте тип

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailDirty, setEmailDirty] = useState<boolean>(false);
    const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [passwordWrong, setPasswordWrong] = useState<boolean>(false)
    const [formValid, setFormValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [regOffer, setRegOffer] = useState<boolean>(false);
    const [validMessage, setValidMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (formValid) {
            setLoading(true);
            try {
                const response: AxiosResponse<AuthResponse> = await axios.post(
                    'http://142.93.134.108:1111/login',
                    null,
                    { params: { email, password } }
                );

                if (response.data.statusCode === 200) {
                    // Сохранение токенов
                    localStorage.setItem('access_token', response.data.body.access_token);
                    localStorage.setItem('refresh_token', response.data.body.refresh_token);
                    console.log('access_token');
                    console.log('refresh_token');
                    navigate('/me');
                }

                if (response.data.statusCode === 401) {
                    setValidMessage('User not found, please: ');
                    setRegOffer(true)
                }

                if (response.data.code === 1012) {
                    console.log('Password is wrong')
                    setPassword('')
                    setPasswordWrong(true)
                    setPasswordError('is wrong, try again')

                }
            } catch (error) {
                console.error('Error during sign-in:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (emailError || passwordError || email.length === 0 || password.length === 0) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError]);

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email');
        } else {
            setEmailError('');
        }
    };

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value.length < 3 || e.target.value.length > 15) {
            setPasswordError('Пароль должен быть не менее чем 3 символа и не больше 15 символов');
        } else if (!e.target.value) {
            setPasswordError(' cannot be empty');
        } else {
            setPasswordError('');
        }
    };

    const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
            default:
                break;
        }
    };

    return (
        <div className="SignIn">
            <form>
                <div className={'box-h1'}>
                    <h1>Sign in</h1>
                </div>
                <div className={'box-input'}>
                    <input
                        onChange={e => emailHandler(e)}
                        onBlur={e => blurHandler(e)}
                        className={`email ${emailDirty && emailError ? 'input-error' : ''}`}
                        type="email"
                        placeholder='email'
                        name='email'
                        value={email}
                    />
                    <input
                        onChange={e => passwordHandler(e)}
                        onBlur={e => blurHandler(e)}
                        className={`password ${passwordDirty && passwordError ? 'input-error' : ''}`}
                        type="password"
                        placeholder={`password ` + `${passwordWrong ? passwordError : ''}`}
                        name='password'
                        value={password}
                    />
                </div>
                <div className='box-Btn'>
                    <button onClick={handleSignIn} disabled={!formValid || loading} type='button' tabIndex={0}>
                        {loading ? 'Loading...' : 'LOG IN'}
                    </button>
                </div>
                <div className={'box-register'}>
                    <p>{regOffer ? `${validMessage} ` : `Don't have an account? `}
                        <Link to="/register">Register</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignIn;

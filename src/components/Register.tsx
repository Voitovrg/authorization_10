import React, { useState, ChangeEvent, FocusEvent, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../style/App.css'


const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formValid, setFormValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            // Если токен есть, перенаправляем на страницу профиля
            navigate('/me');
        }
    }, [navigate]);

    const handleRegister = async () => {
        if (formValid) {
            setLoading(true);
            try {
                await axios.post('http://142.93.134.108:1111/sign_up', { email, password });
                // После успешной регистрации возвращаемся на страницу входа
                navigate('/');
            } catch (error) {
                console.error('Error during registration:', error);
                // Тут можно обработать ошибки регистрации
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
            setPasswordError('Поле не может быть пустым');
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
        <div className="App">
            <form>
                <div className={'box-h1'}>
                    <h1>Register</h1>
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
                        placeholder='password'
                        name='password'
                        value={password}
                    />
                </div>
                <div className='box-Btn'>
                    <button onClick={handleRegister} disabled={!formValid || loading} type='button' tabIndex={0}>
                        {loading ? 'Loading...' : 'REGISTER'}
                    </button>
                </div>
                <div className={'box-register'}>
                    <p>Already have an account? <Link to="/">Sign In</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Register;

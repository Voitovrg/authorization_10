import React, {useEffect, useState, ChangeEvent, FocusEvent} from 'react';
import axios, {AxiosResponse} from 'axios';
import './style/App.css';


interface UserExistsResponse {
    code: number;
    message: string;
    status: string;
    body: {
        code: number;
        message: string;
        status: string;
    }
}


const App: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [formValid, setFormValid] = useState<boolean>(false);
    const [validMessage, setValidMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const checkUserExists = async (email: string, password: string): Promise<void> => {


        try {
            const response: AxiosResponse<UserExistsResponse> = await axios.post(
                'http://142.93.134.108:1111/login',
                null,
                {params: { email, password }}
            );

            if (response.data.status === 'error') {
                console.log('User does not exist or invalid credentials:', response.data.message);
            } else {
                console.log('User exists:', response.data.body);
                console.log('User exists message:', response.data.body.message);
                setValidMessage(response.data.body.message); // Update as needed
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log('User does not exist or invalid credentials:', error.response.data.message);
            } else {
                console.error('Error checking user existence:', error);
            }
        }
    };

    const handleSignIn = async () => {
        if (formValid) {
            setLoading(true);
            try {
                await checkUserExists(email, password);
                // You can update validMessage here based on the response from checkUserExists
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
            setPasswordError('Поле не может быть пустим');
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
                    <h1>Sign in</h1>
                </div>
                <input
                    onChange={e => emailHandler(e)}
                    onBlur={e => blurHandler(e)}
                    className={`email ${emailDirty && emailError ? 'input-error' : ''}`}
                    type="email"
                    placeholder='Login'
                    name='email'
                    value={email}
                />
                <input
                    onChange={e => passwordHandler(e)}
                    onBlur={e => blurHandler(e)}
                    className={`password ${passwordDirty && passwordError ? 'input-error' : ''}`}
                    type="password"
                    placeholder='Password'
                    name='password'
                    value={password}
                />

                <div className='box-Btn'>
                    <button onClick={handleSignIn} disabled={!formValid || loading} type='button' tabIndex={0}>
                        {loading ? 'Loading...' : 'Sign in'}
                    </button>
                    <button type='button' tabIndex={0}>Sign up</button>
                </div>
            </form>
            <p>{validMessage}</p>
        </div>
    );
};

export default App;

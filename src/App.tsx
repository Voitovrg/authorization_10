import React, {useEffect, useState, ChangeEvent, FocusEvent} from 'react';
import axios from 'axios';
import './style/App.css'


const App: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState(''); // Ошибка если поле будет пустое
    const [passwordError, setPasswordError] = useState(''); // Ошибка если поле будет пустое
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError]);

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 15) {
            setPasswordError('Пароль должен быть не менее чем 3 символа и не больше 15 символов')
            if (!e.target.value) {
                setPasswordError('Поле не может быть пустим')
            }
        } else {
            setPasswordError('')
        }
    }

    const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            default:
                break;
        }
    }

    return (
        <div className="App">
            <form>
                <div className={'box-h1'}>
                    <h1>Sign in</h1>
                </div>
                <input onChange={e => emailHandler(e)}
                       onBlur={e => blurHandler(e)}
                       className={`email ${emailDirty && emailError ? 'input-error': ''}`}
                       type="email"
                       placeholder='Login'
                       name='email'
                       value={email}
                />
                <input onChange={e => passwordHandler(e)}
                       onBlur={e => blurHandler(e)}
                       className={`password ${passwordDirty && passwordError ? 'input-error': ''}`}
                       type="password"
                       placeholder='Password'
                       name='password'
                       value={password}
                />

                <div className='box-Btn'>
                    <button disabled={!formValid} type='submit' tabIndex={0}>Sign in</button>
                    <button type='submit' tabIndex={0}>Sign up</button>
                </div>
            </form>
        </div>
    );
}

export default App;

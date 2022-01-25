import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Preloader from '../common/Preloader';
import cl from './../styles/Login.module.css'

const Login = (props) => {

    let [errors, setErrors] = useState({})

    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const validate = () => {
        let errors = {};
        let isValid = true;
        let upperCase = false;

        if (!inputEmail) {
            isValid = false;
            errors['email'] = 'Некорректный адрес электронной почты'
        }

        if (typeof inputEmail !== undefined) {
            let validateEmailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!validateEmailPattern.test(inputEmail)) {
                isValid = false;
                errors['email'] = 'Некорректный адрес электронной почты'
            }
        }

        if (inputPassword) {
            inputPassword.trim().split('').forEach(letter => {
                if (letter === letter.toUpperCase()) {
                    upperCase = true;
                }
            })
            if (!upperCase) {
                isValid = false;
                errors['password'] = 'Пароль должен содержать не менее одной заглавной буквы'
            }
        }

        if (!inputPassword || inputPassword.length < 8) {
            isValid = false;
            errors['password'] = 'Пароль должен содержать не менее 8 символов'
        }

        setErrors(errors)
        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            setInputPassword('')
            setInputEmail('')
            props.getLoading(true)
            setTimeout(() => {
                props.getLoading(false);
                props.getLogin(true);
            }, 2000)
        }
    }

    return (
        <div className='container'>
            {props.isLogin && <Navigate to='/'/>}
            <h1 style={{ color: 'white', fontSize: 'calc(1vw + 0.9em)', paddingBottom: '10px' }}>Авторизация</h1>
            <form className={cl.formAuth} onSubmit={handleSubmit}>
                <div className={cl.form__block}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' onFocus={() => setErrors({})} name='email' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} className='form__input input' placeholder='Email' />
                    <div className={cl.messageAboutErrorForm}>{errors.email}</div>
                </div>
                <div className={cl.form__block}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' onFocus={() => setErrors({})} name='password' value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} className='form__input input' placeholder='Password' />
                    <div className={cl.messageAboutErrorForm}>{errors.password}</div>
                </div>
                <button className='btn' disabled={props.isLoading}>{props.isLoading ? <Preloader /> : 'Авторизация'}</button>
            </form>
        </div>
    )
}

export default Login;
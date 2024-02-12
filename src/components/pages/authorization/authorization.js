import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { users } from '../../../api/functions';

import './authorization.scss';

function Authorization({loggedIn}) {
    const navigate = useNavigate();

    const [loginData, authorizationData] = useState({username: '', password: ''});

    function changeHandler(evt) {
        const target = evt.target;
        const name = target.name;
        const value = target.value;
        authorizationData({...loginData, [name]: value});
    };

    function authorizationHandler(evt) {
        evt.preventDefault();
        users.authorization(loginData)
            .then((res) => {
                localStorage.setItem('jwt', res.access_token);
                authorizationData({username: '', password: ''});
                loggedIn(true);
                navigate('/', {replace: true});
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return(
        <>
            <section className="authorization">
                <form className='authorization__form' onSubmit={ authorizationHandler }>
                    <h1 className="authorization__title">Вход или регистрация</h1>
                    <div className='authorization__inputs'>
                        <input name="username" type="text" placeholder='Логин' required onChange={ changeHandler }/>
                        <input name="password" type="password" placeholder='Пароль' required onChange={ changeHandler }/>
                    </div>
                    <button className='authorization__btn' type="submit">Войти</button>
                    <div className='authorization__link'>Еще не зарегестрированы? <Link to='/registration'>Создать аккаунт</Link></div>
                </form>
            </section>
        </>
    )
}

export default Authorization;
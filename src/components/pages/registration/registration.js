import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { users } from '../../../api/functions';

import './registration.scss';

function Registration() {
    const navigate = useNavigate();

    const [newData, registrationData] = useState({username: '', password: ''});

    function changeHandler(evt) {
        const target = evt.target;
        const name = target.name;
        const value = target.value;
        registrationData({...newData, [name]: value});
    };

    function registrationHandler(evt) {
        evt.preventDefault();
        users.registration(newData)
            .then((res) => {
                registrationData({username: '', password: ''});
                navigate('/authorization', {replace: true});
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return(
        <>
            <section className="registration">
                <form className='registration__form' onSubmit={ registrationHandler }>
                    <h1 className="registration__title">Вход или регистрация</h1>
                    <div className='registration__inputs'>
                        <input id="username" name="username" type="text" placeholder='Логин' required onChange={ changeHandler }/>
                        <input id="password" name="password" type="password" placeholder='Пароль' required onChange={ changeHandler }/>
                    </div>
                    <button className='registration__btn' type="submit">Зарегистрироваться</button>
                    <div className='registration__link'>Уже зарегестрированы? <Link to='/authorization'>Войти</Link></div>
                </form>
            </section>
        </>
    ) 
}

export default Registration;
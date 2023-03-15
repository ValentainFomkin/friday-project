import React from 'react';
import {Link} from "react-router-dom";
import s from './NavBar.module.css'

export const NavBar = () => {
    return (
        <div className={s.links}>
            <div className={s.link}>
                <Link to={'/'}>MAIN</Link>
            </div>
            <div className={s.link}>
                <Link to={'/login'}>Login</Link>
            </div>
            <div className={s.link}>
                <Link to={'/registration'}>Registration</Link>
            </div>
            <div className={s.link}>
                <Link to={'/profile'}>Profile</Link>
            </div>
            <div className={s.link}>
                <Link to={'/404'}>404</Link>
            </div>
            <div className={s.link}>
                <Link to={'/password-recovery'}>PasswordRecovery</Link>
            </div>
            <div className={s.link}>
                <Link to={'/enter-new-password'}>EnterNewPassword</Link>
            </div>
            <div className={s.link}>
                <Link to={'/super-components-test'}>AllSuperComponents</Link>
            </div>
        </div>
    );
};


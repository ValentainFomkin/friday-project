import React from 'react';
import {Link} from "react-router-dom";
import s from './NavBar.module.css'
import {PATH} from "../routes/paths-routes/PathRoutes";

export const NavBar = () => {
    return (
        <div className={s.links}>
            <div className={s.link}>
                <Link to={PATH.HOME_PAGE_PATH}>MAIN</Link>
            </div>
            <div className={s.link}>
                <Link to={PATH.LOGIN_PATH}>Login</Link>
            </div>
            <div className={s.link}>
                <Link to={PATH.REGISTRATION_PATH}>Registration</Link>
            </div>
            <div className={s.link}>
                <Link to={PATH.PROFILE_PATH}>Profile</Link>
            </div>
            <div className={s.link}>
                <Link to={PATH.ERROR_PATH}>404</Link>
            </div>
            <div className={s.link}>
                <Link to={PATH.PASSWORD_RECOVERY_PATH}>PasswordRecovery</Link>
            </div>
            <div className={s.link}>
                <Link to={PATH.CHECK_EMAIL_PATH}>CheckEmail</Link>
            </div>
            <div className={s.link}>
                <Link to={PATH.ENTER_NEW_PASSWORD_PATH}>EnterNewPassword</Link>
            </div>
            <div className={s.link}>
                <Link to={PATH.SUPER_COMPONENT_TEST_PATH}>AllSuperComponents</Link>
            </div>
        </div>
    );
};


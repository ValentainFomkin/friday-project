import React from 'react';
import './App.module.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./n3-ui/u1-fetures/components/f2-login/Login";
import {Registration} from "./n3-ui/u1-fetures/components/f3-registration/Registration";
import {Profile} from "./n3-ui/u1-fetures/components/f4-profile/Profile";
import {PasswordRecovery} from "./n3-ui/u1-fetures/components/f5-password-recovery/PasswordRecovery";
import {EnterNewPassword} from "./n3-ui/u1-fetures/components/f6-enter-new-password/EnterNewPassword";
import {AllSuperComponents} from "./n3-ui/u1-fetures/components/f1-super-components/AllSuperComponents";
import {NavBar} from "./n3-ui/u1-fetures/components/f7-navigation/NavBar";
import s from './App.module.css'


function App() {
    return (
        <div className={s.App}>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/registration'} element={<Registration/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/404'} element={<div>404: PAGE NOT FOUND</div>}/>
                    <Route path={'/password-recovery'} element={<PasswordRecovery/>}/>
                    <Route path={'/enter-new-password'} element={<EnterNewPassword/>}/>
                    <Route path={'/super-components-test'} element={<AllSuperComponents/>}/>

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

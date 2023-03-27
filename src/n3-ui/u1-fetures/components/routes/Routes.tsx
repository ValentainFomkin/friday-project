import React from 'react';
import {useRoutes} from "react-router-dom";
import {Login} from "../f2-login/Login";
import {EnterNewPassword} from "../f6-enter-new-password/EnterNewPassword";
import {AllSuperComponents} from "../f1-super-components/AllSuperComponents";
import {PasswordRecovery} from "../f5-password-recovery/PasswordRecovery";
import {Profile} from "../f4-profile/Profile";
import {Registration} from "../f3-registration/Registration";
import {PATH} from "./paths-routes/PathRoutes";
import {CheckEmail} from "../f5-password-recovery/p1-check-email/CheckEmail";
import {MainPage} from "../f8-main-page/MainPage";

export const RoutesComponent = () => {

    const routs = useRoutes([
        {path: PATH.HOME_PAGE_PATH, element: <MainPage/>},
        {path: PATH.LOGIN_PATH, element: <Login/>},
        {path: PATH.REGISTRATION_PATH, element: <Registration/>},
        {path: PATH.PROFILE_PATH, element: <Profile/>},
        {path: PATH.ERROR_PATH, element: <div>404: PAGE NOT FOUND</div>},
        {path: PATH.PASSWORD_RECOVERY_PATH, element: <PasswordRecovery/>},
        {path: PATH.CHECK_EMAIL_PATH, element: <CheckEmail/>},
        {path: PATH.ENTER_NEW_PASSWORD_PATH, element: <EnterNewPassword/>},
        // {path: `set-new-password/:token`, element: <EnterNewPassword/>},
        {path: PATH.SUPER_COMPONENT_TEST_PATH, element: <AllSuperComponents/>},
    ])
    return (
        <>
            {routs}
        </>
    );
};

